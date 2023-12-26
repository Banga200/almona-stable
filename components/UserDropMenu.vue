<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();
const props = defineProps(['User']);
const emit = defineEmits(['PasswordDialog'])
const userItems = ref([
    // { title: 'الملف الشخصي', icon: 'mdi-card-account-details-outline', link: '/user/profile' },
    { type: 'item', title: 'إعلاناتي', icon: 'mdi-sign-real-estate', link: '/real-estate/عقارات', value: 1 },
    { type: 'item', title: 'تغير كلمة السر', icon: 'mdi-lock', link: 'changePassword', value: 2 },
    { type: 'divider' },
    { type: 'item', title: 'تسجيل الخروج', icon: 'mdi-logout', link: 'logout', value: 3 },
])
const isUser = computed(() => {

if (userStore.getUser) {
    return userStore.getUser
}
})
const fullName = computed(() => {
    if (props.User) {
        return `${props.User.FirstName}`
    }
})
function userMenu(url) {
    if (url === "logout") {
        userStore.RemoveUser();
    }
    else if(url === 'changePassword'){
        emit('PasswordDialog', true)
    }
    else {
        if (url === '/real-estate/عقارات') {
            if (isUser) {
                router.push('/real-estate/عقارات')
                userStore
            }
        }
        
    }
}

</script>
<template>
    <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" append-icon="mdi-menu-down">
                {{ fullName }}
            </v-btn>
        </template>
        <v-card class="px-3">
            <v-list>
                <template v-for="(item, i) in userItems" :key="i">
                    <v-list-item color="primary" rounded="xl" @click="userMenu(item.link)" :title="item.title" :prepend-icon="item.icon" v-if="item.type === 'item'">
                    </v-list-item>
                    <v-divider v-if="item.type === 'divider'" class="mt-4 mb-1"/>
                </template>
            </v-list>
        </v-card>
    </v-menu>
</template>