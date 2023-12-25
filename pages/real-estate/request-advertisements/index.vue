<script setup>
import { ref, watch } from 'vue';
import { useAdvertismentStore } from '~/stores/advertisment';
import { useCategoryStore } from '~/stores/category';
import { useRoute } from 'vue-router'
const advertismentStore = useAdvertismentStore();
const categoriesStore = useCategoryStore();
const route = useRoute()
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
    title: 'شركة المنى |  طلبات العقار'
})

definePageMeta({
    name: 'RealEstateRequest',
    breadcrumb: 'طلبات العقار',
    advertismentId: 2
})
</script>
<template>
    <v-container class="mt-5 realEstate-container">
        <BackButton/>
        <v-sheet class="px-10 mt-2 py-3" rounded>
            <TheSearchField />
            
        </v-sheet>
        <v-divider class="my-5" />
        <v-row class="ma-0 mt-5" :class="{'justify-center': !Advertisments}">
            
            <div class="w-100" v-if="loading">
                <AdvertisementLoading v-for="n in 5"/>
            </div>
            <div v-if="!Advertisments" class="text-center my-10">
                
                لاتوجد طلبات حاليا  <br/><br/>
                <v-btn color="primary" append-icon="mdi-plus" class="ml-md-10 ml-2" to="/real-estate/advertis">إضافة إعلان</v-btn>
                <v-btn  to="/real-estate/عقارات" variant="outlined" append-icon="mdi-arrow-left"> عقارات</v-btn>
            </div>
            <RealEstateCard v-for="(advertisment, i) in Advertisments" :key="advertisment.id"
                :advertisment="advertisment" />
        </v-row>
        
    </v-container>
</template>