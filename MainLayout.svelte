<script context="module" lang="ts">
  export const intro = true
</script>

<script lang="ts">
  import './globals.css'
  import MobileVhFix from './helpers/mobile-vh-fix.svelte'
  import MobileHoverFix from './helpers/mobile-hover-fix.svelte'
  import MainLoadingOverlay from './MainLoadingOverlay.svelte'
  import IsNavigating from './IsNavigating.svelte'
  import { type TransitionConfig } from 'svelte/transition'
  import { portalMap, create_portal_root } from './actions/portal'
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import Footer from './Footer.svelte'
  import WithScrollHint from './WithScrollHint.svelte'
  import { useWobble } from './helpers/wobble-svelte'
  import EngaLogo from './assets/favicon.png'
  import cn from 'classnames'
  import HeaderLayout from './HeaderLayout.svelte'
  import { Routes } from './configs/routes'

  const [shouldBlur, setShouldBlur] = useWobble({})
  $: setShouldBlur($portalMap.every(x => x.index === null) || $portalMap.length === 0 ? 0 : 1)

  function fadeAndBlur(node: HTMLElement, { delay = 0, duration = 500 }): TransitionConfig {
    return {
      delay,
      duration,
      css: t => `filter: blur(${(1 - t) * 20}px); opacity: ${t};`,
    }
  }

  let isReady = false
  onMount(() => (isReady = true))

  let footerHeight: number

  export let footerRoutes: Routes[]
  export let headerRoutes: Routes[]
  export let headerCollapsedRoutes: Routes[]
  export let sidebarRoutes: Routes[]

  export let small = false
  export let className: { [key in 'headerContainer' | 'headerWrapper']?: string } = {}
</script>

<svelte:head>
  <link rel="shortcut icon" href={EngaLogo} />
</svelte:head>

<MobileHoverFix />
<MobileVhFix />
<MainLoadingOverlay />

<div id="portal_root" use:create_portal_root />

{#if isReady}
  <div in:fadeAndBlur={{ duration: 1200 }}>
    <IsNavigating>
      <div
        slot="hide"
        id="app"
        transition:fadeAndBlur
        style={$shouldBlur === 0 ? '' : `filter: blur(${$shouldBlur * 20}px);`}
        class="w-screen relative">
        <HeaderLayout
          className={{
            container: className.headerContainer,
            wrapper: className.headerWrapper,
          }}
          routes={headerRoutes}
          collapsedRoutes={headerCollapsedRoutes}
          {sidebarRoutes}
          {small}>
          <slot name="header-right" slot="right" />
          <slot name="sidebar-foot" slot="sidebar-foot" />
        </HeaderLayout>

        <WithScrollHint
          goToTopButton
          hintDownscaleFactor={{ start: 25 }}
          mode="vertical"
          className={{
            container:
              'w-full h-[calc(100vh-theme(spacing.24))] md:h-[calc(100vh-theme(spacing.28))] mt-24 md:mt-28',
            innerWrapper:
              'min-h-[calc(100vh-theme(spacing.24))] md:min-h-[calc(100vh-theme(spacing.28))] flex flex-col',
          }}>
          <main
            style="padding-bottom: calc({footerHeight}px + 1.25rem);"
            class={cn(
              small
                ? 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.lg))]'
                : 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.xl))]',
              'relative w-screen children:max-w-full mx-auto py-5 grow flex flex-col',
            )}>
            <slot />
            <Footer routes={footerRoutes} bind:clientHeight={footerHeight} {small}>
              <slot name="footer-foot" slot="foot" />
              <slot name="footer-metadata" slot="metadata" />
            </Footer>
          </main>
        </WithScrollHint>
      </div>
    </IsNavigating>
  </div>
{/if}
