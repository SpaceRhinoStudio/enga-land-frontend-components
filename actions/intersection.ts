import _ from 'lodash'

/**
 * @description svelte action used to determine the status of user viewport intersection with the given element by emitting `intersection` event that contains a boolean value
 */
export function intersection(
  node: HTMLElement,
  args?: { threshold?: number; offset?: number },
): { destroy: () => void } {
  if (typeof window === 'undefined') {
    return {
      destroy: _.noop,
    }
  }
  if (!(window.IntersectionObserver && window.IntersectionObserverEntry)) {
    return {
      destroy: _.noop,
    }
  }

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0]) {
        node.dispatchEvent(new CustomEvent('intersection', { detail: entries[0].isIntersecting }))
      }
    },
    {
      rootMargin: (args?.offset ?? 0) + 'px',
      threshold: args?.threshold ?? 0.5,
    },
  )

  observer.observe(node)

  return {
    destroy() {
      observer.unobserve(node)
      observer.disconnect()
    },
  }
}
