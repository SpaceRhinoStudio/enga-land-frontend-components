<!--
  @component
  mobile sidebar component
  @slot `foot` - the content to display at the very bottom of the sidebar
 -->
<script lang="ts">
  import { config } from './configs'
  import { Routes } from './configs/routes'
  import Modal from './Modal.svelte'
  import CloseIcon from './assets/icons/close-sidebar.svg'
  import SvgIcon from './SVGIcon.svelte'
  import { goto } from '$app/navigation'
  import Logo from './assets/EngalandLogo.svg'
  import WithScrollHint from './WithScrollHint.svelte'
  import SidebarNavItem from './SidebarNavItem.svelte'

  export let routes: Routes[]
  /** @lends */
  export let isOpen = false

  $: routeConfigs = routes.map(x => config.routeConfig[x])
</script>

<Modal animateWidth neverFullWidth className={{ bg: '!items-start' }} acceptExit bind:isOpen>
  <nav
    class="flex flex-col h-full bg-primary-990 top-0 left-0 z-40 overflow-y-auto max-w-xs w-screen px-6">
    <div class="space-y-7 sticky top-0 z-10">
      <div class="flex justify-between items-center pt-8">
        <div on:click={() => goto('/')}>
          <SvgIcon Icon={Logo} width={'6.8rem'} height={'3.1rem'} dontFill />
        </div>
        <div on:click={() => (isOpen = false)}>
          <SvgIcon Icon={CloseIcon} width={'1.375rem'} height={'1.375rem'} />
        </div>
      </div>
      <hr class="h-px opacity-25 -mx-6 bg-primary-600" />
    </div>
    <WithScrollHint
      className={{
        container: 'grow -mx-6 pl-6',
        wrapper: 'flex flex-col justify-between -mx-6 pl-6 pt-5',
      }}>
      <ul class="grow-0">
        {#each routeConfigs as nav}
          <SidebarNavItem item={nav} onRouteChange={() => (isOpen = false)} />
        {/each}
      </ul>
    </WithScrollHint>
    <div class="flex items-end sticky bottom-0 -mx-6 px-6 py-4">
      <slot name="foot" />
    </div>
  </nav>
</Modal>
