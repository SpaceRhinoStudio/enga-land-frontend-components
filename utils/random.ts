/**
 * @description a set of utility functions for random stuff
 */

import _ from 'lodash'
import { keysOf } from './type-safe'

export function rndElm<T>(arr: T[]): T {
  return arr[rnd(arr.length)]!
}

export function rnd(max: number, min = 0, canBeFloat = false): number {
  if (min > max) {
    ;[min, max] = [max, min]
  }
  const res = (canBeFloat ? (e: number) => e : Math.floor)(Math.random() * (max - min) + min)
  return res === max ? max - 1 : res
}

export function genArr<T>(length: number, project: (index: number) => T): T[] {
  return Array(length)
    .fill(undefined)
    .map((_, index) => project(index))
}

export function rndAddress(): string {
  return '0x'.concat(genArr(40, () => rnd(16).toString(16)).join(''))
}

export function rndUnique(max: number, length: number): number[] {
  const res = new Set<number>()
  while (res.size < Math.min(length, max)) {
    res.add(rnd(max))
  }
  return Array.from(res)
}

export function rndPick<T>(arr: T[], length: number): T[] {
  return _.values(_.pick(arr, ...rndUnique(arr.length, length)))
}

/**
 * @description to be only used with identity enums, the ones that all the keys match their respected values exactly
 */
export function rndEnum<T>(target: Record<string | number, T>): T {
  return target[rndElm(keysOf(target))]!
}

export function rndSign(): number {
  return rnd(2) === 0 ? 1 : -1
}
