<script setup>
definePageMeta({
  name: "Applications",
  breadcrumb: "التطبيقات",
  middleware: ["dashboard"],
  layout: "dashboard",
});
useHead({
    title: "التطبيقات"
})
onMounted(() => {
    applicationStore.GetAllApplications();
})
const headers = [
    "الاسم الكامل",
    "رقم الهاتف",
    "البريد الإلكتروني",
    "نوع الخدمة",
    "الرسالة",
    "تاريخ الإرسال"
]
const applicationStore = useApplicationStore();
</script>
<template>
    <div>
        <h1>التطبيقات</h1>
        <v-data-table-virtual :headers="headers" :items="applicationStore.applications.content" :loading="applicationStore.applications.loading">
            <template #item="{ item }">
                <tr>
                    <td>{{ item.fullName }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.serviceType }}</td> 
                    <td>{{ item.content }}</td>
                    <td>{{ item.createdAt }}</td>
                </tr>
            </template>
        </v-data-table-virtual>
        <v-btn text="عرض المزيد" @click="applicationStore.GetAllApplications(applicationStore.applications.currentPage + 1)" v-if="!applicationStore.applications.loading && applicationStore.applications.content.length"/>
    </div>
</template>