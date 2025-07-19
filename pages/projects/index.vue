<script setup>
const projectStore = useProjectStore();
onMounted(() => {
  projectStore.GetAllProjects();
});
const selectedType = ref(2);
const types = [
  { id: 1, title: "معارض" },
  { id: 2, title: "مشاريع" },
];
 watch(selectedType, (newVal) => {
  if (newVal) {
    projectStore.GetAllProjects(newVal);
  }
 })
</script>
<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-4xl">مشاريعنا</h1>
        </v-col>
        <v-col cols="12" md="3">
          <v-select :items="types" v-model="selectedType" item-title="title" item-value="id" label="فلتر"/>
        </v-col>
      </v-row>
      <v-divider class="mb-8" />
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          v-for="project in projectStore.projects.content || []"
          :key="project"
        >
          <ProjectCard :info="project" :small="true" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
