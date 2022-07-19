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
      whitelist.to = to.pathname
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
