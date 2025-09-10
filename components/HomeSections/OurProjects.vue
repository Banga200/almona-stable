<script setup>
const props = defineProps(['projects', "loading"])
const projectStore = useProjectStore()

</script>
<template>
  <section id="ourProjects">
    <v-container>
      <div class="text-center">
        <h1 class="text-4xl title text-gradient">{{ $t('sections.our_projects.title') }}</h1>
        <p class="text-center mt-2 opacity-90 text-xl">{{ $t('sections.our_projects.description') }}</p>
        <div class="line-gradient mt-8"></div>
      </div>
      <div class="text-end mb-4">
        <v-btn variant="outlined" :text="$t('button.view_all')" append-icon="mdi-arrange-bring-forward" to="/projects" color="primary" v-if="props.projects && props.projects?.length > 0"/>
      </div>
      <div class="grid-cols-2 ga-8">
        <div v-for="(project, index) in props.projects.slice(0, 4)" :key="index" class="pa-0">
          <ProjectCard :info="project" />
        </div>
      </div>
       <div class="mt-4 text-center" v-if="props.loading">
          <v-progress-circular indeterminate color="primary"/>
        </div>
      <div
        class="card-gradient mt-16 d-flex flex-column align-center justify-center ga-4"
      >
        <h1 class="text-4xl font-bold">{{ $t('sections.our_projects.coming_projects') }}</h1>
        <p class="text-xl">
          {{ $t('sections.our_projects.ongoing_projects') }}
        </p>
        <div class="grid-cols-3 ga-6">
          <div class="background-transparent pa-4 px-16  rounded-lg text-center">
            <h4 class="font-bold">معرض الطاقة المتجددة</h4>
            <p class="text-center text-sm">قريباً في 2025</p>
          </div>

          <div class="background-transparent pa-4 px-16  rounded-lg text-center">
            <h4 class="font-bold">معرض الصحة والجمال</h4>
            <p class="text-center text-sm">الربع الثاني 2025</p>
          </div>

          <div class="background-transparent pa-4 px-16  rounded-lg text-center">
            <h4 class="font-bold">معرض التعليم والتدريب</h4>
            <p class="text-center text-sm">النصف الثاني 2025</p>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>
