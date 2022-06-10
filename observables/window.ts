import { EMPTY, iif, of, map } from 'rxjs'

export const Window$ = iif(
  () => typeof window !== 'undefined',
  of(null).pipe(map(() => window)),
  EMPTY,
)
