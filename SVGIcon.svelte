<!--
  @component
  helper component for rendering SVG elements as HTML code, used mostly for icons (not in a <img/>)  
  this component also offers passing down the transition configuration for compatible components  
  you can pass any svelte component in addition to imported SVG files to this component  
  @emits `click` - when the component is clicked
 -->
<script lang="ts">
  import _ from 'lodash'
  import { pxPerRem$ } from './helpers/px-rem-conversion'
  import { DrawParams } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  import cn from 'classnames'

  export let className: string = ''
  export let style: string = ''
  /**
   * @description the imported SVG file or svelte component to render
   * @required
   */
  export let Icon: any
  /**
   * @description should be in rem like '1rem'
   */
  export let width: string | undefined = undefined
  /**
   * @description should be in rem like '1rem'
   */
  export let height: string | undefined = undefined
  /**
   * @description should be in rem like '1rem'. will be overridden by specific `height` or `width` if provided
   */
  export let dimensions: string | undefined = undefined
  /**
   * @description skip filling all the paths and strokes with `currentColor`, used when you render SVGs that are more of a picture than an icon
   * @default false
   */
  export let dontFill = false
  /**
   * @description svelte draw transition props to be passed to the rendered component
   */
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
