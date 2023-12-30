<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/auth';
import {useDisplay} from 'vuetify'
const userStore = useUserStore();
const drawer = ref(false);
const openPasswordDialog = ref(false);
const {mobile} = useDisplay();
const items = ref([
    {
        title: "الطلبات",
        link: '/dashboard/orders',
        icon: 'mdi-cart'
    },
    {
        title: "المستخدمين",
        link: '/dashboard/users',
        icon: 'mdi-account-lock'
    },
])
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
                    <v-btn to="/real-estate/عقارات" stacked v-if="!mobile"> عقارات</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn stacked prepend-icon="mdi-plus" to="/real-estate/advertis" v-if="!mobile">إضافة إعلان</v-btn>
                    <v-spacer></v-spacer>
                    <user-drop-menu v-if="isUser" :User="isUser" @PasswordDialog="changePasswordDialogState" />
                </v-row>

            </v-container>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" location="right">
            <v-list>
                <v-list-item  title="شركة المنى"
                    subtitle="للتجارة والخدمات المحدودة"></v-list-item>
            </v-list>
            <v-list>
                <v-list-group>
                    <v-list-item v-for="item in items" :key="item.title" :prepend-icon="item.icon" :to="item.link"
                        color="primary"  style="padding-inline: 20px !important;">{{ item.title }}</v-list-item>
                        <v-divider class="mt-5"/>
                        <v-list-item 
                        color="primary"  style="padding-inline: 20px !important;" to="/real-estate/عقارات" >عقارات</v-list-item>
                        <v-list-item 
                        color="primary"  style="padding-inline: 20px !important;" to="/real-estate/advertis" append-icon="mdi-plus"> إضافة إعلان </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container fluid>
                <slot />
            </v-container>
            <change-password-dialog :open="openPasswordDialog" @PasswordDialog="changePasswordDialogState" />
        </v-main>
    </v-app>
</template>