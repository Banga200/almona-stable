<script setup>
import logo from '../assets/logo.jpg';
import { ref, watch, onMounted, onUnmounted, onUpdated } from 'vue';
import { useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';
import { useUserStore } from '~/stores/auth';
const userStore = useUserStore();
const User = useUser();
const { mobile } = useDisplay();
const drawer = ref(false);
const bottomNavigation = ref(0);
const route = useRoute();
const routeNavs = ref([
    {
        title: 'عقارات',
        link: `/real-estate/عقارات`,
        color: 'primary'
    },
    {
        title: 'إضافة إعلان',
        link: `/real-estate/advertis`,
        color: 'primary',
        icon: "mdi-plus"
    },
])
const navs = ref([
    {
        title: 'الصفحة الرئيسية',
        link: '/',
    },
    {
        title: 'من نحن؟',
        link: '/#aboutus',
    },
    {
        title: 'خدماتنا',
        link: '/#services',
    }

])
const props = defineProps(['HomeHeader'])
const openPasswordDialog = ref(false)
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    // document.getElementById("header").classList.add("backgroundColor")
})
onUpdated(() => {
    handleScroll()
})
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})
const isUser = computed(() => {

    if (userStore.getUser) {
        return userStore.getUser
    }
})
function handleScroll(event) {
    if (route.name === 'Home') {
        if (window.scrollY > 80) {
            document.getElementById("header").classList.add("backgroundColor")
        }
        else { document.getElementById("header").classList.remove('backgroundColor') }
    }
}
function changePasswordDialogState(value) {
    openPasswordDialog.value = value
}
</script>
<template>
    <client-only>
            <v-navigation-drawer @click:outside="drawer = !drawer" v-model="drawer" location="right" temporary>
                <v-list>
                    <!-- This is for Static href='#' -->
                    <v-list-item v-for="item in navs" stacked :key="item.title" :href="item.link" color="priamry">
                        {{ item.title }}
                    </v-list-item>
                    <!-- This list is for any routing pages  -->
                    <v-list-item v-for="item in routeNavs" :key="item.title" :to="item.link" color="priamry" >
                        {{ item.title }}
                    </v-list-item>
                    <v-spacer />
                    <v-divider class="mt-2"/>
                    <v-btn  variant="flat" class="mt-2" v-if="isUser" to="/dashboard/orders">لوحة التحكم</v-btn>
                    <v-btn prepend-icon="mdi-account-outline" variant="outlined" to="/login" rounded class="mr-2 mt-10" v-if="!isUser">
                        تسجيل الدخول
                    </v-btn>
                </v-list>
            </v-navigation-drawer>
        </client-only>

        <v-app-bar scroll-behavior="elevate" :elevation="!props.HomeHeader ? '2' : '0'" :id="props.HomeHeader">
            <client-only>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="mobile"></v-app-bar-nav-icon>

                <v-container :class="{'justify-end': mobile}" class="d-flex align-center">
                    <client-only v-if="!mobile">
                        <v-row class="align-center">
                            <!-- <v-img :src="logo" alt="Logo Image" contain max-height="78" max-width="78" /> -->

                            <!-- <v-bottom-navigation active right bg-color="transparent" light v-model="bottomNavigation" class="justify-start" color="primary">
                       
                            </v-bottom-navigation> -->
                            <client-only>
                                <v-btn class="mr-md-15" stacked @click="() => $router.push('/')">الصفحة الرئيسية</v-btn>
                                <v-btn stacked @click="() => $router.push('/#aboutus')">من نحن</v-btn>
                                <v-btn stacked @click="() => $router.push('/#services')">اعمالنا</v-btn>
                                <v-btn stacked to="/real-estate/عقارات">عقارات</v-btn>
                            </client-only>

                            <v-spacer />
                            <v-row class="align-center">
                                <!-- إذا كان المستخدم مسجل  -->
                                <v-btn prepend-icon="mdi-plus" to="/real-estate/advertis" stacked>عرض إعلان</v-btn>
                                <!-- <v-btn prepend-icon="mdi-note-edit-outline">إرسال طلب </v-btn> -->
                                <!-- زر خاص للمسوؤل  -->
                                
                            </v-row>
                            <v-btn stacked prepend-icon="mdi-view-dashboard-outline" class="ml-10" v-if="isUser" to="/dashboard/orders">لوحة التحكم</v-btn>
                            <v-btn rounded variant="outlined" :size="mobile ? 'small' : 'large'" to="/login"
                                prepend-icon="mdi-account-outline" v-if="!isUser">
                                تسجيل الدخول
                            </v-btn>
                            
                        </v-row>
                    </client-only>
                    <user-drop-menu v-if="isUser" :User="isUser" @PasswordDialog="changePasswordDialogState" />
                </v-container>
                <change-password-dialog :open="openPasswordDialog" @PasswordDialog="changePasswordDialogState" />
            </client-only>
        </v-app-bar>
</template>