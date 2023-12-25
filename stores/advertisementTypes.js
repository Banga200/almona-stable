import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useAdvertisementTypesStore = defineStore('AdvertisementTypes', () => {
  const runtimeConfig = useRuntimeConfig();

  const BaseURL = runtimeConfig.public.apiBase;
  // States 
  // Holds All Advertisments
  const AdvertisementTypes = ref([]);
  const loading = ref(false);
  // Getters 
  const getAdvertisementTypes = computed(() => { return AdvertisementTypes.value })
  const getLoading = computed(() => {return loading.value})

  // Actions 
  async function GetAllAdvertisementTypes() {
    loading.value = true
    try {
      const { data: advertisementTypes, error } = await useFetch(`${BaseURL}/AdvertisementTypes`)
      AdvertisementTypes.value = advertisementTypes.value.content;
      loading.value = false
    }
    
    catch (error) {
      console.log(error);
      loading.value = false
    }
  }

  return { GetAllAdvertisementTypes, getAdvertisementTypes, getLoading }
})