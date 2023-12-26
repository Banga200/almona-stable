import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { useToast } from "vue-toastification";
import { useUserStore } from "./auth";
import { useRouter } from "vue-router";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  'Access-Control-Allow-Credentials': 'true',
  "Access-Control-Allow-Headers": '*',
}
export const useAdvertismentStore = defineStore('Advertisment', () => {
  const runtimeConfig = useRuntimeConfig();
  const userStore = useUserStore();
  const BaseURL = runtimeConfig.public.apiBase;
  const toast = useToast();
  const ComposableError = useError();
  const router = useRouter();
  const {token} = useUser()
  // States 
  // Holds All Advertisment
  const Advertisments = ref([]);
  const ReturnNewAdvertismentID = ref(0);
const ImagesCounter = ref(0)
  // loading 
  const loading = ref(false)
  const success_message = ref(null);
  const error_message = ref(null)
  // Getters 
  const getAdvertisments = computed(() => { return Advertisments.value })

  // Actions 
  // Get All Advertisments 
  async function GetAllAdvertisments(advertisId) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements/GetAllByTypeAsync`, {params: {AdversmentTypeId: advertisId}})
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      
      else{
        loading.value = false;
        Advertisments.value = advertisments.value.content;
      }
      

    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  // Get Advertisment By ID 
  async function GetAdvertismentByID() {

  }
  // Add New Advertisment
  async function AddNewAdvertisment(payload) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements`, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${userStore.getToken}` 
          // "Authorization": `Bearer ${token}` 
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
        error_message.value = true
      }
      else{
        ReturnNewAdvertismentID.value = advertisments.value.content.id
        if (advertisments.value.code === 0) { toast.success("تم إضافة الإعلان بنجاح") }
        loading.value = false;
      }
     
    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
      error_message.value = true
    }
  }
  // Add Images to Advertisments 
  const count = ref(0)
  async function AddImageToAdvertisment(payload) {
    count.value = count.value + 1
    loading.value = true;
    try {
      const { data: file, error } = await useFetch(`${BaseURL}/File`, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${userStore.getToken}` 
          // "Authorization": `Bearer ${token}` 
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
      if (error.value) {
        ComposableError.handelErros(error)
        loading.value = false
      }
      else {
        if (file.value.code === 0) { toast.success("تم إضافة بنجاح") }
        if (ImagesCounter.value === count.value) {
          router.push('/real-estate/advertis');
          loading.value = false;
        }
        loading.value = false;
      }
    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  async function FilterAdvertisements(fields) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements/GetAllByFilterAsync/${fields.AdvertisementTypeId}`, {params: fields})
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else{
        loading.value = false;
        Advertisments.value = advertisments.value.content;
      }
      

    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  async function GetAllAdvertismentsBySubcategory(id) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements/GetAllBySubCatogryAsync`, {params: {SubcatogryId: id}})
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else{
        loading.value = false;
        Advertisments.value = advertisments.value.content;
      }
      

    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  async function GetAllAdvertismentsByUser(userId) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements/`, {params: {userId: userId}})
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else{
        loading.value = false;
        Advertisments.value = advertisments.value.content;
      }
      

    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  function setCounterImage(number) {
    ImagesCounter.value = number
  }
  return { Advertisments, getAdvertisments, loading, success_message, error_message,setCounterImage, ReturnNewAdvertismentID,GetAllAdvertismentsBySubcategory, FilterAdvertisements,AddNewAdvertisment, AddImageToAdvertisment, GetAllAdvertisments, GetAdvertismentByID }
})