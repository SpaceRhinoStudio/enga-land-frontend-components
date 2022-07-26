<!--
  @component
  toast notification container that reads the toast queue and displays them in the bottom right of the screen  
  toasts can be dragged to sides to be dismissed earlier than their timeout  
  toasts have a slider on bottom that indicates the time that is left for the toast to leave  
  toasts appear and disappear with animations  
  this component is a singleton and is not meant to be rendered more than once
 -->
<script lang="ts" context="module">
  const levelClassNames: { [key in ToastType]: string } = {
    [ToastType.alert]: 'bg-blue-500',
    [ToastType.error]: 'bg-blood',
    [ToastType.info]: 'bg-neutral-700',
    [ToastType.success]: 'bg-secondary-600',
    [ToastType.warning]: 'bg-shiningOrange',
  }
</script>

<script lang="ts">
  import { config } from '../configs'
  import { DetailedToast, flashToast$, ToastType } from '../contexts/flash-toast'
  import _ from 'lodash'
  import { map, scan, Subject, tap, timer } from 'rxjs'
  import ToastInner from './ToastInner.svelte'
  import { fly } from 'svelte/transition'
  import cn from 'classnames'
  import { swipe_to_dismiss } from '../actions/swipe-to-dismiss'
  import { tick } from 'svelte'
  import { flip } from 'svelte/animate'
  import { portal } from '../actions/portal'

  const toastControl$ = new Subject<
    Partial<{
      Show: DetailedToast & {
        id: number
        timeout: number
        level: ToastType
        dismiss?: 'right' | 'left'
      }
      Remove: number
      Dismiss: { id: number; dir: 'left' | 'right' }
    }>
  >()

  const counter = { current: 0 }
  flashToast$
    .pipe(
      map(x => (_.isString(x) ? { message: x } : x)),
      map(x => ({
        ...x,
        id: counter.current,
        timeout:
          x.timeout ??
          (x.message.startsWith('E0x') ? config.Delays.errorFlash : config.Delays.confirm),
        level: x.level ?? ToastType.alert,
      })),
      tap(() => counter.current++),
      tap(x => timer(x.timeout).subscribe(() => toastControl$.next({ Remove: x.id }))),
      map(x => ({ Show: x })),
    )
    .subscribe(x => toastControl$.next(x))

  const toasts$ = toastControl$.pipe(
    scan(
      (acc, x) => {
        if (!_.isUndefined(x.Show)) {
          acc = [x.Show, ...acc]
        }
        if (!_.isUndefined(x.Remove)) {
          acc = acc.filter(toast => toast.id !== x.Remove)
        }
        if (!_.isUndefined(x.Dismiss)) {
          const target = acc.find(toast => toast.id === x.Dismiss!.id)
          if (target) {
            target.dismiss = x.Dismiss.dir
          }
        }
        return acc
      },
      [] as (DetailedToast & {
        id: number
        timeout: number
        level: ToastType
        dismiss?: 'right' | 'left'
      })[],
    ),
  )

  let clientWidth: number
</script>

<div
  use:portal
  class="!pointer-events-none children:pointer-events-auto fixed right-0 bottom-0 left-0 md:left-[calc(100vw-32rem)] sm:left-1/2 px-5 pb-5 flex flex-col items-stretch space-y-2 select-none z-[999]">
  {#each $toasts$ ?? [] as x (x.id)}
    <div
      use:swipe_to_dismiss
      on:swipe_dismiss={e => {
        toastControl$.next({ Dismiss: { id: x.id, dir: e.detail } })
        tick().then(() => toastControl$.next({ Remove: x.id }))
      }}
      bind:clientWidth
      animate:flip={{ duration: 200 }}
      in:fly={{ y: 200 }}
      out:fly={{
        x: x.dismiss ? (x.dismiss === 'left' ? (-1 * clientWidth) / 3 : clientWidth / 3) : 0,
      }}
      class={cn(
        'rounded-xl overflow-hidden w-full md:w-auto',
        levelClassNames[x.level],
        'select-none',
      )}>
      <ToastInner message={x.message} level={x.level} timeout={x.timeout} />
    </div>
  {/each}
</div>
