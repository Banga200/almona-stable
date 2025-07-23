<script setup>
import ProjectCard from '~/components/HomeSections/Generals/ProjectCard.vue';
import { chunkArray } from '~/utils/Global';

const route = useRoute();
const serviceStore = useServiceStore();
const currentIndex = shallowRef(0);
const servicesSlide = shallowRef(0);
const serviceGroups = ref([])
const {service, services} = storeToRefs(serviceStore) 
onMounted(async() => {
  const id = route.params.id;
  await serviceStore.GetServiceById(id);
  await serviceStore.GetAllServices();
  serviceGroups.value = chunkArray(services.value.content, 3)
});
</script>
<template>
  <article>
    <v-container>
      <v-sheet  class="mx-auto py-13 px-8">
        <v-defaults-provider
        :defaults="{ VBtn: { variant: 'outlined', color: '#eee' } }"
      >
        <v-sheet class="overflow-hidden" rounded="xl">
          <v-carousel
            id="verticalCarousel"
            v-model="currentIndex"
            direction="vertical"
            height="400"
            vertical-arrows="left"
            vertical-delimiters="right"
            hide-delimiter-background
            cycle
          >
            <template v-slot:prev="{ props }">
              <v-btn
                @click="props.onClick"
                icon="mdi-chevron-up"
              ></v-btn>
            </template>
            <template v-slot:next="{ props }">
              <v-btn
                icon="mdi-chevron-down"
                @click="props.onClick"
              ></v-btn>
            </template>

            <v-carousel-item
              v-for="(item, i) in service.content.images"
              :key="i"
              :src="useImageStream(item)"
              cover
            ></v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-defaults-provider>

      <h1 class="text-4xl mt-8">{{ service.content.name}}</h1>
        <p>{{ service.content.description }}</p>
        <h3 class="mt-8 font-bold">الإنجازات</h3>
        <v-col cols="12" md="8" class="mb-8">
            <v-row class="mt-1">
                <v-col cols="6" class="pa-1" v-for="(serviceDetail, index) in service.content.serviceDetails" :key="index">
                    <li class="text-sm d-flex align-center ga-2" v-if="serviceDetail.value">
                        <div class="list-dot"></div>
                       {{serviceDetail.value}}
                    </li>
                </v-col>
            </v-row>
        </v-col>
        <h3 class="font-bold mt-16">مشاريع اخرى</h3>
        <v-progress-linear indeterminate v-if="services.loading" color="primary"/>
        <v-row dense class="pa-4">
            <v-col cols="12" md="6" xl="4" v-for="service in serviceStore.services.content" :key="service">
            <ServiceCard :info="service" :small="true"/>
            </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </article>
</template>
