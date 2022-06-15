<script lang="ts">
  import { onMount } from 'svelte'
  import { useWobble } from './helpers/wobble-svelte'
  import _ from 'lodash'
  import { SpringConfig } from 'wobble'

  export let maxMove = 1
  export let rotate = false

  function calcNew(prev: number, max: number) {
    let rand = (Math.random() - 0.5) * (max * maxMove)
    return Math.abs(prev + rand) > max * maxMove ? Math.sign(prev + rand) * max * 0.5 : prev + rand
  }

  let width: number
  let height: number

  export let config: Partial<SpringConfig> = {}

  const [x, setX, springX] = useWobble(config)
  const [y, setY, springY] = useWobble(config)
  const [r, setR, springR] = useWobble(config)

  export { x, y, r }

  onMount(() => {
    if (config.mass === undefined) {
      springX.current.updateConfig({ mass: (height + width) * 3 })
      springY.current.updateConfig({ mass: (height + width) * 3 })
      springR.current.updateConfig({ mass: (height + width) * 20 })
    }
    const newX = _.throttle(
      (v: number, x: number) => {
        if (v < 0.001) {
          setX(calcNew(x, width))
        }
      },
      1000,
      { leading: true, trailing: true },
    )
    const newY = _.throttle(
      (v: number, y: number) => {
        if (v < 0.001) {
          setY(calcNew(y, height))
        }
      },
      1000,
      { leading: true, trailing: true },
    )
    const newR = _.throttle(
      (v: number, r: number) => {
        if (v < 0.001) {
          setR(calcNew(r, 360))
        }
      },
      1000,
      { leading: true, trailing: true },
    )
    newX(0, 0)
    newY(0, 0)
    rotate && newR(0, 0)
    springX.current.onUpdate(x => {
      newX(x.currentVelocity, x.currentValue)
    })
    springY.current.onUpdate(y => {
      newY(y.currentVelocity, y.currentValue)
    })
    rotate &&
      springR.current.onUpdate(r => {
        newR(r.currentVelocity, r.currentValue)
      })
  })

  export let className: string = ''
</script>

<div
  bind:clientWidth={width}
  bind:clientHeight={height}
  style="transform: translate({$x}px, {$y}px) rotate({$r}deg);"
  class="will-change-transform {className}">
  <slot x={$x} y={$y} r={$r} />
</div>
