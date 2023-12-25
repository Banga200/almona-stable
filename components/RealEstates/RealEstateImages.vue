<script setup>
const props = defineProps(['advertisment']);
const selectedImageUrl = ref('');
const openCarousel = ref(false);
const indexImage = ref(0) 
function selectedImage(url) {
    indexImage.value = props.advertisment.imageIDs.findIndex((obj) => obj.url === url)
    selectedImageUrl.value = url;
    openCarousel.value = true;
}
function changeIndex(value) {
}
</script>
<template>
    <v-row class="RealEstate_images_grid">
        <v-col v-for="image in props.advertisment.imageIDs" :key="image.url" class="d-flex child-flex images_grid_container" cols="6" sm="4" md="3" style="overflow: hidden;">
            <v-img :src="`${image.url}`"
                loading="lazy" aspect-ratio="1" cover
                class="bg-teal-lighten-5 hover_effect" @click="selectedImage(image.url)" style="cursor: pointer;">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0 align-center justify-center" >
                        <v-progress-circular indeterminate color="teal"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-col>
    </v-row>
    <TheCarousel  :images="props.advertisment.imageIDs || false" :selectedIndex="indexImage" :open="openCarousel" @close="openCarousel = false" @change-selected-image="selectedImage"/>
</template>