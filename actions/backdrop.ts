import { tick } from 'svelte'

let backdropRoot: HTMLElement | null

export function create_backdrop_root(node: HTMLElement): { destroy: () => void } {
  backdropRoot = node
  return { destroy: () => backdropRoot === node && (backdropRoot = null) }
}

function mount(node: HTMLElement) {
  if (!backdropRoot) {
    throw new Error('no backdrop root available')
  }
  backdropRoot.insertBefore(node, null)

  return () => {
    if (backdropRoot?.contains(node)) {
      backdropRoot.removeChild(node)
    }
  }
}

export function backdrop(node: HTMLElement): { destroy: () => void } {
  let destroy: () => void
  function setDestroy() {
    try {
      destroy = mount(node)
      return true
    } catch {
      console.warn('failed to find backdrop root')
      return setTimeout(() => {
        setDestroy()
      }, 100)
    }
  }
  if (!backdropRoot) {
    void tick().then(() => {
      setDestroy()
    })
  } else {
    setDestroy()
  }
  return { destroy: () => destroy?.() }
}
