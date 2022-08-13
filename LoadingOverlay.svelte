<!--
  @component
  this is an overlay component that is used to show a loading state while a job is running  
  parent should have a `relative` position
 -->
<script lang="ts">
  import { fade } from 'svelte/transition'
  import LoadingSpinner from './LoadingSpinner.svelte'

  export let visible: boolean
  export let className: { [key in 'container']?: string } = {}
</script>

{#if visible}
  <div
    transition:fade|local
    style="transform: translate3d(0, 0, 0);"
    class="absolute inset-0 !m-0 z-30 pointer-events-none select-none flex justify-center items-center {className.container}">
    <LoadingSpinner />
  </div>
{/if}
