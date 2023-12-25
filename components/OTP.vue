<script setup>
import { ref, watch, computed } from 'vue';
import { useUserStore } from '~/stores/auth';
import { useRoute } from 'vue-router';
const userStore = useUserStore();
const route = useRoute();
const otp = ref('');
const email = computed(() => {
  return userStore.UserEmail
})
const loading = computed(() => {return userStore.getLaoding})
function verifyCode() {
  userStore.VerifyAccount(route.params.id,otp)
}
function resendOTP() {
  userStore.SendVerifyCode(route.params.id)
}
</script>
<template>
  <v-card class="py-8 px-6 text-center mx-auto ma-4" elevation="12" max-width="400" width="100%">
    <h3>تحقق من حسابك</h3>

    <p class="mt-3 text">
      تم إرسال رمز تحقق الى البريد الإلكتروني <strong>{{ email }}</strong> <br>

      الرجاء التأكد من البريد الإلكتروني ولصق رمز التحقق في الأسفل.
    </p>

    <v-sheet color="surface" dir="ltr">
      <v-otp-input v-model="otp"  variant="outlined"></v-otp-input>
    </v-sheet>

    <v-btn class="my-4" :loading="loading" color="primary" height="40" text="تحقق" variant="flat" width="70%" rounded @click='verifyCode'></v-btn>

    <v-card-subtitle>
      لم تستلم الرمز؟ <a href="#" @click.prevent="otp = ''" @click="resendOTP">إعادة الإرسال</a>
    </v-card-subtitle>
  </v-card>
</template>

<style scoped>
.text {
  font-size: 14px !important;
  color: black;
  line-height: 30px;
}
</style>