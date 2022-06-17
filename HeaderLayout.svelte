<script lang="ts">
  import { routeConfig, Routes } from './configs/routes'
  import Link from './Link.svelte'
  import { __$ } from './locales'
  import SvgIcon from './SVGIcon.svelte'
  import SidebarToggleIcon from './assets/icons/vuesax-linear-category-2.svg'
  import Logo from './assets/EngalandLogo.svg'
  import ArrowDown from './assets/icons/arrow-down.svg'
  import DropDown from './DropDown.svelte'
  import HeaderSubNav from './HeaderSubNav.svelte'
  import Sidebar from './Sidebar.svelte'
  import { config } from './configs'
  import { routeMatch } from './helpers/route-match'
  import { page } from '$app/stores'
  import _ from 'lodash'
  import cn from 'classnames'
  import { backdrop } from './actions/backdrop'
  import { getContext } from 'svelte'
  import { backdropStyle, BackdropStyleContext } from './MainLayout.svelte'

  let isPreview = false
  $: isPreview =
    _.values(config.routeConfig).find(x => routeMatch(x.href, $page.url.pathname).exact)?.preview ??
    false
  export let routes: Routes[]
  $: routeConfigs = routes.map(x => routeConfig[x])
  export let collapsedRoutes: Routes[]
  export let sidebarRoutes: Routes[]

  let isOpen = false

  export let small = false
  export let className: {
    [key in 'container' | 'wrapper' | 'navDropContainer' | 'navDropItem']?: string | undefined
  } = {}
  const blur = getContext<BackdropStyleContext>(backdropStyle)?.blur
  export let blurContainer = false
</script>

<header
  use:backdrop
  style={$blur === 0 ? '' : blurContainer ? `filter: blur(${$blur}px);` : ''}
  class={cn(
    'h-24 md:h-28 fixed top-0 left-0 right-0 z-40 flex items-center',
    className.container ?? 'bg-primary-800 shadow-float',
  )}>
  <nav
    style={$blur === 0 ? '' : blurContainer ? '' : `filter: blur(${$blur}px);`}
    class={cn(
      small
        ? 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.lg))]'
        : 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.2xl))]',
      'w-screen text-text-primary flex items-center justify-between mx-auto',
      className.wrapper,
    )}>
    <div class="md:hidden cursor-pointer" on:click={() => (isOpen = true)}>
      <SvgIcon Icon={SidebarToggleIcon} width={'1.75rem'} height={'1.75rem'} />
    </div>
    <Link
      href="/"
      className={{
        element: 'absolute md:relative left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0',
      }}>
      <div class="relative">
        <SvgIcon
          Icon={Logo}
          width={'6.8rem'}
          height={'3.1rem'}
          dontFill
          className={isPreview ? '-translate-y-3' : ''} />
        {#if isPreview}
          <div
            class="absolute top-full -translate-y-2 md:-translate-y-1 -left-1/2 md:left-1/2 -right-1/2 md:-translate-x-1/2 animate-pulse">
            <div
              class="md:bg-red-700 rounded-lg p-1 md:text-xs text-center text-red-700 font-bold md:text-text-primary md:font-normal">
              Preview Data
            </div>
          </div>
        {/if}
      </div>
    </Link>
    <ul class="grow children:h-full {small ? 'ml-6' : 'ml-12'} h-10 hidden md:flex children:px-3">
      {#each routeConfigs as nav}
        <DropDown
          usePortal
          let:isDropped
          className={{
            container: 'flex items-center',
            dropContainer: className.navDropContainer ?? '',
          }}>
          <Link
            href={nav.href}
            disabled={nav.disabled}
            className={{ element: 'flex items-center' }}>
            {$__$?.nav[nav.id]}
            {#if nav.subRoutes?.length}
              <SvgIcon
                Icon={ArrowDown}
                width={'1.1rem'}
                height={'1.1rem'}
                className="ml-2 transition-all {isDropped
                  ? 'rotate-180 text-text-primary'
                  : ''} translate-y-0.5" />
            {/if}
          </Link>
          <div slot="drop">
            {#if nav.subRoutes}
              <HeaderSubNav
                className={{ item: className.navDropItem ?? '' }}
                routes={nav.subRoutes} />
            {/if}
          </div>
        </DropDown>
      {/each}
      <DropDown
        usePortal
        let:isDropped
        className={{
          container: 'relative transition-all text-text-primary px-2 cursor-pointer h-full',
          dropContainer: className.navDropContainer ?? '',
        }}>
        <span
          class={`
            flex
            h-full
            items-center
            gap-0.5
            children:rounded-full
            children:h-2
            children:w-2
            children:border-2
            children:border-text-primary
            children:transition-all
            children:duration-300
            ${isDropped ? 'children:bg-text-primary' : ''}
        `}
          on:click={e => e.stopPropagation()}>
          <div />
          <div class="delay-100" />
          <div class="delay-200" />
        </span>
        <HeaderSubNav
          className={{ item: className.navDropItem ?? '' }}
          slot="drop"
          routes={collapsedRoutes} />
      </DropDown>
    </ul>
    <div class="flex gap-4 items-center">
      <slot name="right" />
    </div>
  </nav>
</header>

<Sidebar routes={sidebarRoutes} bind:isOpen>
  <slot name="sidebar-foot" slot="foot" />
</Sidebar>
