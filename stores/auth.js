import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
export const useUserStore = defineStore('User', () => {
    const runtimeConfig = useRuntimeConfig();
    const BaseURL = runtimeConfig.public.apiBase;
    const router = useRouter()
    const route = useRoute();
    const toast = useToast();
    const ComposableError = useError()
    // States 
    const User = ref(null);
    const Token = ref('')
    const Loading = ref(false);
    const UserEmail = ref('')
    const Error = ref(null)
    // Getters 
    const getUser = computed(() => { return User.value })
    const getToken = computed(() => { return Token.value })
    const getLaoding = computed(() => { return Loading.value })
    const getError = computed(() => { return Error.value })
    // Actions 
    async function login(payload) {
        Loading.value = true
        try {
            const { data: user, error } = await useFetch(`${BaseURL}/Auth/login`, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "POST",
                body: JSON.stringify(payload)
            })
            console.log(user)
            if (error.value) {
                if (error.value.data.code === 1005) {
                    ComposableError.handelErros(error.value)
                    UserEmail.value = error.value.data.content.email
                    SendVerifyCode(error.value.data.content.userId);
                    Loading.value =false
                    return;
                }
                ComposableError.handelErros(error.value)
                Loading.value = false
            }

            else {
                const decodeUser = jwtDecode(user.value.content.accessToken);
                setTokenToCookies(user.value.content, decodeUser);
                User.value = decodeUser;
                Token.value = user.value.content.accessToken
                Loading.value = false;
                router.push('/');
            }

        }
        catch (error) {
            ComposableError.handelErros(error)
            Loading.value = false
        }
    }
    async function Register(payload) {
        Loading.value = true
        try {
            const { data: user, error } = await useFetch(`${BaseURL}/Auth/RegisterUserAsync`, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "POST",
                body: JSON.stringify(payload)
            })
            console.log(user)
            if (error.value) {
                ComposableError.handelErros(error.value)
                Loading.value = false
            }

            else {
                UserEmail.value = user.value.content.emailAddress
                toast.success("تم إنشاء الحساب, سيتم تحويلك الى صفحة التحقق")
                await SendVerifyCode(user.value.content.id)
            }

        }
        catch (error) {
            ComposableError.handelErros(error)
            Loading.value = false
        }
    }
    async function SendVerifyCode(id) {
        Loading.value = true
        try {
            const { data: verify, error } = await useFetch(`${BaseURL}/Auth/SendVerifyCode`, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "POST",
                params: {userId: id},
            })
            console.log(error)
            if (error.value) {
                ComposableError.handelErros(error.value)
                Loading.value = false
            }
            else {
                router.push(`/auth-code/${id}`)
                Loading.value = false
                toast.success('تم إرسال رمز التحقق ')
            }
        } catch (error) {
            ComposableError.handelErros(error)
            Loading.value = false
        }
    }
    async function VerifyAccount(userId, code) {
        try {
            const { data: user, error } = await useFetch(`${BaseURL}/Auth/VerifyAccount`, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "POST",
                params: {UserId: userId, Code:code},
            })
            console.log(user)
            if (error.value) {
                ComposableError.handelErros(error.value)
                Loading.value = false
            }
            else {
                toast.success('تم تنشيط حسابك')
                router.push('/')
                Loading.value = false
            }
        } catch (error) {
            ComposableError.handelErros(error)
            Loading.value = false
        }
    }
    function setTokenToCookies(token, decode) {
        const today = new Date();
        const cookie = useCookie('token', {
            expires: new Date(today.getTime() + decode.exp),
            secure: true
        })
        cookie.value = token.accessToken
    }
    async function RemoveUser() {
        User.value = null
        Token.value = null
        useCookie('token').value = null;
        if (route.path !== '/real-estate') {
            router.push('/')

        }
    }
    function setUser(user, token) {
        console.log(user)
        User.value = user,
        Token.value = token
    }
    return { login, Register,setUser, SendVerifyCode,VerifyAccount, UserEmail,getLaoding,getError, getUser, getToken, RemoveUser }
})