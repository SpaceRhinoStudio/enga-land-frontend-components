<!--
  @component
  this component keeps track of hovers and clicks
  @emits `click` - when the user clicks the component
  @emits `outclick` - when the user clicks outside the component
  @
  @slot `default` - the main content of the component
  @prop `clickState`
  @prop `dismiss` function
  @
  @slot `exclude` - the content to exclude from the click / hover events
  @prop `clickState`
  @prop `dismiss` function
 -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  /**
   * @description can be used to pass in a reference to another node to exclude from the click / hover events, if it cannot be passed as slot
   * @default undefined
   */
  export let exclude: HTMLElement | undefined = undefined
  /** @readonly */
  export let clickState = false
  /** @default false */
  export let noToggle = false

  let dispatch = createEventDispatcher<{ outclick: PointerEvent; click: PointerEvent }>()
  let wrapper: HTMLElement
  let _exclude: HTMLElement | undefined = undefined

  export const dismiss = () => {
    clickState = false
  }
</script>

<svelte:window
  on:pointerdown={e => {
    if (
      //@ts-ignore
      !wrapper.contains(e.target) &&
      //@ts-ignore
      (exclude ?? _exclude ? !(exclude ?? _exclude).contains(e.target) : true)
    ) {
      dispatch('outclick', e)
      clickState = false
    }
    if (
      //@ts-ignore
      wrapper.contains(e.target) &&
      //@ts-ignore
      (exclude ?? _exclude ? !(exclude ?? _exclude).contains(e.target) : true)
    ) {
      dispatch('click', e)
      if (!noToggle) {
        clickState = !clickState
      } else {
        clickState = true
      }
    }
  }} />

<div class="contents" bind:this={wrapper}>
  <slot {clickState} {dismiss} />
  <div class="contents" bind:this={_exclude}>
    <slot name="exclude" {clickState} {dismiss} />
  </div>
</div>
