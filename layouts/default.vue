<script setup>
// import Success from '~/components/messages/Success.vue';
</script>
<template>
    <v-app>
        <TheHeader :HomeHeader="$route.name === 'Home' ? 'header' : ''" />
        <v-main :class="{ 'pt-0': $route.name === 'Home', 'bg-gray': $route.name !== 'Home' }">
            <slot />

        </v-main>
        <TheFooter />
    </v-app>
</template>