<script setup>
import { ref, watch, onMounted,onBeforeUnmount } from 'vue';
import { useAdvertismentStore } from '~/stores/advertisment';
import { useCategoryStore } from '~/stores/category';
import { useSubCategoryStore } from '~/stores/subCategory';
import { useAdvertisementTypesStore } from '~/stores/advertisementTypes';
import { useRoute } from 'vue-router';
const route = useRoute();
const categoryStore = useCategoryStore();
const subCategoryStore = useSubCategoryStore();
const Advertismentstore = useAdvertismentStore();
const advertisementTypesStore = useAdvertisementTypesStore()
const categoryRadio = ref([])
const emit = defineEmits(['moveNextStep'])
const formData = ref({
    title: "",
    location: "",
    description: "",
    space: 0,
    age: 0,
    nRooms: 0,
    nHall: 0,
    nBathroom: 0,
    price: 0,
    currency: "",
    createTime: "2023-08-20",
    hasElectricity: false,
    hasWater: false,
    hasSanitation: false,
    hasConditioning: false,
    hasReadyKitchen: false,
    hasSpecialRoom: false,
    hasSwimmingPool: false,
    hasElevator: false,
    hasPrivateParking: false,
    hasLicense: false,
    hasFireExtinguishers: false,
    allowSingles: false,
    subCategoryId: '',
    advertisementTypeId: null,
})
const booleanProperties = ref([
    { text: "hasElectricity", label: 'كهرباء' },
    { text: "hasWater", label: 'ماء' },
    { text: "hasSanitation", label: 'صرف صحي' },
    { text: "hasConditioning", label: 'تكييف' },
    { text: "hasReadyKitchen", label: 'مطبخ جاهز' },
    { text: "hasSpecialRoom", label: 'غرفة خاصة' },
    { text: "hasSwimmingPool", label: 'حمام سباحة' },
    { text: "hasElevator", label: 'مصعد' },
    { text: "hasPrivateParking", label: 'موقف خاص' },
    { text: "hasLicense", label: 'مرخص' },
    { text: "hasFireExtinguishers", label: 'طفايات حريق' },
    { text: "allowSingles", label: 'السماح للعزاب' },
])
const selectedItem = ref(1)
const radio = ref(1);
const category = ref();
const advertismentTypes = ref([
    { text: 'عرض عقار', id: 1 },
    { text: 'طلب عقار', id: 2 },
])
// Call APi 
advertisementTypesStore.GetAllAdvertisementTypes();
categoryStore.GetAllCategories();
// Computed 
const categories = computed(() => { return categoryStore.getCategories });
const subCategories = computed(() => { return categoryStore.getSubCategories });
// const advertisementTypes = computed(() => {return advertisementTypesStore.getAdvertisementTypes})
// Loading 
const isLaoding = computed(() => { return Advertismentstore.loading; });
const categoryLoading = computed(() => { return categoryStore.getLoading });
// const advertisementTypesLoading = computed(() => {return advertisementTypesStore.getLoading})

onMounted(() => {
    document.getElementsByClassName("card_radios")[0].classList.add("text-teal");
    formData.value.advertisementTypeId = 1
});
watch(category, (value) => {
    categoryStore.GetGategoryByID(value.id)
})
// ============= Functions ================
async function submitForm() {
    await Advertismentstore.AddNewAdvertisment(formData.value)
    // تحريك الخطوات 
    if (Advertismentstore.error_message) { return; }
    emit('moveNextStep')
}
function changeRadio(value) {
    radio.value = value;
    document.getElementsByClassName("card_radios")[0].classList.remove("text-teal")
    formData.value.advertisementTypeId = value
}
</script>
<template>
    <v-card border>
        <v-form @submit.prevent="submitForm">
            <!-- <v-row class="ma-0 align-center justify-center mb-2">
                <v-card-title>{{ $route.params._slug }}</v-card-title>
            </v-row> -->
            <v-item-group mandatory>
                <v-container class="pt-0">
                    <v-card-title class="pr-0 mb-2">نوع العقار:</v-card-title>
                    <v-row class="align-center ">
                        <v-col cols="8" sm="6" md="4" lg="3" v-for="type in advertismentTypes" >
                            <v-item v-slot:default="{ isSelected, toggle }">
                                <v-btn border variant="outlined" :color="isSelected ? 'primary' : ''" elevation="0"
                                    class="d-flex align-center card_radios" :class="{ 'teal': selectedItem }" dark
                                    height="50" @click="toggle(); changeRadio(type.id)">
                                    <v-radio-group hide-details class="justify-center" v-model="radio">
                                        <v-radio :value="type.id">
                                            <template v-slot:label>
                                                <v-card-title class="flex-grow-1 text-center">
                                                    {{ type.text }}
                                                </v-card-title>
                                            </template>

                                        </v-radio>

                                    </v-radio-group>

                                </v-btn>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-container>
            </v-item-group>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field variant="outlined" append-inner-icon="mdi-format-title" color="primary"
                            v-model="formData.title" label="العنوان" density="compact" required></v-text-field>

                        <v-row>
                            <v-col cols="12">
                                <v-textarea variant="outlined" append-inner-icon="mdi-subtitles-outline" color="primary"
                                    v-model="formData.description" label="الوصف" density="compact" max-rows="4"
                                    required></v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="align-center mb-2">
                    <v-col cols="12" sm="3"><v-card-title class="pr-1 ">  فئة العقار:</v-card-title></v-col>
                    <v-col cols="12" sm="4" md="3">
                        <v-combobox variant="outlined" hide-details label="النوع" color="primary" density="compact"
                            :items="categories" item-title="name" item-value="id" v-model="category"></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="4" md="3">
                        <v-select variant="outlined" hide-details label="الفئة" color="primary" density="compact"
                            :items="subCategories" item-title="name" item-value="id" v-model="formData.subCategoryId"
                            :disabled="subCategories.length === 0 ? true : false"></v-select>
                    </v-col>
                    <client-only>
                        <div class="text-center" v-if="categoryLoading">
                            <v-progress-circular :size="30" color="primary" indeterminate></v-progress-circular>
                        </div>
                    </client-only>
                </v-row>
                <v-divider class="mb-2" />
                <v-row class="ma-0">
                    <v-col cols="12" md="3">
                        <v-text-field variant="outlined" append-inner-icon="mdi-map-marker-outline" color="primary"
                            v-model="formData.location" density="compact" label="الموقع" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field variant="outlined" color="primary" append-inner-icon="mdi-ruler-square"
                            v-model="formData.space" label="المساحة" type="number" density="compact"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field variant="outlined" color="primary" v-model="formData.age" label="العمر" type="number"
                            required density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field variant="outlined" color="primary" append-inner-icon="mdi-bed-outline"
                            v-model="formData.nRooms" label="عدد الغرف" type="number" density="compact"
                            required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="3">
                        <v-text-field variant="outlined" color="primary" append-inner-icon="mdi-sofa-outline"
                            v-model="formData.nHall" label="الصالة" type="number" required
                            density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field variant="outlined" color="primary" append-inner-icon="mdi-shower"
                            v-model="formData.nBathroom" label="حمام" type="number" required
                            density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field variant="outlined" color="primary" append-inner-icon="mdi-currency-usd"
                            v-model="formData.price" label="السعر" type="number" density="compact" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field variant="outlined" color="primary" append-inner-icon="mdi-cash"
                            v-model="formData.currency" label="العملة" density="compact" required></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <!-- Include other fields based on your object properties -->
                    <!-- Example: Add fields for nHall, nBathroom, price, currency, etc. -->


                </v-row>
                <!-- الخدمات  -->
                <v-card-title class="pr-1">الخدمات:</v-card-title>
                <v-row>
                    <!-- Include checkboxes for boolean properties -->
                    <v-col cols="6" sm="4" lg="2" v-for="property in booleanProperties" :key="property">
                        <v-checkbox color="primary" v-model="formData[property.text]" :label="property.label"
                            class="mt-3"></v-checkbox>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="text-left">
                        <v-btn type="submit" color="primary" :disabled="isLaoding" :loading="isLaoding"
                            size="x-large">حفظ</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>