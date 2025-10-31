<script setup>
import logo from "/logo.png";
const {t} = useI18n();
const quickLinks = [
    {title: t("links.home"), link: '#'},
    {title: t("links.about_company"), link: '#aboutus'},
    {title: t("links.our_services"), link: '#ourServices'},
    {title: t("links.our_projects"), link: '#ourProjects'},
    {title: t("links.work_team"), link: '#work-team'},
    {title: t("links.contact_us"), link: '#contact-us'},
]
const services = [
    {
        id: 1,
        title: t("exhibition_organization")
    },
    {
        id: 2,
        title: t("marketing")
    },
    {
        id: 3,
        title: t("project_management")
    },
    {
        id: 4,
        title: t("business_execution")
    },
    {
        id: 5,
        title: t("shoghlni_service")
    },
    {
        id: 6,
        title: t("business_consulting")
    },
]
</script>
<template>
  <section id="footer">
    <v-container>
      <v-row >
        <v-col cols="12" md="6" lg="3">
          <div class="d-flex ga-3 align-center mb-6 logo">
            <v-img
              :src="logo"
              alt="Logo Image"
              contain
              height="48"
              width="68"
               max-height="48"
              max-width="68"
            />
            <div>
              <h1 class="text-xl text-primary font-bold">{{ $t("heading.company_name") }}</h1>
              <p class="text-sm">{{ $t("heading.company_sub_name") }}</p>
            </div>
          </div>
           <p>
            {{ $t("paragraph.hero_description") }}
              <!-- شركة يمنية رائدة في تقديم خدمات المعارض، التسويق، إدارة المشاريع،
              وإنجاز الأعمال. نعمل بشغف لتحقيق أهداف عملائنا. -->
            </p>

            <div class="d-flex ga-4 align-center follow-us mt-6">
                <a href="https://www.facebook.com/share/1CWQNX7fvm/" target="_blank">
                  <v-avatar class="facebook" size="56">
                    <v-icon size="24" color="primary" icon="$FacebookOutline"></v-icon>
                  </v-avatar>
                </a>
                <a href="https://www.instagram.com/almonaa.co?igsh=MXdvOHR2aWdwNHpocA==" target="_blank">
                  <v-avatar class="instagram" size="56">
                    <v-icon size="24" color="primary">mdi-instagram</v-icon>
                  </v-avatar>
                </a>
                <a 
                    href="https://www.tiktok.com/@almonaa.co1?_t=ZS-8zDrVNIRqZV&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <v-avatar class="tiktok" size="56">
                            <v-icon size="24" color="primary" icon="$Tiktok"></v-icon>
                        </v-avatar>
                    </a>
                <a 
                  href="https://wa.me/783273332"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-avatar class="message" size="56">
                    <v-icon size="24" color="primary" icon="$MessageCircle"></v-icon>
                  </v-avatar>
                </a>
                
            </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="3"
          class="mt-3 text-center text-md-right"
        >
          <h4 class="text-xl text-primary font-bold mb-6">{{ $t("quick_links") }}</h4>
          <ul class="list">
                <li class="text-sm d-flex align-center ga-2" v-for="(link) in quickLinks" :key="link.title">
                    <div class="list-dot"></div>
                    <a :href="link.link">{{ link.title }}</a>
                </li>
            <!-- <v-list-item to="/real-estate/عقارات">عقارات</v-list-item>
            <v-list-item href="/#aboutus">من نحن؟</v-list-item>
            <v-list-item href="/#services">خدماتنا</v-list-item> -->
            </ul>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="3"
          class="mt-3 text-center text-md-right"
        >
          <h4 class="text-xl text-primary font-bold mb-6">{{ $t("our_services") }}</h4>
          <ul class="list">
                <li class="text-sm d-flex align-center ga-2" v-for="(link) in services" :key="link.title">
                    <div class="list-dot"></div>
                    <a >{{ link.title }}</a>
                </li>
            </ul>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="3"
          class="mt-3 text-center text-md-right"
        >
            <h4 class="text-xl text-primary font-bold mb-6">{{ $t("contact_info") }}</h4>
            <div class="d-flex flex-column ga-4 mb-6">
                <div class="d-flex ga-4">
                    <v-icon icon="$MapMarker" color="primary"/>
                    <p>{{ $t("address_location") }}</p>
                </div>
                <a class="d-flex ga-4" :href="'mailto:' + 'info@almonaa.com'">
                    <v-icon icon="mdi-email-outline" color="primary"/>
                    <span>info@almonaa.com</span>
                </a>
                <a :href="'tel:' + `${companyPhone}`" class="d-flex ga-4">
                    <v-icon icon="mdi-phone" color="primary"/>
                    <span>{{ companyPhone }}</span>
                </a>
            </div>
            <h4 class="text-primary font-bold">{{ $t("subscribe_in_our_newsletter") }}</h4>
            <div class="mt-3 d-flex ga-2 align-start">
                <v-text-field density="compact" :placeholder="$t('your_email_placeholder')"/>
                <v-btn icon="mdi-email-outline" rounded="lg" color="primary" size="small" class="white"/>
            </div>
        </v-col>
      </v-row>
      <v-divider/>
      <p class="text-center mt-3">{{$t("heading.company") + " " + $t("heading.company_name") + " " + $t("heading.company_sub_name") + " " + $t("rights_reserved", { year: new Date().getFullYear() })}} </p>
      <div class="d-flex align-center justify-center mt-4 ga-6">
        <a>{{$t("privacy_policy")}}</a>
        <a>{{$t("terms_of_use")}}</a>
        <a>{{$t("service_agreement")}}</a>
      </div>
    </v-container>
  </section>
</template>
