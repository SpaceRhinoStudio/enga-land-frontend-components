<!--
  @component
  a decorative component showing a ring with a special glow  
  by default all the styling factors are random  
  by default the ring randomly moves around
 -->
<script lang="ts" context="module">
  function dimensionMul(dimension: string, mul: number): string {
    return dimension
      .replace(/[0-9]+\.*[0-9]*/g, match => {
        return String(parseFloat(match) * mul)
      })
      .replace(/--/g, '')
  }
</script>

<script lang="ts">
  import cn from 'classnames'
  import { rnd, rndSign } from './utils/random'
  import RandomTranslate from './RandomTranslate.svelte'

  /** @default false */
  export let noMotion = false
  let className: { [key in 'ring' | 'container']?: string } = {}
  export { className as class }
  /** @default random */
  export let hue = rnd(0, 360)
  /** @default random */
  export let saturation = rnd(0.5, 1, true)
  /** @default random */
  export let lightness = rnd(0.4, 0.8, true)
  /** @default random */
  export let dimensions = rnd(2.5, 4, true) + 'rem'
  /** @default random */
  export let thickness = rnd(3, 5) + 'px'
  /** @default 45 */
  export let shadowHueShift = 45

  let spreadMultiplier = rnd(0.2, 0.5, true)
  let blurMultiplier = rnd(1.5, 2.3, true)

  let displacement = [
    dimensionMul(dimensions, 0.4 * rndSign()),
    dimensionMul(dimensions, 0.4 * rndSign()),
  ] as const
</script>

<!-- TODO: test if maxMove=0 works without problems -->
<RandomTranslate maxMove={noMotion ? 0 : 0.5} className={className.container ?? ''}>
  <div
    class={cn('rounded-full', className.ring)}
    style="
    height: {dimensions};
    width: {dimensions};
    border-width: {thickness};
    border-color: hsl({hue}, {saturation * 100}%, {lightness * 100}%);
    box-shadow:
        {displacement[0]} {displacement[1]} {dimensionMul(
      dimensions,
      blurMultiplier,
    )} {dimensionMul(dimensions, spreadMultiplier)} hsl({hue - shadowHueShift}, {saturation *
      80}%, {lightness * 33}%),
        {dimensionMul(displacement[0], rndSign())} {dimensionMul(
      displacement[1],
      rndSign(),
    )} {dimensionMul(dimensions, blurMultiplier)} {dimensionMul(
      dimensions,
      spreadMultiplier,
    )} hsl({hue + shadowHueShift}, {saturation * 80}%, {lightness * 33}%);
    background-color: hsla({hue}, {saturation * 100}%, {lightness * 50}%, 0.25)" />
</RandomTranslate>
