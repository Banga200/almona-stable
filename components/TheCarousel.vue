<script setup>
import { ref } from 'vue';
const props = defineProps(['images','selectedIndex', 'open'])
const indexItem = ref(props.selectedIndex)
function changeImage(url) {
    indexItem.value = props.images.findIndex((obj) => obj.url === url)
}
</script>
<template>
    <v-dialog v-model="props.open" transition="dialog-top-transition" fullscreen :scrim="true">
        <div class="carousel_card">
            <v-btn variant="flat" icon="mdi-close" color="carouselBG" class="close_btn" @click="$emit('close')"
                absoulot></v-btn>
            <v-row class=" ma-0">
                <v-col class="row_images h-100 " cols="12" md="3">
                    <v-row class="ma-0">
                        <li v-for="(image, i) in props.images" :key="i">
                            <v-img :src="`${image.url}`"
                                @click="$emit('changeSelectedImage', image.url), changeImage(image.url)" cover/>
                        </li>
                    </v-row>

                </v-col>
                <v-col cols="12" md="8" class="mt-md-10">
                    <v-carousel show-arrows="hover" class="mt-5 mt-md-15" height="600px" cycle  v-model="indexItem">
                        <v-carousel-item v-for="(image, i) in props.images" :key="i" :src="image.url" cover
                            height="100%"></v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
        </div>

    </v-dialog>
</template>
