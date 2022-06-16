<script lang="ts">
  import SvgIcon from './SVGIcon.svelte'
  import ScrollTopIcon from './assets/icons/vuesax-linear-arrow-up-3.svg'
  import _ from 'lodash'
  import { fade } from 'svelte/transition'
  import { useWobble } from './helpers/wobble-svelte'
  import { resize_observer } from './actions/resize-observer'
  import { fixed } from './actions/fixed'
  import { backdrop } from './actions/backdrop'

  export let className: {
    [key in 'hint' | 'button']?: string
  } = {}

  export let hideThreshold: number = 200
  export let hintDownscaleFactor: { start?: number; end?: number } = {}
  $: {
    if (_.isUndefined(hintDownscaleFactor.start)) {
      hintDownscaleFactor = { ...hintDownscaleFactor, start: 4 }
    }
    if (_.isUndefined(hintDownscaleFactor.end)) {
      hintDownscaleFactor = { ...hintDownscaleFactor, end: 4 }
    }
  }
  let scrollY: number
  let innerHeight: number
  let scrollHeight: number = 0
  const [scrollTop, setScrollTop] = useWobble({ damping: 1000, stiffness: 5, mass: 0.1 })
  $: setScrollTop(scrollY ?? 0)

  export let floatingHeader: boolean
</script>

<svelte:body use:resize_observer on:resize={() => (scrollHeight = document.body.scrollHeight)} />
<svelte:window bind:scrollY bind:innerHeight />

<div
  use:backdrop
  class="fixed z-[25] {floatingHeader
    ? 'top-0'
    : 'top-24 md:top-28'} h-screen left-0 right-0 !pointer-events-none">
  <div class="relative h-full w-full">
    <!-- topHint -->
    <div
      data-name="top-hint"
      class="will-change-[opacity] absolute z-[25] -top-px left-0 right-0 bg-gradient-to-b to-transparent select-none -translate-y-px {className?.hint ??
        'from-primary-990'}"
      style="height: {innerHeight / (hintDownscaleFactor.start ?? 1)}px; opacity: {Math.min(
        $scrollTop,
        hideThreshold,
      ) / hideThreshold};" />

    <!-- bottomHint -->
    <div
      data-name="bottom-hint"
      class="will-change-[opacity] absolute z-[25] -bottom-px left-0 right-0 bg-gradient-to-t to-transparent select-none {className?.hint ??
        'from-primary-990'}"
      style="height: {innerHeight / (hintDownscaleFactor.end ?? 1)}px; opacity: {Math.min(
        scrollHeight - ($scrollTop + innerHeight),
        hideThreshold,
      ) / hideThreshold}" />
  </div>
</div>

<!-- goToTopButton -->
{#if $scrollTop > hideThreshold * 2.5}
  <div use:fixed class="fixed z-[26] right-4 bottom-4">
    <div
      transition:fade
      class="bg-primary-900 rounded-full h-10 w-10 shadow-lg shadow-primary-990 cursor-pointer flex justify-center items-center transition-opacity {className.button}"
      on:click={() => window?.scroll({ behavior: 'smooth', top: 0 })}>
      <SvgIcon Icon={ScrollTopIcon} width="1.5rem" height="1.5rem" />
    </div>
  </div>
{/if}
