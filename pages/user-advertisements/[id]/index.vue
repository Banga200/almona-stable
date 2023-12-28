<script setup>
import { useAdvertismentStore } from '~/stores/advertisment';
import { useRoute } from 'vue-router';
import {useUserStore} from '~/stores/auth';
const userStore = useUserStore()
const route = useRoute()
const advertismentStore = useAdvertismentStore();
advertismentStore.GetAllAdvertisments();
advertismentStore.GetAllAdvertismentsByUser(route.params.id)
const Advertisments = computed(() => {
    if (advertismentStore.getAdvertisments && advertismentStore.getAdvertisments.length > 0) {
        return advertismentStore.getAdvertisments;
    }
})
const isUser = computed(() => {

if (userStore.getUser) {
    return userStore.getUser
}
})
const loading = computed(() => { return advertismentStore.loading })
</script>
<template>
    <client-only>
        <v-container>
        <BackButton />
        <v-row class="ma-0 mt-5" :class="{ 'justify-center': !Advertisments }">
            <div class="w-100" v-if="loading">
                <AdvertisementLoading v-for="n in 5" />
            </div>
            <div v-if="!Advertisments" class="text-center my-10">

                لاتوجد إعلانات حاليا <br /><br />
                <v-btn color="primary" append-icon="mdi-plus" class="ml-md-10 ml-2" to="/real-estate/advertis">إضافة
                    إعلان</v-btn>
                <v-btn to="/real-estate/request-advertisements" variant="outlined" append-icon="mdi-arrow-left">طلبات
                    العقار</v-btn>
            </div>
            <div class="w-100" v-if="parseInt(isUser.UserId) === parseInt($route.params.id)">
                <RealEstateCard v-for="(advertisment, i) in Advertisments" :key="advertisment.id" :advertisment="advertisment"
                :isUserAdvertisements="true" :loading="loading"/>
            </div>
            <v-alert :closable="false" type="error" variant="tonal" v-if="parseInt(isUser.UserId) !== parseInt($route.params.id)" class="text-center">
                ليس لديك الصلاحية
            </v-alert>
        </v-row>
    </v-container>
    </client-only>
</template>