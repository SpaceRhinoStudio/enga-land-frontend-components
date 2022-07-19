<script lang="ts">
  import { draw as rawDraw, DrawParams } from 'svelte/transition'

  export let width: number | undefined = undefined
  export let height: number | undefined = undefined
  export let drawParams: DrawParams = {}
  let className = ''
  export { className as class }

  const draw = (
    node: SVGElement & {
      getTotalLength(): number
    },
    _: unknown,
  ) => rawDraw(node, drawParams)
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {width} {height} class={className}>
  <g
    id="vuesax_linear_tick-circle"
    data-name="vuesax/linear/tick-circle"
    transform="translate(-748 -188)">
    <g id="tick-circle">
      <path
        in:draw
        id="Vector"
        d="M10,20A10,10,0,1,0,0,10,10.029,10.029,0,0,0,10,20Z"
        transform="translate(750 190)"
        fill="none"
        stroke="#292d32"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5" />
      <path
        in:draw
        id="Vector-2"
        data-name="Vector"
        d="M0,2.83,2.83,5.66,8.5,0"
        transform="translate(755.75 197.17)"
        fill="none"
        stroke="#292d32"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5" />
      <path
        in:draw
        id="Vector-3"
        data-name="Vector"
        d="M0,0H24V24H0Z"
        transform="translate(748 188)"
        fill="none"
        opacity="0" />
    </g>
  </g>
</svg>
