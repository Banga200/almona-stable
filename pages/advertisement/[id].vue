<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useAdvertismentStore } from '~/stores/advertisment';
const route = useRoute();
const advertismentStore = useAdvertismentStore();
console.log(route)

definePageMeta({
    name: 'advertisement'
})
advertismentStore.GetAdvertisementByID(route.params.id)
const Advertisement = computed(() => {
    return advertismentStore.getOneAdvertisment
})
const loading = computed(() => {
    return advertismentStore.loading
})

</script>
<template>
    <Head>
        <Title>{{ Advertisement.title }}</Title>
    </Head>
    <!-- loading  -->
    <div v-if="loading" class="text-center mt-5">
        <v-progress-circular :size="40" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-container class="my-5">
        <div v-if="Advertisement">
            <real-estate-card :advertisment="Advertisement" :isDetails="true" />
        </div>
    </v-container>
</template>