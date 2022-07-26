<!--
  @component
  this component keeps track of user hovering the contents  
  it by default applies a `config.Delays.min` delay for dismissing the hover state
  @slot `default` - the main content of the component
  @prop `hoverState`
  @prop `shouldLeave`
 -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { config } from './configs'
  import { canHover$ } from './helpers/media-queries'

  /** @default false */
  export let noDelay = false
  /** @readonly */
  export let hoverState = false
  /** @readonly */
  export let shouldLeave = false

  let dispatch = createEventDispatcher<{ hover: boolean }>()
</script>

<div
  class="contents"
  on:pointerenter={() => {
    if ($canHover$) {
      shouldLeave = false
      hoverState = true
      dispatch('hover', true)
    }
  }}
  on:pointerleave={() => {
    if ($canHover$) {
      shouldLeave = true

      setTimeout(
        () => {
          if (shouldLeave) {
            hoverState = false
            dispatch('hover', false)
          }
        },
        noDelay ? 0 : config.Delays.min,
      )
    }
  }}>
  <slot {hoverState} {shouldLeave} />
</div>
