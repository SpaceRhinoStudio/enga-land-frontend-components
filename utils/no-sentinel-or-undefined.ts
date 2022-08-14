/**
 * @description a set of type safe filter predicates for empty / falsy values
 */

import { SENTINEL, type Sentinel } from '$lib/shared/contexts/empty-sentinel'
import _ from 'lodash'
import type { NonUndefinable, Option } from '$lib/shared/types'

export function noSentinelOrUndefined<T>(
  value: T | Sentinel | undefined,
): value is NonUndefinable<T> {
  return !_.isUndefined(value) && value !== SENTINEL
}

export function noSentinel<T>(value: T | Sentinel): value is T {
  return value !== SENTINEL
}

export function noNil<T>(value: Option<T>): value is T {
  return value !== undefined && value !== null
}

export function noNull<T>(value: T | null): value is T {
  return value !== null
}

export function noUndefined<T>(value: T | undefined): value is T {
  return value !== undefined
}
