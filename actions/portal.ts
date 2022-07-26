import { tick } from 'svelte'
import { get, writable } from 'svelte/store'

export const portalMap = writable([] as { node: HTMLElement; index: number | null }[])

export function changePortalVisibility(node: HTMLElement, visible: boolean): number | null {
  if (visible) {
    const maxIndex = get(portalMap)
      .filter(x => x.node !== node)
      .reduce((max, curr) => ((curr.index ?? -1) > max ? curr.index ?? -1 : max), -1)
    portalMap.update(prev =>
      prev.filter(x => x.node !== node).concat({ node, index: maxIndex + 1 }),
    )
    return maxIndex + 1
  } else {
    portalMap.update(prev => prev.filter(x => x.node !== node).concat({ node, index: null }))
    return null
  }
}

let portalRoot: HTMLElement | null

export function create_portal_root(node: HTMLElement): { destroy: () => void } {
  portalRoot = node
  return { destroy: () => portalRoot === node && (portalRoot = null) }
}

function mount(node: HTMLElement) {
  if (!portalRoot) {
    throw new Error('no portal root available')
  }
  portalRoot.insertBefore(node, null)
  portalMap.update(prev => [...prev, { node, index: null }])

  return () => {
    if (portalRoot?.contains(node)) {
      portalRoot.removeChild(node)
    }
    portalMap.update(prev => prev.filter(x => x.node !== node))
  }
}

/**
 * @description svelte action used to move a node to portal root
 * used mostly for modal nodes since they need to be in a different DOM hierarchy position than the main content so the blur filter does not apply to them
 * and to avoid other problems that exist with parents having `filter` and `translate` properties
 */
export function portal(node: HTMLElement, params?: { noop?: boolean }): { destroy: () => void } {
  let destroy: () => void
  function setDestroy() {
    try {
      destroy = mount(node)
      return true
    } catch {
      console.warn('failed to find portal root')
      return setTimeout(() => {
        setDestroy()
      }, 100)
    }
  }
  if (!params?.noop) {
    if (!portalRoot) {
      void tick().then(() => {
        setDestroy()
      })
    } else {
      setDestroy()
    }
  }
  return { destroy: () => destroy?.() }
}
