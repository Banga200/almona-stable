<script setup>
import ProjectCard from '~/components/HomeSections/Generals/ProjectCard.vue';
import { chunkArray } from '~/utils/Global';

const route = useRoute();
const projectStore = useProjectStore();
const currentIndex = shallowRef(0);
const projectsSlide = shallowRef(0);
const projectGroups = ref([])
const {project, projects} = storeToRefs(projectStore) 
onMounted(async() => {
  const id = route.params.id;
  await projectStore.GetProjectById(id);
  await projectStore.GetAllProjects();
  projectGroups.value = chunkArray(projects.value.content, 3)
});
</script>
<template>
  <article>
    <v-container>
      <v-sheet max-width="1250" class="mx-auto py-13 px-8">
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
              v-for="(item, i) in project.content.images"
              :key="i"
              :src="useImageStream(item)"
              cover
            ></v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-defaults-provider>

      <h1 class="text-4xl mt-8">{{ project.content.name}}</h1>
      <div class="d-flex flex-wrap align-items-center ga-4 mt-2 mb-8" v-if="project.content.name">
                <div class="d-flex align-center ga-2">
                    <v-icon icon="$Event" size="16" color="primary"/>
                    <span class="text-sm">{{new Date(project.content.date).getFullYear()}}</span>
                </div>
                <div class="d-flex align-center ga-2">
                    <v-icon icon="$MapMarker" size="16" color="primary"/>
                    <span class="text-sm" v-if=" project.content.city">{{ project.content.city.name }}</span>
                </div>
                <div class="d-flex align-center ga-2">
                    <v-icon icon="$Customers" size="16" color="primary"/>
                    <span class="text-sm">{{ project.content.numberOfCompanies + (project.content.numberOfCompanies > 2 ?  " شركات": " شركة")  }}</span>
                </div>
            </div>
        <p>{{ project.content.description }}</p>
        <h3 class="mt-8 font-bold">الإنجازات</h3>
        <v-col cols="12" md="8" class="mb-8">
            <v-row class="mt-1">
                <v-col cols="6" class="pa-1" v-for="(statistic, index) in project.content.statistics" :key="index">
                    <li class="text-sm d-flex align-center ga-2" v-if="statistic.value">
                        <div class="list-dot"></div>
                       {{statistic.value}}
                    </li>
                </v-col>
            </v-row>
        </v-col>
        <v-progress-linear indeterminate v-if="projects.loading" color="primary"/>
        <v-carousel hide-delimiters v-model="projectsSlide" height="auto">
             <v-carousel-item v-for="projectGroup in projectGroups" :key="projectGroup">
                <v-row dense class="pa-4">
                  <v-col cols="12" md="6" lg="4" v-for="project in projectGroup" :key="project">
                    <ProjectCard :info="project" :small="true"/>
                  </v-col>
                </v-row>
            </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </v-container>
  </article>
</template>
