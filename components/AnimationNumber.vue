<script setup>
import { onMounted, watch } from 'vue'
import { useAnimationNumber } from '@/composables/useAnimationNumber'

// ① props – the target number you want to animate toward
const props = defineProps(["value", "duration"])

// ② call the composable once, in setup()
const { current, animate } = useAnimationNumber(0)

// ③ run the first animation when component mounts
onMounted(() => animate(props.value))

// ④ if the prop changes later, re‑animate
watch(() => props.value, v => animate(v))
</script>

<template>
  <!-- ⑤ template just reads the reactive number -->
    {{ (Math.round(current)) }}
</template>