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
