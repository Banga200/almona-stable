import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import { aliases as defaultAliases } from 'vuetify/iconsets/mdi';
import { ar } from 'vuetify/locale';
import  DigitalMarketing from "../components/Icons/DigitalMarketing.vue";
import  Quality from "../components/Icons/Quality.vue";
import  Customers from "../components/Icons/Customers.vue";
import  Eye from "../components/Icons/Eye.vue";
import  Event from "../components/Icons/Event.vue";
import  Lamp from "../components/Icons/Lamp.vue";
import  Speaker from "../components/Icons/Speaker.vue";
import  Building from "../components/Icons/Building.vue";
import  FileCheck from "../components/Icons/FileCheck.vue";
import  Chart from "../components/Icons/Chart.vue";
import  MapMarker from "../components/Icons/MapMarker.vue";
import  ExternalLink from "../components/Icons/ExternalLink.vue";
import  Linkedin from "../components/Icons/Linkedin.vue";
import  Services from "../components/Icons/Services.vue";
import  MessageCircle from "../components/Icons/MessageCircle.vue";
import  FacebookOutline from "../components/Icons/FacebookOutline.vue";
import  Send from "../components/Icons/Send.vue";
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
    Brain,
    Quality,
    Customers,
    Eye,
    Lamp,
    Event,
    Speaker,
    Building,
    FileCheck,
    Chart,
    MapMarker,
    ExternalLink,
    Linkedin,
    Services,
    MessageCircle,
    FacebookOutline,
    Send
  }
  const vuetify = createVuetify({
    defaults: {
      VCard: {
        class: 'my-custom-card',
      },
      VTextField: {
        variant: 'outlined',
        color: 'primary',
        density: 'comfortable',
        rounded: 'lg'
      },
      VFileInput: {
        variant: 'outlined',
        color: 'primary',
        density: 'comfortable',
        rounded: 'lg'
      },
      VCombobox: {
        variant: 'outlined',
        color: 'primary',
        density: 'comfortable',
        rounded: 'lg'
      },
      VSelect: {
        variant: 'outlined',
        color: 'primary',
        density: 'comfortable',
        rounded: 'lg'
      },
      VTextarea: {
        variant: 'outlined',
        color: 'primary',
        density: 'comfortable',
        rounded: 'lg'
      }
    },
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
            primary: "#d4af37", 
            secondary: "#e6c200",
            carouselBG: "#00535c",
            avatar: "#fef7d9",
          }
        },
      }
    },
  })
  app.vueApp.use(vuetify)
})