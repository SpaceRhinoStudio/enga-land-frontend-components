<!--
  @component
  a tooltip component that by default stays at top-center of the parent element  
  parent element's position must be set to `relative`
  @slot `default` - the contents of the tooltip
 -->
<script lang="ts">
  import cn from 'classnames'
  import { fade, FadeParams } from 'svelte/transition'

  // TODO: add support for different directions

  export let className: { [key in 'class' | 'position']?: string } = {}
  export let style = ''
  /**
   * @description svelte fade transition parameters if you need to override them
   */
  export let fadeParams: FadeParams = {}
</script>

<span
  transition:fade={fadeParams}
  {style}
  class={cn(
    // 'h-7',
    'w-max',
    'flex items-center',
    'absolute',
    'text-black',
    'text-center',
    className.position ?? cn('top-0', 'left-1/2'),
    '-translate-y-[calc(100%+8px+theme(spacing[1.5]))]',
    '-translate-x-1/2',
    'px-4',
    'py-1',
    'bg-yellow-400',
    'rounded-full',
    'after:absolute',
    'after:w-0',
    'after:h-0',
    'after:border-transparent',
    'after:border-t-yellow-400',
    'after:top-full',
    'after:border-8',
    'after:left-[calc(50%-8px)]',
    'after:-translate-y-0.5',
    className.class,
  )}>
  <slot />
</span>
