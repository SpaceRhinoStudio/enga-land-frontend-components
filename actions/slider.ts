import { passAfter } from '$lib/operators/pass-after'
import { pipeIfNot } from '$lib/operators/pipe-if-not'
import { tapWithIndex } from '$lib/operators/tap-with-index'
import _ from 'lodash'
import {
  catchError,
  EMPTY,
  expand,
  filter,
  finalize,
  fromEvent,
  map,
  merge,
  mergeMap,
  mergeWith,
  MonoTypeOperatorFunction,
  Observable,
  of,
  pipe,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
  throwError,
  timeout,
} from 'rxjs'
import { get, Readable } from 'svelte/store'
import { shouldHideOverflowController$ } from '../contexts/should-hide-overflow'
import { noNil } from '../utils/no-sentinel-or-undefined'

export function getX(e: Event): number {
  return (e as MouseEvent).clientX ?? (e as TouchEvent).touches?.item(0)?.clientX ?? 0
}
function getY(e: Event) {
  return (e as MouseEvent).clientY ?? (e as TouchEvent).touches?.item(0)?.clientY ?? 0
}

function getMinMax(node: HTMLElement) {
  const rect = node.parentElement!.getBoundingClientRect()
  return [rect.left, rect.left + rect.width] as const
}

const error = pipe(mergeMap(() => throwError(() => EMPTY)))

const neutralize: MonoTypeOperatorFunction<Event> = pipe(
  tap(e => e?.preventDefault?.()),
  tap(e => e?.stopPropagation?.()),
  tap(e => e?.stopImmediatePropagation?.()),
)

function shouldTouchEventProceed([offsetX, offsetY]: readonly [number, number]): 'x' | 'y' | null {
  return offsetY > 20 ? 'y' : offsetX > 30 ? 'x' : null
}

function offsetOf(startEv: Event, ev: Event) {
  return [getX(ev) - getX(startEv), getY(ev) - getY(startEv)].map(Math.abs) as [number, number]
}

export function triggers(node: HTMLElement): Observable<number> {
  return merge(
    fromEvent(node.parentElement!, 'mousedown'),
    fromEvent(node.parentElement!, 'touchstart').pipe(
      passAfter(
        pipe(
          switchMap(startEv =>
            fromEvent(document, 'touchmove').pipe(
              take(1),
              map(ev => offsetOf(startEv, ev)),
              expand(offsets =>
                shouldTouchEventProceed(offsets)
                  ? EMPTY
                  : fromEvent(document, 'touchmove').pipe(
                      take(1),
                      map(ev => offsetOf(startEv, ev)),
                    ),
              ),
              map(shouldTouchEventProceed),
            ),
          ),
        ),
        (dir, startEv) => [dir!, startEv] as const,
      ),
      pipeIfNot(
        map(([dir]) => dir === 'x'),
        map(() => null),
      ),
      filter(noNil),
      map(([, startEv]) => startEv),
    ),
  ).pipe(
    neutralize,
    map(e => getX(e)),
  )
}

export function movers(): Observable<Event> {
  return merge(
    merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'touchmove').pipe(
        tapWithIndex(
          (_, index) =>
            index === 0 &&
            shouldHideOverflowController$.next({ Hide: { id: 'slider', hide: true } }),
        ),
        finalize(() => shouldHideOverflowController$.next({ Hide: { id: 'slider', hide: false } })),
      ),
    ).pipe(
      mergeWith(
        merge(
          fromEvent(document, 'touchend'),
          fromEvent(document, 'touchcancel'),
          fromEvent(document, 'mouseup'),
        ).pipe(error),
      ),
      catchError(() => EMPTY),
    ),
  ).pipe(neutralize)
}

/**
 * @description svelte action used to turn the given node into a slider
 * or just disable translate and read the swipes instead
 * @emits `slider_status` containing `'start'` or `'end'` indicating if the slider is being dragged or not
 * @emits `slider_change` containing a tuple with percent on the first element and absolute X coordinates on the second
 */
export function slider(
  node: HTMLElement,
  params?: {
    initial?: number
    update?: Readable<number>
    disabled?: Readable<boolean>
    disableTranslate?: boolean
  },
): { destroy: () => void } {
  !params?.disableTranslate && (node.style.willChange = 'transform')

  function calcPercentOfX(x: number) {
    const [min, max] = getMinMax(node)
    return (Math.min(max - min, Math.max(0, x - min)) / (max - min)) * 100
  }

  function calcXOfPercent(percent: number) {
    const [min, max] = getMinMax(node)
    return Math.min(max - min, Math.max(0, ((max - min) * percent) / 100))
  }

  function submit(percent: number, force = false) {
    if ((params?.disabled && (!get(params?.disabled) || force)) || !params?.disabled) {
      const x = calcXOfPercent(percent)
      !params?.disableTranslate &&
        (node.style.transform = `translate(calc(${x}px - 50%), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`)
      node.dispatchEvent(new CustomEvent('slider_change', { detail: [percent, x] }))
    }
  }

  const subs: { unsubscribe: () => void }[] = []

  const percent$ = triggers(node).pipe(
    switchMap(start => {
      node.dispatchEvent(new CustomEvent('slider_status', { detail: 'start' }))

      return movers().pipe(
        map(getX),
        startWith(start),
        finalize(() => node.dispatchEvent(new CustomEvent('slider_status', { detail: 'end' }))),
      )
    }),
    map(calcPercentOfX),
    shareReplay(1),
  )
  subs.push(percent$.subscribe(submit))

  requestAnimationFrame(() => {
    submit(params?.initial ?? 0, true)
  })

  subs.push({ unsubscribe: params?.update?.subscribe(submit) ?? _.noop })

  function resizeListener() {
    percent$
      .pipe(
        take(1),
        timeout({ first: 10 }),
        catchError(() => of(params?.update ? get(params.update) : params?.initial ?? 0)),
      )
      .subscribe(x => submit(x, true))
  }

  window.addEventListener('resize', resizeListener)
  subs.push({ unsubscribe: () => window.removeEventListener('resize', resizeListener) })

  return {
    destroy() {
      subs.forEach(x => x.unsubscribe())
    },
  }
}
