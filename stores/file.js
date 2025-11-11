import { useToast } from "vue-toastification";
import { useUserStore } from "./auth";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers": "*",
};
export const useFileStore = defineStore("file", () => {
  const runtimeConfig = useRuntimeConfig();
  const userStore = useUserStore();
  const BaseURL = runtimeConfig.public.apiBase;
  const toast = useToast();
  const ComposableError = useErrorHandle();
const images = ref({
    loading: false,
    content: []
})

   async function UploadImage(payload, imageNumber, name) {
    images.value.loading = true;
    try {
      const { data: file, error } = await useFetch(`${BaseURL}/Files/upladFiles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.getToken}`,
          // "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify([payload]),
      });
      if (error.value) {
        ComposableError.handelErros(error);
        throw error.value;
      } else {
        if (file.value.code === 0) {
            if (imageNumber) {toast.success(`تم إضافة الصورة ${imageNumber} بنجاح`);}
            else if (name) {toast.success(`تم إضافة ${name} بنجاح`);}
            else toast.success(`تم إضافة الصورة بنجاح`);
            images.value.content.push(file.value.content);
            return file.value.content;
        } else {
          ComposableError.handelErros(file.value);
        }
      }
    } catch (error) {
      ComposableError.handelErros(error);
      images.value.loading = false;
    }
    finally {
        images.value.loading = false
    }
  }
 async function DeleteFile(object) {
    images.value.loading = true;
    success.value = false;
    try {
      
        const { data, code } = await useServerAPI(`/Files/DeleteById`, {
          method: "DELETE",
          params: {
            id: object.id
          }
        });
        if (data) {
          toast.success("تم حذف الملف بنجاح")
          success.value = true;
        }
      
    } finally {
      images.value.loading = false;
    }
  }

  return {
    UploadImage,
    DeleteFile
  }
})