<!--
  @component
  this component draws a doughnut chart with the given data
 -->
<script lang="ts">
  import { init, EChartsOption } from 'echarts'
  import { __$ } from './locales'
  import { onMount } from 'svelte'
  import _ from 'lodash'
  import { screen$ } from './helpers/media-queries'

  export let data: { value: number; name: string }[]
  /** @default false */
  export let serif = false

  let chart: echarts.ECharts | undefined
  let container: HTMLDivElement | undefined
  let innerHeight = 0
  let innerWidth = 0

  let sharedOptions: EChartsOption = {}
  $: sharedOptions = {
    backgroundColor: '#0000',
    tooltip: {
      trigger: 'item',
    },

    calculable: true,
    color: ['#691cff99', '#9263EF99', '#8360c799', '#b38aff99', '#A584E699', '#9263EF99'],
    series: [
      {
        type: 'pie',
        radius: ['25%', '95%'],
        itemStyle: {
          shadowBlur: 30,
          shadowColor: '#000e',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          borderColor: '#7951c2',
          borderWidth: 2,
        },
        roseType: 'area',
        label: {
          show: true,
          lineHeight: $screen$.isMobile ? 15 : 35,
          formatter: '{b} \n {d}%',
          fontSize: '1em',
          fontFamily: serif ? 'Passion One' : 'Poppins',
          //   position: 'center',
          distanceToLabelLine: 10,
        },
        labelLine: {
          lineStyle: {
            width: 3,
            opacity: 0.5,
          },
        },
      },
    ],
  }

  $: resize = _.throttle(() => chart?.resize({ height: 'auto', width: 'auto' }), 500)
  $: innerHeight && innerWidth && resize()

  $: chart?.setOption(_.merge({ series: [{ data }] }, sharedOptions))

  onMount(() => {
    if (container) {
      if (!chart) {
        chart = init(container, 'dark', { renderer: 'svg' })
      }
    }
  })
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div bind:this={container} class="h-full w-full" />
