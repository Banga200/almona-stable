import { ref } from "vue";
import { useUserStore } from "~/stores/auth";
import { jwtDecode } from "jwt-decode";
export default function () {
    const userStore = useUserStore();

    const user = ref(null);
    const isAdmin = ref(null)
    if (userStore.getUser) {
        userStore.getUser.UserName === "Admin" ? isAdmin.value = true: isAdmin.value = false;
        user.value = userStore.getUser
    }
    const token = userStore.getToken ? userStore.getToken : null
    function checkAdmin() {
        // if (userStore.getUser) {
        //     return userStore.getUser.UserName === "Admin" ? isAdmin = true: isAdmin = false    
        // }
        // return false
    }
    function logOut() {
        userStore.RemoveUser()
    }
    async function getUser() {
        
        const token =  useCookie('token').value;
        if(token) {
            const decodeUser =  jwtDecode(token);
            user.value = decodeUser
            userStore.setUser(decodeUser, token)
            console.log(user)
        }
        
        logOut()
    }
    return {
        checkAdmin,
        logOut,
        getUser,
        token,
        isAdmin,
        user
    }
}