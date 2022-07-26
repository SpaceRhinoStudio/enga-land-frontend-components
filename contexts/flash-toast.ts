/**
 * @description the queue of toast messages
 */

import { Subject } from 'rxjs'

export enum ToastType {
  success = 'success',
  alert = 'alert',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export type DetailedToast = {
  message: string
  timeout?: number
  level?: ToastType
}

export const flashToast$ = new Subject<string | DetailedToast>()
