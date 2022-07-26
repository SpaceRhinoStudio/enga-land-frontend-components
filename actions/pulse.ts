import _ from 'lodash'

/**
 * @description svelte action used to do a pulsing animation
 * used primarily for when a touch user is interacting with a disabled component
 * this visual feedback is meant to replace the cursor shape because a touch device has no cursor on the screen to show the user that they are interacting with a disabled component
 */
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
