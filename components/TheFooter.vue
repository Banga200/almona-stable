<script setup>
import logo from "/logo.png";

const quickLinks = [
    {title: "الرئيسية", link: '#'},
    {title: "عن الشركة", link: '#aboutus'},
    {title: "خدماتنا", link: '#ourServices'},
    {title: "مشاريعنا", link: '#ourProjects'},
    {title: "فريق العمل", link: '#work-team'},
    {title: "اتصل بنا", link: '#contact-us'},
]
const services = [
    {
        id: 1,
        title: 'تنظيم المعارض'
    },
    {
        id: 2,
        title: 'التسويق' 
    },
    {
        id: 3,
        title: 'إدارة المشاريع'
    },
    {
        id: 4,
        title: 'إنجاز الأعمال'
    },
    {
        id: 5,
        title: 'خدمة شغلني'
    },
    {
        id: 6,
        title: 'الاستشارات التجارية'
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
              <h1 class="text-xl text-primary font-bold">المٌنى الذهبية</h1>
              <p class="text-sm">للتجارة والخدمات المحدودة</p>
            </div>
          </div>
           <p>
              شركة يمنية رائدة في تقديم خدمات المعارض، التسويق، إدارة المشاريع،
              وإنجاز الأعمال. نعمل بشغف لتحقيق أهداف عملائنا.
            </p>

            <div class="d-flex ga-4 align-center follow-us mt-6">
                <v-avatar class="facebook" size="56">
                    <v-icon size="24" color="primary" icon="$FacebookOutline"></v-icon>
                </v-avatar>
                <v-avatar class="instagram" size="56">
                    <v-icon size="24" color="primary">mdi-instagram</v-icon>
                </v-avatar>
                <v-avatar class="message" size="56">
                    <v-icon size="24" color="primary" icon="$MessageCircle"></v-icon>
                </v-avatar>
            </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="3"
          class="mt-3 text-center text-md-right"
        >
          <h4 class="text-xl text-primary font-bold mb-6">روابط سريعة</h4>
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
            <h4 class="text-xl text-primary font-bold mb-6">خدماتنا</h4>
          <ul class="list">
                <li class="text-sm d-flex align-center ga-2" v-for="(link) in services" :key="link.title">
                    <div class="list-dot"></div>
                    <a href="#ourServices">{{ link.title }}</a>
                </li>
            </ul>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="3"
          class="mt-3 text-center text-md-right"
        >
            <h4 class="text-xl text-primary font-bold mb-6">معلومات التواصل</h4>
            <div class="d-flex flex-column ga-4 mb-6">
                <div class="d-flex ga-4">
                    <v-icon icon="$MapMarker" color="primary"/>
                    <p>اليمن، حضرموت، المكلا، شارع الجسر الصيني، عمارة بن هلابي2، الدور الثالث، شقة رقم 2</p>
                </div>
                <div class="d-flex ga-4">
                    <v-icon icon="mdi-email-outline" color="primary"/>
                    <p>info@almonaa.com</p>
                </div>
                <div class="d-flex ga-4">
                    <v-icon icon="mdi-phone" color="primary"/>
                    <p>783263332 00967</p>
                </div>
            </div>
            <h4 class="text-primary font-bold">اشترك في نشرتنا الإخبارية</h4>
            <div class="mt-3 d-flex ga-2 align-start">
                <v-text-field density="compact" placeholder="بريدك اللإلكتروني"/>
                <v-btn icon="mdi-email-outline" rounded="lg" color="primary" size="small" class="white"/>
            </div>
        </v-col>
      </v-row>
      <v-divider/>
      <p class="text-center mt-3">© 2025 شركة المُنى الذهبية للتجارة والخدمات المحدودة. جميع الحقوق محفوظة.</p>
      <div class="d-flex align-center justify-center mt-4 ga-6">
        <a>سياسة الخصوصية</a>
        <a>شروط الإستخدام</a>
        <a>اتفاقية الخدمة</a>
      </div>
    </v-container>
  </section>
</template>
