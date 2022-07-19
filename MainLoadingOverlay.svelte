<script context="module" lang="ts">
  export const intro = true
</script>

<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { isSafari$ } from './contexts/is-firefox'
  import { shouldHideOverflowController$ } from './contexts/should-hide-overflow'
  import LoadingSpinner from './LoadingSpinner.svelte'
  import { isPageLoading$ } from './observables/is-page-loading'

  isPageLoading$.subscribe(x =>
    x
      ? shouldHideOverflowController$.next({ Hide: true })
      : shouldHideOverflowController$.next({ Hide: false }),
  )

  let isReady = false
  onMount(() => {
    isReady = true
  })
</script>

{#if $isPageLoading$ || !isReady}
  <div
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 300 }}
    id="preloading_spinner"
    class="{$isSafari$
      ? 'z-index-bug-fix'
      : ''} flex justify-center items-center fixed inset-0 z-[1000] bg-primary-990">
    <LoadingSpinner --big="1" />
  </div>
{/if}

<style>
  .z-index-bug-fix {
    transform: translate3d(0, 0, 25rem);
  }
</style>
