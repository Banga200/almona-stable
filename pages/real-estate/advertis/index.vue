<script setup>
import AdvertismentForm from '../../../components/RealEstates/AdvertismentForm.vue';
import AdvertismentImages from '../../../components/RealEstates/AdveritsmentImages.vue';

useHead({
    title: 'شركة المنى | إعلان جديد'
})

definePageMeta({
   name: 'AddAdvertisment', 
   breadcrumb: 'إعلان جديد',
   middleware: ['auth']
})

const components = [AdvertismentForm, AdvertismentImages];
const headers = ['المعلومات الأساسية', 'صور الإعلان']
</script>
<template>
    <v-container>
        <!-- <v-btn variant="flat" prepend-icon="mdi-arrow-right" @click="$router.back">الرجوع الى الخلف</v-btn> -->
        <BackButton/>
        <TheStepper :components="components" :headers="headers" />
    </v-container>
</template>