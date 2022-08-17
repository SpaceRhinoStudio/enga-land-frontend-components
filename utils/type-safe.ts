/**
 * @description a set of utilities that can be used to type-safely do the everyday things
 */

import { isSentinel, type Sentinel } from '../contexts/empty-sentinel'
import _ from 'lodash'
import type { CastTuple, Option, SerializableBase } from '../types'

export function keysOf<K extends string | number = number>(
  source: Option<{ [x in K]?: unknown } | unknown[] | Sentinel>,
): K[] {
  if (isSentinel(source) || _.isNil(source)) {
    return []
  }
  return _.keys(source) as K[]
}

export function isEqual<T, S>(a: T, b: S): boolean {
  return _.isEqual(a, b)
}

export function isArray<T extends readonly unknown[], S>(x: T | S): x is T {
  return Array.isArray(x)
}

export function castArray<T>(source: T): CastTuple<T> {
  return _.castArray(source) as any
}

export function isSerializableBase(x: unknown): x is SerializableBase {
  if (_.isString(x) || _.isNumber(x) || _.isBoolean(x) || _.isDate(x)) {
    return true
  }
  return false
}
