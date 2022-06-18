import { delay, map, mergeMap, of, scan, Subject, withLatestFrom } from 'rxjs'
import { controlStreamPayload } from '../operators/control-stream-payload'
import { Window$ } from '../observables/window'

export const shouldHideOverflowController$ = new Subject<{ Hide?: boolean }>()

export const shouldHideOverflow$ = shouldHideOverflowController$.pipe(
  controlStreamPayload('Hide'),
  mergeMap(x => (x ? of(1) : of(-1).pipe(delay(300)))),
  scan((acc, x) => acc + x, 0),
  map(x => !!x),
)

shouldHideOverflow$
  .pipe(withLatestFrom(Window$))
  .subscribe(([x, win]) =>
    x
      ? (win.document.documentElement.style.overflow = 'hidden')
      : (win.document.documentElement.style.overflow = ''),
  )
