import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import { aliases as defaultAliases } from 'vuetify/iconsets/mdi';
import { ar } from 'vuetify/locale';
import  DigitalMarketing from "../components/Icons/DigitalMarketing.vue";
import  RealEstate from "../components/Icons/RealEstate.vue";
import Ecommerce from '../components/Icons/Ecommerce.vue';
import EventPlanning from '../components/Icons/EventPlanning.vue';
import StudyProjects from '../components/Icons/StudyProjects.vue'
import Brain from '../components/Icons/Brain.vue'
export default defineNuxtPlugin((app) => {
  const aliases = {
    ...defaultAliases,
    DigitalMarketing,
    RealEstate,
    Ecommerce,
    EventPlanning,
    StudyProjects,
    Brain
  }
  const vuetify = createVuetify({
    display:{
      mobileBreakpoint: 'md',
    },
    // ... your configuration
    theme: {
      defaultTheme: "light",
    },
    locale: {
      locale: 'ar',
      fallback: 'en',
      messages: {ar}
    },
    icons: {
      defaultSet: "mdi",
      aliases
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#198c9f", 
            secondary: "#005461",
            carouselBG: "#00535c"
            
          }
        },
      }
    },
  })
  app.vueApp.use(vuetify)
})