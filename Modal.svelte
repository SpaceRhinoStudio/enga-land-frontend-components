<!--
  @component
  wrapper component for every modal used in the application  
  this component automatically handles multiple modals on top of each other and blurs all modals that aren't on top  
  content is aligned to center for `sm` screen and to bottom for smaller screens
  @slot `default` - the main content of the modal
  @prop `isOpen`
 -->
<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { changePortalVisibility, portal, portalMap } from './actions/portal'
  import cn from 'classnames'
  import { useWobble } from './helpers/wobble-svelte'
  import { shouldHideOverflowController$ } from './contexts/should-hide-overflow'

  /** @lends */
  export let isOpen = false
  /**
   * @description accept exit when clicking outside the modal
   * @default false
   */
  export let acceptExit = false
  /** @readonly */
  export const toggle = () => {
    isOpen = !isOpen
  }
  /**
   * @description wether the modal is animated from left or down (default)
   * @default false
   */
  export let animateWidth = false
  export let className: { [key in 'bg']?: string } = {}
  /**
   * @description whether or not the wrapper should have the full screen width
   * @default false
   */
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

  $: index = changePortalVisibility(node, isOpen)

  let notYetShown = !isOpen
  $: isOpen && (notYetShown = false)
  $: isOpen
    ? shouldHideOverflowController$.next({ Hide: true })
    : !notYetShown && shouldHideOverflowController$.next({ Hide: false })

  onDestroy(() => isOpen && !notYetShown && shouldHideOverflowController$.next({ Hide: false }))
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
