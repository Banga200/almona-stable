import { useUserStore } from "~/stores/auth";
import { useToast } from "vue-toastification"

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  const userStore = useUserStore()
  const user = userStore.getUser
  const toast = useToast()
  const token = useCookie('token').value

  // Determine login/register paths properly (consider i18n prefix)
  const loginPaths = ['/login', '/register', '/ar/login', '/ar/register', '/en/login', '/en/register']
  if (loginPaths.includes(to.path)) {
    if (user || token) {
      return navigateTo('/')
    }
    return
  }

  // Protected routes
  if (!user && !token) {
    toast.warning("سجل اولا, لإضافة إعلان")
    return navigateTo('/login')  // safe redirect
  }

  console.log(user)
})
