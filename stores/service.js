import { useToast } from "vue-toastification";

export const useServiceStore = defineStore("service", () => {
  const toast = useToast();
  const ComposableError = useError();
  const fileStore = useFileStore();
  const services = ref({
    loading: false,
    content: [],
  });
  const success = ref(false);
  async function GetAllServices() {
    services.value.loading = true;
    try {
      const { data, code } = await useServerAPI(`/BusinessService/GetAll`);
      if (data) {
        services.value.content = data;
      }
    } finally {
      services.value.loading = false;
    }
  }
  async function AddNewService(payload) {
    services.value.loading = true;
    success.value = false;
    try {
      console.log(payload);
      const { data, code } = await useServerAPI(`/BusinessService`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (data) {
        services.value.content.push(data);
        success.value = true;
      }
    } finally {
      services.value.loading = false;
    }
  }
  async function EditService(payload) {
    services.value.loading = true;
    success.value = false;
    let body = await SetUpBody(payload, true);
    try {
      const { data, code } = await useServerAPI(`/BusinessService`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      if (data) {
        let serviceIndex = services.value.content.findIndex(
          (service) => service.id === payload.id
        );
        if (serviceIndex != -1) {
          services.value.content.splice(serviceIndex, payload);
        }
        success.value = true;
        toast.success("تم التعديل بنجاح")

      }
    } finally {
      services.value.loading = false;
    }
  }
  async function DeleteService(id) {
    services.value.loading = true;
    success.value = false;
    try {
      const { data, code } = await useServerAPI(`/BusinessService`, {
        method: "DELETE",
        params: {
          id: id,
        },
      });
      if (data) {
        let serviceIndex = services.value.content.findIndex(
          (service) => service.id === id
        );
        if (serviceIndex != -1) {
          services.value.content.splice(serviceIndex, 1);
        }
        success.value = true;
        toast.success("تم الحذف بنجاح")
      }
    } finally {
      services.value.loading = false;
    }
  }
  async function SetUpBody(data, isEdit = false) {
    console.log(data)
    let body = {
      ...(isEdit ? {id: data.id }: {}),
      name: data.name,
      description: data.description,
      serviceDetails: data.serviceDetails,
    };
    return body;
  }
  return {
    services,
    success,
    AddNewService,
    GetAllServices,
    EditService,
    DeleteService,
  };
});
