<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/auth";
import { useDisplay } from "vuetify";
const userStore = useUserStore();
const drawer = ref(false);
const openPasswordDialog = ref(false);
const { mobile } = useDisplay();
const items = ref([
  {
    title: "الطلبات",
    link: "/dashboard/orders",
    icon: "mdi-cart",
  },
  {
    title: "المستخدمين",
    link: "/dashboard/users",
    icon: "mdi-account-lock",
  },
  {
    title: "أقسام الصفحة",
    link: "",
    icon: "mdi-view-dashboard",
    children: [
      {
        title: "الخدمات",
        link: "/dashboard/sections/services",
        icon: "$Services",
      },
      {
        title: "المشاريع",
        link: "/dashboard/sections/projects",
        icon: "mdi-office-building-cog",
      },
      {
        title: "النشرات الإخبارية",
        link: "/dashboard/sections/posts",
        icon: "mdi-newspaper-variant-multiple-outline",
      },
    ],
  },
  {
    title: "المدن",
    link: "/dashboard/cities",
    icon: "mdi-home-city-outline",
  },
  {
    title: "المواقع",
    link: "/dashboard/locations",
    icon: "$MapMarker",
  },
]);
const isUser = computed(() => {
  if (userStore.getUser) {
    return userStore.getUser;
  }
});
function changePasswordDialogState(value) {
  openPasswordDialog.value = value;
}
</script>
<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
  <v-app >
    <v-app-bar color="primary" prominent id="dashboard-header">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-container>
        <v-row class="align-center">
          <v-btn to="/" stacked>الصفحة الرئيسية</v-btn>
          <v-btn to="/real-estate/عقارات" stacked v-if="!mobile"> عقارات</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            stacked
            prepend-icon="mdi-plus"
            to="/real-estate/advertis"
            v-if="!mobile"
            >إضافة إعلان</v-btn
          >
          <v-spacer></v-spacer>
          <user-drop-menu
            v-if="isUser"
            :User="isUser"
            @PasswordDialog="changePasswordDialogState"
          />
        </v-row>
      </v-container>
    </v-app-bar>

    <client-only>
      <v-navigation-drawer v-model="drawer" location="right">
        <v-list>
          <v-list-item
            title="شركة المنى"
            subtitle="للتجارة والخدمات المحدودة"
          ></v-list-item>
        </v-list>
          <v-list nav>
            <!-- Dynamic menu items -->
            <template v-for="item in items" :key="item.title">
              <!-- If item has children -->
              <v-list-group
                v-if="item.children && item.children.length"
                :prepend-icon="item.icon"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item :title="item.title"  v-bind="props" color="primary"/>
                </template>

                <v-list-item
                  v-for="child in item.children"
                  :key="child.title"
                  :to="child.link"
                  :prepend-icon="child.icon"
                  color="primary"
                  style="padding-inline: 40px !important"
                >
                  {{ child.title }}
                </v-list-item>
              </v-list-group>

              <!-- If item has no children -->
              <v-list-item
                v-else
                :to="item.link"
                :prepend-icon="item.icon"
                color="primary"
                style="padding-inline: 20px !important"
              >
                {{ item.title }}
              </v-list-item>
            </template>

            <v-divider class="mt-5" />

            <!-- Static items -->
            <v-list-item
              to="/real-estate/عقارات"
              color="primary"
              style="padding-inline: 20px !important"
            >
              عقارات
            </v-list-item>

            <v-list-item
              to="/real-estate/advertis"
              append-icon="mdi-plus"
              color="primary"
              style="padding-inline: 20px !important"
            >
              إضافة إعلان
            </v-list-item>
          </v-list>
      </v-navigation-drawer>
    </client-only>

    <v-main id="dashboard-main">
      <v-container fluid>
        <slot />
      </v-container>
      <change-password-dialog
        :open="openPasswordDialog"
        @PasswordDialog="changePasswordDialogState"
      />
    </v-main>
  </v-app>
</template>
