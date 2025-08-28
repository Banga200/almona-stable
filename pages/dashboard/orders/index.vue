<script setup>
import { ref } from 'vue';
import { useOrdersStore } from '~/stores/orders';
import { useDayjs } from '#dayjs';
const dayjs = useDayjs();

const OrdersStore = useOrdersStore();
OrdersStore.GetAllOrders();
const Orders = computed(() => {return OrdersStore.getOrders})
const loading = computed(() => {return OrdersStore.getLoading})
const headers = [
    {
        title: 'رقم المرجع',
        align: 'start',
        key: 'advertisementId',
    },
    {
        title: 'اسم العميل',
        align: 'start',
        key: 'user.firstName',
    },
    {
        title: 'البريد الإلكتروني',
        align: 'start',
        key: 'user.emailAddress',
    },
    {
        title: 'رقم الجوال',
        align: 'start',
        key: 'user.phoneNumber',
    },
    {
        title: 'تاريخ الطلب',
        align: 'start',
        key: 'orderTime',
    },
    {
        title: 'رابط الإعلان',
        align: 'start',
        key: 'orderTime',
    },
    {
        title: '',
        align: 'start',
        key: 'orderTime',
        sortable: false
    },
]
definePageMeta({
    name: "Orders",
    breadcrumb: 'الطلبات',
    middleware: ['dashboard'],
    layout: 'dashboard'
})
useHead({
    title: 'لوحة التحكم | الطلبات'
})
dayjs.locale('ar')
const searchById = ref('')

function deleteOrder(id) {
    const answer = window.confirm(` هل انت متأكد من حذف الطلب ؟ `)
    if (answer) {
        OrdersStore.DeleteOrder(id)
    }
    
}
</script>
<template>
    <client-only>
        <v-container fluid>
            <v-card-title>الطلبات</v-card-title>
            <v-row class="ma-0">
                <v-col cols="12" md="4">
                    <v-text-field hide-details v-model="searchById" color="primary" variant="underlined" label="بحث" append-inner-icon="mdi-magnify" class="w-md-25" />
                </v-col>
            </v-row>
            <v-divider/>
            <ProgressLoading :isLoading="loading" />
            <v-data-table :headers="headers" :search="searchById" :items="Orders">
                <template v-slot:item="{item}">
                    <tr>
                        <td>{{ item.advertisementId }}</td>
                        <td>{{ item.user.firstName }} {{ item.user.lastName }}</td>
                        <td>{{ item.user.emailAddress }}</td>
                        <td>{{ item.user.phoneNumber }}</td>
                        <td>{{ dayjs(item.orderTime).format("dddd, MMMM D, YYYY h:mm A") }}</td>
                        <td><NuxtLink :href="`/advertisement/${item.advertisementId}`" target="_blank" >رابط الإعلان <v-icon>mdi-link</v-icon></NuxtLink></td>
                        <td><v-btn variant="flat" icon  size="small" @click="deleteOrder(item.id)">
                            <v-tooltip activator="parent" text="حذف الطلب" location="bottom"></v-tooltip>
                                <v-icon color="error">
                                    mdi-delete
                                </v-icon>
                        </v-btn></td>
                    </tr>
                </template>
            </v-data-table>
        </v-container>
    </client-only>
</template>