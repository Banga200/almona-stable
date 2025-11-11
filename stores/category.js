import { defineStore } from "pinia";
import { ref, computed } from 'vue';


const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  'Access-Control-Allow-Credentials': 'true',
  "Access-Control-Allow-Headers": '*',
}
export const useCategoryStore = defineStore('Category', () => {
  const runtimeConfig = useRuntimeConfig();

  const BaseURL = runtimeConfig.public.apiBase;
  const ComposableError = useErrorHandle()
  // States 
  // Holds All Advertisment
  const Categories = ref([]);
  const loading = ref(false);
  const SubCategoies = ref([])
  // Getters 
  const getCategories = computed(() => { return Categories.value })
  const getSubCategories = computed(() => { return SubCategoies.value })
  const getLoading = computed(() => { return loading.value })
  // Actions 
  async function GetAllCategories() {
    loading.value = true
    try {
      const categories = await $fetch(`${BaseURL}/Categories/GetAllAsync`).then(res => {
         loading.value = false
         setTimeout(() => {
          if (res) {
            Categories.value = res.content;
            loading.value = false
          }
        },200)
      }).catch(error => {
         loading.value = false
      });
    }
    catch (error) {
      loading.value = false
      ComposableError.handelErros(error);
      console.log(error);
    }
  }
  async function GetGategoryByID(id) {
    loading.value = true
    try {
      const { data: category, error } = await useFetch(`${BaseURL}/Categories`, { params: { id: id } })
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else {
        SubCategoies.value = category.value.content.subCategories
        loading.value = false
      }
    }

    catch (error) {
      console.log(error);
      ComposableError.handelErros(error)
      loading.value = false
    }
  }

  // SubCategories 
  async function GetAllSubGategories() {
    loading.value = true
    try {
      const { data: subcategory, error } = await useFetch(`${BaseURL}/SubCategories/GetAllAsync`)
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else {
        SubCategoies.value = subcategory.value.content
        loading.value = false
      }
    }

    catch (error) {
      console.log(error);
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  return { GetAllCategories, GetGategoryByID, GetAllSubGategories,SubCategoies, Categories, getSubCategories, getLoading, getCategories }
})
