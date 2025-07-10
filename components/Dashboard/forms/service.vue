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
  name: "",
  description: '',
  serviceDetails: [{}],
  images: null,
  logoId: null
});
onMounted(() => {
  
});

const addAchievement = () => {
  form.value.serviceDetails.push({});
};

const removeAchievement = (index) => {
  form.value.serviceDetails.splice(index, 1);
};

const saveService = async () => {
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
  <v-form class="pa-6" @submit.prevent="saveService" ref="formRef">
    <v-row>
      <v-col>
         <v-file-input
              variant="outlined"
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
              prepend-icon="mdi-camera"
            />
      </v-col>
      <v-col>
       <v-file-input
              variant="outlined"
              rounded="lg"
              label="ايقونة الخدمة"
              v-model="form.logoId"
              accept="image/*"
              clearable
              show-size
              counter
              multiple
              chips
              :rules="requiredField"
              prepend-icon="mdi-camera"
            />
      </v-col>
    </v-row>
    <v-row class="ga-6">
      <v-col cols="12" lg="6">
        <div class="d-flex ga-4 flex-wrap">
          <v-text-field
            v-model="form.name"
            label="اسم الخدمة"
            variant="outlined"
            density="comfortable"
            :rules="requiredField"
          />
        </div>

        <div class="d-flex ga-4 flex-wrap">
          <v-textarea
            v-model="form.description"
            label="الوصف"
            variant="outlined"
            rows="3"
            :rules="requiredField"
          />
        </div>
      </v-col>

      <v-col cols="12" lg="5">
        <h3 class="text-lg font-weight-bold mb-2">الإنجازات</h3>
        <v-row
          v-for="(service, index) in form.serviceDetails"
          :key="index"
          class="align-center mb-2"
        >
          <v-col cols="8">
            <v-text-field
              :hide-details="true"
              v-model="service.value"
              :label="`إنجاز ${index + 1}`"
              variant="outlined"
            />
          </v-col>
          <v-col cols="1" class="text-end">
            <v-btn
              icon
              @click="removeAchievement(index)"
              v-if="form.serviceDetails.length > 1"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn
          color="primary"
          class="mb-4"
          @click="addAchievement"
          prepend-icon="mdi-plus"
          variant="tonal"
        >
          إضافة إنجاز
        </v-btn>
      </v-col>
    </v-row>
    <v-btn type="submit" color="success" class="mt-8 white" block>حفظ</v-btn>
  </v-form>
</template>
