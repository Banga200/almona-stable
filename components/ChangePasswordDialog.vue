<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from '~/stores/auth'
const userStore = useUserStore()
const props = defineProps(['open'])
const emit = defineEmits(['update:open'])
const drawer = computed({
    get() {
        return props.open
    },
    set() {
        emit('update:open', !props.open)
    }
})
const disabled = ref(true)

const formData = ref({
    oldPassword: '',
    newPassword: ''
})
const visible = ref(false);
const loading = computed(() => {
    return userStore.getLaoding
})
const form = ref(null)
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
watch(formData.value, () => {
    if (formData.value.oldPassword === '' ||
        formData.value.newPassword === '') {
        disabled.value = true
    }

    else {
        disabled.value = false
        console.log("Else")
    }
})
async function submitForm() {
    const {valid} = await form.value.validate()
    if (valid) {
       await userStore.ChangePassword(formData.value)
       emit('update:open', false)
    }
}
</script>
<template>
    <v-dialog v-model="drawer" width="320" :close-on-content-click="false">
        <v-card class="pa-5">
            <v-row class="mb-3">
                <v-card-title>تغير كلمة السر</v-card-title>
                <v-spacer />
                <v-btn icon="mdi-close" variant="flat" @click="$emit('update:open', false)"></v-btn>
            </v-row>
            <v-form ref="form" @keyup.enter.prevent="submitForm">
                <!--  القديمة كلمة السر  -->
                <v-text-field :rules="passwordRules" rounded :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" label="كلمة السر القديمة"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    color="primary" v-model="formData.oldPassword" class="my-2"></v-text-field>
                <!-- كلمة السر الجديدة  -->
                <v-text-field :rules="passwordRules" rounded :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" label="كلمة السر الجديدة"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    color="primary" v-model="formData.newPassword" class="my-2"></v-text-field>
                <v-btn color="primary" @click="submitForm" class="w-100" :loading="loading">تأكيد</v-btn>
            </v-form>

        </v-card>
    </v-dialog>
</template>