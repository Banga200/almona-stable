<script setup>
import { ref, reactive, onMounted } from "vue";
definePageMeta({
  name: "Cities",
  breadcrumb: "المدن",
  middleware: ["dashboard"],
  layout: "dashboard",
});
useHead({
    title: "المدن"
})
const cityStore = useCityStore();
const isEditing = ref(false);
const formRef = ref(null);
const form = reactive({ id: null, name: "", foreignName: "" });
const dialog = ref(false);
onMounted(async () => {
  await cityStore.GetAllCities();
});

const submitForm = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    if (isEditing.value) {
      await cityStore.EditCity(form);
    } else {
      await cityStore.AddNewCity({
        name: form.name,
        foreignName: form.foreignName,
      });
    }
    if (cityStore.success) {
        dialog.value = false
      await cityStore.GetAllCities();
    }
  }
};

const editCity = (city) => {
  form.id = city.id;
  form.name = city.name;
  form.foreignName = city.foreignName;
  dialog.value = true
  isEditing.value = true;
};

const deleteCity = async (item) => {
  let confirmMessgae = confirm(
    `هل تريد حذف هذه المدينة ${item.name} - ${item.foreignName}`
  );
  if (confirmMessgae) {
    cityStore.DeleteCity(item.id);
  }
};

</script>

<template>
  <v-container>
    <div class="d-flex align-center justify-space-between">
      <h1>المدن</h1>

      <v-dialog max-width="340px" v-model="dialog">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            append-icon="mdi-home-city-outline"
            color="primary"
            class="white"
          >
            إضافة مدينة
          </v-btn>
        </template>
        <v-card>
          <v-form @submit.prevent="submitForm" ref="formRef">
            <v-text-field
              v-model="form.name"
              label="اسم المدينة"
              :rules="requiredField"
            ></v-text-field>
            <v-text-field
              v-model="form.foreignName"
              label="City Name"
              :rules="requiredField"
            ></v-text-field>

            <v-btn
              type="submit"
              :loading="cityStore.cities.loading"
              :color="isEditing ? 'success' : 'primary'"
              class="white"
              block
            >
              {{ isEditing ? "تعديل" : "حفظ" }}
            </v-btn>
          </v-form>
        </v-card>
      </v-dialog>
    </div>

    <v-divider class="my-8" />

    <v-data-table-virtual
      :items="cityStore.cities.content"
      :headers="[
        { title: 'المدينة', key: 'name' },
        { title: 'City', key: 'foreignName' },
        { title: '', key: '' },
      ]"
    >
      <template #item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.foreignName }}</td>
          <td>
            <v-btn  icon @click="editCity(item)" size="x-small" class="mx-2">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteCity(item)" size="x-small" class="mx-2">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </v-container>
</template>
