/**
 * @description a set of helper functions to bring media queries and screen matching into javascript
 */

import { config } from '../configs'
import { Window$ } from '../observables/window'
import type { Screens } from '../types'
import _ from 'lodash'
import {
  combineLatest,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs'
import { exclusiveOf$ } from './px-rem-conversion'

export function matchMedia$(query: string): Observable<boolean> {
  return Window$.pipe(
    switchMap(win => {
      const queryObject = win.matchMedia(query)
      return fromEvent<MediaQueryListEvent | MediaQueryList>(queryObject, 'change').pipe(
        map(x => x.matches),
        startWith(queryObject.matches),
      )
    }),
  )
}

export const canHover$ = matchMedia$('(hover: hover) and (pointer: fine)')

export function matchUntil$(screen: Screens): Observable<boolean> {
  return exclusiveOf$(config.Screens[screen]).pipe(
    switchMap(x => matchMedia$(`screen and (max-width: ${x})`)),
  )
}

export function matchBetween$(from: Screens, to: Screens): Observable<boolean> {
  return exclusiveOf$(config.Screens[to]).pipe(
    switchMap(x =>
      matchMedia$(`screen and (min-width: ${config.Screens[from]}) and (max-width: ${x})`),
    ),
  )
}

export function matchFrom$(screen: Screens): Observable<boolean> {
  return matchMedia$(`screen and (min-width: ${config.Screens[screen]})`)
}

export const screen$: Observable<{
  exact: 'xs' | 'sm' | 'md' | 'lg'
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}> = combineLatest({
  xs: matchUntil$('sm'),
  sm: matchBetween$('sm', 'md'),
  md: matchBetween$('md', 'lg'),
  lg: matchFrom$('lg'),
}).pipe(
  map(x => (x.xs ? 'xs' : x.sm ? 'sm' : x.md ? 'md' : 'lg')),
  map(x => ({
    exact: x,
    isMobile: x === 'xs' || x === 'sm',
    isTablet: x === 'md',
    isDesktop: x === 'lg',
  })),
  distinctUntilChanged(_.isEqual),
  shareReplay(1),
)
