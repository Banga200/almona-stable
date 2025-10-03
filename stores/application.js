import { useToast } from "vue-toastification";

export const useApplicationStore = defineStore("Application", () => {
  const toast = useToast();
  const ComposableError = useError();
  const fileStore = useFileStore();
  const applications = ref({
    loading: false,
    content: [],
    currentPage: 1,
  });
  const application = ref({
    loading: false,
    content: {},
  });
  const success = ref(false);

  async function GetAllApplications(page = 1, pageSize = 40) {
    applications.value.loading = true;
    try {
      
        const { data, code } = await useServerAPI(`/Application/Paged`, {
          params: {
            page,
            pageSize
          }
         });
        if (data) {
          page > 1 ? applications.value.content.push(...data) : applications.value.content = data;
        }
      
    } finally {
      applications.value.loading = false;
    }
  }
  async function GetApplicationById(id) {
    application.value.loading = true;
    try {
      
        const { data, code } = await useServerAPI(`/Application`, {
          params: {
            id: id
          }
        });
        if (data) {
          application.value.content = data;
        }
      
    } finally {
      application.value.loading = false;
    }
  }
  async function AddNewApplication(payload) {
    let body = payload
    applications.value.loading = true;
    success.value = false;
    let fileId = null
    try {
      if (body.file instanceof File || body.file instanceof Blob) {
        const file = await prepareUploadFileObject(body.file);
        const upload = await fileStore.UploadImage(file, null, "المرفق");
        fileId = upload[0].id;
      } else {
        // Already an ID — keep it
        fileId = body.file;
      }
      body.fileId = fileId;
        body = await SetUpBody(body)
        const { data, code } = await useServerAPI(`/Application`, {
          method: "POST",
          body: JSON.stringify(body),
        }); 
        if (data) {
          applications.value.content.push(data);
          success.value = true;
        }
      
    } finally {
      applications.value.loading = false;
    }
  }
 async function EditApplication(payload) {
  let body = { ...payload }; // shallow clone to avoid mutating original
  applications.value.loading = true;
  success.value = false;

  try {
    let fileIds = [];

    for (let index = 0; index < body.file.length; index++) {
      const element = body.file[index];

      if (element instanceof File || element instanceof Blob) {
        const file = await prepareUploadFileObject(element);
        const upload = await fileStore.UploadImage(file, index + 1);
        fileIds.push(upload[0].id);
      } else {
        // Already an ID — keep it
        fileIds.push(element);
      }
    }

    body.fileId = fileIds;
    body = await SetUpBody(body, true)
    const { data, code } = await useServerAPI(`/Application`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (data) {
      // Optional: update existing Application instead of just pushing
      let ApplicationIndex = applications.value.content.findIndex((Application) => {
        return Application.id === payload.id
      })
      if (ApplicationIndex != -1) {
        applications.value.content.splice(ApplicationIndex, payload);    
      }
      toast.success("تم التعديل بنجاح")
      success.value = true;
    }
  } finally {
    applications.value.loading = false;
  }
}

 async function DeleteApplication(id) {
    applications.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/Application`, {
          method: "DELETE",
          params: {
            id: id
          }
        });
        if (data) {
          let ApplicationIndex = applications.value.content.findIndex((Application) => Application.id === id)
          if (ApplicationIndex != -1) {
            applications.value.content.splice(ApplicationIndex,1)
          }
          toast.success("تم الحذف بنجاح")
          success.value = true;
        }
      
    } finally {
      applications.value.loading = false;
    }
  }
  async function SetUpBody(data,isEdit = false) {
    let body = {
        ...(isEdit ? {"id": data.id}: {}),
        "fullName": data.fullName,
        "email": data.email,
        "phone": data.phone,
        "serviceType": data.serviceType,
        "content": data.content,
        "fileId": data.fileId
    }
    return body
  } 
  return {
    applications,
    application,
    success,
    AddNewApplication,
    EditApplication,
    GetAllApplications,
    GetApplicationById,
    DeleteApplication
  };
});
