
<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import { useAdvertismentStore } from '~/stores/advertisment';

const store = useAdvertismentStore();
const snackbar = ref(false)
watchEffect(() => {
    if (store.success_message) {
        snackbar.value = true
    }
})
</script>
<template>
    <ClientOnly>
        <div class="text-center">
            <v-snackbar color="success" multi-line timeout="3000">
                {{ store.getSuccess_message }}

                <template v-slot:actions>
                    <v-btn color="white" variant="text" @click="snackbar = false">
                        إغلاق
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </ClientOnly>
</template>