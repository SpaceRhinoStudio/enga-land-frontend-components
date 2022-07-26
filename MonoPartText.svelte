<!--
  @component
  this is a helper component for styling the substrings that are wrapped in backticks (`) to have a monospace font
 -->
<script lang="ts">
  import cn from 'classnames'

  export let text: string
  let className: { [key in 'container' | 'normal' | 'mono']?: string } = {}
  export { className as class }
</script>

<span class={cn(className.container)}>
  {#each text?.split('`') ?? [] as part, i}
    {#if i % 2 === 0}
      <span class={cn(className.normal)}>{part}</span>
    {:else}
      <span class={cn(className.mono ?? 'font-mono text-text-hover')}>{part}</span>
    {/if}
  {/each}
</span>
