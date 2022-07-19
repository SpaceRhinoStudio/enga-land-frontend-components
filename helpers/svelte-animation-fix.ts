import { AnimationConfig, flip as svelteFlip, FlipParams } from 'svelte/animate'
import { TransitionConfig } from 'svelte/transition'

function reset(node: HTMLElement, isTransition = false) {
  if (node.style.animation) {
    node.style.animation = ''
    if (!isTransition) {
      node.style.transform = ''
      node.style.position = ''
    }
  }
}

export function flip(
  node: HTMLElement,
  {
    from,
    to,
  }: {
    from: DOMRect
    to: DOMRect
  },
  params?: FlipParams,
): AnimationConfig {
  reset(node)
  return svelteFlip(node, { from, to }, params)
}

export function tsFix<P>(
  node: HTMLElement,
  params:
    | [ts: (node: Element, params?: P) => TransitionConfig | (() => TransitionConfig), p?: P]
    | [ts: (node: Element, params: P) => TransitionConfig | (() => TransitionConfig), p: P],
): TransitionConfig | (() => TransitionConfig) {
  reset(node, true)
  return params[0](node, params[1]!)
}
