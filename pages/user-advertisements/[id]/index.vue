<script setup>
import { useAdvertismentStore } from "~/stores/advertisment";
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/auth";
import {ref, watch} from 'vue';
useHead({
  title: "شركة المنى | إعلاناتي ",
});
const page = ref(1)
const userStore = useUserStore();
const route = useRoute();
const advertismentStore = useAdvertismentStore();
advertismentStore.GetAllAdvertismentsByUser(route.params.id, page.value);
const Advertisments = computed(() => {
  if (advertismentStore.getUserAdvertisments) {
    if (advertismentStore.getUserAdvertisments.entities) {
      return advertismentStore.getUserAdvertisments;
    }
    else {
      return null
    }
  }
});
const isUser = computed(() => {
  if (userStore.getUser) {
    return userStore.getUser;
  }
});
const loading = computed(() => {
  return advertismentStore.loading;
});
watch(page,() => {
  advertismentStore.GetAllAdvertismentsByUser(route.params.id, page.value);
})
</script>
<template>
  <client-only>
    <v-container>
      <BackButton />
      <v-row class="ma-0 mt-5 justify-center">
        <div class="w-100" v-if="loading">
          <AdvertisementLoading v-for="n in 5" :key="n" />
        </div>
        <div v-if="Advertisments?.entities?.length === 0" class="text-center my-10">
            لاتوجد إعلانات حاليا <br /><br />
            <v-btn
              color="primary"
              append-icon="mdi-plus"
              class="ml-md-10 ml-2"
              to="/real-estate/advertis"
              >إضافة إعلان</v-btn
            >
            <v-btn
              to="/real-estate/request-advertisements"
              variant="outlined"
              append-icon="mdi-arrow-left"
              >طلبات العقار</v-btn
            >
        </div>
        <div v-if="isUser" class="w-100">
          <div v-if="parseInt(isUser.UserId) === parseInt($route.params.id) && Advertisments !== null">
            <RealEstateCard
              v-for="advertisment in Advertisments.entities"
              :key="advertisment.id"
              :advertisment="advertisment"
              :isUserAdvertisements="true"
              :loading="loading"
            />
          </div>
        </div>
        <div v-if="isUser">
          <v-alert
            :closable="false"
            type="error"
            variant="tonal"
            v-if="parseInt(isUser.UserId) !== parseInt($route.params.id)"
            class="text-center"
          >
            ليس لديك الصلاحية
          </v-alert>
        </div>
      </v-row>
      <v-pagination
        v-if="Advertisments && Advertisments.totalPages > 1"
        v-model="page"
        :length="Advertisments.totalPages"
        rounded="circle"
        active-color="primary"
        variant="flat"
      ></v-pagination>
    </v-container>
  </client-only>
</template>