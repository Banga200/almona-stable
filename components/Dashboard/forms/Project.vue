<script setup>
import { ref } from "vue";
const emit = defineEmits(["save"]);
const cityStore = useCityStore();
const locationStore = useLoctaionStore();
const formRef = ref();
const menu = ref(false);
const form = ref({
  images: null,
  name: "",
  foreignName: "",
  description: "",
  foreignDescription: "",
  date: null,
  dateShow: null,
  numberOfCompanies: "",
  statistics: [{}],
  locationId: null,
  cityId: null,
  details: [{}],
});
const imagePreview = ref(null);
onMounted(() => {
  cityStore.GetAllCities();
  locationStore.GetAllLocations();
});
watch(
  () => form.value.images,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      if (isNaN(newVal[0])) {
        imagePreview.value = URL.createObjectURL(newVal[0]);
      }
    } else {
      imagePreview.value = null;
    }
  }
);
const addStatistics = () => {
  form.value.statistics.push({});
};

const removeStatistics = (index) => {
  form.value.statistics.splice(index, 1);
};

const saveProject = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    emit("save", form.value);
  }
};
const rawDate = ref(null);

const onDateSelected = (date) => {
  rawDate.value = date;
  form.value.dateShow = formatDate(date);
  form.value.date = date;
  menu.value = false;
  
};
function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
function removeDetail(index) {
  form.value.details.splice(index, 1)
}
const addDetail = () => {
  form.value.details.push({});

}
defineExpose({
  form,
});
</script>

<template>
  <v-form class="pa-6" @submit.prevent="saveProject" ref="formRef">
    <v-row class="ga-6">
      <v-col cols="12" lg="6">
        <div class="d-flex align-center mb-4">
          <v-col cols="8">
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
              prepend-icon="mdi-camera"
            />
          </v-col>
          <!-- preview image  -->
          <div v-for="image in form.images" :key="image">
            <v-img
              loading="lazy"
              height="80"
              width="80"
              :src="useImageStream(image)"
              class="mx-2"
              v-if="!isNaN(image)"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0 align-center justify-center">
                  <v-progress-circular
                    indeterminate
                    color="teal"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
        </div>
        <div class="d-flex ga-4 flex-wrap">
          <v-text-field
            v-model="form.name"
            label="اسم المشروع"
            variant="outlined"
            density="comfortable"
            :rules="requiredField"
          />
          <v-text-field
            v-model="form.foreignName"
            label="Exhibition name"
            variant="outlined"
            density="comfortable"
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
          <v-textarea
            v-model="form.foreignDescription"
            label="Description"
            variant="outlined"
            rows="3"
          />
        </div>
        <v-row>
          <v-col>
            <v-combobox
              :items="cityStore.cities.content"
              item-value="id"
              v-model="form.cityId"
              :return-object="false"
              item-title="name"
              placeholder="اختر "
            />
          </v-col>
          <v-col>
            <v-combobox
              :items="locationStore.locations.content"
              placeholder="اختر الموقع"
              label="الموقع"
              item-value="id"
              v-model="form.locationId"
              :return-object="false"
              item-title="name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template #activator="{ props }">
                <v-text-field
                  v-model="form.dateShow"
                  v-bind="props"
                  label="تاريخ المشروع"
                  variant="outlined"
                  prepend-icon="mdi-calendar"
                  readonly
                />
              </template>

              <v-date-picker
                v-model="rawDate"
                @update:model-value="onDateSelected"
                locale="ar"
                color="primary"
              />
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.numberOfCompanies"
              label="عدد الشركات"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <h3 class="text-lg font-weight-bold mb-2">المراحل</h3>
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="(detail, index) in form.details"
            :key="index"
          >
            <v-expansion-panel-title>
              {{ detail.title || `المرحلة ${index + 1}` }}
              <v-spacer></v-spacer>
              <v-btn
                icon
                size="small"
                @click.stop="removeDetail(index)"
              v-if="form.details.length > 1">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <v-text-field
                v-model="detail.title"
                label="عنوان المرحلة"
                variant="outlined"
                class="mb-3"
              />
              <v-textarea
                v-model="detail.description"
                label="وصف المرحلة"
                rows="3"
                class="mb-3"
              />
              <v-textarea v-model="detail.summary" label="ملخص المرحلة" rows="3" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn text="إضافة مرحلة"
        color="primary"
          class="mt-4"
          @click="addDetail"
          prepend-icon="mdi-plus"
          variant="tonal"/>
      </v-col>
      <v-col cols="12" lg="5">
        <h3 class="text-lg font-weight-bold mb-2">أبرز الإنجازات</h3>
        <v-row
          v-for="(statistic, index) in form.statistics"
          :key="index"
          class="align-center mb-2"
        >
          <v-col cols="8">
            <v-text-field
              :hide-details="true"
              v-model="statistic.value"
              :label="`إنجاز ${index + 1}`"
              variant="outlined"
            />
          </v-col>
          <v-col cols="1" class="text-end">
            <v-btn
              icon
              @click="removeStatistics(index)"
              v-if="form.statistics.length > 1"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn
          color="primary"
          class="mb-4"
          @click="addStatistics"
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
