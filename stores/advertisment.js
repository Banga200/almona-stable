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
  const { token } = useUser()
  // States 
  // Holds All Advertisment
  const Advertisments = ref([]);
  const OneAdvertisment = ref([])
  const ReturnNewAdvertismentID = ref(0);
  const ImagesCounter = ref(0);
  const UserAdvertisments = ref([]);
  const RequestedAdvertisement = ref([])
  // loading 
  const loading = ref(false)
  const success_message = ref(null);
  const error_message = ref(null);
  const stopScrolling = ref(false)
  // Getters 
  const getAdvertisments = computed(() => { return Advertisments.value })
  const getOneAdvertisment = computed(() => { return OneAdvertisment.value })
  const getstopScrolling = computed(() => { return stopScrolling.value })
  const getUserAdvertisments = computed(() => { return UserAdvertisments.value })
  const getRequestedAdvertisement = computed(() => { return RequestedAdvertisement.value })
  // Actions 
  // Get All Advertisments 
  async function GetAllAdvertisments(advertisId, page) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements/GetAllByTypeAsync`, {
        params: {
          AdversmentTypeId: advertisId,
          page: page ,
          pageSize: 15
        }
      })
      console.log(error)
      if (error.value) {
        
        loading.value = false
      }

      else {
        if (advertisments.value) {
            loading.value = false;
            if (advertisments.value.code > 0 ) {
              toast.error(advertisments.value.message)
              return;
            }
            if (advertisId === 1) {
                Advertisments.value = advertisments.value.content
            }
            else{
              RequestedAdvertisement.value = advertisments.value.content
            }

        }
        else {
          loading.value = false
        }
      }


    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  // Get Advertisment By ID 
  async function GetAdvertisementByID(id) {
    console.log(id)
    loading.value = true;
    try {
      const { data: advertisment, error } = await useFetch(`${BaseURL}/Advertisements`, {
        headers: {
          'Content-Type': "application/json",
        },
        params: { id: id }
      })
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }

      else {
        loading.value = false;
        OneAdvertisment.value = advertisment.value.content;
      }


    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  // Add New Advertisment
  async function AddNewAdvertisment(payload) {
    console.log(payload)
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
      console.log(error)
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
        error_message.value = true
      }
      else {
        ReturnNewAdvertismentID.value = advertisments.value.content.id
        if (advertisments.value.code === 0) { toast.success("تم إضافة الإعلان بنجاح") }
        loading.value = false;
        error_message.value = false
      }

    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
      error_message.value = true
    }
  }

  // Update Advertisement 
  async function UpdateAdvertisement(payload) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements`, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${userStore.getToken}`
          // "Authorization": `Bearer ${token}` 
        },
        method: "PUT",
        body: JSON.stringify(payload)
      })
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
        error_message.value = true
      }
      else {
        ReturnNewAdvertismentID.value = advertisments.value.content.id
        if (advertisments.value.code === 0) { toast.success("تم التعديل الإعلان بنجاح") }
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
        if (file.value.code === 0) { toast.success("تم إضافة الصورة بنجاح") }
        if (ImagesCounter.value === count.value) {
          console.log(ImagesCounter.value, count.value)
          router.push('/real-estate/عقارات');
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
  async function DeleteImage(fileName, imageId) {
    loading.value = true;
    try {
      const { data: file, error } = await useFetch(`${BaseURL}/File`, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${userStore.getToken}`
          // "Authorization": `Bearer ${token}` 
        },
        method: "DELETE",
        params: { fileName: fileName, id: imageId }
      })
      if (error.value) {
        ComposableError.handelErros(error)
        loading.value = false
      }
      else {
        if (file.value.code === 0) { toast.success("تم حذف الصورة ") }
        const index = OneAdvertisment.value.imageIDs.findIndex((item) => {
          return item.id === imageId
        })
        if (index !== -1) {
          OneAdvertisment.value.imageIDs.splice(index, 1)
          console.log('Object removed:');
        } else {
          console.log('Object not found');
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
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements/GetAllByFilterAsync/${fields.AdvertisementTypeId}`, { params: fields })
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else {
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
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements/GetAllBySubCatogryAsync`, { params: { SubcatogryId: id } })
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else {
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
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements/GetAllByUsderIdAsync`, {
        headers: {
          "Authorization": `Bearer ${userStore.getToken}`
        },
        params: { userId: userId }
      }
      )
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else {
        loading.value = false;
        UserAdvertisments.value = advertisments.value.content;
      }


    }
    catch (error) {
      ComposableError.handelErros(error)
      loading.value = false
    }
  }
  // Delete Advertisement 
  async function DeleteAdvertisement(id) {
    console.log(id)
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(`${BaseURL}/Advertisements`, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${userStore.getToken}`
        },
        method: "DELETE",
        params: { id: id }
      })
      console.log(advertisments)
      if (error.value) {
        ComposableError.handelErros(error.value)
        loading.value = false
      }
      else {
        if (advertisments.value.code === 0) { toast.success("تم حذف الإعلان بنجاح") }
        const index = Advertisments.value.findIndex(item => {
          return item.id === id
        })
        if (index !== -1) {
          Advertisments.value.splice(index, 1)
          console.log('Object removed:');
        } else {
          console.log('Object not found');
        }
        loading.value = false;
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
  return { Advertisments, getAdvertisments, loading, success_message, getstopScrolling, getOneAdvertisment,getUserAdvertisments,getRequestedAdvertisement, error_message, DeleteImage, UpdateAdvertisement, DeleteAdvertisement, GetAdvertisementByID, setCounterImage, ReturnNewAdvertismentID, GetAllAdvertismentsBySubcategory, GetAllAdvertismentsByUser, FilterAdvertisements, AddNewAdvertisment, AddImageToAdvertisment, GetAllAdvertisments }
})