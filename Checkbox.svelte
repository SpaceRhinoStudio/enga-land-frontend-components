<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { fade, scale } from 'svelte/transition'
  import VuesaxLinearTickSquare from './assets/icons/draw-transition/vuesax-linear-tick-square.svelte'
  import WithLoading from '$lib/shared/WithLoading.svelte'
  import TickSquareEmptyIcon from '$lib/shared/assets/icons/vuesax-linear-tick-square-empty.svg'
  import SvgIcon from './SVGIcon.svelte'
  import _ from 'lodash'
  import cn from 'classnames'

  export let value: boolean | undefined = false
  export let isLoading = false
  const dispatch = createEventDispatcher<{ change: boolean }>()

  export let className: {
    [key in 'container' | 'tickWrapper' | 'wrapper' | 'outerWrapper']?: string
  } = {}
</script>

<div class="contents" on:click={() => void (value = !value)}>
  <WithLoading
    className={{
      container: cn('flex !gap-2 items-center cursor-pointer', className.container),
      wrapper: className.outerWrapper ?? '',
    }}
    data={_.isUndefined(value) || isLoading}
    predicate={e => !e}>
    <div slot="data" class="w-5 h-5 relative {className.tickWrapper}">
      {#if value}
        <div class="absolute inset-0" in:scale={{ start: 2, opacity: 0.5 }} out:fade>
          <SvgIcon
            Icon={VuesaxLinearTickSquare}
            className="w-full h-full"
            drawParams={{ duration: 300 }} />
        </div>
      {/if}
      {#if !value}
        <div class="absolute inset-0 text-text-secondary" transition:fade>
          <SvgIcon className="w-full h-full" Icon={TickSquareEmptyIcon} />
        </div>
      {/if}
    </div>
    <span
      slot="after"
      class="{!value &&
        'text-text-secondary'} transition-colors duration-300 text-2xs cursor-pointer {className.wrapper}">
      <slot />
    </span>
  </WithLoading>
</div>
