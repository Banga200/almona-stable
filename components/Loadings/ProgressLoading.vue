<script setup>
const props = defineProps(['isLoading'])
</script>
<template>
<v-progress-linear
        :active="props.isLoading"
        :indeterminate="props.isLoading"
        color="teal"
      ></v-progress-linear>
</template>