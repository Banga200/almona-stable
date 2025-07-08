import { useToast } from "vue-toastification";

export const usePostStore = defineStore("post", () => {
  const toast = useToast();
  const ComposableError = useError();
  const fileStore = useFileStore();
  const posts = ref({
    loading: false,
    content: [],
  });
  const success = ref(false);

  async function GetAllPosts() {
    posts.value.loading = true;
    try {
      
        const { data, code } = await useServerAPI(`/Post/GetAllAsync`);
        if (data) {
          posts.value.content = data;
        }
      
    } finally {
      posts.value.loading = false;
    }
  }
  async function AddNewPost(payload) {
    let body = payload
    posts.value.loading = true;
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
        body.images =  imageIds;
        body = await SetUpBody(body)
        const { data, code } = await useServerAPI(`/Post`, {
          method: "POST",
          body: JSON.stringify(body),
        }); 
        if (data) {
          posts.value.content.push(data);
          success.value = true;
        }
      
    } finally {
      posts.value.loading = false;
    }
  }
 async function EditPost(payload) {
  let body = { ...payload }; // shallow clone to avoid mutating original
  posts.value.loading = true;
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
    body = await SetUpBody(body, true)
    const { data, code } = await useServerAPI(`/Post`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (data) {
      // Optional: update existing Post instead of just pushing
      let PostIndex = posts.value.content.findIndex((Post) => {
        return Post.id === payload.id
      })
      if (PostIndex != -1) {
        posts.value.content.splice(PostIndex, payload);    
      }
      toast.success("تم التعديل بنجاح")
      success.value = true;
    }
  } finally {
    posts.value.loading = false;
  }
}

 async function DeletePost(id) {
    posts.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/Post`, {
          method: "DELETE",
          params: {
            id: id
          }
        });
        if (data) {
          let PostIndex = posts.value.content.findIndex((Post) => Post.id === id)
          if (PostIndex != -1) {
            posts.value.content.splice(PostIndex,1)
          }
          toast.success("تم الحذف بنجاح")
          success.value = true;
        }
      
    } finally {
      posts.value.loading = false;
    }
  }
  async function SetUpBody(data,isEdit = false) {
    let body = {
        ...(isEdit ? {"id": data.id}: {}),
        "title": data.title,
        "content": data.content,
        "images": data.images
    }
    return body
  } 
  return {
    posts,
    success,
    AddNewPost,
    EditPost,
    GetAllPosts,
    DeletePost 
  };
});
