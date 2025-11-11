import { useToast } from "vue-toastification";

export const useLoctaionStore = defineStore("location", () => {
  const toast = useToast();
  const ComposableError = useErrorHandle();
  const fileStore = useFileStore();
  const locations = ref({
    loading: false,
    content: [],
  });
  const success = ref(false);
  async function GetAllLocations() {
    locations.value.loading = true;
    try {
      
        const { data, code } = await useServerAPI(`/location/GetAllAsync`);
        if (data) {
          locations.value.content = data;
        }
      
    } finally {
      locations.value.loading = false;
    }
  }
  async function AddNewLoctaion(payload) {
    locations.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/location`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (data) {
          locations.value.content.push(data);
          success.value = true;
        }
      
    } finally {
      locations.value.loading = false;
    }
  }
  async function EditLoctaion(payload) {
    locations.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/location`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        if (data) {
          let cityIndex = locations.value.content.findIndex((city) => city.id === payload.id)
          if (cityIndex != -1) {
            locations.value.content.splice(cityIndex, payload)
          }
          success.value = true;
        }
      
    } finally {
      locations.value.loading = false;
    }
  }
  async function DeleteLoctaion(id) {
    locations.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/location`, {
          method: "DELETE",
          params: {
            id: id
          }
        });
        if (data) {
          let cityIndex = locations.value.content.findIndex((city) => city.id === id)
          if (cityIndex != -1) {
            locations.value.content.splice(cityIndex, 1)
          }
          success.value = true;
        }
      
    } finally {
      locations.value.loading = false;
    }
  }

  return {
    locations,
    success,
    GetAllLocations,
    AddNewLoctaion,
    EditLoctaion,
    DeleteLoctaion
  };
});
