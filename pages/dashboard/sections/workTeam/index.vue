<script setup>

definePageMeta({
  layout: "dashboard",
});
const teamMemberStore = useTeamMemberstore();
onMounted(() => {
    teamMemberStore.GetAllTeamMembers();
})
const teamMemberFormRef = ref(null)
const formDialog = ref(false)
const isEdit = ref(false)
const editTeamMember = (teamMember) => {

    formDialog.value = true
    requestAnimationFrame(() => {

        teamMemberFormRef.value.setFormData(teamMember)
        isEdit.value = true
    })
}
const deleteTeamMember = (teamMember) => {
    let confirmMessage = confirm(`هل تريد حذف هذا الموظف : ${teamMember.fullName} ؟`);
    if (confirmMessage) {
        teamMemberStore.DeleteTeamMember(teamMember.id)
    }
}
const saveTeamMember = async (payload) => {
        if (isEdit.value) {
       await teamMemberStore.EditTeamMember(payload)
    }
    else {await teamMemberStore.AddNewTeamMember(payload)}
   
    if (teamMemberStore.success) {
        formDialog.value = false;
        teamMemberStore.GetAllTeamMembers();
    }

}
</script>
<template>
    <div>
        <div class="d-flex justify-space-between align-center">
            <h1>فريق العمل</h1>
            <v-btn text="إضافة جديد" append-icon="mdi-plus" color="primary" class="white" @click="formDialog = true"/>
        </div>
        <v-dialog v-model="formDialog" >
           
            <v-card>
                <div class="text-end">
                    <v-btn icon="mdi-close" color="#000" class="white" @click="formDialog = false"/>
                </div>
                <teamMemberForm @save="saveTeamMember" ref="teamMemberFormRef"/>
            </v-card> 
        </v-dialog>
        <v-progress-linear indeterminate class="mt-4" v-if="teamMemberStore.teamMembers.loading"></v-progress-linear>
        <v-row class="mt-8">
            <v-col cols="12" md="4" xl="3" v-for="(teamMember) in teamMemberStore.teamMembers.content" :key="teamMember.id">
                <WorkerCard :info="teamMember" :isAdmin="true" @edit="editTeamMember" @delete="deleteTeamMember"/>
            </v-col>
        </v-row>
    </div>
</template>