<script setup>
import { ref } from 'vue';
const otp = ref('')
definePageMeta({
    name: 'AuthCode'
})
useHead({
    title: 'شركة المنى | التحقق من الحساب',
    hid: 'description',
    name: 'description',
    content: 'يتم التحقق من حساب المستخدم بإرسال رمز التحقق الى البريد الألكتروني'
})
</script>
<template>
    <div class="my-15">
        <OTP />
    </div>
</template>