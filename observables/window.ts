/**
 * @description this observable is used to make sure that client side related code is not executed on server
 */

import { EMPTY, iif, of, map } from 'rxjs'

export const Window$ = iif(
  () => typeof window !== 'undefined',
  of(null).pipe(map(() => window)),
  EMPTY,
)
