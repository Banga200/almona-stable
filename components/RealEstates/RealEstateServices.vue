<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps(["advertisment", 'services'])
const serivces = ref([])
onMounted(() => {
    const serivce = ref([
        { text: 'ماء', icon: 'mdi-water', value: props.advertisment.hasWater },
        { text: 'كهرباء', icon: 'mdi-home-lightning-bolt-outline', value: props.advertisment.hasElectricity },
        { text: 'صرف صحي', icon: 'mdi-pipe', value: props.advertisment.hasSanitation },
        { text: 'تكييف', icon: 'mdi-air-conditioner', value: props.advertisment.hasConditioning },
        { text: 'مطبخ جاهز', icon: 'mdi-countertop', value: props.advertisment.hasReadyKitchen },
        { text: 'غرفة خاصة', icon: 'mdi-air-conditioner', value: props.advertisment.hasSpecialRoom },
        { text: 'مسبح', icon: 'mdi-pool', value: props.advertisment.hasSwimmingPool },
        { text: 'مصعد', icon: 'mdi-elevator-passenger', value: props.advertisment.hasElevator },
        { text: 'موقف خاص', icon: 'mdi-parking', value: props.advertisment.hasPrivateParking },
        { text: 'ترخيص', icon: 'mdi-card-account-details', value: props.advertisment.hasLicense },
        { text: 'طفايات حريق', icon: 'mdi-fire-extinguisher', value: props.advertisment.hasFireExtinguishers },
        { text: 'مسموح للعزاب', icon: 'mdi-account', value: props.advertisment.allowSingles },
    ])
    serivces.value = serivce.value;

})
</script>
<template>
    <v-row class="ma-0">
        <v-col v-for="(serivce, i) in serivces" cols="6" sm="4" md="3" :class="{ 'd-none': !serivce.value }" class="py-1 my-8 "
            :key="i">
            <v-icon :icon="serivce.icon" color="primary"></v-icon>
            <v-card-subtitle class="d-inline">{{ serivce.text }}</v-card-subtitle>

        </v-col>
    </v-row>
</template>