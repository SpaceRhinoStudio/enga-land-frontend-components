import _ from 'lodash'

export function pulse(node: HTMLElement, params: { should: boolean }): { destroy: () => void } {
  let timeout: NodeJS.Timeout | undefined

  const listener = _.throttle(() => {
    if (node && params.should) {
      node.classList.add('animate-pulse-strong')
      timeout = setTimeout(() => {
        node.classList.remove('animate-pulse-strong')
      }, 2000)
    }
  }, 500)

  node.addEventListener('touchstart', listener)

  return {
    destroy() {
      node.removeEventListener('touchstart', listener)
      clearTimeout(timeout)
    },
  }
}
