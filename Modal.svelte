<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { changePortalVisibility, portal, portalMap } from './actions/portal'
  import cn from 'classnames'
  import { useWobble } from './helpers/wobble-svelte'

  export let isOpen = false
  export let acceptExit = true
  export const toggle = () => {
    isOpen = !isOpen
  }
  export let animateWidth = false
  export let className: { [key in 'bg']?: string } = {}
  export let neverFullWidth = false

  const dispatch = createEventDispatcher<{ requestExit: true }>()
  function dismiss() {
    dispatch('requestExit', true)
    if (acceptExit) {
      isOpen = false
    }
  }

  let node: HTMLElement
  let index: number | null = null

  const [shouldBlur, setShouldBlur] = useWobble({})
  $: node && setShouldBlur($portalMap.some(x => (x.index ?? -1) > (index ?? -1)) ? 1 : 0)

  $: $portalMap.some(x => x.index !== null)
    ? (document.body.style.overflowY = 'hidden')
    : (document.body.style.overflowY = 'auto')

  $: index = changePortalVisibility(node, isOpen)
</script>

<div use:portal bind:this={node}>
  {#if isOpen}
    <div
      transition:fade
      tabindex="0"
      style="z-index: {(index ?? -100) + 50}; {$shouldBlur === 0
        ? ''
        : `filter: blur(${$shouldBlur * 20}px); `}"
      class={cn(
        'overscroll-none touch-none',
        'overscroll-contain-children',
        'fixed inset-0',
        'bg-black bg-opacity-40',
        'overflow-hidden',
        className.bg,
      )}
      on:keydown={e => e.key === 'Escape' && dismiss()}
      on:click|self={dismiss}>
      {#if isOpen}
        <div
          on:keydown={e => e.key === 'Escape' && dismiss()}
          on:click|self={dismiss}
          transition:fly={{ ...(animateWidth ? { x: -500 } : { y: 500 }), duration: 500 }}
          class={cn(
            neverFullWidth ? 'w-max' : 'w-full',
            'h-full flex flex-col items-center justify-end sm:justify-center',
          )}>
          <slot {isOpen} />
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss">
  .overscroll-contain-children :global(*) {
    overscroll-behavior: contain;
  }
</style>
