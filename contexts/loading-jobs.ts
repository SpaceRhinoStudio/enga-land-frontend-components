import { BehaviorSubject, Observable } from 'rxjs'

export const pageLoadingJobs$ = new BehaviorSubject<Promise<unknown> | Observable<unknown>>(
  Promise.resolve(undefined),
)
