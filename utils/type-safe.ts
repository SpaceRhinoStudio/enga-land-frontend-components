/**
 * @description a set of utilities that can be used to type-safely do the everyday things
 */

import { isSentinel, type Sentinel } from '../contexts/empty-sentinel'
import _ from 'lodash'
import type { Nil } from '../types'

export function keysOf<K extends string | number = number>(
  source: { [x in K]?: unknown } | unknown[] | Nil | Sentinel,
): K[] {
  if (isSentinel(source) || _.isNil(source)) {
    return []
  }
  return _.keys(source) as K[]
}

export function isEqual<T, S>(a: T, b: S): boolean {
  return _.isEqual(a, b)
}

export function isArray<T, S>(x: readonly T[] | S): x is readonly T[] {
  return Array.isArray(x)
}
