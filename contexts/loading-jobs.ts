/**
 * @description a queue of jobs that are eligible to summon the main loading overlay that blocks the user from interacting with the page
 */

import { BehaviorSubject, Observable, of } from 'rxjs'

export const pageLoadingJobs$ = new BehaviorSubject<Promise<unknown> | Observable<unknown>>(
  of(undefined),
)
