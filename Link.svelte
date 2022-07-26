<!--
  @component
  a helper component for links, handles hoover effects on text  
  has states for exact route match and partial route match  
  etc
  @emits `click` - when the link is clicked
  @
  @slot `default` - the main content of the component
  @prop `match: { partial: boolean, exact: boolean }`
 -->
<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import _ from 'lodash'
  import { createEventDispatcher } from 'svelte'
  import { routeMatch, RouteMatchResult } from './helpers/route-match'

  /**
   * @description the HTML element to use for the container
   * @default "a"
   */
  export let element = 'a'
  export let href: string | RegExp | undefined
  /** @default false */
  export let disabled = false
  /** @default false */
  export let newTab = false
  export let className: {
    [key in 'element' | 'exactMatch' | 'partialMatch' | 'text' | 'textEnabled']?: string
  } = {}

  const dispatch = createEventDispatcher<{ click: MouseEvent }>()
  let match: RouteMatchResult = { partial: false, exact: false }

  $: {
    match = routeMatch(href, $page.url.pathname)
  }
</script>

<svelte:element
  this={element}
  class={`
    transition-colors duration-300
    ${
      ((match.exact && className.exactMatch) || (match.partial && className.partialMatch)
        ? ''
        : className.text) ?? (match.exact ? 'text-text-hover' : 'text-text-primary')
    }
    ${
      disabled
        ? `text-opacity-30 cursor-not-allowed`
        : `cursor-pointer ${
            ((match.exact && className.exactMatch) || (match.partial && className.partialMatch)
              ? ''
              : className.textEnabled) ?? 'hover:text-text-hover'
          }`
    }
    ${match.exact ? className.exactMatch : match.partial ? className.partialMatch : ''}
    ${className.element ?? ''}`}
  href={!match.exact && _.isString(href) ? href : undefined}
  rel={_.isString(href) && href?.includes('://') ? 'external' : undefined}
  target={newTab ? '_blank' : undefined}
  on:click={e => {
    if (disabled) {
      e.preventDefault()
      return
    }
    dispatch('click', e)
    if (href && _.isString(href) && element !== 'a' && !match.exact) {
      goto(href)
    }
  }}>
  <slot {match} />
</svelte:element>
