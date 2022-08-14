import _ from 'lodash'
import { Observable } from 'rxjs'
import { Readable } from 'svelte/store'

/**
 * @description svelte action used to do a pulsing animation
 * used primarily for when a touch user is interacting with a disabled component
 * this visual feedback is meant to replace the cursor shape because a touch device has no cursor on the screen to show the user that they are interacting with a disabled component
 */
export function pulse(
  node: HTMLElement,
  params: { should$: Observable<boolean> | Readable<boolean> },
): { destroy: () => void } {
  let timeout: NodeJS.Timeout | undefined

  let should: boolean
  const sub = params.should$.subscribe(x => (should = x))

  const listener = _.throttle(() => {
    if (node && should) {
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
      if ('unsubscribe' in sub) {
        sub.unsubscribe()
      } else {
        sub()
      }
      clearTimeout(timeout)
    },
  }
}
