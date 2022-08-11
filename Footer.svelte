<!--
  @component
  footer component
  @slot `metadata` - small metadata that is shown on the right of the first row
  @slot `foot` - small content that is shown on the right of the copyright label in the bottom row
 -->
<script lang="ts">
  import SvgIcon from './SVGIcon.svelte'
  import Logo from './assets/EngalandLogo.svg'
  import Link from './Link.svelte'
  import { __$ } from './locales'
  import { routeConfig, Routes } from './configs/routes'
  import cn from 'classnames'
  import { screen$ } from './helpers/media-queries'

  export let routes: Routes[]
  export let clientHeight: number
  export let style = ''
  /** @default false */
  export let small = false

  $: routeConfigs = routes.map(x => routeConfig[x])
  const socials = [Routes.telegram, Routes.twitter, Routes.discord, Routes.reddit].map(
    x => routeConfig[x],
  )
</script>

<footer
  bind:clientHeight
  class="absolute bottom-0 bg-primary-800 !max-w-none w-screen left-1/2 -translate-x-1/2 shadow-float flex justify-center transition-transform duration-500"
  {style}>
  <div
    class={cn(
      small
        ? 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.lg))]'
        : 'max-w-[min(calc(100%-theme(spacing.10)),theme(screens.2xl))]',
      'w-screen relative',
    )}>
    <div class="container flex flex-col py-10 md:py-8 gap-12">
      <nav
        class="gap-12 md:gap-8 flex flex-col sm:items-center md:flex-row justify-between px-3 md:px-0">
        <div class="flex justify-between sm:w-full sm:max-w-xl md:w-fit">
          <Link
            href={routeConfig[Routes.landing].href}
            className={{ element: 'md:px-8 #-hue-rotate-[140deg] #opacity-75' }}>
            <SvgIcon
              Icon={Logo}
              width={'6.8rem'}
              height={'3.1rem'}
              dontFill
              className="#sepia #brightness-50" />
          </Link>
          {#if $screen$.isMobile}
            <slot name="metadata" />
          {/if}
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 max-w-md md:max-w-none pl-6 md:pl-0 gap-x-12 gap-y-6 sm:gap-y-10 md:flex md:flex-wrap md:gap-x-8 md:gap-y-4 md:grow md:items-center sm:text-center">
          {#each routeConfigs as x}
            <div class="">
              <Link
                href={x.href}
                disabled={x.disabled}
                className={{
                  element: 'text-lg text-text-secondary',
                }}>
                {$__$?.nav[x.id]}
              </Link>
            </div>
          {/each}
        </div>
        {#if !$screen$.isMobile}
          <slot name="metadata" />
        {/if}
      </nav>
      <div class="flex items-center justify-between md:gap-8 gap-12 md:flex-row flex-col-reverse">
        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
          <p class="text-center text-text-secondary flex gap-3">
            <span> 2022 </span>
            <span class="text-white">Space Rhino Studio</span>
          </p>
          <slot name="foot" />
        </div>
        <div>
          <div class="flex items-center justify-between flex-wrap md:gap-5 gap-8">
            {#each socials as x}
              <div>
                <Link
                  href={x.href}
                  disabled={x.disabled}
                  className={{ element: 'text-text-secondary' }}>
                  <SvgIcon
                    Icon={x.icon}
                    width={'1.5rem'}
                    height={'1.5rem'}
                    className={x.disabled ? 'text-opacity-30' : ''} />
                </Link>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
