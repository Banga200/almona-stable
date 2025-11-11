import { useToast } from "vue-toastification";

export const useServiceStore = defineStore("service", () => {
  const toast = useToast();
  const ComposableError = useErrorHandle();
  const fileStore = useFileStore();
   const service = ref({
    loading: false,
    content: {},
  });
  const services = ref({
    loading: false,
    content: [],
  });
  const success = ref(false);
  async function GetAllServices(pageSize = 100, search = '') {
    services.value.loading = true;
    try {
      const { data, code } = await useServerAPI(`/BusinessService/Paged`, {
        params: {
            page: 1,
            Pagesize: pageSize,
            SearchItem: search
          }
      });
      if (data) {
        services.value.content = data.entities;
      }
    } finally {
      services.value.loading = false;
    }
  }
  async function GetServiceById(id) {
    service.value.loading = true;
    success.value = false;
    try {
        const { data, code } = await useServerAPI(`/BusinessService/${id}`, {
          params: {
            id: id
          }
        }); 
        if (data) {
          service.value.content = data;
          success.value = true;
        }
      
    } finally {
      service.value.loading = false;
    }
  }
  async function AddNewService(payload) {
    let body = payload
    services.value.loading = true;
    success.value = false;
    let imageIds = []
    try {
      for (let index = 0; index < body.images.length; index++) {
        const element = body.images[index];
        if (element instanceof File || element instanceof Blob) {
        const image = await prepareUploadFileObject(element);
        const upload = await fileStore.UploadImage(image, index + 1);
        imageIds.push(upload[0].id);
       } else {
          // Already an ID — keep it
          imageIds.push(element);
        }
      }
      if(isNaN(body.logoId)) {
        if (Array.isArray(body.logoId) && (body.logoId[0] instanceof File || body.logoId[0] instanceof Blob)) {
          const image = await prepareUploadFileObject(body.logoId[0]);
          const upload = await fileStore.UploadImage(image);
          body.logoId = upload[0].id
        }
      }
      body.images = imageIds;
      body = await SetUpBody(body)      
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
    let body = payload
    services.value.loading = true;
    success.value = false;
    let imageIds = []
    try {
       for (let index = 0; index < body.images.length; index++) {
        const element = body.images[index];
        if (element instanceof File || element instanceof Blob) {
        const image = await prepareUploadFileObject(element);
        const upload = await fileStore.UploadImage(image, index + 1);
        imageIds.push(upload[0].id);
       } else {
          // Already an ID — keep it
          imageIds.push(element);
        }
      }
      if(isNaN(body.logoId)) {
        if (Array.isArray(body.logoId) && (body.logoId[0] instanceof File || body.logoId[0] instanceof Blob)) {
          const image = await prepareUploadFileObject(body.logoId[0]);
          const upload = await fileStore.UploadImage(image);
          body.logoId = upload[0].id
        }
      }
      body.images = imageIds;
      body = await SetUpBody(body, true)      
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
    let body = {
      ...(isEdit ? {id: data.id }: {}),
      name: data.name,
      description: data.description,
      serviceDetails: data.serviceDetails.filter(obj =>
              Object.keys(obj).length > 0 &&
              obj.value !== undefined &&
              obj.value !== null &&
              obj.value !== ''
        ),
      images: data.images,
      logoId: data.logoId
    };
    return body;
  }
  return {
    services,
    service,
    success,
    AddNewService,
    GetAllServices,
    GetServiceById,
    EditService,
    DeleteService,
  };
});
