<script setup>
import Success from './components/messages/Success.vue';
import { useUserStore } from "~/stores/auth";
import { jwtDecode } from "jwt-decode";
const userStore = useUserStore();
const token = useCookie('token').value;
if (token) {
  const decodeUser = jwtDecode(token);
  userStore.setUser(decodeUser, token)
}

</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <Success />
    </NuxtLayout>
  </div>
</template>
