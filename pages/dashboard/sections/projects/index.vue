<script setup>
definePageMeta({
    name: "Projects",
    breadcrumb: 'المشاريع',
    middleware: ['dashboard'],
    layout: 'dashboard'
})
useHead({
    title: "المشاريع"
})
onMounted(() => {
    projectStore.GetAllProjects()
})
const projectForm = ref(null);
const projectStore = useProjectStore();
const formDialog = ref(false);
const isEdit = ref(false)
const editProject = (project) => {
    formDialog.value = true
    requestAnimationFrame(() => {
        projectForm.value.form = {...project}
        projectForm.value.form.dateShow = formatDate(project.date)
        isEdit.value = true
    })
}
const deleteProject = (project) => {
    let confirmMessage = confirm(`هل تريد حذف هذا المشروع : ${project.name} ؟`);
    if (confirmMessage) {
        projectStore.DeleteProject(project.id)
    }
}
const saveProject = async (payload) => {
    if (isEdit.value) {
       await projectStore.EditProject(payload)
    }
    else {await projectStore.AddNewProject(payload)}
   
    if (projectStore.success) {
        formDialog.value = false;
        projectStore.GetAllProjects();
    }

}
</script>
<template>
    <div>
        <div class="d-flex justify-space-between align-center">
            <h1>المشاريع</h1>
            <v-btn text="إضافة جديد" append-icon="mdi-plus" color="primary" class="white" @click="formDialog = true"/>
        </div>
        <v-dialog v-model="formDialog" >
           
            <v-card>
                <div class="text-end">
                    <v-btn icon="mdi-close" color="#000" class="white" @click="formDialog = false"/>
                </div>
                <project @save="saveProject" ref="projectForm"/>
            </v-card>
        </v-dialog>
        <v-progress-linear indeterminate class="mt-4" v-if="projectStore.projects.loading"></v-progress-linear>
        <v-row class="mt-8">
            <v-col cols="6" v-for="(project) in projectStore.projects.content" :key="project.id">
                <ProjectCard :info="project" :isAdmin="true" @edit="editProject" @delete="deleteProject"/>
            </v-col>
        </v-row>
    </div>
</template>