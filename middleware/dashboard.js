import { useUserStore } from "~/stores/auth";
import { useToast } from "vue-toastification";
import { jwtDecode } from "jwt-decode";
export default defineNuxtRouteMiddleware(async (to,from )=> {
    const toast = useToast()
    const token = useCookie('token').value
     const user = await jwtDecode(token)
    // skip middleware on server
    if (process.server) return
    if (to.name === 'Orders' || to.name === "Users") {
        if(user){
            
            if (user.Role === "Admin") {
                return;
            }
            else{ return navigateTo('/')}
        }
        else {return navigateTo('/login')}
        
    }
   
  })