<script setup>
import { ref, reactive, onMounted } from "vue";
definePageMeta({
  name: "Loctaion",
  breadcrumb: "المواقع",
  middleware: ["dashboard"],
  layout: "dashboard",
});
useHead({
    title: "المواقع"
})
const locationStore = useLoctaionStore()
const isEditing = ref(false);
const formRef = ref(null);
const form = reactive({ id: null, name: "", foreignName: "", address: '', foreignAddress: '' });
const dialog = ref(false);
onMounted(async () => {
  await locationStore.GetAllLocations();
});

const submitForm = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    if (isEditing.value) {
      await locationStore.EditLoctaion(form);
    } else {
      await locationStore.AddNewLoctaion({
        name: form.name,
        foreignName: form.foreignName,
        address: form.address,
        foreignAddress: form.foreignAddress
      });
    }
    if (locationStore.success) {
        dialog.value = false
      await locationStore.GetAllLocations();
    }
  }
};

const editCity = (location) => {
  form.id = location.id;
  form.name = location.name;
  form.foreignName = location.foreignName;
  form.address = location.address
  form.foreignAddress = location.foreignAddress
  dialog.value = true
  isEditing.value = true;
};

const deleteCity = async (item) => {
  let confirmMessgae = confirm(
    `هل تريد حذف هذا الموقع ${item.name} - ${item.foreignName}`
  );
  if (confirmMessgae) {
    locationStore.DeleteLoctaion(item.id);
  }
};

</script>

<template>
  <v-container>
    <div class="d-flex align-center justify-space-between">
      <h1>المواقع</h1>

      <v-dialog max-width="340px" v-model="dialog">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            append-icon="$MapMarker"
            color="primary"
            class="white"
          >
            إضافة موقع
          </v-btn>
        </template>
        <v-card>
          <v-form @submit.prevent="submitForm" ref="formRef">
            <v-text-field
              v-model="form.name"
              label="اسم الموقع"
              :rules="requiredField"
            ></v-text-field>
            <v-text-field
              v-model="form.foreignName"
              label="Location Name"
              :rules="requiredField"
            ></v-text-field>
            <v-divider/>
            <v-text-field
              v-model="form.address"
              label="العنوان"
              :rules="requiredField"
            ></v-text-field>
            <v-text-field
              v-model="form.foreignAddress"
              label="Address"
              :rules="requiredField"
            ></v-text-field>
            <v-btn
              type="submit"
              :loading="locationStore.locations.loading"
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
      :items="locationStore.locations.content"
      :headers="[
        { title: 'الموقع', key: 'name' },
        { title: 'Location', key: 'foreignName' },
        { title: 'العنوان', key: 'address' },
        { title: 'foreignAddress', key: 'foreignAddress' },
        { title: '', key: '' },
      ]"
    >
      <template #item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.foreignName }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.foreignAddress }}</td>
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
