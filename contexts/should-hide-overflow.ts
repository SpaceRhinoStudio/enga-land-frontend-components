/**
 * @description storage that indicates if the screen should not scroll at all
 * used for when user is moving a slider in a touch device, when a modal is open or when the main loading overlay is being shown
 */

import { delay, map, mergeMap, of, scan, Subject, withLatestFrom, EMPTY, tap } from 'rxjs'
import { controlStreamPayload } from '../operators/control-stream-payload'
import { Window$ } from '../observables/window'
import _ from 'lodash'

export const shouldHideOverflowController$ = new Subject<{
  Hide?: boolean | { id: string; hide: boolean }
}>()

const hides: Record<string, boolean> = {}

export const shouldHideOverflow$ = shouldHideOverflowController$.pipe(
  controlStreamPayload('Hide'),
  mergeMap(x => {
    let res = _.isBoolean(x) ? x : null
    if (!_.isBoolean(x)) {
      res = x.hide && !hides[x.id] ? true : !x.hide && hides[x.id] ? false : null
      if (_.isBoolean(res)) {
        //side effect
        hides[x.id] = res
      }
    }
    return res === true ? of(1) : res === false ? of(-1).pipe(delay(300)) : EMPTY
  }),
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
