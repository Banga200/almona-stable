<script setup>
// import Success from '~/components/messages/Success.vue';
const showScrollButton = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>
<template>
    <v-app>
        <TheHeader :HomeHeader="$route.name && $route.name.toString().startsWith('Home') ? 'header' : ''" />
        <v-main :class="{ 'pt-0': $route.name === 'Home', 'bg-gray': $route.name !== 'Home' }">
            <slot />

        </v-main>
        <v-btn icon="mdi-arrow-up" class="scrollTopButton white" color="primary" @click="scrollToTop" v-show="showScrollButton"/>

        <TheFooter />
    </v-app>
</template>
<style scoped>
.scrollTopButton {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 999;
    transition: all .5s ease-in-out;
}
</style>