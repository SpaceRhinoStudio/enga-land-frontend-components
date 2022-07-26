<!--
  @component
  this component handles showing some inline data with loading job considerations  
  content are smoothly animated upon going into loading state and back to normal state
  @slot `data` - the content to display as data
  @slot `before` - the content to display before the data/loading content
  @slot `after` - the content to display after the data/loading content
 -->
<script lang="ts">
  import _ from 'lodash'
  import { fly } from 'svelte/transition'
  import { isSentinel } from './contexts/empty-sentinel'
  import LoadingSpinner from './LoadingSpinner.svelte'
  import { tick } from 'svelte'
  import { flip, tsFix } from './helpers/svelte-animation-fix'

  export let data: unknown
  /**
   * @description whether or not Sentinel should be considered as falsy in the default predicate function
   * @default false
   */
  export let passSentinel = false
  /**
   * @description a predicate function that indicates if data is solid or in loading state
   * @returns {boolean} true for valid data, false for loading
   * @default "if the data (or in case of being a tuple, any member of the tuple) is undefined or Sentinel (in case passSentinel is set to false) then it is considered as loading"
   */
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
