<script setup>
import HeroSection from '../components/HomeSections/HeroSection.vue';
import AboutusSection from '../components/HomeSections/AboutusSection.vue';
import GoalsSection from '~/components/HomeSections/GoalsSection.vue';
import ServicesSection from '~/components/HomeSections/ServicesSection.vue';
import OurServices from '~/components/HomeSections/OurServices.vue';

useHead({
    title: 'شركة المنى | الصفحة الرئيسية'
})

definePageMeta({
   name: 'Home', 
   breadcrumb: 'الصفحة الرئيسية'
})
const serviceStore = useServiceStore();
const projectStore = useProjectStore();
const postStore = usePostStore()
const storeActionsMap = {
  'serviceStore.GetAllServices': () => serviceStore.GetAllServices(),
  'projectStore.GetAllProjects': () => projectStore.GetAllProjects(),
  'postStore.GetAllPost': () => postStore.GetAllPosts(),
}
onMounted(() => {
    const elements = document.querySelectorAll('.intersection')

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const actionKey = entry.target.dataset.storeAction
            const action = storeActionsMap[actionKey]

            if (action) {
            action()
            observer.unobserve(entry.target) // fire once
            }
        }
        })
    }, { threshold: 0.3 })

    elements.forEach(el => observer.observe(el))
})
</script>
<template>
   <div>
    <HeroSection/>
    <AboutusSection/>
    <OurServices :services="serviceStore.services.content" :loading="serviceStore.services.loading" class="intersection" data-store-action="serviceStore.GetAllServices"/>
    <OurNumbers/>
    <OurProjects :projects="projectStore.projects.content" :loading="projectStore.projects.loading" class="intersection" data-store-action="projectStore.GetAllProjects"/>
    <!--<WorkTeam/>-->
    <RateOurTeam/>
    <PostSection :post="postStore.posts.content" :loading="postStore.posts.loading" class="intersection" data-store-action="postStore.GetAllPost"/>
    <ContactUs/>
   </div>
</template>