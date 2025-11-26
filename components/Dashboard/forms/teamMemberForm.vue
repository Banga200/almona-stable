<script setup>
import { ref } from "vue";
const emit = defineEmits(['save'])
const isEdit = ref(false);
const formRef = ref(null);
const form = ref({
  fullName: "",
  email: "",
  jobTitle: "",
  phoneNumber: "",
  description: "",
  imagesIdsSerialized: "",
  images: [],
  contactLinks: {
    linkedIn: "",
    facebook: "",
    instagram: "",
    twitter: "",
    telegram: "",
    tikTok: "",
    email: ""
  },
  skills: [
    {
      id: 0,
      teamMemberId: 0,
      skillName: "",
      skillDescription: "",
    },
  ],
});

// Add a new skill entry
const addSkill = () => {
  form.value.skills.push({
    id: 0,
    teamMemberId: 0,
    skillName: "",
    skillDescription: "",
  });
};

// Remove a skill entry
const removeSkill = (index) => {
  form.value.skills.splice(index, 1);
};

// Handle form submission
const save = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    emit("save", form.value);
  }
};
defineExpose({
   setFormData(data) {
    form.value = { ...data }
  }
});
</script>

<template>
  <div>
    <v-form
    @submit.prevent="save"
    class="pa-4"
    style="max-width: 700px; margin: auto"
    ref="formRef"
  >
    <v-row>
      <v-col cols="12">
        <v-file-input variant="outlined"
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
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.fullName" label="الأسم الكامل" required :rules="requiredField"/>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.jobTitle" label="المسمى الوظيفي" :rules="requiredField"/>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.email"
          :label="$t('label.email')"
          type="email"
          required
        :rules="[emailFormat]"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.phoneNumber" label="رقم الجوال" />
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="form.description" label="الوصف" rows="3" />
      </v-col>
    </v-row>

    <v-divider class="my-4" />
    <h4 class="mb-4">المهارات:</h4>

    <div v-for="(skill, index) in form.skills" :key="index" class="mb-4">
      <div class="d-flex ga-4">
        <v-text-field v-model="skill.skillName" :label="`مهارة ${index + 1}`" />
        <v-text-field
          v-model="skill.skillDescription"
          :label="`وصف المهارة ${index + 1}`"
        />
        <v-btn
          icon
          size="small"
          color="red"
          @click="removeSkill(index)"
          v-if="form.skills.length > 1"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>

    <v-btn color="primary" @click="addSkill" variant="outlined">
      <v-icon start>mdi-plus</v-icon> إضافة مهارة
    </v-btn>

    <v-divider class="my-4" />
    <h4 class="mb-4">روابط التواصل الاجتماعي:</h4>
    <div class="d-flex ga-4">
      <v-text-field v-model="form.contactLinks?.linkedIn" :label="$t('label.linkedIn')" />
    </div>
    <v-divider class="my-4" />

    <v-btn color="success" type="submit" class="mt-8" block>حفظ</v-btn>
  </v-form>
  </div>
</template>
