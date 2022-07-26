<!--
  @component
  this component wraps potentially scrollable content and shows the scrolling hints or buttons (depending on preferences) for navigation  
  the container of this component is expected to have fixed width and or height depending on the direction of the scroll (horizontal or vertical)
  @emits `next` - when navigation buttons scrolls toward end of content
  @emits `prev` - when navigation buttons scrolls toward start of content
  @emits `top` - when navigation buttons scrolls to the top of content
  @
  @slot `default` - the content to display in the wrapper
 -->
<script lang="ts">
  import SvgIcon from './SVGIcon.svelte'
  import ScrollTopIcon from './assets/icons/vuesax-linear-arrow-up-3.svg'
  import _ from 'lodash'
  import { resize_observer } from './actions/resize-observer'
  import type { Bounds } from './types'
  import { canHover$ } from './helpers/media-queries'
  import { fade } from 'svelte/transition'
  import cn from 'classnames'
  import { createEventDispatcher } from 'svelte'

  export let className: {
    [key in 'wrapper' | 'innerWrapper' | 'container' | 'hint' | 'button']?: string
  } = {}

  /**
   * @description whether or not to have a button that scrolls to top (only if scroll direction is vertical)
   * @default false
   */
  export let goToTopButton: boolean = false
  /**
   * @description threshold to hide the hints (in pixels)
   * @default 40
   */
  export let hideThreshold: number = 40
  /**
   * @description object value can be partial
   */
  export let hintDownscaleFactor: { start?: number; end?: number } = {}

  /**
   * @description whether or not to have buttons for horizontal scrolling
   * @default false
   */
  export let horizontalScrollButtons: boolean = false
  /**
   * @description the direction in which the content should be scrolled
   * @default 'both'
   */
  export let mode: 'vertical' | 'horizontal' | 'both' = 'both'

  /** @readonly */
  export let scroll = { top: 0, left: 0 }

  /**
   * @description whether or not the scroll snapping should be centered
   * @default false
   */
  export let snapCenter = false
  /**
   * @description whether or not to show scroll helper buttons if the device is touch (by default they only appear on non-touch devices)
   * @default false
   */
  export let alwaysShowButtons = false

  $: {
    if (_.isUndefined(hintDownscaleFactor.start)) {
      hintDownscaleFactor = { ...hintDownscaleFactor, start: 4 }
    }
    if (_.isUndefined(hintDownscaleFactor.end)) {
      hintDownscaleFactor = { ...hintDownscaleFactor, end: 4 }
    }
  }

  let outerRef: HTMLElement | undefined

  let outerBounds: Bounds = {
    left: 0,
    top: 0,
    height: 0,
    width: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    paddingX: 0,
    paddingY: 0,
  }

  let innerBounds: Bounds = {
    left: 0,
    top: 0,
    height: 0,
    width: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    paddingX: 0,
    paddingY: 0,
  }

  const dispatch = createEventDispatcher<{ change: 'next' | 'prev' | 'top' }>()
</script>

<div class="relative z-0 overflow-hidden {className.container}">
  <div
    class={cn(
      outerBounds.height < innerBounds.height && 'overscroll-contain',
      'max-h-full',
      horizontalScrollButtons &&
        ($canHover$ || alwaysShowButtons) &&
        outerBounds.width < outerBounds.scrollWidth &&
        'snap-x snap-mandatory snap-always scrollbar-hide',
      mode === 'vertical' && 'overflow-x-hidden',
      mode === 'horizontal' && 'overflow-y-hidden',
      mode === 'both' && 'overflow-auto',
      className.wrapper,
    )}
    use:resize_observer
    on:resize={e => (outerBounds = e.detail)}
    bind:this={outerRef}
    data-name="outer"
    on:scroll={e => {
      scroll = {
        top: outerRef?.scrollTop ?? 0,
        left: outerRef?.scrollLeft ?? 0,
      }
    }}>
    <div
      use:resize_observer
      on:resize={e => (innerBounds = e.detail)}
      data-name="inner"
      class={cn(
        'w-fit',
        'relative z-0',
        className?.innerWrapper,
        horizontalScrollButtons &&
          ($canHover$ || alwaysShowButtons) &&
          outerBounds.width < outerBounds.scrollWidth &&
          'children:scroll-m-10',
        snapCenter ? 'children:snap-center mx-[50%]' : 'children:snap-start',
      )}>
      <slot />
    </div>
  </div>

  <!-- topHint -->
  {#if mode !== 'horizontal'}
    <div
      data-name="top-hint"
      class="fix-z-index will-change-[opacity] absolute -top-px left-0 right-0 bg-gradient-to-b to-transparent pointer-events-none select-none -translate-y-px {className?.hint ??
        'from-primary-990'}"
      style="height: {(outerBounds.height + outerBounds.paddingY) /
        (hintDownscaleFactor.start ?? 1)}px; opacity: {Math.min(scroll.top, hideThreshold) /
        hideThreshold};" />
  {/if}

  <!-- bottomHint -->
  {#if mode !== 'horizontal'}
    <div
      data-name="bottom-hint"
      class="fix-z-index will-change-[opacity] absolute -bottom-px left-0 right-0 bg-gradient-to-t to-transparent pointer-events-none select-none {className?.hint ??
        'from-primary-990'}"
      style="height: {(outerBounds.height + outerBounds.paddingY) /
        (hintDownscaleFactor.end ?? 1)}px; opacity: {Math.min(
        innerBounds.height - (scroll.top + outerBounds.height),
        hideThreshold,
      ) / hideThreshold}" />
  {/if}

  <!-- leftHint -->
  {#if mode !== 'vertical'}
    <div
      data-name="left-hint"
      class="fix-z-index will-change-[opacity] absolute -left-px top-0 bottom-0 bg-gradient-to-r to-transparent pointer-events-none select-none {className?.hint ??
        'from-primary-990'}"
      style="width: {(outerBounds.width + outerBounds.paddingX) /
        (hintDownscaleFactor.start ?? 1)}px; opacity: {Math.min(scroll.left, hideThreshold) /
        hideThreshold};" />
  {/if}

  <!-- rightHint -->
  {#if mode !== 'vertical'}
    <div
      data-name="right-hint"
      class="fix-z-index will-change-[opacity] absolute -right-px top-0 bottom-0 bg-gradient-to-l to-transparent pointer-events-none select-none {className?.hint ??
        'from-primary-990'}"
      style="width: {(outerBounds.width + outerBounds.paddingX) /
        (hintDownscaleFactor.end ?? 1)}px; opacity: {Math.min(
        innerBounds.scrollWidth - (scroll.left + outerBounds.width),
        hideThreshold,
      ) / hideThreshold};" />
  {/if}

  {#if goToTopButton}
    <!-- goToTopButton -->
    {#if scroll.top > hideThreshold * 2.5}
      <div
        transition:fade
        class="bg-primary-900 rounded-full h-10 w-10 absolute right-4 bottom-4 shadow-lg shadow-primary-990 z-[11] cursor-pointer flex justify-center items-center transition-opacity {className.button}"
        on:click={() => {
          outerRef?.scroll({ behavior: 'smooth', top: 0 })
          dispatch('change', 'top')
        }}>
        <SvgIcon Icon={ScrollTopIcon} width="1.5rem" height="1.5rem" />
      </div>
    {/if}
  {/if}
  {#if horizontalScrollButtons && ($canHover$ || alwaysShowButtons) && outerBounds.width < outerBounds.scrollWidth}
    <!-- scrollRightButton -->
    <div
      class="fix-z-index bg-primary-990 rounded-full h-8 w-8 absolute right-1.5 top-1/2 -translate-y-1/2 z-[11] cursor-pointer flex justify-center items-center transition-opacity"
      style="opacity: {Math.min(
        innerBounds.scrollWidth - (scroll.left + outerBounds.width),
        hideThreshold,
      ) / hideThreshold};"
      on:click={() => {
        outerRef?.scroll({
          behavior: 'smooth',
          left: scroll.left + outerBounds.width / 2,
        })
        dispatch('change', 'next')
      }}>
      <SvgIcon Icon={ScrollTopIcon} width="1.3rem" height="1.3rem" className="rotate-90" />
    </div>

    <!-- scrollLeftButton -->
    <div
      class="fix-z-index bg-primary-990 rounded-full h-8 w-8 absolute left-1.5 top-1/2 -translate-y-1/2 z-[11] cursor-pointer flex justify-center items-center transition-opacity"
      style="opacity: {Math.min(scroll.left, hideThreshold) / hideThreshold};"
      on:click={() => {
        outerRef?.scroll({
          behavior: 'smooth',
          left: scroll.left - outerBounds.width / 2,
        })
        dispatch('change', 'prev')
      }}>
      <SvgIcon Icon={ScrollTopIcon} width="1.3rem" height="1.3rem" className="-rotate-90" />
    </div>
  {/if}
</div>

<style>
  .fix-z-index {
    transform: translateZ(0.5rem);
  }
</style>
