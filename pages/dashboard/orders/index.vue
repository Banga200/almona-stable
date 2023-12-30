<script setup>
import { ref } from 'vue';
const headers = [
    {
        title: 'CPU Model',
        align: 'start',
        key: 'name',
    },
    {
        title: 'Cores',
        align: 'end',
        key: 'cores',
    },
    {
        title: 'Threads',
        align: 'end',
        key: 'threads',
    },
    {
        title: 'Base Clock',
        align: 'end',
        key: 'baseClock',
    },
]
definePageMeta({
    name: "Orders",
    breadcrumb: 'الطلبات',
    middleware: ['auth'],
    layout: 'dashboard'
})
useHead({
    title: 'لوحة التحكم | الطلبات'
})
const searchById = ref('')
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
            <v-data-table :headers="headers" :search="searchById"></v-data-table>
        </v-container>
    </client-only>
</template>