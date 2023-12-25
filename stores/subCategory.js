import { defineStore } from "pinia";
import { ref, computed } from 'vue';


const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  'Access-Control-Allow-Credentials': 'true',
  "Access-Control-Allow-Headers": '*',
}
export const useSubCategoryStore = defineStore('Messages', () => {
  const runtimeConfig = useRuntimeConfig();

  const BaseURL = runtimeConfig.public.apiBase;
  // States 
  // Holds All Advertisment
  const SubCategories = ref([]);

  // Getters 
  const getSubCategories = computed(() => { return SubCategories.value })

  // Actions 
  async function GetAllSubCategoryByID(id) {
    try {
      const { data: subCategories, error } = await useFetch(`${BaseURL}/SubCategories`, {params:{id:id}})
      SubCategories.value = subCategories.value.content
    }
    
    catch (error) {
      console.log(error);
    }
  }

  return { GetAllSubCategoryByID, SubCategories, getSubCategories }
})