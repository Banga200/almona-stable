import { useAnimationNumber } from '@/composables/useAnimationNumber'

export const vAnimationNumber = {
  mounted(el, binding) {
    // set up composable once
    const { current, animate } = useAnimationNumber(+el.textContent || 0)

    // keep the element’s text in sync
    const stopWatch = watch(current, v => {
      el.textContent = Math.round(v).toString()
    })

    // run first animation
    animate(binding.value)

    // store helpers on the element for later
    ;(el)._animate = animate
    ;(el)._cleanup = () => stopWatch()
  },

  updated(el, binding) {
    if (binding.oldValue !== binding.value) {
      (el)._animate?.(binding.value)
    }
  },

  unmounted(el) {
    (el)._cleanup?.()
  }
}