<script context="module" lang="ts">
  export const intro = true
</script>

<script lang="ts">
  import { afterNavigate, beforeNavigate, goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { isPageLoading$ } from './observables/is-page-loading'

  export let isLoading = true
  export let isNavigating = true
  let isReady = false
  let whitelist = { to: null as string | null }

  $: isLoading = isNavigating || !isReady || $isPageLoading$

  beforeNavigate(({ to, cancel }) => {
    if (!whitelist.to && to?.pathname) {
      cancel()
      whitelist.to = to.pathname
      setTimeout(() => {
        goto(whitelist.to ?? '/').then(() => (whitelist.to = null))
      }, 350)
    }
    isNavigating = true
  })

  afterNavigate(() => {
    setTimeout(() => {
      isNavigating = false
    }, 350)
  })
  onMount(() => {
    isReady = true
    setTimeout(() => {
      isNavigating = false
    }, 350)
  })
</script>

{#if isReady}
  {#if isLoading}
    <slot name="show" />
  {/if}

  {#if !isLoading}
    <slot name="hide" />
  {/if}

  <slot name="inform" {isLoading} />

  <slot />
{/if}
