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
const postStore = usePostStore();
const teamMemberStore = useTeamMemberstore();
const statisticStore = useStatisticStore();
const storeActionsMap = {
  'serviceStore.GetAllServices': () => serviceStore.GetAllServices(),
  'projectStore.GetAllProjects': () => projectStore.GetAllProjects(),
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
    title: 'معارض ناجحة',
    count: `${statisticStore.statistics.content.successfulExhibitions}+`
  },
  {
    icon: "$Customers",
    title: 'عميل موثوق',
    count: `${statisticStore.statistics.content.trustedCustomer}+`
  },
  {
    icon: "mdi-star-outline",
    title: 'سنوات الخبرة',
    count: `${statisticStore.statistics.content.yearsOfExperience}+`
  },
])
const numbers = computed(() => [
    {
        icon: '$Quality',
        title: 'معارض ناجحة',
        count: `${statisticStore.statistics.content.successfulExhibitions}+`,
        description: 'معارض متخصصة نظمناها بنجاح'
    },
    {
        icon: '$Customers',
        title: 'عميل موثوق',
        count: `${statisticStore.statistics.content.trustedCustomer}+`,
        description: 'عملاء يثقون في خدماتنا'
    },
    {
        icon: '$Event',
        title: 'سنوات من الخبرة',
        count: `${statisticStore.statistics.content.yearsOfExperience}+`,
        description: 'خبرة متراكمة في السوق اليمني'
    },
    {
        icon: '$MapMarker',
        title: 'محافظات يمنية',
        count: `${statisticStore.statistics.content.yearsOfExperience}+`,
        description: 'مشاركون من مختلف المحافظات'
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