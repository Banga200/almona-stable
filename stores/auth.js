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
    const UserList = ref([])
    const Token = ref('')
    const Loading = ref(false);
    const UserEmail = ref('')
    const Error = ref(null)
    // Getters 
    const getUser = computed(() => { return User.value })
    const getToken = computed(() => { return Token.value })
    const getLaoding = computed(() => { return Loading.value })
    const getError = computed(() => { return Error.value })
    const getUserList = computed(() => { return UserList.value })
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
            if (error.value) {
                if (error.value.data) {
                    if (error.value.data.code === 1005) {
                        ComposableError.handelErros(error.value)
                        UserEmail.value = error.value.data.content.email
                        SendVerifyCode(error.value.data.content.userId);
                        Loading.value =false
                        return;
                    }
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
            Loading.value = false;
            console.log(error)
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
    async function GetAllUsers() {
        Loading.value = true
        try {
            const { data: users, error } = await useFetch(`${BaseURL}/UserManagement/GetUsersAsync`, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${Token.value}`
                },
            })
            if (error.value) {
                ComposableError.handelErros(error.value)
                Loading.value = false
            }

            else {
                UserList.value = users.value.content
                Loading.value = false;
            }

        }
        catch (error) {
            ComposableError.handelErros(error)
            Loading.value = false
        }
    }
    // Delete User
    async function DeleteUser(id) {
        Loading.value = true
        try {
            const { data: user, error } = await useFetch(`${BaseURL}/UserManagement`, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${Token.value}`
                },
                params: {id: id},
                method: "DELETE"
            })
            if (error.value) {
                ComposableError.handelErros(error.value)
                Loading.value = false
            }

            else {
                toast.success("تم حذف الحساب بنجاح")
                const index = UserList.value.findIndex(item => {
                    return item.id === id
                  })
                  if (index !== -1) {
                    UserList.value.splice(index, 1)
                    console.log('Object removed:');
                  } else {
                    console.log('Object not found');
                  }
                Loading.value = false;
            }

        }
        catch (error) {
            ComposableError.handelErros(error)
            Loading.value = false
        }
    }
    // Change Password 
    async function ChangePassword(payload) {
        Loading.value = true
        try {
            const { data: response, error } = await useFetch(`${BaseURL}/Auth/ChangePassword`, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${Token.value}`
                },
                method: "PUT",
                body: JSON.stringify(payload)
            })
            if (response.value) {
                if (response.value.code === 0 ) {
                    toast.success("تم تغير كلمة السر بنجاح")
                    Loading.value = false
                }
                else {
                    ComposableError.handelErros(response.value)
                    Loading.value = false
                }
                
            }

            else {
                toast.success("تم تغير كلمة السر بنجاح")
                Loading.value = false
            }

        }
        catch (error) {
            ComposableError.handelErros(error)
            Loading.value = false
        }
    }
    function setTokenToCookies(token, decode) {
        const date = new Date(10 * 1000);
        const cookieExpiration = date.toUTCString();
        const cookie = useCookie('token', {
            maxAge: 86400 ,
            // expires: cookieExpiration,
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
        User.value = user,
        Token.value = token
    }
    return { login, Register,setUser, SendVerifyCode,VerifyAccount,GetAllUsers,DeleteUser,ChangePassword, getUserList, UserEmail,getLaoding,getError, getUser, getToken, RemoveUser }
})