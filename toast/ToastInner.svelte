<script lang="ts">
  import { ToastType } from '../contexts/flash-toast'
  import { __$ } from '../locales'
  import cn from 'classnames'
  import { onMount } from 'svelte'

  export let message: string
  export let level: ToastType = ToastType.alert
  export let timeout: number

  let startTimer = false
  onMount(() => {
    startTimer = true
  })
</script>

<div
  class={cn(
    'py-3 px-5 space-y-2 flex flex-col items-start md:flex-row md:space-y-0 md:space-x-3 md:items-center md:py-5 ',
  )}>
  <span class="rounded-lg bg-white bg-opacity-20 text-text-hover px-2 py-1 text-sm flex">
    {$__$?.userInteraction.toastTitles[level]}
  </span>
  <span class="">{message}</span>
</div>
<div class="absolute -bottom-1 left-0 right-0 !m-0">
  <div
    class="h-2 bg-white transition-all ease-linear {startTimer ? 'w-0' : 'w-full'}"
    style="transition-duration: {timeout}ms;" />
</div>
