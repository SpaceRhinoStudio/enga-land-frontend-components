<script lang="ts">
  import _ from 'lodash'
  import { pxPerRem$ } from './helpers/px-rem-conversion'
  import { DrawParams } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  import cn from 'classnames'

  export let className: string = ''
  export let style: string = ''
  export let Icon: any
  export let width: string | undefined = undefined
  export let height: string | undefined = undefined
  export let dimensions: string | undefined = undefined
  export let dontFill = false
  export let drawParams: DrawParams = {}

  $: remToPx = (rem: string | undefined) =>
    _.isUndefined(rem) ? undefined : parseFloat(rem) * $pxPerRem$

  $: pxWidth = remToPx(width)
  $: pxHeight = remToPx(height)
  $: pxDimensions = remToPx(dimensions)

  const dispatch = createEventDispatcher<{ click: MouseEvent }>()
</script>

<div
  class={`flex items-center justify-center ${className}`}
  {style}
  on:click={e => dispatch('click', e)}>
  <svelte:component
    this={Icon}
    width={pxWidth ?? pxDimensions}
    height={pxHeight ?? pxDimensions}
    class={cn(
      !(height ?? dimensions) && 'h-full',
      !(width ?? dimensions) && 'w-full',
      !dontFill && 'fillSVG',
      !dontFill && 'fillStroke',
    )}
    {drawParams} />
</div>
