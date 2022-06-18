<script context="module" lang="ts">
  export const intro = true
</script>

<script>
  import { delay } from 'rxjs'
  import { onMount } from 'svelte'

  import { fade } from 'svelte/transition'
  import LoadingSpinner from './LoadingSpinner.svelte'
  import { isPageLoading$ } from './observables/is-page-loading'
  import { Window$ } from './observables/window'

  $: $isPageLoading$
    ? Window$.subscribe(win => (win.document.documentElement.style.overflow = 'hidden'))
    : Window$.pipe(delay(300)).subscribe(win => (win.document.documentElement.style.overflow = ''))

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
    class="z-index-bug-fix flex justify-center items-center fixed inset-0 z-[60] bg-primary-990">
    <LoadingSpinner --big="1" />
  </div>
{/if}

<style>
  .z-index-bug-fix {
    transform: translate3d(0, 0, 0);
  }
</style>
