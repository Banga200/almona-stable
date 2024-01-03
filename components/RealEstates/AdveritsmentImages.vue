<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useAdvertismentStore } from '~/stores/advertisment'
import { useRoute } from 'vue-router';
const props = defineProps(['isEdit'])
const emit = defineEmits(['apiRequestSuccess']);
const route = useRoute()
const advertismentStore = useAdvertismentStore();
const imageUrls = ref([])
let files = ref([]);
advertismentStore.GetAdvertisementByID(parseInt(route.params.editId))
const isLaoding = computed(() => {
    return advertismentStore.loading;
});
const ArrayOfFiles = computed(() => {
    return files.value
})
const advertisement = computed(() => { return advertismentStore.getOneAdvertisment })
function handleFileChange(event) {
    const filesEvent = event.target.files;

    // Reset previous data
    imageUrls.value = [];
    files.value = [];

    // Process each selected file
    for (let i = 0; i < filesEvent.length; i++) {
        const file = filesEvent[i];

        // Use URL.createObjectURL to get a temporary URL for the file
        const imageUrl = URL.createObjectURL(file);
        imageUrls.value.push(imageUrl);
        file.fileDescription = file.name
        files.value.push(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            file.base64Image = e.target.result.split(',')[1];
        };
        reader.readAsDataURL(file);

    }
}

function clearPreviewImages() {
    imageUrls.value = [];
    files.value = []
}
function submitForm() {
    advertismentStore.setCounterImage(files.value.length)
    for (let index = 0; index < files.value.length; index++) {
        const file = {
            fileName: files.value[index].name,
            fileContent: files.value[index].base64Image,
            fileType: files.value[index].type.slice((files.value[index].type.lastIndexOf('/') - 1 >>> 0) + 2),
            fileDescription: files.value[index].fileDescription,
            advertisementId: advertismentStore.ReturnNewAdvertismentID || parseInt(route.params.editId)
        }
        // Call Api 
        advertismentStore.AddImageToAdvertisment(file)
    }
}
function changeName(event, i) {
    const updateFiles = [...files.value]
    updateFiles[i].fileDescription = event.target.value
    files.value = updateFiles
}
function deleteImage(fileName, id) {
    advertismentStore.DeleteImage(fileName,id)
}
</script>
<template>
    <v-card border>
        <v-form @submit.prevent="submitForm">
            <v-file-input label="رفع الصور" variant="filled"
                accept="image/jpeg, image/png,image/gif, image/svg,image/bmp, image/webp" border prepend-icon="mdi-camera"
                @click:clear="clearPreviewImages" color="primary" show-size counter multiple
                @change="handleFileChange"></v-file-input>

            <v-row class="mt-2">
                <v-col v-for="(image, i) in imageUrls" :key="i" cols="6" sm="4" md="2">
                    <v-img :src="image" :lazy-src="image" aspect-ratio="1" cover class="bg-grey-lighten-2 " />
                    <br />
                    <v-text-field active variant="outlined" color="primary" label="اسم الصورة"
                        v-model="files[i].fileDescription" @change="changeName($event, i)" />
                </v-col>
            </v-row>
            <v-card-subtitle v-if="files.length > 0" class="mلا-3 pr-0 text-red">*اسم الصورة سيتم عرضه في حالة لم تعرض
                الصورة
                بشكل صحيح.</v-card-subtitle>

            <div v-if="props.isEdit">
                <v-divider/>
                <v-row class="mt-2">
                    <v-col v-for="advertis in advertisement.imageIDs" :key="advertis.id" cols="6" sm="4" md="2" class="text-center">
                        
                        <v-img :src="advertis.url" :lazy-src="advertis.url" aspect-ratio="1" cover
                            class="bg-grey-lighten-2 " />
                            <v-btn color="error" size="small" class="mt-2" icon @click="deleteImage(advertis.fileName, advertis.id)" :loading="isLaoding">
                                <v-tooltip activator="parent" location="bottom">حذف الصورة</v-tooltip>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                    </v-col>
                </v-row>
            </div>
            <!-- <v-row >
                        <v-col  :key="i" class="d-flex child-flex" cols="auto" md="2">
                            {{ console.log(file) }}
                            
                        </v-col>
                    </v-row> -->
            <v-btn color="primary" type="submit" size="x-large" class="float-left mt-10" :disabled="files.length === 0"
                :loading="isLaoding" @submit.prevent="submitForm" >حفظ </v-btn>
        </v-form>

        <!-- <v-btn  size="x-large" class="float-right mt-10" prepend-icon="mdi-arrow-right" >رجوع</v-btn> -->
    </v-card>
</template>