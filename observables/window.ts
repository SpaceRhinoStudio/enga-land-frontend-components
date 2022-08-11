/**
 * @description this observable is used to make sure that client side related code is not executed on server
 */

import {
  EMPTY,
  iif,
  of,
  map,
  shareReplay,
  switchMap,
  interval,
  distinctUntilChanged,
  skip,
  withLatestFrom,
  filter,
  merge,
  fromEvent,
} from 'rxjs'
import { flashToast$, ToastLevel } from '../contexts/flash-toast'
import { __$ } from '../locales'

export const Window$ = iif(
  () => typeof window !== 'undefined',
  of(null).pipe(map(() => window)),
  EMPTY,
)

export const onlineStatus$ = Window$.pipe(
  switchMap(win => interval(1000).pipe(map(() => win.navigator.onLine))),
  distinctUntilChanged(),
  shareReplay(1),
)

onlineStatus$
  .pipe(
    filter((x, i) => (i === 0 ? !x : true)),
    withLatestFrom(__$),
  )
  .subscribe(([status, __]) => {
    flashToast$.next({
      message: __.main.onlineStatus[status ? 'online' : 'offline'],
      level: status ? ToastLevel.SUCCESS : ToastLevel.ERROR,
      timeout: status ? 2000 : 10000,
    })
  })

export const windowFocus$ = Window$.pipe(
  switchMap(win =>
    merge(
      fromEvent(win, 'focus').pipe(map(() => true)),
      fromEvent(win, 'blur').pipe(map(() => false)),
    ),
  ),
  shareReplay(1),
)
