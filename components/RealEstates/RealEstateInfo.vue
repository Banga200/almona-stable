<script setup>
import RealEstateServices from './RealEstateServices.vue';
const props = defineProps(['advertisment'])
</script>
<template>
    <!-- Title -->
    <v-card-title>{{ props.advertisment.title }}</v-card-title>
    <!-- Description -->
    <v-card-text>{{ props.advertisment.description }}</v-card-text>
    <v-row class="align-center ma-0">
        <v-card-subtitle class="mr-2" v-if="props.advertisment.nRooms"> {{ props.advertisment.nRooms }}&nbsp; {{ props.advertisment.nRooms > 1 ? 'غرف': 'غرقة'}} &nbsp;<v-icon>mdi-bed-outline</v-icon> <v-tooltip
                activator="parent" location="bottom">غرفة</v-tooltip> </v-card-subtitle>
        <v-card-subtitle class="mr-2" v-if="props.advertisment.nHall"> {{ props.advertisment.nHall }}&nbsp; {{ props.advertisment.nHall > 1 ? 'صالات': 'صالة' }}  &nbsp;<v-icon>mdi-sofa-outline</v-icon> <v-tooltip
                activator="parent" location="bottom">صالة</v-tooltip> </v-card-subtitle>
        <v-card-subtitle class="mr-2" v-if="props.advertisment.nBathroom"> {{ props.advertisment.nBathroom }}&nbsp; {{ props.advertisment.nBathroom > 1 ? 'حمامات': 'حمام' }} &nbsp;<v-icon>mdi-shower</v-icon> <v-tooltip
                activator="parent" location="bottom">حمام</v-tooltip></v-card-subtitle>
        <v-card-subtitle class="mr-2" v-if="props.advertisment.nLands"> {{ props.advertisment.nLands }}&nbsp; {{ props.advertisment.nLands > 1 ? 'اراضي': 'ارض' }} &nbsp;<v-icon>mdi-land-plots-marker</v-icon> <v-tooltip
                activator="parent" location="bottom">الاراضي</v-tooltip></v-card-subtitle>
        <v-card-subtitle class="mr-2" v-if="props.advertisment.nFloor"> {{ props.advertisment.nFloor }}&nbsp; {{ props.advertisment.nFloor > 1 ? 'ادوار': 'دور' }} &nbsp;<v-icon>mdi-stairs-up</v-icon> <v-tooltip
                activator="parent" location="bottom">الادوار</v-tooltip></v-card-subtitle>
        <v-card-subtitle class="mr-2" v-if="props.advertisment.nEntry"> {{ props.advertisment.nEntry }}&nbsp; {{ props.advertisment.nEntry > 1 ? 'مداخل': 'مدخل' }} &nbsp;<v-icon>mdi-door-open</v-icon> <v-tooltip
                activator="parent" location="bottom">المداخل</v-tooltip></v-card-subtitle>
    </v-row>
    <!-- Services  -->
    <v-card-title>الخدمات:</v-card-title>
    <v-row class="align-center">
        <RealEstateServices :advertisment="props.advertisment" />
</v-row></template>