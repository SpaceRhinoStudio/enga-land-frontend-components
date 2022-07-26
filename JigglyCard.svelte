<!--
  @component
  this component creates a 3D effect of a card being rotated in different directions depending on pointer move and also fakes a light source effect on top of the container
  @slot `default` - the main content of the component
  @prop `filter` - pass the brightness filter down in case you want to use it in the component (required to use if the content has backdrop effects)
 -->
<script lang="ts">
  import cn from 'classnames'
  import { SpringConfig } from 'wobble'
  import { isFirefox$, isSafari$ } from './contexts/is-firefox'
  import { canHover$ } from './helpers/media-queries'
  import { useWobble } from './helpers/wobble-svelte'

  /**
   * @description do not apply the filter to the container, used in case you have backdrop effect on the content
   * @default false
   */
  export let passFilterDown = false
  export let config: Partial<SpringConfig> = {}
  /**
   * @description the rotation multiplier of the card
   * @default 13
   */
  export let multiplier: number = 13
  /** @default false */
  export let disabled = false
  export let className = ''
  /**
   * @description the assumed maximum X axis rotation of the card in degrees used for light source effect, decrease for stronger light source effect
   * @default 90
   */
  export let brightnessMaxRotation = 90

  let measure: HTMLElement
  let whereTo = { x: 0, y: 0 }
  const [x, setX] = useWobble(config)
  const [y, setY] = useWobble(config)
  $: {
    setX(whereTo.x)
    setY(whereTo.y)
  }
</script>

<div
  bind:this={measure}
  style="transform: perspective({$isFirefox$
    ? 900
    : 600}px) rotateX({$x}deg) rotateY({$y}deg) {$isSafari$
    ? 'translateZ(10px)'
    : ''}; {!passFilterDown ? `filter: brightness(${1 + ($x / brightnessMaxRotation) * 2});` : ''}"
  class={cn('will-change-transform', className)}
  on:pointerleave={() => {
    whereTo = {
      x: 0,
      y: 0,
    }
  }}
  on:pointermove={e => {
    if ($canHover$ && !disabled) {
      const { top, left, height, width } = measure.getBoundingClientRect()
      whereTo = {
        y: ((e.clientX - left) / width - 0.5) * multiplier,
        x: -((e.clientY - top) / height - 0.5) * multiplier,
      }
    }
  }}>
  <slot filter="filter: brightness({1 + ($x / brightnessMaxRotation) * 2});" />
</div>
