
import { defineNuxtPlugin } from '#app'
import { vAnimationNumber } from '@/plugins/directives/animation-number'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('animation-number', vAnimationNumber)
})
