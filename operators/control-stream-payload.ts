import { isSentinel, Sentinel, SENTINEL } from '../contexts/empty-sentinel'
import { filter, map, MonoTypeOperatorFunction, Subject, tap, type OperatorFunction } from 'rxjs'
import { noSentinel } from '../utils/no-sentinel-or-undefined'
import _ from 'lodash'
import type { ValueTypeOfKey } from '../types'

function selectOrSentinel<Action extends keyof Payloads, Payloads extends _.Dictionary<unknown>>(
  action: Action,
  x: Payloads,
): ValueTypeOfKey<Payloads, Action> | Sentinel {
  return (action in x ? x[action] : SENTINEL) as ValueTypeOfKey<Payloads, Action> | Sentinel
}

/**
 * @description this operator is used to extract the payload of certain actions from a control stream observable
 */
export function controlStreamPayload<
  Action extends keyof Payloads,
  Payloads extends _.Dictionary<unknown>,
>(action: Action): OperatorFunction<Payloads, ValueTypeOfKey<Payloads, Action>>
export function controlStreamPayload<
  Action extends keyof Payloads,
  Payloads extends _.Dictionary<unknown>,
  Actions extends readonly [Action, Action],
>(
  action: Actions,
): OperatorFunction<
  Payloads,
  //prettier-ignore
  readonly [
    ValueTypeOfKey<Payloads,Actions[0]> | Sentinel,
    ValueTypeOfKey<Payloads,Actions[1]> | Sentinel
  ]
>
export function controlStreamPayload<
  Action extends keyof Payloads,
  Payloads extends _.Dictionary<unknown>,
  Actions extends readonly [Action, Action, Action],
>(
  action: Actions,
): OperatorFunction<
  Payloads,
  readonly [
    ValueTypeOfKey<Payloads, Actions[0]> | Sentinel,
    ValueTypeOfKey<Payloads, Actions[1]> | Sentinel,
    ValueTypeOfKey<Payloads, Actions[2]> | Sentinel,
  ]
>
export function controlStreamPayload<
  Action extends keyof Payloads,
  Payloads extends _.Dictionary<unknown>,
  Actions extends readonly [Action, Action, Action, Action],
>(
  action: Actions,
): OperatorFunction<
  Payloads,
  readonly [
    ValueTypeOfKey<Payloads, Actions[0]> | Sentinel,
    ValueTypeOfKey<Payloads, Actions[1]> | Sentinel,
    ValueTypeOfKey<Payloads, Actions[2]> | Sentinel,
    ValueTypeOfKey<Payloads, Actions[3]> | Sentinel,
  ]
>
export function controlStreamPayload<
  Action extends keyof Payloads,
  Payloads extends _.Dictionary<unknown>,
>(
  action: Action | Action[],
): OperatorFunction<
  Payloads,
  ValueTypeOfKey<Payloads, Action> | (ValueTypeOfKey<Payloads, Action> | Sentinel)[]
> {
  return source =>
    source.pipe(
      map(x => {
        let res:
          | ValueTypeOfKey<Payloads, Action>
          | Sentinel
          | (ValueTypeOfKey<Payloads, Action> | Sentinel)[]

        if (_.isArray(action)) {
          res = action.reduce((acc, action) => {
            const res = selectOrSentinel(action, x)
            const a = [...acc, res as typeof res]
            return a
          }, [] as (ValueTypeOfKey<Payloads, Action> | Sentinel)[])
          if (res.every(isSentinel)) {
            res = SENTINEL
          }
        } else {
          res = action in x ? (x[action] as ValueTypeOfKey<Payloads, Action>) : SENTINEL
        }
        return res
      }),
      filter(noSentinel),
    )
}

export function setLoadingFor<Payloads extends { Loading?: boolean }>(
  control$: Subject<Partial<Payloads>>,
): <T>(state: boolean) => MonoTypeOperatorFunction<T> {
  return state => tap(() => control$.next({ Loading: state } as Partial<Payloads>))
}

export function setLoadingForId<
  Payloads extends { Loading?: boolean | { id: string; value: boolean } },
>(
  control$: Subject<Partial<Payloads>>,
): <T>(id: string, state: boolean) => MonoTypeOperatorFunction<T> {
  return (id, value) => tap(() => control$.next({ Loading: { id, value } } as Partial<Payloads>))
}
