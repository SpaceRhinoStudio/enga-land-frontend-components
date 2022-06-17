<script>
  import { delay } from 'rxjs'

  import { fade } from 'svelte/transition'
  import LoadingSpinner from './LoadingSpinner.svelte'
  import { isPageLoading$ } from './observables/is-page-loading'
  import { Window$ } from './observables/window'

  $: $isPageLoading$
    ? Window$.subscribe(win => (win.document.body.style.overflow = 'hidden'))
    : Window$.pipe(delay(300)).subscribe(win => (win.document.body.style.overflow = ''))
</script>

{#if $isPageLoading$}
  <div
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 300 }}
    style="transform: translate3d(0, 0, 0)"
    id="preloading_spinner"
    class="flex justify-center items-center fixed inset-0 z-[60] bg-primary-990">
    <LoadingSpinner --big="1" />
  </div>
{/if}
