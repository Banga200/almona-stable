<script setup>
const props = defineProps(['iconSize', 'icon', 'title', 'description', 'color', 'flat', 'isEmoji']);
</script>
<template>
    <div class=" d-flex flex-column align-center pa-6 ga-4 text-center" :class="[props.flat, {'card': !props.flat}]">
        <v-avatar :size="props.iconSize || 64" :color=" props.color ||'#fef7d9'">
            <span v-if="props.isEmoji" style="font-size: 32px;">{{ props.icon }}</span>
            <v-icon v-else :icon="props.icon" size="32" color="#d4af37"></v-icon>
        </v-avatar>
        <h2 class="text-xl font-bold">{{ props.title }}</h2>
        <p class="text-center">{{ props.description }}</p>
    </div>
</template>