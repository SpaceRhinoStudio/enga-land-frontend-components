<script context="module" lang="ts">
  export const intro = true
  export const backdropStyle = Symbol()
  export type BackdropStyleContext = {
    blur: Readable<number>
  }
</script>

<script lang="ts">
  import './globals.css'
  import MobileVhFix from './helpers/mobile-vh-fix.svelte'
  import MobileHoverFix from './helpers/mobile-hover-fix.svelte'
  import MainLoadingOverlay from './MainLoadingOverlay.svelte'
  import IsNavigating from './IsNavigating.svelte'
  import { portalMap, create_portal_root } from './actions/portal'
  import _ from 'lodash'
  import { onMount, setContext } from 'svelte'
  import Footer from './Footer.svelte'
  import { useWobble } from './helpers/wobble-svelte'
  import EngaLogo from './assets/favicon.png'
  import cn from 'classnames'
  import HeaderLayout from './HeaderLayout.svelte'
  import { Routes } from './configs/routes'
  import BodyScrollHint from './BodyScrollHint.svelte'
  import { create_fixed_root } from './actions/fixed'
  import { create_backdrop_root } from './actions/backdrop'
  import { Readable } from 'svelte/store'

  let isLoading: boolean

  const blurMultiplier = 20

  const [blur, setBlur] = useWobble({
    fromValue: blurMultiplier,
    stiffness: 10,
    damping: 1000,
    mass: 0.2,
  })
  $: setBlur($portalMap.some(x => x.index !== null) || isLoading ? blurMultiplier : 0)

  setContext<BackdropStyleContext>(backdropStyle, {
    blur,
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
</script>

<svelte:head>
  <link rel="shortcut icon" href={EngaLogo} />
</svelte:head>

<MobileHoverFix />
<MobileVhFix />
<MainLoadingOverlay />

<IsNavigating bind:isLoading />
{#if isReady}
  <div
    id="app"
    class="w-screen relative z-0"
    style={$blur === 0 ? '' : `filter: blur(${$blur}px);`}>
    <main
      style="padding-bottom: calc({footerHeight}px + 1.25rem);"
      class={cn(
        'min-h-[calc(100vh-theme(spacing.24))] md:min-h-[calc(100vh-theme(spacing.28))]',
        !floatingHeader && 'mt-24 md:mt-28',
        small
          ? 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.lg))]'
          : 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.xl))]',
        'relative z-0 w-screen children:max-w-full mx-auto py-5 grow flex flex-col overflow-y-clip',
      )}>
      <HeaderLayout
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
      <BodyScrollHint {hintDownscaleFactor} />
    </main>
  </div>
  <div class="fixed inset-0 pointer-events-none z-0">
    <div
      data-name="backdrop-root"
      use:create_backdrop_root
      class="children:pointer-events-auto absolute z-0 inset-0" />
    <div
      data-name="fixed-root"
      use:create_fixed_root
      class="children:pointer-events-auto absolute z-0 inset-0"
      style={$blur === 0 ? '' : `filter: blur(${$blur}px);`} />
  </div>
{/if}

<div id="portal_root" use:create_portal_root />
