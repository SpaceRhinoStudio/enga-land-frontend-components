<!--
  @component
  a dropdown menu component that works with both hover and click
  @slot `default` - the main content of the component
  @prop `dismiss` function
  @prop `isDropped` boolean
  @
  @slot `drop`
  @prop `dismiss` function
 -->
<script lang="ts">
  import cn from 'classnames'
  import { fade, type FadeParams, slide, type SlideParams } from 'svelte/transition'
  import { portal } from './actions/portal'
  import { resize_observer } from './actions/resize-observer'
  import ClickState from './ClickState.svelte'
  import { isSafari$ } from './contexts/is-firefox'
  import HoverState from './HoverState.svelte'

  /** @default false */
  export let upward: boolean = false
  export let className: { [key in 'container' | 'dropContainer' | 'dropWrapper']?: string } = {}
  /** @default true */
  export let canExpand = true
  /** @default ltr */
  export let dir: 'ltr' | 'rtl' = 'ltr'
  /** @default false */
  export let noSlide = false
  /** @default false */
  export let noHover = false
  /** @default false */
  export let usePortal = false

  let shouldLeave = false
  let hoverState: boolean
  let portalHover: boolean
  let clickState: boolean
  let dismissClick: () => void

  function dismiss() {
    if (!noHover) {
      shouldLeave = true
    }
    dismissClick()
  }

  let pos = { top: 0, left: 0, right: 0, bottom: 0 }
  let container: HTMLDivElement

  const setPos = () => {
    const rect = container?.getBoundingClientRect()
    if (rect) {
      pos = {
        top: rect.top + container.clientHeight,
        bottom: rect.top,
        left: rect.left,
        right: rect.left + container.clientWidth,
      }
    }
  }

  $: {
    if (container) {
      setTimeout(() => {
        setPos()
      }, 1000)
    }
  }

  $: transitionIn = (node: HTMLElement, args: FadeParams | SlideParams) =>
    className.dropContainer?.includes('backdrop') && $isSafari$
      ? fade(node, args)
      : slide(node, args)

  let exclude: HTMLElement

  $: !(hoverState || portalHover) && (shouldLeave = false)
  $: isDropped =
    ((!noHover && (hoverState || portalHover)) || clickState) && !shouldLeave && canExpand
</script>

<svelte:window on:resize={setPos} />

<div
  bind:this={container}
  use:resize_observer={{ noop: !usePortal }}
  on:resize={setPos}
  class="relative flex items-center {className.container ?? ''}">
  <HoverState bind:hoverState>
    <ClickState bind:clickState bind:dismiss={dismissClick} {exclude}>
      <slot {dismiss} {isDropped} />
      <svelte:fragment slot="exclude">
        {#if isDropped}
          <div
            bind:this={exclude}
            use:portal={{ noop: !usePortal }}
            in:transitionIn={noSlide ? { easing: () => 1 } : {}}
            out:slide={noSlide ? { easing: () => 0 } : {}}
            style={usePortal
              ? cn(
                  upward ? `bottom: ${pos.bottom}px` : `top: ${pos.top}px`,
                  ';',
                  dir === 'ltr' ? `left: ${pos.left}px` : `right: ${pos.right}px`,
                  ';',
                )
              : ''}
            class={cn(
              usePortal ? 'fixed z-[99]' : 'absolute z-30',
              upward ? '-translate-y-3' : 'translate-y-3',
              !usePortal &&
                cn(upward ? 'bottom-full' : 'top-full', dir === 'ltr' ? 'left-0' : 'right-0'),
              className.dropContainer,
              'shadow-xl shadow-[#0008] bg-primary-900 rounded-xl',
            )}>
            <HoverState bind:hoverState={portalHover}>
              {#if isDropped}
                <slot name="drop" {dismiss} />
              {/if}
            </HoverState>
          </div>
        {/if}
      </svelte:fragment>
    </ClickState>
  </HoverState>
</div>
