<script setup>
const serviceStore = useServiceStore();
onMounted(() => {
  serviceStore.GetAllServices();
});
const search = ref('');
const searchServices = () => {
  serviceStore.GetAllServices(100, search.value);
}
</script>
<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-4xl">خدماتنا</h1>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field  v-model="search" item-title="title" item-value="id" label="بحث" hide-details density="compact" placeholder="أضغط Enter" @keydown.enter="searchServices"/>
        </v-col>
      </v-row>
      <v-divider class="mb-8" />
      <div class="text-center my-4">
        <v-progress-circular indeterminate v-if="serviceStore.services.loading" color="primary"/>
      </div>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          v-for="service in serviceStore.services.content || []"
          :key="service.id"
        >
          <ServiceCard :info="service" :small="true" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
