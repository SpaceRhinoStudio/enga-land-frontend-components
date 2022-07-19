<script lang="ts">
  import cn from 'classnames'

  import { SpringConfig } from 'wobble'
  import { isFirefox$, isSafari$ } from './contexts/is-firefox'

  import { canHover$ } from './helpers/media-queries'
  import { useWobble } from './helpers/wobble-svelte'

  let measure: HTMLElement
  export let passFilterDown = false
  let whereTo = { x: 0, y: 0 }
  export let config: Partial<SpringConfig> = {}
  export let multiplier: number = 13
  const [x, setX] = useWobble(config)
  const [y, setY] = useWobble(config)
  $: {
    setX(whereTo.x)
    setY(whereTo.y)
  }

  export let disabled = false
  export let className = ''
</script>

<div
  bind:this={measure}
  style="transform: perspective({$isFirefox$
    ? 900
    : 600}px) rotateX({$x}deg) rotateY({$y}deg) {$isSafari$
    ? 'translateZ(10px)'
    : ''}; {!passFilterDown ? `filter: brightness(${1 + ($x / 90) * 2});` : ''}"
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
  <slot filter="filter: brightness({1 + ($x / 90) * 2});" />
</div>
