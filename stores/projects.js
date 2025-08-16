import { useToast } from "vue-toastification";

export const useProjectStore = defineStore("project", () => {
  const toast = useToast();
  const ComposableError = useError();
  const fileStore = useFileStore();
  const projects = ref({
    loading: false,
    content: [],
  });
  const project = ref({
    loading: false,
    content: {},
  });
  const success = ref(false);

  async function GetAllProjects(projectType = 2, pageSize = 100) {
    projects.value.loading = true;
    try {
      
        const { data, code } = await useServerAPI(`/Project/paged`, {
          params: {
            page: 1,
            Pagesize: pageSize,
            projectType: projectType 
          }
        });
        if (data) {
          projects.value.content = data.entities;
        }
      
    } finally {
      projects.value.loading = false;
    }
  }
  async function AddNewProject(payload) {
    let body = payload
    projects.value.loading = true;
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
        body.images = imageIds;
        body.projectType = 2
        body = await SetUpBody(body)
        const { data, code } = await useServerAPI(`/Project`, {
          method: "POST",
          body: JSON.stringify(body),
        }); 
        if (data) {
          projects.value.content.push(data);
          success.value = true;
        }
      
    } finally {
      projects.value.loading = false;
    }
  }
  async function GetProjectById(id) {
    project.value.loading = true;
    success.value = false;
    try {
        const { data, code } = await useServerAPI(`/Project`, {
          params: {
            id: id
          }
        }); 
        if (data) {
          project.value.content = data;
          success.value = true;
        }
      
    } finally {
      project.value.loading = false;
    }
  }
 async function EditProject(payload) {
  let body = { ...payload }; // shallow clone to avoid mutating original
  projects.value.loading = true;
  success.value = false;

  try {
    let imageIds = [];

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

    body.images = imageIds;
    body.projectType = 2;
    body = await SetUpBody(body, true)
    const { data, code } = await useServerAPI(`/Project`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (data) {
      // Optional: update existing project instead of just pushing
      let projectIndex = projects.value.content.findIndex((project) => {
        return project.id === payload.id
      })
      if (projectIndex != -1) {
        projects.value.content.splice(projectIndex, payload);    
      }
      toast.success("تم التعديل بنجاح")
      success.value = true;
    }
  } finally {
    projects.value.loading = false;
  }
}

 async function DeleteProject(id) {
    projects.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/Project`, {
          method: "DELETE",
          params: {
            id: id
          }
        });
        if (data) {
          let projectIndex = projects.value.content.findIndex((project) => project.id === id)
          if (projectIndex != -1) {
            projects.value.content.splice(projectIndex,1)
          }
          toast.success("تم الحذف بنجاح")
          success.value = true;
        }
      
    } finally {
      projects.value.loading = false;
    }
  }

  async function SetUpBody(data,isEdit = false) {
    if (isEdit) {
      data.details = data.details.map(obj => ({
            ...obj,
            projectId: data.id
        }));
    }
    let body = {
      ...(isEdit ? {"id": data.id}: {}),
      "name": data.name,
      "foreignName": data.foreignName,
      "description": data.description,
      "title": data.title,
      "foreignDescription": data.foreignDescription,
      "foreignTitle": data.foreignTitle,
      "cityId": data.cityId,
      "projectType": 2,
      "date": new Date(data.date).toISOString(),
      "numberOfCompanies": data.numberOfCompanies,
      "locationId": data.locationId,
      "images": data.images,
      "statistics": data.statistics.filter(obj =>
              Object.keys(obj).length > 0 &&
              obj.value !== undefined &&
              obj.value !== null &&
              obj.value !== ''
        ),
      "details": data.details.filter(obj =>
              Object.keys(obj).length > 0 &&
              obj.title !== undefined &&
              obj.title !== null &&
              obj.title !== ''
        )
    }
    return body
  }
  return {
    projects,
    project,
    success,
    AddNewProject,
    GetProjectById,
    EditProject,
    GetAllProjects,
    DeleteProject 
  };
});
