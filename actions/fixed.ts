import { tick } from 'svelte'

let fixedRoot: HTMLElement | null

export function create_fixed_root(node: HTMLElement): { destroy: () => void } {
  fixedRoot = node
  return { destroy: () => fixedRoot === node && (fixedRoot = null) }
}

function mount(node: HTMLElement) {
  if (!fixedRoot) {
    throw new Error('no fixed root available')
  }
  fixedRoot.insertBefore(node, null)

  return () => {
    if (fixedRoot?.contains(node)) {
      fixedRoot.removeChild(node)
    }
  }
}

/**
 * @description svelte action used to move a node to the fixed root
 * the reason for this necessity is that the limitations with the containing block creation
 * long story short applying filter to a parent element will result in breaking the child positioning
 * this was to fix the fixed header jumping to the start of the start of the document when the blur effect is applied to main content (which contains the fixed header in terms of DOM hierarchy)
 * https://drafts.fxtf.org/filter-effects/#FilterProperty
 */
export function fixed(node: HTMLElement): { destroy: () => void } {
  let destroy: () => void
  function setDestroy() {
    try {
      destroy = mount(node)
      return true
    } catch {
      console.warn('failed to find fixed root')
      return setTimeout(() => {
        setDestroy()
      }, 100)
    }
  }
  if (!fixedRoot) {
    void tick().then(() => {
      setDestroy()
    })
  } else {
    setDestroy()
  }
  return { destroy: () => destroy?.() }
}
