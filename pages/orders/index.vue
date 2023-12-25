<script setup>
const headers  = ['']
definePageMeta({
    name: "Orders",
    breadcrumb: 'الطلبات',
    middleware: ['auth']
})
</script>
<template>
    <client-only>
        <v-container>
        <v-card-title>الطلبات</v-card-title>
        <v-data-table :headers="headers"></v-data-table>
    </v-container>
    </client-only>
</template>