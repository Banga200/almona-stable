<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/auth';

const userStore = useUserStore();
const drawer = ref(false);
const openPasswordDialog = ref(false)
const isUser = computed(() => {

    if (userStore.getUser) {
        return userStore.getUser
    }
})
function changePasswordDialogState(value) {
    openPasswordDialog.value = value
}

</script>
<template>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
    <v-app>
        <v-app-bar color="primary" prominent>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-container>
                <v-row class="align-center">

                    <v-btn to="/" stacked>الصفحة الرئيسية</v-btn>
                    <v-btn to="/real-estate/عقارات" stacked> عقارات</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn stacked prepend-icon="mdi-plus" to="/real-estate/advertis">إضافة إعلان</v-btn>
                    <v-spacer></v-spacer>
                    <user-drop-menu v-if="isUser" :User="isUser" @PasswordDialog="changePasswordDialogState" />
                </v-row>

            </v-container>
        </v-app-bar>
    
    <v-navigation-drawer v-model="drawer" location="right" rail>
        <v-list :items="items"></v-list>
    </v-navigation-drawer>

    <v-main>
        <v-container fluid>
            <slot />
        </v-container>
        <change-password-dialog :open="openPasswordDialog" @PasswordDialog="changePasswordDialogState" />
    </v-main>
</v-app>
</template>