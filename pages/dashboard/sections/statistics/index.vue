<script setup>
definePageMeta({
  layout: "dashboard",
});
const statisticStore = useStatisticStore();
const { statistics } = storeToRefs(statisticStore);
const isEdit = ref(false);
const form = ref({
  yearsOfExperience: 0,
  trustedCustomer: 0,
  successfulExhibitions: 0,
  yemeniGovernorates: 0,
});
onMounted(() => {
  statisticStore.GetStatistic();
});
const save = async () => {
  await statisticStore.EditStatistic();
};
</script>
<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1>الإحصائيات</h1>
    </div>
    <v-card class="mt-8 mx-auto" max-width="800">
      <div class="text-end">
        <v-btn icon @click="isEdit = true" v-if="!isEdit">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="isEdit = false" v-if="isEdit">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-form @submit.prevent="save" class="mt-8">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="statistics.content.successfulExhibitions"
                label="المعارض الناجحة"
                type="number"
                min="0"
                required
                :readonly="!isEdit"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="statistics.content.trustedCustomer"
                label="العملاء الموثوقون"
                type="number"
                min="0"
                required
                :readonly="!isEdit"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="statistics.content.yearsOfExperience"
                label="سنوات الخبرة"
                type="number"
                min="0"
                required
                :readonly="!isEdit"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="statistics.content.yemeniGovernorates"
                label="المحافظات اليمنية"
                type="number"
                min="0"
                required
                :readonly="!isEdit"
              />
            </v-col>

            <v-col cols="12" class="text-end">
              <v-btn
                type="submit"
                color="primary"
                size="x-large"
                v-if="isEdit"
                class="white"
                >حفظ</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card>
  </div>
</template>
