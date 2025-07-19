import { useToast } from "vue-toastification";

export const useTeamMemberstore = defineStore("teamMember", () => {
  const toast = useToast();
  const ComposableError = useError();
  const fileStore = useFileStore();
  const teamMembers = ref({
    loading: false,
    content: [],
  });
  const teamMember = ref({
    loading: false,
    content: {},
  });
  const success = ref(false);

  async function GetAllTeamMembers() {
    teamMembers.value.loading = true;
    try {
      
        const { data, code } = await useServerAPI(`/TeamMember/paged`, {
          params: {
            page: 1,
            Pagesize: 100
          }
        });
        if (data) {
          teamMembers.value.content = data.entities;
        }
      
    } finally {
      teamMembers.value.loading = false;
    }
  }
  async function AddNewTeamMember(payload) {
    let body = payload
    teamMembers.value.loading = true;
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
        body = await SetUpBody(body)
        const { data, code } = await useServerAPI(`/TeamMember`, {
          method: "POST",
          body: JSON.stringify(body),
        }); 
        if (data) {
          teamMembers.value.content.push(data);
          success.value = true;
        }
      
    } finally {
      teamMembers.value.loading = false;
    }
  }
  async function GetteamMemberById(id) {
    teamMember.value.loading = true;
    success.value = false;
    try {
        const { data, code } = await useServerAPI(`/TeamMember`, {
          params: {
            id: id
          }
        }); 
        if (data) {
          teamMember.value.content = data;
          success.value = true;
        }
      
    } finally {
      teamMember.value.loading = false;
    }
  }
 async function EditTeamMember(payload) {
  let body = { ...payload }; // shallow clone to avoid mutating original
  teamMembers.value.loading = true;
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
    body.teamMemberType = 2;
    body = await SetUpBody(body, true)
    const { data, code } = await useServerAPI(`/TeamMember`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (data) {
      // Optional: update existing teamMember instead of just pushing
      let teamMemberIndex = teamMembers.value.content.findIndex((teamMember) => {
        return teamMember.id === payload.id
      })
      if (teamMemberIndex != -1) {
        teamMembers.value.content.splice(teamMemberIndex, payload);    
      }
      toast.success("تم التعديل بنجاح")
      success.value = true;
    }
  } finally {
    teamMembers.value.loading = false;
  }
}

 async function DeleteTeamMember(id) {
    teamMembers.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/TeamMember`, {
          method: "DELETE",
          params: {
            id: id
          }
        });
        if (data) {
          let teamMemberIndex = teamMembers.value.content.findIndex((teamMember) => teamMember.id === id)
          if (teamMemberIndex != -1) {
            teamMembers.value.content.splice(teamMemberIndex,1)
          }
          toast.success("تم الحذف بنجاح")
          success.value = true;
        }
      
    } finally {
      teamMembers.value.loading = false;
    }
  }

  async function SetUpBody(data, isEdit = false) {
  const body = {
    ...(isEdit ? { id: data.id } : {}),
    fullName: data.fullName,
    email: data.email,
    jobTitle: data.jobTitle,
    phoneNumber: data.phoneNumber,
    description: data.description,
    imagesIdsSerialized: data.imagesIdsSerialized,
    images: data.images,
    skills: (data.skills || []).filter(skill =>
      skill &&
      Object.keys(skill).length > 0 &&
      skill.skillName?.trim() !== ''
    ).map(skill => ({
      ...(isEdit ? { id: skill.id } : {}),
      teamMemberId: skill.teamMemberId,
      skillName: skill.skillName,
      skillDescription: skill.skillDescription
    }))
  };

  return body;
}

  return {
    teamMembers,
    teamMember,
    success,
    AddNewTeamMember,
    GetteamMemberById,
    EditTeamMember,
    GetAllTeamMembers,
    DeleteTeamMember 
  };
});
