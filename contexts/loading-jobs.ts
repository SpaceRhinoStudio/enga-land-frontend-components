/**
 * @description a queue of jobs that are eligible to summon the main loading overlay that blocks the user from interacting with the page
 */

import { BehaviorSubject, Observable } from 'rxjs'

export const pageLoadingJobs$ = new BehaviorSubject<Promise<unknown> | Observable<unknown>>(
  Promise.resolve(undefined),
)
