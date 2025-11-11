import { useToast } from "vue-toastification";

export const useCityStore = defineStore("city", () => {
  const toast = useToast();
  const ComposableError = useErrorHandle();
  const fileStore = useFileStore();
  const cities = ref({
    loading: false,
    content: [],
  });
  const success = ref(false);
  async function GetAllCities() {
    cities.value.loading = true;
    try {
      
        const { data, code } = await useServerAPI(`/City/GetAllAsync`);
        if (data) {
          cities.value.content = data;
        }
      
    } finally {
      cities.value.loading = false;
    }
  }
  async function AddNewCity(payload) {
    cities.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/city`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (data) {
          cities.value.content.push(data);
          success.value = true;
        }
      
    } finally {
      cities.value.loading = false;
    }
  }
  async function EditCity(payload) {
    cities.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/city`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        if (data) {
          let cityIndex = cities.value.content.findIndex((city) => city.id === payload.id)
          if (cityIndex != -1) {
            cities.value.content.splice(cityIndex, payload)
          }
          success.value = true;
        }
      
    } finally {
      cities.value.loading = false;
    }
  }
  async function DeleteCity(id) {
    cities.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/city`, {
          method: "DELETE",
          params: {
            id: id
          }
        });
        if (data) {
          let cityIndex = cities.value.content.findIndex((city) => city.id === id)
          if (cityIndex != -1) {
            cities.value.content.splice(cityIndex,1)
          }
          success.value = true;
        }
      
    } finally {
      cities.value.loading = false;
    }
  }

  return {
    cities,
    success,
    GetAllCities,
    AddNewCity,
    EditCity,
    DeleteCity
  };
});
