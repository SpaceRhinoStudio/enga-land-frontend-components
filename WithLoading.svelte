<script lang="ts">
  import _ from 'lodash'
  import { fly } from 'svelte/transition'
  import { isSentinel } from './contexts/empty-sentinel'
  import LoadingSpinner from './LoadingSpinner.svelte'
  import { tick } from 'svelte'
  import { flip, tsFix } from './helpers/svelte-animation-fix'

  export let data: unknown
  export let passSentinel = false
  export let predicate: (data: unknown) => boolean = e =>
    _.castArray(e).every(e => !_.isUndefined(e) && (!passSentinel ? !isSentinel(e) : true))
  export let className: {
    [key in 'container' | 'wrapper' | 'spinner' | 'spinnerWrapper']?: string
  } = {}

  const before = $$slots.before ? ['before'] : []
  const after = $$slots.after ? ['after'] : []

  let children = [...before, predicate(data) ? 'data' : 'loading', ...after]

  const updateChildren = _.throttle(
    (isDataValid: boolean) => {
      if (isDataValid) {
        if (children.includes('loading')) {
          children = [...before, 'data', 'loading', ...after]
          tick().then(() => {
            children = [...before, 'data', ...after]
          })
        }
      } else {
        if (children.includes('data')) {
          children = [...before, 'loading', ...after]
        }
      }
    },
    500,
    { leading: true, trailing: true },
  )

  $: updateChildren(predicate(data))
</script>

<div class="flex gap-1 items-center {className.container}">
  {#each children as key (key)}
    <div
      in:tsFix|local={[fly, { x: -25 }]}
      out:tsFix|local={[fly, { x: -25 }]}
      animate:flip
      class={className.wrapper ?? ''}>
      {#if key === 'before'}
        <slot name="before" />
      {/if}
      {#if key === 'loading'}
        <div class={className.spinnerWrapper ?? ''}>
          <LoadingSpinner className={className.spinner ?? ''} />
        </div>
      {/if}
      {#if key === 'data'}
        <slot name="data" {data} />
      {/if}
      {#if key === 'after'}
        <slot name="after" />
      {/if}
    </div>
  {/each}
</div>
