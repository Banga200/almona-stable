<script setup>
import HeroSection from '../components/HomeSections/HeroSection.vue';
import AboutusSection from '../components/HomeSections/AboutusSection.vue';
import VisionAndMessage from '~/components/HomeSections/VisionAndMessage.vue';
import GoalsSection from '~/components/HomeSections/GoalsSection.vue';
import ServicesSection from '~/components/HomeSections/ServicesSection.vue';

useHead({
    title: 'شركة المنى | الصفحة الرئيسية'
})

definePageMeta({
   name: 'Home', 
   breadcrumb: 'الصفحة الرئيسية'
})
</script>
<template>
   <div>
    <HeroSection/>
    <AboutusSection/>
    <VisionAndMessage/>
    <GoalsSection/>
    <ServicesSection/>
   </div>
</template>