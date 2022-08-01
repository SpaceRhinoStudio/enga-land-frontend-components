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
