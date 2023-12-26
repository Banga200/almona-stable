<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '~/stores/auth'
const userStore = useUserStore();
definePageMeta({
   name: 'login', 
   breadcrumb: 'تسجبل الدخول',
   middleware: ['auth'],
   layout: 'registration'
})
const user = ref({
    username: '',
    password: ''
})
const visible = ref(false);
const form = ref(null)
const nameRules = ref([
    value => {
        if (value) {
            return true
        }
        return 'الحقل مطلوب'
    },
    value => {
        if (value?.length >= 2) {
            return true
        }
        return 'الاسم قصير جدا'
    },
]);
const passwordRules = ref([
    value => {
        if (value) {
            return true
        }
        return 'الحقل مطلوب'
    },
    value => {
        if (value?.length >= 8) {
            return true
        }
        return 'على الأقل 8 احرف وارقام'
    },
]);
async function CallLogin() {
    const {valid} = await form.value.validate()
    if (valid) {
       await userStore.login(user.value)
       if (userStore.getUser && userStore.getUser.length > 0 ) {
            router.push('/')
       }
    }
    
}
</script>
<template>
    <div class="pt-1">
        <v-card class="mx-auto pa-4 pa-md-12 pb-8 mt-5" elevation="8" max-width="448" rounded="lg">
            <v-form ref="form" @keyup.enter.prevent="CallLogin">
                <!-- اسم المستخدم  -->
                <v-text-field :rules="nameRules" rounded density="compact" prepend-inner-icon="mdi-account-outline" variant="outlined"
                    label="اسم المستخدم" color="primary" v-model="user.username" ></v-text-field>
                <!-- كلمة السر  -->
                <v-text-field :rules="passwordRules" rounded :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" label="كلمة السر"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    color="primary" v-model="user.password" class="my-2" ></v-text-field>

                <v-btn block class="mb-8" color="teal" rounded size="large" variant="tonal"  @click="CallLogin"  :loading="userStore.getLaoding">
                    تسجيل الدخول
                </v-btn>
            </v-form>

            <v-card-text class="text-center">
                <NuxtLink class="text-blue text-decoration-none" to="/register" rel="noopener noreferrer">
                    تسجيل جديد <v-icon icon="mdi-chevron-left"></v-icon>
                </NuxtLink>
            </v-card-text>
        </v-card>
    </div>
</template>