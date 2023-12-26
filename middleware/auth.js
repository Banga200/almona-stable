import { useUserStore } from "~/stores/auth";
import { useToast } from "vue-toastification"
export default defineNuxtRouteMiddleware((to,from )=> {
    const userStore = useUserStore();
    const user =   userStore.getUser
    const toast = useToast()
    const token = useCookie('token').value;
    // skip middleware on server
    if (process.server) return
    if (to.name === 'register' || to.name === 'login') {
            if (user || token) {
               return navigateTo('/')
            }
           else { return;}
    }
    if (user || token) {
        if (to.name === 'AddAdvertisment') {
            return;
        }
    }
    else {
        toast.warning("سجل اولا, لإضافة إعلان")
        return navigateTo('/login')
    }
    console.log(user)
    if (userStore.getUser.Verified) {
        
    }
    // if(user.getUser.isAdmin) return
    else {
        return navigateTo('/')
    }
  })