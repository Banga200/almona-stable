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
const headers = ref(
    [
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
const loading = computed(() => {return userStore.getLaoding})
function showAlert(userName, id) {
    const answer = window.confirm(` هل انت متأكد من حذف هذا الحساب => ${userName}`)
    if (answer) {
        userStore.DeleteUser(id)
    }
    else {console.log("cancel")}
}
</script>
<template>
    <client-only>
        <v-container fluid>
            <v-card-title>المستخدمين</v-card-title>
            <ProgressLoading :isLoading="loading"/>
            <v-data-table :items="users" :headers="headers">
                <template v-slot:item="{item}">
                    <tr>
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