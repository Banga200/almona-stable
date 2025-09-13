<script setup>
import logo from "/logo.png";
import { ref, watch, onMounted, onUnmounted, onUpdated } from "vue";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/auth";
import { useSwitchLocalePath } from '#i18n'  
const userStore = useUserStore();
const User = useUser();
const { mobile } = useDisplay();
const drawer = ref(false);
const bottomNavigation = ref(0);
const route = useRoute();
const {t, locale, setLocale} = useI18n();
const switchLocalePath = useSwitchLocalePath()
const routeNavs = ref([
  {
    title: "عقارات",
    link: `/real-estate/عقارات`,
    color: "primary",
  },
  {
    title: "إضافة إعلان",
    link: `/real-estate/advertis`,
    color: "primary",
    icon: "mdi-plus",
  },
]);
const navs = ref([
  {
    title: t("links.home_page"),
    link: "/",
  },
  {
    title: t("links.about_us"),
    link: "/#aboutus",
  },
  {
    title: t("links.our_projects"),
    link: "/#ourProjects",
  },
  {
    title: t("links.our_services"),
    link: "/#ourServices",
  },
  {
    title: t("links.work_team"),
    link: "/#work-team",
  }
]);
const props = defineProps(["HomeHeader"]);
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // document.getElementById("header").classList.add("backgroundColor")
});
onUpdated(() => {
  handleScroll();
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const isUser = computed(() => {
  if (userStore.getUser) {
    return userStore.getUser;
  }
});
function handleScroll(event) {
  if (route.name && route.name.toString().startsWith("Home")) {
    if (window.scrollY > 80) {
      document.getElementById("header").classList.add("backgroundColor");
    } else {
      document.getElementById("header").classList.remove("backgroundColor");
    }
  }
}
const switchLang = () => {
  // toggle between Arabic & English
  const newLang = locale.value === 'ar' ? 'en' : 'ar'
  // change locale
 setLocale(newLang)

}
</script>
<template>
  <client-only>
    <div class="contact">
      <v-container class="d-flex pa-0">
          <v-col>
            <div class="d-flex ga-4">
              <a class="d-flex align-center ga-2" :href="'mailto:' + 'info@almonaa.com'">
                <v-icon size="16">mdi-email-outline</v-icon>
                <span>info@almonaa.com</span>
              </a>
              <a class="d-flex align-center ga-2" :href="'tel:' + '00967 383263332'">
                <v-icon size="16">mdi-phone</v-icon>
                <span dir="ltr">00967 383263332</span>
              </a>
            </div>
          </v-col>
          <v-spacer />
          <v-col>
            <div class="d-flex align-center justify-end ga-2 lang-switch" @click="switchLang">
              <v-icon size="16">mdi-web</v-icon>
              <span> العربية | English </span>
            </div>
          </v-col>
      </v-container>
    </div>

    <v-navigation-drawer
      @click:outside="drawer = !drawer"
      v-model="drawer"
      location="right"
      temporary
    >
      <v-list>
        <!-- This is for Static href='#' -->
        <v-list-item
          v-for="item in navs"
          stacked
          :key="item.title"
          :href="item.link"
          color="priamry"
        >
          {{ item.title }}
        </v-list-item>
        <!-- This list is for any routing pages  -->
        <!-- <v-list-item
          v-for="item in routeNavs"
          :key="item.title"
          :to="item.link"
          color="priamry"
          :append-icon="item.icon"
        >
          {{ item.title }}
        </v-list-item> -->
        <v-spacer />
        <v-divider class="mt-2" />
        <v-list-item
          variant="flat"
          class="mt-2"
          v-if="isUser ? isUser.UserName === 'Admin' : isUser"
          to="/dashboard/orders"
          append-icon="mdi-view-dashboard-outline"
          >لوحة التحكم</v-list-item
        >
        <v-btn
          prepend-icon="mdi-account-outline"
          variant="outlined"
          to="/login"
          rounded
          class="mr-2 mt-10"
          v-if="!isUser"
        >
          تسجيل الدخول
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </client-only>

  <v-app-bar
    scroll-behavior="elevate"
    :elevation="!props.HomeHeader ? '2' : '0'"
    :id="HomeHeader"
  >
    <client-only>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        v-if="mobile"
      ></v-app-bar-nav-icon>

      <v-container
        :class="{ 'justify-end': mobile }"
        class="d-flex align-center"
      >
        <client-only v-if="!mobile">
          <v-row class="align-center">
            <div class="d-flex ga-1 ">
              <div class="logo">
                <v-img :src="logo" alt="Logo Image" contain max-height="48" width="78" height="48" max-width="78" />
              </div>
                <div>
                    <h1 class="text-xl text-primary">{{ $t("heading.company_name") }}</h1>
                    <p class="text-sm">{{ $t('heading.company_sub_name') }}</p>
                </div>
            </div>

            <!-- <v-bottom-navigation active right bg-color="transparent" light v-model="bottomNavigation" class="justify-start" color="primary">
                       
                            </v-bottom-navigation> -->
            <client-only>
              <v-btn class="mr-md-15" stacked @click="() => $router.push('/')"
                >{{ $t('links.home_page') }}</v-btn
              >
              <v-btn stacked @click="() => $router.push(`${locale}/#aboutus`)"
                >{{ $t('links.about_us') }} </v-btn
              >
              <v-btn stacked @click="() => $router.push('/#ourProjects')"
                >{{ $t('links.our_projects') }}</v-btn
              >
              <v-btn stacked @click="() => $router.push('/#ourServices')"
                >{{ $t('links.our_services') }}</v-btn
              >
              <v-btn stacked @click="() => $router.push('/#work-team')"
                >{{ $t('links.work_team') }}</v-btn
              >
              <!-- <v-btn stacked to="/real-estate/عقارات">عقارات</v-btn> -->
            </client-only>

            <v-spacer />
            <v-row class="align-center">
              <!-- إذا كان المستخدم مسجل  -->
              <!-- <v-btn append-icon="mdi-plus" to="/real-estate/advertis" 
                >عرض إعلان</v-btn
              > -->
              <!-- <v-btn prepend-icon="mdi-note-edit-outline">إرسال طلب </v-btn> -->
              <!-- زر خاص للمسوؤل  -->
            </v-row>
            <v-btn
              append-icon="mdi-view-dashboard-outline"
              class="ml-10"
              v-if="isUser ? isUser.UserName === 'Admin' : isUser"
              to="/dashboard/orders"
              >{{  $t('label.control_panel')}}</v-btn
            >
          </v-row>
        </client-only>
        <v-btn
          rounded
          variant="outlined"
          to="/login"
          prepend-icon="mdi-account-outline"
          v-if="!isUser"
        >
           {{ $t('label.log_in') }}
        </v-btn>
        <user-drop-menu v-if="isUser" :User="isUser" />
      </v-container>
    </client-only>
  </v-app-bar>
</template>
