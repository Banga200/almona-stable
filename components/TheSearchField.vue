<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useDisplay } from 'vuetify';
import { useAdvertismentStore } from '~/stores/advertisment';
import { useCategoryStore } from '~/stores/category';
import { useRoute } from 'vue-router'
const advertismentStore = useAdvertismentStore();
const categoriesStore = useCategoryStore();
const route = useRoute();
const advertismentId = route.name === 'RealEstateRequest' ? 2 : 1 ;
const props = defineProps(['page'])
categoriesStore.GetAllCategories()


const categories = ref("")
const Advertisments = computed(() => {
    return advertismentStore.getAdvertisments;
})
const allCategories = computed(() => {
    return categoriesStore.getCategories;
})
const filters = ref({
    Title: '',
    Location: '',
    Description: '',
    MaxSpace: '',
    MinSpace: '',
    MaxPrice: '',
    MinPrice: '',
    MaxNBathroom: '',
    MinNBathroom: '',
    MaxAge: '',
    MinAge: '',
    MaxNHall: '',
    MinNHall: '',
    MaxNRoom: '',
    MinNRoom: '',
    Currency: '',
    HasElectricity: '',
    HasWater: '',
    HasSanitation: '',
    HasConditioning: '',
    HasReadyKitchen: '',
    HasSpecialRoom: '',
    HasSwimmingPool: '',
    HasElevator: '',
    HasPrivateParking: '',
    HasLicense: '',
    HasFireExtinguishers: '',
    AllowSingles: '',
    AdvertisementTypeId: ''
})
const booleanProperties = ref([
    { text: "HasElectricity", label: 'كهرباء' },
    { text: "HasWater", label: 'ماء' },
    { text: "HasSanitation", label: 'صرف صحي' },
    { text: "HasConditioning", label: 'تكييف' },
    { text: "HasReadyKitchen", label: 'مطبخ جاهز' },
    { text: "HasSpecialRoom", label: 'غرفة خاصة' },
    { text: "HasSwimmingPool", label: 'حمام سباحة' },
    { text: "HasElevator", label: 'مصعد' },
    { text: "HasPrivateParking", label: 'موقف خاص' },
    { text: "HasLicense", label: 'مرخص' },
    { text: "HasFireExtinguishers", label: 'طفايات حريق' },
    { text: "AllowSingles", label: 'السماح للعزاب' },
])
const { mobile } = useDisplay();
const menu = ref(null)
const listOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const loadingCategory = computed(() => { return categoriesStore.getLoading })
const page = ref(props.page)
watch(categories, (value) => {
    if (value === 0) {
        categoriesStore.GetAllSubGategories();
    }
    else { categoriesStore.GetGategoryByID(value); }

})
watch(filters, (value) => {
    for (const key in value) {
        value[key] = value[key] ? true : '';
    }
})
onMounted(() => {
    if (categoriesStore.getCategories) {
        let isAllExist =  categoriesStore.Categories.find((item)=> {
            return item.id === 0
        })
        if (!isAllExist) {
            categoriesStore.Categories.unshift({ id: 0, name: 'الكل' })
        }
        // const isAllIn = categoriesStore.getCategories.find(item => {
        //     return item.id === 0
        // })
        // if (!isAllIn) {

        // }
    }
})

function handelFilter() {
    menu.value = false;
    let count = 0
    const latestFilter = {}
    for (const key in filters.value) {
        if (Object.hasOwnProperty.call(filters.value, key)) {
            const element = filters.value[key];
            if(element !== '' && element !== false && element !== null){
                latestFilter[key] = filters.value[key]
                count += 1
            }
        }
    }
    let advetiseTypeID = route.meta.name === 'RealEstateRequest' ? 2 : 1
    if (count > 0) {
        
        advertismentStore.FilterAdvertisements(latestFilter,advetiseTypeID, page.value);

    }
    else {
        advertismentStore.GetAllAdvertisments(advetiseTypeID, page.value)
    }
}
function clearFilter() {
    for (const key in filters.value) {
        if (Object.hasOwnProperty.call(filters.value, key)) {
                filters.value[key] = ''
            
        }
    }
}
</script>
<template>
    <v-row class="ma-0 align-center  mb-2">
        <v-col cols="12" sm="6" md="7" class="pa-0 mt-3 mt-md-0"><v-text-field variant="outlined" hide-details rounded="lg"
                placeholder="ابحث عن العقارات ( شقق,ايجار , بيع ... )" color="primary" density="compact"
                v-model="filters.Title"></v-text-field></v-col>
        <v-col cols="12" sm="3" md="2">
            <v-menu transition="slide-x-transition" v-model="menu" location="bottom" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <v-btn dark v-bind="props" append-icon="mdi-tune" variant="text">
                        المزيد
                    </v-btn>
                </template>

                <v-card :max-width="mobile ? '350' : '800'" min-height="300" class="pa-2" id="Filter_Card">
                    <v-row class=" w-100 ma-0 ">
                        <v-col cols="12" md="6">
                            <h4>التفاصيل:</h4>
                            <!-- الغرف -->
                            <v-col cols="12" class="pa-0">

                                <v-row class="ma-0 align-center justify-space-between">
                                    <v-col cols="12" sm="4"><v-card-subtitle class="pr-0">عدد
                                            الغرف:</v-card-subtitle></v-col>
                                    <v-col cols="12" sm="8" class="d-flex ">
                                        <v-combobox hide-details color="primary" v-model="filters.MinNRoom"
                                            :items="listOfNumbers" class="ml-2 " variant="outlined" label="ادنى "
                                            density="compact"></v-combobox>
                                        <v-combobox hide-details color="primary" v-model="filters.MaxNRoom"
                                            :items="listOfNumbers" variant="outlined" label="أقصى "
                                            density="compact"></v-combobox>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="pa-0">

                                <v-row class="ma-0 align-center justify-space-between">
                                    <v-col cols="12" sm="4"><v-card-subtitle class="pr-0">عدد
                                            الصالات:</v-card-subtitle></v-col>
                                    <v-col cols="12" sm="8" class="d-flex ">
                                        <v-combobox hide-details color="primary" v-model="filters.MinNHall"
                                            :items="listOfNumbers" class="ml-2" variant="outlined" label="ادنى "
                                            density="compact"></v-combobox>
                                        <v-combobox hide-details color="primary" v-model="filters.MaxNHall"
                                            :items="listOfNumbers" variant="outlined" label="أقصى "
                                            density="compact"></v-combobox>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="pa-0">

                                <v-row class="ma-0 align-center justify-space-between">
                                    <v-col cols="12" sm="4"><v-card-subtitle class="pr-0">عدد
                                            الحمامات:</v-card-subtitle></v-col>
                                    <v-col cols="12" sm="8" class="d-flex ">
                                        <v-combobox hide-details color="primary" v-model="filters.MinNBathroom"
                                            :items="listOfNumbers" class="ml-2" variant="outlined" label="ادنى "
                                            density="compact"></v-combobox>
                                        <v-combobox hide-details color="primary" v-model="filters.MaxNBathroom"
                                            :items="listOfNumbers" variant="outlined" label="أقصى "
                                            density="compact"></v-combobox>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="pa-0">

                                <v-row class="ma-0 align-center justify-space-between">
                                    <v-col cols="12" sm="4"><v-card-subtitle class="pr-0">
                                            المساحة:</v-card-subtitle></v-col>
                                    <v-col cols="12" sm="8" class="d-flex ">
                                        <v-text-field hide-details color="primary" v-model="filters.MinSpace" type="number"
                                            class="ml-2" variant="outlined" label="ادنى " density="compact"></v-text-field>
                                        <v-text-field hide-details color="primary" type="number" v-model="filters.MaxSpace"
                                            variant="outlined" label="أقصى " density="compact"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="pa-0">

                                <v-row class="ma-0 align-center justify-space-between">
                                    <v-col cols="12" sm="4"><v-card-subtitle class="pr-0">
                                            العمر:</v-card-subtitle></v-col>
                                    <v-col cols="12" sm="8" class="d-flex ">
                                        <v-text-field hide-details color="primary" type="number" class="ml-2"
                                            variant="outlined" label="ادنى " density="compact"
                                            v-model="filters.MinAge"></v-text-field>
                                        <v-text-field hide-details color="primary" type="number" variant="outlined"
                                            label="أقصى " density="compact" v-model="filters.MaxAge"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="pa-0">
                                <v-row class="ma-0 align-center justify-space-between">
                                    <v-col cols="12" sm="4"><v-card-subtitle class="pr-0">الموقع:</v-card-subtitle></v-col>
                                    <v-col cols="12" sm="8" class="d-flex ">
                                        <v-text-field hide-details color="primary" v-model="filters.Location"
                                            variant="outlined" label="الموقع" density="compact"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="pa-0">
                                <v-row class="ma-0 align-center justify-space-between">
                                    <v-col cols="12" sm="4"><v-card-subtitle class="pr-0">السعر:</v-card-subtitle></v-col>
                                    <v-col cols="12" sm="8" class="d-flex ">
                                        <v-text-field hide-details color="primary" v-model="filters.MinPrice" type="number"
                                            class="ml-2" variant="outlined" label="ادنى " density="compact"></v-text-field>
                                        <v-text-field hide-details color="primary" v-model="filters.MaxPrice" type="number"
                                            variant="outlined" label="أقصى " density="compact"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" class="pa-0">
                                <v-row class="ma-0 align-center justify-space-between">
                                    <v-col cols="12" sm="4"><v-card-subtitle class="pr-0">العملة:</v-card-subtitle></v-col>
                                    <v-col cols="12" sm="8" class="d-flex ">
                                        <v-text-field hide-details color="primary" variant="outlined" label="العملة"
                                            v-model="filters.Currency" density="compact"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-col>
                        <v-divider vertical />
                        <!-- Services  -->
                        <v-col cols="12" md="6">
                            <h4>الخدمات:</h4>
                            <v-row class="ma-0 justify-end">
                                <v-col cols="6" lg="4" v-for="property in booleanProperties" :key="property">
                                    <v-checkbox color="primary" v-model="filters[property.text]" class="mt-3" hide-details
                                        :label="property.label"></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <div class="text-left">
                        <v-btn variant="text" @click="clearFilter" class="ml-md-15">مسح الفلتر</v-btn>
                        <v-btn color="primary" @click="handelFilter" class="mr-md-10" size="large">بحث</v-btn>
                    </div>

                </v-card>
            </v-menu>
        </v-col>
        <v-col cols="12" sm="3" md="3" class="py-0 mt-3 mt-md-0"><v-btn variant="flat" size="large"
                :class="{ 'w-100': mobile }" class="w-50" rounded color="primary" @click="handelFilter">بحث</v-btn></v-col>
        <v-col cols="12" class="pa-0 mt-2 pa-md-2">
            <v-row cols="12" class="align-center ma-0">
                <v-col cols="12" sm="6" md="4" class="d-flex align-center">
                    <v-card-subtitle class=" pr-0">نوع العقار:</v-card-subtitle>
                    <v-select placeholder="اختر نوع العقار" variant="outlined" hide-details color="primary"
                        density="compact" :items="allCategories" item-title="name" item-value="id"
                        v-model="categories"></v-select>
                </v-col>
                <v-col cols="12" v-if="categoriesStore.getSubCategories.length > 0" class="align-center pa-0"
                    >
                    <v-card-subtitle class="d-block">الفئات</v-card-subtitle>

                    <v-row class="ma-0" v-if="loadingCategory">
                        <v-skeleton-loader type="chip" v-for="n in 5" width="100" :key="n"></v-skeleton-loader>
                    </v-row>
                    <ChipsFilter :page="page" :subCategories="categoriesStore.getSubCategories" v-if="!loadingCategory"/>
                </v-col>
            </v-row>

        </v-col>
    </v-row>
</template>