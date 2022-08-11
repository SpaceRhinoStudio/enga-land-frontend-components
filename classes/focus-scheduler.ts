import { SchedulerAction, SchedulerLike, Subscription } from 'rxjs'
import { windowFocus$ } from '../observables/window'

class FocusScheduler implements SchedulerLike {
  private static _instance: FocusScheduler
  public static getInstance(): FocusScheduler {
    if (!FocusScheduler._instance) {
      FocusScheduler._instance = new FocusScheduler()
    }
    return FocusScheduler._instance
  }
  private constructor() {
    windowFocus$.pipe
  }

  schedule<T>(
    work: (this: SchedulerAction<T>, state: T) => void,
    delay: number,
    state: T,
  ): Subscription
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T | undefined) => void,
    delay: number,
    state?: T | undefined,
  ): Subscription
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T | undefined) => void,
    delay?: number | undefined,
    state?: T | undefined,
  ): Subscription
  schedule(work: unknown, delay?: unknown, state?: unknown): Subscription {
    //TODO: implement
  }
}

export const focusSchduler = FocusScheduler.getInstance()
