/**
 * @description the queue of toast messages
 */

import { Subject } from 'rxjs'

export enum ToastLevel {
  INFO,
  SUCCESS,
  ALERT,
  WARNING,
  ERROR,
}

export type DetailedToast = {
  message: string
  timeout?: number
  level?: ToastLevel
}

export const flashToast$ = new Subject<string | DetailedToast>()
