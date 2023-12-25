<script setup>
import { ref, computed } from 'vue';
import RealEstateImages from './RealEstateImages.vue';
import RealEstateInfo from './RealEstateInfo.vue';
import { useDisplay } from 'vuetify';
import { useAdvertismentStore } from '~/stores/advertisment';

// const Varibels 
const props = defineProps(['advertisment', 'services'])
const advertismentStore = useAdvertismentStore();
const tab = ref(false);
const showMoreDetails = ref(false);
const components = [
    RealEstateInfo,
    RealEstateImages
];
const { mobile } = useDisplay()
// Comuted 

const images = computed(() => {
    return props.advertisment.imageIDs
})
// Functions 
function toggleMoreDetails() {
    showMoreDetails.value = !showMoreDetails.value;
}
function changeTab(value) {
    tab.value = value
}
</script>
<template>
    <v-card class="w-100 mb-5" elevation="5">
        <v-sheet rounded class="RealEstate_card w-100" :class="{ 'height': !mobile }">
            <v-row class="ma-0 h-100">
                <v-col class="image_container " :class="{ 'h-100': !mobile }" cols="12" sm="4" lg="4">
                    <img class="h-100" :src="images.length > 0 ? `${images[0].url}` : ''"
                        :alt="props.advertisment.imageIDs.length > 0 ? props.advertisment.imageIDs[0].description : ''"
                        loading="lazy" @click="toggleMoreDetails(), changeTab(2)" />
                    <a class="image_feature right" @click="toggleMoreDetails(); changeTab(2)">صور أكثر
                        <v-icon>mdi-chevron-down</v-icon></a>
                    <span class="image_feature left">1 / {{ props.advertisment.imageIDs.length }}</span>
                </v-col>
                <v-col class="content py-2 px-5" cols="12" sm="5" lg="6">
                    <h3>{{ props.advertisment.title }}</h3>
                    <v-row class="ma-0 my-3">
                        <v-card-subtitle>{{ props.advertisment.subCategory ? props.advertisment.subCategory.name : ''
                        }}</v-card-subtitle>
                        <v-spacer />
                        <v-card-subtitle> {{ props.advertisment.location }}
                            <v-icon>mdi-map-marker-outline</v-icon></v-card-subtitle>
                    </v-row>
                    <v-row class="ma-0 align-center my-5">
                        <v-card-subtitle>المساحة: {{ props.advertisment.space }}م²</v-card-subtitle>
                        <v-spacer />
                        <client-only>
                            <v-row class="align-center justify-end ma-0">
                                <v-card-subtitle class="mr-2" v-if="props.advertisment.nRooms"> {{ props.advertisment.nRooms
                                }}
                                    &nbsp;<v-icon>mdi-bed-outline</v-icon> <v-tooltip activator="parent"
                                        location="bottom">غرفة</v-tooltip> </v-card-subtitle>
                                <v-card-subtitle class="mr-2" v-if="props.advertisment.nHall"> {{ props.advertisment.nHall
                                }}
                                    &nbsp;<v-icon>mdi-sofa-outline</v-icon> <v-tooltip activator="parent"
                                        location="bottom">صالة</v-tooltip> </v-card-subtitle>
                                <v-card-subtitle class="mr-2" v-if="props.advertisment.nBathroom"> {{
                                    props.advertisment.nBathroom }} &nbsp;<v-icon>mdi-shower</v-icon> <v-tooltip
                                        activator="parent" location="bottom">حمام</v-tooltip></v-card-subtitle>
                            </v-row>
                        </client-only>
                    </v-row>
                    <v-btn class="w-100 justify-space-between pr-0 " variant="text" append-icon="mdi-chevron-down"
                        @click="toggleMoreDetails(); changeTab(1)"> معلومات
                        اكثر</v-btn>
                </v-col>
                <!-- Price السعر  -->
                <v-col cols="12" sm="3" lg="2" class="text-center d-flex flex-column justify-end align-center" style="position: relative;">
                    <!-- طلب عقار  -->
                    <v-alert variant="tonal" width="100%"  class="text-center request_alert justify-center pa-3"
                        color="teal-darken-3" title="طلب عقار" v-if="$route.name === 'RealEstateRequest'"></v-alert>
                    <v-spacer />
                    <v-card-title class="price">{{ props.advertisment.price }} {{ props.advertisment.currency
                    }}</v-card-title>
                </v-col>
            </v-row>

        </v-sheet>
        <v-sheet class="w-100" v-if="showMoreDetails">
            <v-card>
                <v-tabs v-model="tab" color="primary" align-tabs="center">
                    <v-tab :value="1">المعلومات</v-tab>
                    <v-tab :value="2" id="images">الصور</v-tab>
                </v-tabs>
                <v-divider />
                <v-window v-model="tab">
                    <v-window-item v-for="(component, i) in components" :key="i" :value="i + 1">
                        <v-container fluid>
                            <component :is="component" :advertisment="props.advertisment" />
                        </v-container>
                    </v-window-item>
                    <v-divider />
                    <div class="text-left my-3 px-4">
                        <v-btn class="text-left" color="primary" variant="outlined" @click="toggleMoreDetails">إغلاق</v-btn>
                    </div>
                </v-window>
            </v-card>
        </v-sheet>
    </v-card>
</template>
<style scoped>
.request_alert {
    position: absolute;
    top: 0;

}
</style>