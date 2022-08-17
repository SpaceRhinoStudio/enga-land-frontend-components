<!--
  @component
  this is a helper component to manipulate the timing of actual navigations inside the app to show the main loading overlay for a minimum amount of time that is defined by the `loadingMinDuration` property and causes smoother transitions between pages.
 -->
<script context="module" lang="ts">
  export const intro = true
</script>

<script lang="ts">
  import { afterNavigate, beforeNavigate, goto } from '$app/navigation'
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import { pageLoadingJobs$ } from '../contexts/loading-jobs'
  import { waitForF } from './wait-for'

  const initialResolve = { current: _.noop }
  pageLoadingJobs$.next(new Promise<void>(res => (initialResolve.current = res)))

  const whitelist = { to: null as string | null }
  const resolve = { current: _.noop }

  beforeNavigate(({ to, cancel }) => {
    if (!whitelist.to && to?.pathname) {
      cancel()
      whitelist.to =
        to.host === window.location.host ? to.pathname : to.protocol + to.host + to.pathname
      pageLoadingJobs$.next(new Promise<void>(res => (resolve.current = res)))
      setTimeout(() => {
        goto(whitelist.to ?? '/')
          .then(() => (whitelist.to = null))
          .then(waitForF(200))
          .then(() => window.scrollTo(0, 0))
      }, 250)
    }
  })

  afterNavigate(() => {
    setTimeout(resolve.current, 350)
  })

  onMount(() => {
    setTimeout(initialResolve.current, 350)
  })
</script>
