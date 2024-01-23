<script setup>
import AdvertismentForm from '../../../../components/RealEstates/AdvertismentForm.vue';
import AdvertismentImages from '../../../../components/RealEstates/AdveritsmentImages.vue';

const components = [AdvertismentForm, AdvertismentImages];
const headers = ['المعلومات الأساسية', 'صور الإعلان']
definePageMeta({
   name: 'EditAdvertisement', 
   breadcrumb: 'تعديل إعلان',
})
useHead({
    title: 'شركة المنى |  تعديل اعلان',
    hid: 'description',
    name: 'description',
    content: 'تعديل اعلان'
})
</script>
<template>
    <client-only>
        <v-container>
        <!-- <v-btn variant="flat" prepend-icon="mdi-arrow-right" @click="$router.back">الرجوع الى الخلف</v-btn> -->
        <BackButton/>
        <TheStepper :components="components" :headers="headers" :isEdit="true"/>
    </v-container>
    </client-only>
</template>