/**
 * @description A sentinel value that can be used to indicate that a value is not present.
 */

export const SENTINEL: unique symbol = Symbol('empty-value-sentinel')
export type Sentinel = typeof SENTINEL

export function isSentinel(arg: unknown): arg is Sentinel {
  return arg === SENTINEL
}

export function isNotSentinel<T>(arg: T | Sentinel): arg is T {
  return arg !== SENTINEL
}
