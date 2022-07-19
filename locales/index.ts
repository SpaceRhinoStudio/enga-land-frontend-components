import { WebsiteLocale } from './interface'
import {
  asapScheduler,
  BehaviorSubject,
  catchError,
  map,
  mergeMap,
  observeOn,
  of,
  ReplaySubject,
  throwError,
} from 'rxjs'
import { ObservableError } from '../classes/observable-error'
import { flashToast$ } from '../contexts/flash-toast'
import _ from 'lodash'
import { unLazy } from '../utils/un-lazy'

export const __$ = new ReplaySubject<WebsiteLocaleData>(1)
export const locale$ = new BehaviorSubject<string>('en')

import en from './en'
import type { WebsiteLocaleData } from './types'
const localeImportMaps = {
  en,
}

locale$
  .pipe(
    mergeMap(_locale => Promise.resolve(unLazy(_.get(localeImportMaps, _locale)))),
    map(x => _.get(x, 'default') ?? x),
    mergeMap(x =>
      x instanceof WebsiteLocale
        ? of(x)
        : throwError(
            () => new ObservableError(`E0x02 invalid locale data for ${locale$.getValue()}`),
          ),
    ),
    catchError((err, observable) => {
      flashToast$.next(
        `${err?.toString?.() ?? 'E0x03 error loading locale data'}, trying to load fallback locale`,
      )
      locale$.next('en')
      return observable.pipe(observeOn(asapScheduler))
    }),
    map(x => x.data),
  )
  .subscribe(__$)
