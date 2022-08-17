import { Observable, OperatorFunction } from 'rxjs'

type NotFunction<T> = T extends (...args: any[]) => any ? never : T

export type PredicateEval<T> = ((arg: any) => boolean) | NotFunction<T>

export type LazyEval<T, Args extends unknown[] = unknown[]> = T | ((...args: Args) => T)

export type LazyEvalAsync<T> = LazyEval<T | Promise<T>>

export type Not<T, RestrictedBase> = T extends RestrictedBase ? never : T

export type ValueTypeOfKey<T, K extends keyof T> = Pick<T, K> extends {
  [x in K]?: infer R
}
  ? R
  : never

export type ValueTypeUnion<T> = keyof T extends infer K ? (K extends keyof T ? T[K] : never) : never

export type MemberTypeUnion<T> = T extends (infer E)[] ? E : T

export type TimeUnit = 's' | 'm' | 'h' | 'd' | 'y'

export type NonUndefinable<T> = T extends undefined ? never : T

export type Nil = null | undefined

const SKIP = Symbol('SKIP')
export type Skip = typeof SKIP

export type Last<A extends readonly unknown[]> = (readonly [Skip, ...A])[A['length']]

export type Prev<A extends readonly unknown[], Fallback, K extends keyof A> = (readonly [
  Fallback,
  ...A,
])[K]

export type OperatorsTuple<T, A extends readonly unknown[]> = {
  [P in keyof A]: OperatorFunction<Prev<A, T, P>, A[P]>
}

export type HasOptionalMember<
  Arr extends readonly unknown[],
  Result extends boolean = false,
  Index extends number[] = [],
> = Arr extends []
  ? Result
  : Arr extends [infer Head, ...infer Tail]
  ? HasOptionalMember<
      [...Tail],
      Result extends true ? true : Head extends Nil ? true : false,
      [...Index, 1]
    >
  : Result

export type NilOf<T> = Nil extends T
  ? Nil
  : undefined extends T
  ? undefined
  : null extends T
  ? null
  : never

type SuperiorNull<T> = Nil extends NilOf<T> ? null : NilOf<T>

export type NilOfMembers<
  Arr,
  Result extends Nil | never = never,
  Index extends number[] = [],
> = Arr extends readonly unknown[]
  ? Arr extends []
    ? Result
    : Arr extends [infer Head, ...infer Tail]
    ? NilOfMembers<[...Tail], SuperiorNull<Result | Head>, [...Index, 1]>
    : Result
  : never

export type Some<T> = T extends NonNullable<infer S> ? S : never

//TODO: add object support
//TODO: add deep support
export type SomeMembers<T> = Some<T> extends readonly unknown[]
  ? TruthyOfArrayAggressive<UnReadonly<Some<T>>>
  : Some<T>

/**
 * @description or just use
 * ```ts
    T extends readonly unknown[]
      ? { [P in keyof T]: Just<T[P]> }
      : never
  ```
 */
export type TruthyOfArray<
  Arr,
  Result extends readonly unknown[] = [],
  Index extends number[] = [],
> = Arr extends readonly unknown[]
  ? Arr extends []
    ? Result
    : Arr extends [infer Head, ...infer Tail]
    ? TruthyOfArray<[...Tail], [...Result, Some<Head>], [...Index, 1]>
    : Result
  : never

export type TruthyOfArrayAggressive<
  Arr,
  Result extends readonly unknown[] = [],
  Index extends number[] = [],
> = Arr extends readonly unknown[]
  ? Arr extends []
    ? Result
    : Arr extends [infer Head, ...infer Tail]
    ? TruthyOfArrayAggressive<
        [...Tail],
        Some<Head> extends never ? never : [...Result, Some<Head>],
        [...Index, 1]
      >
    : Result
  : never

export type HasNeverMember<
  Arr,
  Result extends boolean = false,
  Index extends number[] = [],
> = Arr extends readonly unknown[]
  ? Arr extends []
    ? Result
    : Arr extends [infer Head, ...infer Tail]
    ? HasNeverMember<[...Tail], never extends Head ? true : Result, [...Index, 1]>
    : Result
  : never

export type ExtraTypeForMembers<
  Arr,
  T,
  Result extends readonly unknown[] = [],
  Index extends number[] = [],
> = Arr extends readonly unknown[]
  ? Arr extends []
    ? Result
    : Arr extends [infer Head, ...infer Tail]
    ? ExtraTypeForMembers<[...Tail], T, [...Result, Head | T], [...Index, 1]>
    : Result
  : never

export type UnReadonly<T> = T extends readonly [...infer E] ? E : T

export type Option<T> = T | Nil

export type OptionMembers<
  Arr,
  Result extends readonly unknown[] = [],
  Index extends number[] = [],
> = Arr extends readonly unknown[]
  ? Arr extends []
    ? Result
    : Arr extends [infer Head, ...infer Tail]
    ? OptionMembers<[...Tail], [...Result, Option<Head>], [...Index, 1]>
    : Result
  : never

export type Option$<T> = Observable<Option<T>>

export type CastTuple<T> = T extends readonly unknown[] ? T : readonly [T]

export type ShallowCons<T, R> = readonly [...CastTuple<T>, ...CastTuple<R>]

export type SerializableBase = string | number | boolean | Date

export type SerializableCollection =
  | { [key: string]: SerializableBase | SerializableCollection }
  | (SerializableBase | SerializableCollection)[]

export type Serializable = SerializableBase | SerializableCollection

export type LogLevel = 'FATAL' | 'ERROR' | 'WARN' | 'NOTICE' | 'INFO' | 'DEBUG' | 'TRACE'
