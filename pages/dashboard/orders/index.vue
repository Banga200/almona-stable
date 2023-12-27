<script setup>
const headers = ['']
definePageMeta({
    name: "Orders",
    breadcrumb: 'الطلبات',
    middleware: ['auth'],
    layout: 'dashboard'
})
</script>
<template>
    <client-only>
        <v-container fluid>
            <v-card-title>الطلبات</v-card-title>
            <v-data-table :headers="headers"></v-data-table>
        </v-container>
    </client-only>
</template>