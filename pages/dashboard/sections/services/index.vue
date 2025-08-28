<script setup>
import { useServiceStore } from '~/stores/service';

definePageMeta({
    name: "Services",
    breadcrumb: 'الخدمات',
    middleware: ['dashboard'],
    layout: 'dashboard'
})
useHead({
    title: "الخدمات"
})
const serviceStore = useServiceStore();
onMounted(() => {
    serviceStore.GetAllServices();
})
const formDialog = ref(false);
const isEdit = ref(false)
const serviceForm = ref(null);

const editService = (service) => {
    formDialog.value = true
    requestAnimationFrame(() => {
        serviceForm.value.form = {...service}
        isEdit.value = true
    })
}
const deleteService = (service) => {
    let confirmMessage = confirm(`هل تريد حذف هذه الخدمة : ${service.name} ؟`);
    if (confirmMessage) {
        serviceStore.DeleteService(service.id)
    }
}
const saveService = async (payload) => {
    
   if (isEdit.value) {
       await serviceStore.EditService(payload)
    }
    else {await serviceStore.AddNewService(payload)}  
    if (serviceStore.success) {
        formDialog.value = false;
        serviceStore.GetAllServices()
    }
}
</script>
<template>
    <div>
        <div class="d-flex justify-space-between align-center">
            <h1>الخدمات</h1>
            <v-btn text="إضافة جديد" append-icon="mdi-plus" color="primary" class="white" @click="formDialog = true"/>
        </div>
        <v-dialog v-model="formDialog" >
           
            <v-card>
                <div class="text-end">
                    <v-btn icon="mdi-close" color="#000" class="white" @click="formDialog = false"/>
                </div>
                <service @save="saveService" ref="serviceForm"/>
            </v-card>
        </v-dialog>
        <v-progress-linear indeterminate class="mt-4" v-if="serviceStore.services.loading"></v-progress-linear>
         <v-row class="mt-8">
            <v-col cols="6" v-for="(service) in serviceStore.services.content" :key="service.id">
                <ServiceCard :info="service" :isAdmin="true" @edit="editService" @delete="deleteService"/>
            </v-col>
        </v-row>
    </div>
</template>