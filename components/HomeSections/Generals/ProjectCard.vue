<script setup>
import { useImageStream } from '~/composables/useImageStream';

const props = defineProps(['info', "isAdmin"])
const emit = defineEmits(['edit', 'delete']);
</script>
<template>
    <div class="project-card card">
        <div class="relative">
            <div class="position-absolute" style="left: 0; z-index: 1;" v-if="props.isAdmin">
                <v-btn class="ma-2 white" icon="mdi-pencil" color="success" size="small" @click="emit('edit',props.info)"/>
                <v-btn class="ma-2 white" icon="mdi-delete" color="red" size="small" @click="emit('delete',props.info)"/>
            </div>
            <v-img :src="useImageStream(props.info.images[0])" v-if="props.info.images" height="259" cover/>
            <v-chip class="year" >{{ new Date(props.info.date).getFullYear() }}</v-chip>
        </div>
        <div class="d-flex flex-column ga-3 pa-6">
            <h1 class="font-bold">{{ props.info.name }}</h1>
            <p>{{ props.info.description }}</p>
            <div class="d-flex flex-wrap align-items-center ga-4">
                <div class="d-flex align-center ga-2" v-if="props.info.date">
                    <v-icon icon="$Event" size="16" color="primary"/>
                    <span class="text-sm">{{new Date(props.info.date).getFullYear()}}</span>
                </div>
                <div class="d-flex align-center ga-2">
                    <v-icon icon="$MapMarker" size="16" color="primary"/>
                    <span class="text-sm">{{ props.info.city.name }}</span>
                </div>
                <div class="d-flex align-center ga-2">
                    <v-icon icon="$Customers" size="16" color="primary"/>
                    <span class="text-sm">{{ props.info.companiesCount }}</span>
                </div>
            </div>
            <h4>أبرز الإنجازات:</h4>
            <v-row class="mt-1">
                <v-col cols="6" class="pa-1" v-for="(statistic, index) in props.info.statistics" :key="index">
                    <li class="text-sm d-flex align-center ga-2" v-if="statistic.value">
                        <div class="list-dot"></div>
                       {{statistic.value}}
                    </li>
                </v-col>
            </v-row>

             <div v-if="!props.isAdmin">
                 <v-btn
            class="mt-4 pa-0"
            color="primary"
            variant="text" 
            append-icon="$ExternalLink"
            >عرض التفاصيل</v-btn>
             </div>
        </div>
    </div>
</template>