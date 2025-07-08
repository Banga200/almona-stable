<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useFileStore } from "~/stores/file";
const emit = defineEmits(["save"]);
const cityStore = useCityStore();
const locationStore = useLoctaionStore();
const { error } = useToast();
const fileStore = useFileStore();
const formRef = ref();
const form = ref({
  title: "",
  content: '',
  images: null,
});
const imagePreview = ref(null);
onMounted(() => {
  
});
watch(
  () => form.value.images,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      imagePreview.value = URL.createObjectURL(newVal[0]);
    } else {
      imagePreview.value = null;
    }
  }
);

const savePost = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    emit("save", form.value);
  }
};
defineExpose({
  form
})
</script>

<template>
  <v-form class="pa-6" @submit.prevent="savePost" ref="formRef">
     <v-file-input
              variant="outlined"
              density="compact"
              rounded="lg"
              label="الصور"
              v-model="form.images"
              accept="image/*"
              clearable
              show-size
              counter
              multiple
              chips
              :rules="requiredField"
            prepend-icon="mdi-camera"/>
      
        <div class="d-flex ga-4 flex-wrap">
          <v-text-field
            v-model="form.title"
            label="العنوان"
            variant="outlined"
            density="comfortable"
            :rules="requiredField"
          />
        </div>

        <div class="d-flex ga-4 flex-wrap">
          <v-textarea
            v-model="form.content"
            label="المحتوى"
            variant="outlined"
            rows="8"
            :rules="requiredField"
          />
        </div>
    

    <v-btn type="submit" color="success" class="mt-8 white" block>حفظ</v-btn>
  </v-form>
</template>
