<!--
  @component
  this component randomly moves the contents with the given spring config and limits  
  by default `mass` argument of the spring config is defined by how big the content is (width + height)
 -->
<script lang="ts" context="module">
  const calc = (maxMove: number) => (max: number) => (curr: number) => {
    let rand = (Math.random() - 0.5) * (max * maxMove)
    return Math.abs(curr + rand) > max * maxMove ? Math.sign(curr + rand) * max * 0.5 : curr + rand
  }

  function springUpdater(setter: (value: number) => void) {
    let isFirstTimeAccelerating = true
    setter(0)
    return _.throttle(
      ({
        currentVelocity: v,
        currentValue: x,
      }: Pick<Spring, 'currentValue' | 'currentVelocity'>) => {
        if (v < 0.001) {
          if (!isFirstTimeAccelerating) {
            setter(x)
          }
        } else {
          isFirstTimeAccelerating = false
        }
      },
      1000,
      { leading: true, trailing: true },
    )
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { useWobble } from './helpers/wobble-svelte'
  import _ from 'lodash'
  import { Spring, SpringConfig } from 'wobble'

  /**
   * @description maximum amount of movement relative to the content size
   * @default 1
   */
  export let maxMove = 1
  /**
   * @description maximum amount of rotation relative 360 degrees
   * @default 1
   */
  export let maxRotate = 1
  /** @default 1 */
  export let massMultiplier = 1
  /** @default false */
  export let rotate = false

  let width: number = 0
  let height: number = 0
  export {
    /** @readonly */
    width as clientWidth,
  }
  export {
    /** @readonly */
    height as clientHeight,
  }

  export let config: Partial<SpringConfig> = {}

  const [x, setX, springX] = useWobble(config)
  const [y, setY, springY] = useWobble(config)
  const [r, setR, springR] = useWobble(config)
  export {
    /** @description current X offset */
    x as x,
    /** @description current Y offset */
    y as y,
    /** @description current rotation in degrees */
    r as r,
  }

  export let className: string = ''

  onMount(() => {
    if (config.mass === undefined) {
      ;(
        [
          [springX, 3],
          [springY, 3],
          [springR, 20],
        ] as const
      ).forEach(([spring, mult]) => {
        spring.current.updateConfig({ mass: (height + width) * mult * massMultiplier })
      })
    }
    ;(
      [
        [springX, setX, maxMove, width, true],
        [springY, setY, maxMove, height, true],
        [springR, setR, maxRotate, 360, rotate],
      ] as const
    ).forEach(([spring, setter, maxMult, max, enabled]) => {
      if (enabled) {
        spring.current.onUpdate(springUpdater(x => setter(calc(maxMult)(max)(x))))
      }
    })
  })
</script>

<div
  bind:clientWidth={width}
  bind:clientHeight={height}
  style="transform: translate({$x}px, {$y}px) rotate({$r}deg);"
  class="will-change-transform {className}">
  <slot x={$x} y={$y} r={$r} />
</div>
