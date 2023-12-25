<script setup>
import { ref, watch } from 'vue';
import {useUserStore} from '~/stores/auth'
import { useRouter } from 'vue-router';
definePageMeta({
    layout: 'registration'
})
const userStore = useUserStore();
const router = useRouter();
const form = ref(null)
const fields = ref({
    emailAddress: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    userName: '',
    password: '',
    confirmPassword: ''
})
const emailRules = ref([
    value => {
        if (value) {
            return true
        }
        return 'الإيميل مطلوب'
    },
    value => {
        if (/.+@.+\..+/.test(value)) {
            return true
        }
        return 'إيميل غير صحيح'
    },
])
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
const phoneUmberRules = ref([
    value => {
        if (value) {
            return true
        }
        return 'رقم الجوال مطلوب'
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
const passwordMatchRules = ref([
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
    value => {
        if (value !== fields.value.password) {
            return "كلمة السر غير متطابقة"
        }
    },
]);
const visible = ref(false);

// const {valid} = await form.value.validate()
// watch(valid, (value) => {
//     console.log(value)
// })
const submitRegistration = async () => {
    const {valid} = await form.value.validate()
    if (valid) {
       await userStore.Register(fields.value)
       if (userStore.getUser && userStore.getUser.length > 0 ) {
            router.push('/')
       }
    }
}
</script>
<template>
    <div class="pt-1 mt-6">
        <v-card class="mx-auto pa-4 pa-md-12  mt-5" elevation="8" max-width="448" rounded="lg">
            <v-form ref="form" @submit.prevent="submitRegistration">
                <v-text-field v-model.trim="fields.emailAddress" rounded density="compact"
                    prepend-inner-icon="mdi-email-outline" variant="outlined" :rules="emailRules" label="البريد الإلكتروني"
                    color="primary" class="mb-2"></v-text-field>

                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model.trim="fields.firstName" :rules="nameRules" rounded density="compact"
                            prepend-inner-icon="mdi-card-account-details-outline" variant="outlined" label="الاسم الأول"
                            color="primary" class="mb-2"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model.trim="fields.lastName" :rules="nameRules" rounded density="compact"
                            prepend-inner-icon="mdi-card-account-details-outline" variant="outlined" label="الاسم الاخير"
                            color="primary" class="mb-2"></v-text-field>
                    </v-col>
                </v-row>
                <!-- هاتف الجوال -->
                <v-text-field v-model.trim="fields.mobileNo" :rules="phoneUmberRules" rounded density="compact"
                    prepend-inner-icon="mdi-cellphone" variant="outlined" label="رقم الجوال" type="number"
                    color="primary" class="mb-2"></v-text-field>
                <!-- اسم المستخدم  -->
                <v-text-field v-model.trim="fields.userName" :rules="nameRules" rounded density="compact"
                    prepend-inner-icon="mdi-account-outline" variant="outlined" label="اسم المستخدم"
                    color="primary" class="mb-2"></v-text-field>
                <!-- كلمة السر  -->
                <v-text-field v-model.trim="fields.password" rounded :rules="passwordRules"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" label="كلمة السر" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="visible = !visible" color="primary" class="mb-2"></v-text-field>
                <!-- كلمة السر  -->
                <v-text-field rounded v-model.trim="fields.confirmPassword" :rules="passwordMatchRules" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" label="كلمة السر"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    color="primary"></v-text-field>

                <v-btn block class="mb-4 mt-3"  color="teal" rounded size="large"
                    variant="tonal" type="submit" :loading="userStore.getLaoding">
                    تسجيل
                </v-btn>
            </v-form>

            <v-card-text class="text-center">
                <NuxtLink class="text-blue text-decoration-none" to="/login" rel="noopener noreferrer">
                    تسجيل الدخول <v-icon icon="mdi-chevron-left"></v-icon>
                </NuxtLink>
            </v-card-text>
        </v-card>
    </div>
</template>