<script setup>
import { useUserStore } from '~/stores/auth';
import ProgressLoading from '~/components/Loadings/ProgressLoading.vue';
import { ref } from 'vue';
definePageMeta({
    name: "‘Users",
    breadcrumb: 'المستخدمين',
    middleware: ['auth'],
    layout: 'dashboard'
})
useHead({
    title: 'لوحة التحكم | المستخدمين'
})
const headers = ref(
    [
        {
            title: 'الاسم',
            align: 'start',
            key: 'firstName',
        },
        {
            title: 'اسم المستخدم',
            align: 'start',
            key: 'userName',
        },
        {
            title: 'الإيميل',
            align: 'start',
            key: 'emailAddress',
        },
        {
            title: 'رقم الجوال',
            align: 'start',
            key: 'phoneNumber',
        },
        {
            title: '',
            align: 'start',
            sortable: false,
            key: 'empty',
        },
    ]
)
const userStore = useUserStore();

userStore.GetAllUsers();

const users = computed(() => { return userStore.getUserList })
const loading = computed(() => { return userStore.getLaoding })
const search = ref('')
function showAlert(userName, id) {
    const answer = window.confirm(` هل انت متأكد من حذف هذا الحساب => ${userName}`)
    if (answer) {
        userStore.DeleteUser(id)
    }
    else { console.log("cancel") }
}
</script>
<template>
    <client-only>
        <v-container fluid>
            <v-card-title>المستخدمين</v-card-title>
            <v-row class="ma-0">
                <v-col cols="12" md="4">
                    <v-text-field hide-details v-model="search" color="primary" variant="underlined" label="بحث" append-inner-icon="mdi-magnify" class="w-md-25" />
                </v-col>
            </v-row>
            <v-divider/>
            <ProgressLoading :isLoading="loading" />
            <v-data-table :items="users" :headers="headers" :search="search">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.lastName }} {{ item.firstName }}</td>
                        <td>{{ item.userName }}</td>
                        <td>{{ item.emailAddress }}</td>
                        <td>{{ item.phoneNumber }}</td>
                        <!-- إذا كان Super Admin أظهر له الخيارات -->
                        <td>
                            <v-btn icon variant="flat" class="me-2" @click.stop="showAlert(item.userName, item.id)">
                                <v-tooltip activator="parent" text="حذف الحساب" location="bottom"></v-tooltip>
                                <v-icon color="error">
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-container>
    </client-only>
</template>