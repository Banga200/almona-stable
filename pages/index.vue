<script setup>
import HeroSection from '../components/HomeSections/HeroSection.vue';
import AboutusSection from '../components/HomeSections/AboutusSection.vue';
import GoalsSection from '~/components/HomeSections/GoalsSection.vue';
import ServicesSection from '~/components/HomeSections/ServicesSection.vue';
import OurServices from '~/components/HomeSections/OurServices.vue';
const {t} = useI18n();

useHead({
    title: `${t('heading.company_name')} | ${t('links.home_page')}`
})

definePageMeta({
   name: 'Home', 
   breadcrumb: 'الصفحة الرئيسية'
})
const serviceStore = useServiceStore();
const projectStore = useProjectStore();
const postStore = usePostStore();
const teamMemberStore = useTeamMemberstore();
const statisticStore = useStatisticStore();
const storeActionsMap = {
  'serviceStore.GetAllServices': () => serviceStore.GetAllServices(4),
  'projectStore.GetAllProjects': () => projectStore.GetAllProjects(2,4),
  'postStore.GetAllPost': () => postStore.GetAllPosts(),
  'teamMemberStore.GetAllTeamMembers': () => teamMemberStore.GetAllTeamMembers(),
}
onMounted(() => {
    statisticStore.GetStatistic()
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
const heroInfo = computed(() => [
  {
    icon: "$Quality",
    title:  t('successfulExhibitions'),
    count: `${statisticStore.statistics.content.successfulExhibitions}+`
  },
  {
    icon: "$Customers",
    title: t('trustedCustomer'),
    count: `${statisticStore.statistics.content.trustedCustomer}+`
  },
  {
    icon: "mdi-star-outline",
    title: t('yearsOfExperience'),
    count: `${statisticStore.statistics.content.yearsOfExperience}+`
  },
])
const numbers = computed(() => [
    {
        icon: '$Quality',
        title:  t('successfulExhibitions'),
        count: `${statisticStore.statistics.content.successfulExhibitions}+`,
        description: t('successfulExhibitionsDesc'),
    },
    {
        icon: '$Customers',
        title:  t('trustedCustomer'),
        count: `${statisticStore.statistics.content.trustedCustomer}+`,
        description: t('trustedCustomerDesc'),
    },
    {
        icon: '$Event',
        title:  t('yearsOfExperience'),
        count: `${statisticStore.statistics.content.yearsOfExperience}+`,
        description:  t('yearsOfExperienceDesc'),
    },
    {
        icon: '$MapMarker',
        title:  t('yemeniProvinces'),
        count: `${statisticStore.statistics.content.yearsOfExperience}+`,
        description: t('participantsFromAllProvinces'),
    },
    // Add more numbers as needed
]);
</script>
<template>
   <div>
    <HeroSection :statistics="heroInfo"/>
    <AboutusSection/>
    <OurServices :services="serviceStore.services.content" :loading="serviceStore.services.loading" class="intersection" data-store-action="serviceStore.GetAllServices"/>
    <OurNumbers :statistics="numbers"/>
    <OurProjects :projects="projectStore.projects.content" :loading="projectStore.projects.loading" class="intersection" data-store-action="projectStore.GetAllProjects"/>
    <WorkTeam :teamMembers="teamMemberStore.teamMembers.content" :loading="teamMemberStore.teamMembers.loading" class="intersection" data-store-action="teamMemberStore.GetAllTeamMembers"/>
    <RateOurTeam/>
    <PostSection :post="postStore.posts.content" :loading="postStore.posts.loading" class="intersection" data-store-action="postStore.GetAllPost"/>
    <ContactUs/>
   </div>
</template>