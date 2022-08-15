<!--
  @component
  this component is the main button component
  @slot `default` - the main content of the component
  @prop `isLoading`
-->
<script lang="ts">
  import cn from 'classnames'
  import _ from 'lodash'
  import { writable } from 'svelte/store'
  import { pulse } from './actions/pulse'
  import { canHover$ } from './helpers/media-queries'
  import HoverState from './HoverState.svelte'
  import LoadingOverlay from './LoadingOverlay.svelte'
  import ToolTip from './ToolTip.svelte'
  import { Option } from './types'

  /**
   * @description use active styles
   * @default false
   */
  export let active = false

  /**
   * @description use danger styles
   * @default false
   */
  export let danger = false

  /**
   * @description use secondary styles
   * @default false
   */
  export let secondary = false

  /** @default false */
  export let isLoading = false

  /** @default false */
  export let disabled = false

  /**
   * @description job assigned to on:click, triggers loading status until settled
   * @required
   */
  export let job: () => Promise<unknown> | unknown
  /**
   * @description disables the default styling of the component
   * @default false
   */
  export let overrideStyles = false
  /**
   * @description a tip to be shown when hovered
   * @default undefined
   */
  export let tooltip: Option<string | false> = undefined
  /** @default false */
  export let showTooltipWhenLoading = false
  /** @default false */
  export let showTooltipWhenEnabled = false
  export let className = ''
  export let style = ''

  let isJobLoading = false

  const disabledStore = writable(disabled)
  $: disabledStore.set(disabled)

  $: shouldShowTooltip =
    _.isString(tooltip) &&
    tooltip.length &&
    (((isLoading || isJobLoading) && showTooltipWhenLoading) ||
      (!(isLoading || isJobLoading) && !disabled && showTooltipWhenEnabled) ||
      (disabled && !(isLoading || isJobLoading)))
</script>

<HoverState let:hoverState>
  <button
    use:pulse={{ should$: disabledStore }}
    {style}
    class={cn(
      !overrideStyles && [
        'transition-[color,background-color,border-color,text-decoration-color,fill,stroke,transform,box-shadow]',
        $canHover$ && !(isLoading || isJobLoading || disabled) && 'hover:scale-105',
        'relative',
        'border',
        'duration-500',
        'disabled:bg-gray-800',
        'disabled:bg-opacity-30',
        'disabled:text-gray-500',
        'hover:border-gray-400',
        'hover:text-text-hover',
        'disabled:cursor-not-allowed',
        danger
          ? 'border-transparent bg-blood hover:bg-blood bg-opacity-70 active:bg-blood text-rose-200'
          : active
          ? 'border-transparent bg-secondary-800 hover:bg-secondary-600 hover:bg-opacity-50 active:bg-secondary-800 text-secondary-400 bg-opacity-50'
          : 'border-primary-600 active:bg-primary-600',
        (isLoading || isJobLoading) &&
          'cursor-wait disabled:cursor-wait text-transparent hover:text-transparent disabled:text-transparent',
        secondary
          ? 'py-1 px-2 rounded-xl text-xs bg-primary-600 leading-none'
          : 'py-2 px-4 rounded-lg disabled:border-gray-500',
      ],
      className,
    )}
    on:click={async () => {
      if (!isLoading && !isJobLoading && !disabled) {
        isJobLoading = true
        try {
          await job()
        } catch {
          const checkpoint = { danger, active, secondary }
          danger = true
          // active = false
          // secondary = false
          setTimeout(() => {
            danger = checkpoint.danger
            // active = checkpoint.active
            // secondary = checkpoint.secondary
          }, 500)
        }
        isJobLoading = false
      }
    }}
    disabled={isLoading || isJobLoading || disabled}>
    <div
      class={cn(
        'contents children:transition-opacity children:duration-500',
        (isLoading || isJobLoading) && 'children:opacity-0',
      )}>
      <slot isLoading={isLoading || isJobLoading} />
    </div>
    <LoadingOverlay visible={isLoading || isJobLoading} />
    {#if hoverState && shouldShowTooltip}
      <ToolTip>{tooltip}</ToolTip>
    {/if}
  </button>
</HoverState>
