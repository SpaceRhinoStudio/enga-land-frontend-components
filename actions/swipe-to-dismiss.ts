import _ from 'lodash'
import { combineLatest, filter, fromEvent, map, merge, tap } from 'rxjs'

function getX(e: Event) {
  return (e as MouseEvent).clientX ?? (e as TouchEvent).touches?.item(0)?.clientX ?? 0
}

function addTransition(node: HTMLElement) {
  const add = 'transform'
  const prev = node.style.transitionProperty
  node.style.transitionDuration = '300ms'
  node.style.transitionProperty = prev
    .split(',')
    .map(x => x.trim())
    .filter(x => x !== add)
    .concat(add)
    .join(', ')
}

function removeTransition(node: HTMLElement) {
  const remove = 'transform'
  const prev = node.style.transitionProperty
  node.style.transitionDuration = ''
  node.style.transitionProperty = prev
    .split(',')
    .map(x => x.trim())
    .filter(x => x !== remove)
    .join(', ')
}

//TODO: use passive event listeners for better performance, if possible

/**
 * @description svelte action to monitor drags (swipes) on both pointer and touch for the given node
 * the node will move along with the swipe
 * @emits `swipe_dismiss` with a value of either `'left'` or `'right'` if the swipe goes beyond the threshold of one third of the node width
 */
export function swipe_to_dismiss(node: HTMLElement): { destroy: () => void } {
  const hasDismissed = { current: false }

  node.style.willChange = 'transform'

  function dismiss(dir: 'right' | 'left') {
    hasDismissed.current = true
    node.dispatchEvent(new CustomEvent('swipe_dismiss', { detail: dir }))
  }

  const left$ = combineLatest([
    merge(
      fromEvent(node, 'mousedown').pipe(map(getX)),
      fromEvent(node, 'touchstart').pipe(map(getX)),
      fromEvent(node, 'mouseup').pipe(map(() => null)),
      fromEvent(node, 'touchend').pipe(map(() => null)),
      fromEvent(node, 'touchcancel').pipe(map(() => null)),
      fromEvent(node, 'click').pipe(map(() => null)),
    ),
    merge(
      fromEvent(node, 'mousemove'),
      fromEvent(node, 'touchmove'),
      fromEvent(node, 'mouseup').pipe(map(() => null)),
      fromEvent(node, 'touchend').pipe(map(() => null)),
      fromEvent(node, 'touchcancel').pipe(map(() => null)),
      fromEvent(node, 'click').pipe(map(() => null)),
    ),
  ]).pipe(
    filter(() => !hasDismissed.current),
    tap(([, e]) => e?.preventDefault()),
    tap(([, e]) => e?.stopPropagation()),
    tap(([, e]) => e?.stopImmediatePropagation()),
    tap(([, e]) =>
      e === null
        ? addTransition(node)
        : hasDismissed.current === false
        ? removeTransition(node)
        : void null,
    ),
    map(([start, e]) => [e && start ? start - getX(e) : 0, e ? node.clientWidth ?? 0 : 0] as const),
    tap(([x, w]) => Math.abs(x) > w / 3 && dismiss(x > 0 ? 'left' : 'right')),
  )

  const subs = left$.subscribe(([x]) => {
    node.style.transform = `translateX(${-x}px)`
  })

  return {
    destroy() {
      subs.unsubscribe()
    },
  }
}
