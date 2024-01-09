<script setup>
import { ref, watch } from "vue";
import { useAdvertismentStore } from "~/stores/advertisment";
import { useCategoryStore } from "~/stores/category";
import { useRoute } from "vue-router";
const advertismentStore = useAdvertismentStore();
const categoriesStore = useCategoryStore();
const route = useRoute();
const page = ref(1);
const advertismentId = route.name === "RealEstateRequest" ? 2 : 1;
categoriesStore.GetAllCategories();
advertismentStore.GetAllAdvertisments(advertismentId, 1);
const Advertisments = computed(() => {
  if (
    advertismentStore.getRequestedAdvertisement
  ) {
    return advertismentStore.getRequestedAdvertisement;
  }
});
const loadPage = ref(false);
const loading = computed(() => {
  if (page.value < 1) {
    return advertismentStore.loading;
  } else {
    loadPage.value = advertismentStore.loading;
  }
});
useHead({
  title: "شركة المنى |  طلبات العقار",
});

definePageMeta({
  name: "RealEstateRequest",
  breadcrumb: "طلبات العقار",
  advertismentId: 2,
});
watch(page, (newPage) => {
  window.scrollTo(0, 0);
  advertismentStore.GetAllAdvertisments(advertismentId, newPage);
});
</script>
<template>
  <v-container class="mt-5 realEstate-container">
    <BackButton />
    <ClientOnly>
      <v-sheet class="px-10 mt-2 py-3" rounded>
        <TheSearchField />
      </v-sheet>
      <v-divider class="my-5" />
      <v-row class="ma-0 mt-5 justify-center" >
        <div class="w-100" v-if="loading">
          <AdvertisementLoading v-for="n in 5" :key="n" />
        </div>
        <div v-if="Advertisments?.entities?.length === 0" class="text-center my-10">
          لاتوجد طلبات حاليا <br /><br />
          <v-btn
            color="primary"
            append-icon="mdi-plus"
            class="ml-md-10 ml-2"
            to="/real-estate/advertis"
            >إضافة إعلان</v-btn
          >
          <v-btn
            to="/real-estate/عقارات"
            variant="outlined"
            append-icon="mdi-arrow-left"
          >
            عقارات</v-btn
          >
        </div>
        <ProgressLoading v-if="loadPage" :isLoading="loadPage" class="my-2" />
        <div v-if="Advertisments" class="w-100">
          <RealEstateCard
            v-for="advertisment in Advertisments.entities"
            :key="advertisment.id"
            :advertisment="advertisment"
          />
        </div>
      </v-row>
      <v-pagination
        v-if="Advertisments && Advertisments.totalPage > 1"
        v-model="page"
        :length="Advertisments.totalPage"
        rounded="circle"
        active-color="primary"
        variant="flat"
      ></v-pagination>
    </ClientOnly>
  </v-container>
</template>
