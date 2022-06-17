<script context="module" lang="ts">
  export const intro = true
  export const backdropStyle = Symbol()
  export type BackdropStyleContext = {
    blur: Readable<number>
    isBlurred: Readable<boolean>
  }
</script>

<script lang="ts">
  import './globals.css'
  import MobileVhFix from './helpers/mobile-vh-fix.svelte'
  import MobileHoverFix from './helpers/mobile-hover-fix.svelte'
  import MainLoadingOverlay from './MainLoadingOverlay.svelte'
  import { portalMap, create_portal_root } from './actions/portal'
  import _ from 'lodash'
  import { onMount, setContext, tick } from 'svelte'
  import Footer from './Footer.svelte'
  import { useWobble } from './helpers/wobble-svelte'
  import EngaLogo from './assets/favicon.png'
  import cn from 'classnames'
  import HeaderLayout from './HeaderLayout.svelte'
  import { Routes } from './configs/routes'
  import BodyScrollHint from './BodyScrollHint.svelte'
  import { create_fixed_root } from './actions/fixed'
  import { create_backdrop_root } from './actions/backdrop'
  import { derived, get, Readable, writable } from 'svelte/store'
  import ToastContainer from './toast/ToastContainer.svelte'
  import NavigationLoadingJob from './helpers/navigation-loading-job.svelte'
  import { isPageLoading$ } from './observables/is-page-loading'
  import { animationFrameF, waitFor, waitForF } from '$lib/helpers/wait-for'
  import { Window$ } from './observables/window'
  import { map } from 'rxjs'
  import { isChrome$ } from './contexts/is-firefox'
  import { page } from '$app/stores'

  const blurMultiplier = 20

  $: shouldBlur = $portalMap.some(x => x.index !== null) || $isPageLoading$
  const blur = writable(blurMultiplier)
  const isBlurred = writable(true)
  $: shouldBlur && isBlurred.set(true)
  $: shouldBlur && $isChrome$ && $page.url.pathname === '/'
    ? tick()
        .then(waitForF(75))
        .then(animationFrameF(10))
        .then(() => shouldBlur && blur.set(blurMultiplier))
    : blur.set(blurMultiplier)
  $: !shouldBlur && waitFor(500).then(() => isBlurred.set(false))
  $: !shouldBlur && blur.set(0)

  setContext<BackdropStyleContext>(backdropStyle, {
    blur,
    isBlurred,
  })

  let isReady = false
  onMount(() => (isReady = true))

  let footerHeight: number

  export let footerRoutes: Routes[]
  export let headerRoutes: Routes[]
  export let headerCollapsedRoutes: Routes[]
  export let sidebarRoutes: Routes[]

  export let small = false
  export let className: {
    [key in
      | 'headerContainer'
      | 'headerWrapper'
      | 'headerNavDropContainer'
      | 'headerNavDropItem']?: string
  } = {}
  export let floatingHeader = false

  export let hintDownscaleFactor: { start?: number; end?: number } = { start: 25 }

  export let headerBlurContainer = false
</script>

<svelte:head>
  <link rel="shortcut icon" href={EngaLogo} />
</svelte:head>

<MobileHoverFix />
<MobileVhFix />
<MainLoadingOverlay />
<ToastContainer />
<NavigationLoadingJob />
<div class="hidden animate-pulse" />

{#if isReady}
  <div
    id="app"
    class="w-screen relative z-0 transition-[filter] duration-500"
    style={$blur === 0 ? '' : `filter: blur(${$blur}px);`}>
    <main
      style="padding-bottom: calc({footerHeight}px + 1.25rem);"
      class={cn(
        'min-h-[calc(var(--h-screen)-theme(spacing.24))] md:min-h-[calc(var(--h-screen)-theme(spacing.28))]',
        !floatingHeader && 'mt-24 md:mt-28',
        small
          ? 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.lg))]'
          : 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.xl))]',
        'relative z-0 w-screen children:max-w-full mx-auto py-5 grow flex flex-col overflow-y-clip',
      )}>
      <HeaderLayout
        blurContainer={headerBlurContainer}
        className={{
          container: className.headerContainer,
          wrapper: className.headerWrapper,
          navDropContainer: className.headerNavDropContainer,
          navDropItem: className.headerNavDropItem,
        }}
        routes={headerRoutes}
        collapsedRoutes={headerCollapsedRoutes}
        {sidebarRoutes}
        {small}>
        <slot name="header-right" slot="right" />
        <slot name="sidebar-foot" slot="sidebar-foot" />
      </HeaderLayout>
      <slot />
      <Footer routes={footerRoutes} bind:clientHeight={footerHeight} {small}>
        <slot name="footer-foot" slot="foot" />
        <slot name="footer-metadata" slot="metadata" />
      </Footer>
      <BodyScrollHint {hintDownscaleFactor} {floatingHeader} />
    </main>
  </div>
{/if}

<div class="fixed inset-0 pointer-events-none z-0">
  <div
    data-name="backdrop-root"
    use:create_backdrop_root
    class="children:pointer-events-auto absolute z-0 inset-0" />
  <div
    data-name="fixed-root"
    use:create_fixed_root
    class="children:pointer-events-auto absolute z-0 inset-0 transition-[filter] duration-500"
    style={$blur === 0 ? '' : `filter: blur(${$blur}px);`} />
</div>
<div id="portal_root" use:create_portal_root />
