<!--
  @component
  component used for the drop down navigation items for header navigation
  @emits `click` - when the user clicks the component
 -->
<script lang="ts">
  import cn from 'classnames'
  import { createEventDispatcher } from 'svelte'
  import { routeConfig, type Routes } from './configs/routes'
  import Link from './Link.svelte'
  import { __$ } from './locales'
  import SvgIcon from './SVGIcon.svelte'

  export let routes: Routes[]
  export let className: { [key in 'item']?: string } = {}

  const cols = [
    routes.slice(0, Math.ceil(routes.length / 2)),
    routes.slice(Math.ceil(routes.length / 2)),
  ].map(col => col.map(x => routeConfig[x]))

  let dispatch = createEventDispatcher<{ click: MouseEvent }>()
</script>

<div class="pl-3 py-5 flex gap-2 pr-5">
  {#each cols as col}
    <div class="flex flex-col space-y-0.5">
      {#each col as x}
        <Link
          on:click={e => dispatch('click', e.detail)}
          href={x.href}
          disabled={x.disabled}
          className={{
            exactMatch: 'text-secondary-500 hover:text-secondary-400',
            element: cn(
              'flex gap-3 items-center rounded-xl p-3 border-2 border-transparent transition-colors duration-500',
              !x.disabled && 'hover:border-primary-600 hover:bg-primary-700',
              className.item
                ?.split(' ')
                .map(cls => (cls.includes('hover:') ? (!x.disabled ? cls : '') : cls)),
            ),
          }}>
          <SvgIcon Icon={x.icon} width="2rem" height="2rem" />
          <div class="whitespace-nowrap">
            {$__$?.nav[x.id]}
          </div>
        </Link>
      {/each}
    </div>
  {/each}
</div>
