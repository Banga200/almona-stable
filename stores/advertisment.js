import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { useUserStore } from "./auth";
import { useRouter } from "vue-router";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "*",
};
export const useAdvertismentStore = defineStore("Advertisment", () => {
  const runtimeConfig = useRuntimeConfig();
  const userStore = useUserStore();
  const BaseURL = runtimeConfig.public.apiBase;
  const toast = useToast();
  const ComposableError = useErrorHandle();
  const router = useRouter();
  const { token } = useUser();
  // States
  // Holds All Advertisment
  const Advertisments = ref([]);
  const OneAdvertisment = ref([]);
  const ReturnNewAdvertismentID = ref(0);
  const ImagesCounter = ref(0);
  const UserAdvertisments = ref([]);
  const RequestedAdvertisement = ref([]);
  // loading
  const loading = ref(false);
  const success_message = ref(null);
  const error_message = ref(null);
  const stopScrolling = ref(false);
  // Getters
  const getAdvertisments = computed(() => {
    return Advertisments.value;
  });
  const getOneAdvertisment = computed(() => {
    return OneAdvertisment.value;
  });
  const getstopScrolling = computed(() => {
    return stopScrolling.value;
  });
  const getUserAdvertisments = computed(() => {
    return UserAdvertisments.value;
  });
  const getRequestedAdvertisement = computed(() => {
    return RequestedAdvertisement.value;
  });
  // Actions
  // Get All Advertisments
  async function GetAllAdvertisments(advertisId, page) {
    loading.value = true;
    try {
      const advertisments = await $fetch(
        `${BaseURL}/Advertisements/GetAllByTypeAsync`,
        {
          params: {
            AdversmentTypeId: advertisId,
            page: page ? page : 1,
            pageSize: 15,
          },
        }
      )
        .then((res) => {
          if (res) {
            loading.value = false;
            if (res.code > 0) {
              toast.error(res.message);
              return;
            }
            if (advertisId === 1) {
              Advertisments.value = res.content;
            } else {
              RequestedAdvertisement.value = res.content;
            }
          } else {
            loading.value = false;
          }
        })
        .catch((error) => {
          loading.value = false;
        });
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
    }
  }
  // Get Advertisment By ID
  async function GetAdvertisementByID(id) {
    loading.value = true;
    try {
      const { data: advertisment, error } = await useFetch(
        `${BaseURL}/Advertisements`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { id: id },
        }
      );
      if (error.value) {
        ComposableError.handelErros(error.value);
        loading.value = false;
      } else {
        loading.value = false;
        OneAdvertisment.value = advertisment.value.content;
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
    }
  }
  // Add New Advertisment
  async function AddNewAdvertisment(payload) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(
        `${BaseURL}/Advertisements`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userStore.getToken}`,
            // "Authorization": `Bearer ${token}`
          },
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      if (error.value) {
        ComposableError.handelErros(error.value);
        loading.value = false;
        error_message.value = true;
      } else {
        ReturnNewAdvertismentID.value = advertisments.value.content.id;
        if (advertisments.value.code === 0) {
          toast.success("تم إضافة الإعلان بنجاح");
        }
        loading.value = false;
        error_message.value = false;
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
      error_message.value = true;
    }
  }

  // Update Advertisement
  async function UpdateAdvertisement(payload) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(
        `${BaseURL}/Advertisements`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userStore.getToken}`,
            // "Authorization": `Bearer ${token}`
          },
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );
      if (error.value) {
        ComposableError.handelErros(error.value);
        loading.value = false;
        error_message.value = true;
      } else {
        ReturnNewAdvertismentID.value = advertisments.value.content.id;
        if (advertisments.value.code === 0) {
          toast.success("تم التعديل الإعلان بنجاح");
        }
        loading.value = false;
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
      error_message.value = true;
    }
  }
  // Add Images to Advertisments
  async function AddImageToAdvertisment(payload, imageNumber) {
    loading.value = true;
    try {
      const { data: file, error } = await useFetch(`${BaseURL}/File`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.getToken}`,
          // "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (error.value) {
        ComposableError.handelErros(error);
        loading.value = false;
        success_message.value = false;
      } else {
        if (file.value.code === 0) {
          toast.success(`تم إضافة الصورة ${imageNumber} بنجاح`);
          success_message.value = true;
          loading.value = false;
        } else {
          ComposableError.handelErros(file.value);
          loading.value = false;
          success_message.value = false;
        }
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
      success_message.value = false;
    }
  }
  async function DeleteImage(fileName, imageId) {
    loading.value = true;
    try {
      const { data: file, error } = await useFetch(`${BaseURL}/File`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.getToken}`,
          // "Authorization": `Bearer ${token}`
        },
        method: "DELETE",
        params: { fileName: fileName, id: imageId },
      });
      if (error.value) {
        ComposableError.handelErros(error);
        loading.value = false;
      } else {
        if (file.value.code === 0) {
          toast.success("تم حذف الصورة ");
        }
        const index = OneAdvertisment.value.imageIDs.findIndex((item) => {
          return item.id === imageId;
        });
        if (index !== -1) {
          OneAdvertisment.value.imageIDs.splice(index, 1);
        }

        loading.value = false;
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
    }
  }
  async function FilterAdvertisements(fields, adversmentTypeId, page) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(
        `${BaseURL}/Advertisements/GetAllByFilterAsync/${adversmentTypeId}`,
        {
          params: {
            ...fields,
            page: page ? page : 1,
            pageSize: 20,
          },
        }
      );
      if (error.value) {
        ComposableError.handelErros(error.value);
        loading.value = false;
      } else {
        loading.value = false;
        Advertisments.value = advertisments.value.content;
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
    }
  }
  async function GetAllAdvertismentsBySubcategory(id, page) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(
        `${BaseURL}/Advertisements/GetAllBySubCatogryAsync`,
        {
          params: {
            SubcatogryId: id,
            page: page ? page : 1,
            pageSize: 20,
          },
        }
      );
      if (error.value) {
        ComposableError.handelErros(error.value);
        loading.value = false;
      } else {
        loading.value = false;
        Advertisments.value = advertisments.value.content;
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
    }
  }
  async function GetAllAdvertismentsByUser(userId, page) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(
        `${BaseURL}/Advertisements/GetAllByUsderIdAsync`,
        {
          headers: {
            Authorization: `Bearer ${userStore.getToken}`,
          },
          params: {
            page: page,
            pageSize: 15,
            userId: userId,
          },
        }
      );
      if (error.value) {
        ComposableError.handelErros(error.value);
        loading.value = false;
      } else {
        loading.value = false;
        UserAdvertisments.value = advertisments.value.content;
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
    }
  }
  // Delete Advertisement
  async function DeleteAdvertisement(id) {
    loading.value = true;
    try {
      const { data: advertisments, error } = await useFetch(
        `${BaseURL}/Advertisements`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userStore.getToken}`,
          },
          method: "DELETE",
          params: { id: id },
        }
      );
      if (error.value) {
        ComposableError.handelErros(error.value);
        loading.value = false;
      } else {
        if (advertisments.value.code === 0) {
          toast.success("تم حذف الإعلان بنجاح");
        }
        const index = Advertisments.value.findIndex((item) => {
          return item.id === id;
        });
        if (index !== -1) {
          Advertisments.value.splice(index, 1);
        }
        loading.value = false;
      }
    } catch (error) {
      ComposableError.handelErros(error);
      loading.value = false;
    }
  }
  function setCounterImage(number) {
    ImagesCounter.value = number;
  }
  return {
    Advertisments,
    getAdvertisments,
    loading,
    success_message,
    getstopScrolling,
    getOneAdvertisment,
    getUserAdvertisments,
    getRequestedAdvertisement,
    error_message,
    DeleteImage,
    UpdateAdvertisement,
    DeleteAdvertisement,
    GetAdvertisementByID,
    setCounterImage,
    ReturnNewAdvertismentID,
    GetAllAdvertismentsBySubcategory,
    GetAllAdvertismentsByUser,
    FilterAdvertisements,
    AddNewAdvertisment,
    AddImageToAdvertisment,
    GetAllAdvertisments,
  };
});
