<script lang="ts">
  import { fly } from 'svelte/transition'
  import { tsFix } from './helpers/svelte-animation-fix'

  let className: { [key in 'wrapper']?: string } = {}
  export { className as class }

  export let visible = true
  export let flyRange = 50
</script>

{#if visible}
  <div
    in:tsFix|local={[fly, { x: -flyRange }]}
    out:tsFix|local={[fly, { x: flyRange }]}
    class="absolute inset-0 flex justify-center items-center {className.wrapper}">
    <slot />
  </div>
{/if}
