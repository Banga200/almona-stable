<script setup>
import { ref, watch } from 'vue';
import { useAdvertismentStore } from '~/stores/advertisment';
import { useCategoryStore } from '~/stores/category';
import { useRoute } from 'vue-router';
const advertismentStore = useAdvertismentStore();
const categoriesStore = useCategoryStore();
const route = useRoute();
const advertismentId = route.name === 'RealEstateRequest' ? 2 : 1 
categoriesStore.GetAllCategories();
advertismentStore.GetAllAdvertisments(advertismentId);


const Advertisments = computed(() => {
    if (advertismentStore.getAdvertisments && advertismentStore.getAdvertisments.length > 0) {
        return advertismentStore.getAdvertisments;
    }
    
})
const loading = computed(() => {return advertismentStore.loading})
useHead({
    title: 'شركة المنى | عقارات'
})

definePageMeta({
    name: 'RealEstate',
    breadcrumb: 'عقارات'
})
</script>
<template>
    <v-container class="mt-5 realEstate-container">
        <v-row class="text-left mb-2 ma-0">
            <BackButton v-if="$route.path === '/real-estate/request-advertisements'"/>
            <v-spacer/>
            <v-btn append-icon="mdi-arrow-left" class="text-teal" variant="outlined" to="/real-estate/request-advertisements" v-if="$route.path !== '/real-estate/request-advertisements'">طلبات العقار</v-btn>
        </v-row>
        <v-sheet class="px-md-10 px-2 py-3" rounded>
            <ClientOnly>
                <TheSearchField />
            </ClientOnly>
            
        </v-sheet>
        <v-divider class="my-5" />
        <v-row class="ma-0 mt-5" :class="{'justify-center': !Advertisments}">
            <div class="w-100" v-if="loading">
                <AdvertisementLoading v-for="n in 5" :key="n"/>
            </div>
            <div v-if="!Advertisments" class="text-center my-10">
                
                لاتوجد إعلانات حاليا  <br/><br/>
                <v-btn color="primary" append-icon="mdi-plus" class="ml-md-10 ml-2" to="/real-estate/advertis">إضافة إعلان</v-btn>
                <v-btn  to="/real-estate/request-advertisements" variant="outlined" append-icon="mdi-arrow-left">طلبات العقار</v-btn>
            </div>
            <ClientOnly>
                <RealEstateCard v-for="(advertisment) in Advertisments" :key="advertisment.id"
                :advertisment="advertisment" />
            </ClientOnly>
        </v-row>
        
    </v-container>
</template>