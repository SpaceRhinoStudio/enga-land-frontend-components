<script lang="ts">
  import { SpringConfig } from 'wobble'

  import { canHover$ } from './helpers/media-queries'
  import { useWobble } from './helpers/wobble-svelte'

  let measure: HTMLElement
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
  style="transform: perspective(800px) rotateX({$x}deg) rotateY({$y}deg);"
  class={className}
  on:mouseleave={() => {
    whereTo = {
      x: 0,
      y: 0,
    }
  }}
  on:mousemove={e => {
    if ($canHover$ && !disabled) {
      const { top, left, height, width } = measure.getBoundingClientRect()
      whereTo = {
        y: ((e.clientX - left) / width - 0.5) * multiplier,
        x: -((e.clientY - top) / height - 0.5) * multiplier,
      }
    }
  }}>
  <slot />
</div>
