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

</script>
<template>
    <Head>
        <Title>{{ Advertisement.title }}</Title>
    </Head>
    <v-container class="my-10">
            <div v-if="Advertisement">
                <real-estate-card :advertisment="Advertisement" :isDetails="true" />
            </div>
    </v-container>
</template>