<script setup>
import { ref, computed } from "vue";
import RealEstateImages from "./RealEstateImages.vue";
import RealEstateInfo from "./RealEstateInfo.vue";
import { useDisplay } from "vuetify";
import { useAdvertismentStore } from "~/stores/advertisment";
import { useUserStore } from "~/stores/auth";
import { useOrdersStore } from "~/stores/orders";
import { useDayjs } from "#dayjs";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import defaultImage from "~/assets/images/default.webp";
// const Varibels
const props = defineProps([
  "advertisment",
  "services",
  "isUserAdvertisements",
  "loading",
  "isDetails",
]);
const advertismentStore = useAdvertismentStore();
const userStore = useUserStore();
const orderStore = useOrdersStore();
const tab = ref(false);
const showMoreDetails = ref(false);
const dayjs = useDayjs();
const router = useRouter();
const route = useRoute();
dayjs.locale("ar");
const components = [RealEstateInfo, RealEstateImages];
const { mobile } = useDisplay();
// Comuted

const images = computed(() => {
  return props.advertisment.imageIDs;
});
const isUser = computed(() => {
  if (userStore.getUser) {
    return userStore.getUser;
  }
});
const loading = computed(() => {
  return orderStore.getLoading;
});
const success = computed(() => {
  return orderStore.getSuccess;
});
// Functions
function toggleMoreDetails() {
  showMoreDetails.value = !showMoreDetails.value;
}
function changeTab(value) {
  tab.value = value;
}

async function makeOrderAndDirect(advertisment) {
  const order = {
    userId: parseInt(isUser.value.UserId),
    advertisementId: advertisment.id,
    orderTime: dayjs().format("YYYY-MM-DDTHH:mm:ss.sssZ"),
    subCategoryId: advertisment.subCategoryId,
    advertisementTypeId: advertisment.advertisementTypeId,
  };
  await orderStore.AddNewOrders(order);
  if (success.value) {
    directNoneUserToWhatsapp(advertisment);
  }
}
function directNoneUserToWhatsapp(advertisment) {
  window.open(
    `https://wa.me/967772769759?text=نوع العقار: *${advertisment.subCategory.name}*%0A سعر العقار: *${advertisment.price}* %0A  موقع العقار: *${advertisment.location}* %0A رقم المرجع: *${advertisment.id}* %0A%0A ${window.location.origin}/advertisement/${advertisment.id}`,
    "_blank"
  );
}
function deleteAdvertisement(id) {
  const answer = window.confirm("هل انت متأكد من حذف هذا الإعلان؟");
  if (answer) {
    advertismentStore.DeleteAdvertisement(id);
  }
}
function editAdvertisement(id) {
  const currentPath = route.path;
  router.push(`${currentPath}/edit/${id}`);
}
function NavigateToDetails(id) {
  router.push(`/advertisement/${id}`);
}
</script>
<template>
  <v-card
    class="w-100 mb-5"
    :border="props.isDetails"
    :elevation="props.isDetails ? '0' : '5'"
    @click="NavigateToDetails(props.advertisment.id)"
  >
    <v-sheet rounded class="RealEstate_card w-100" :class="{ height: !mobile }">
      <v-row class="ma-0 h-100">
        <v-col
          class="image_container"
          :class="{ 'h-100': !mobile }"
          cols="12"
          sm="4"
          lg="4"
        >
          <div
            style="position: absolute; z-index: 999"
            v-if="props.isUserAdvertisements"
          >
            <v-btn
              icon="mdi-pencil"
              color="green"
              class="ml-2"
              size="small"
              @click.stop="editAdvertisement(props.advertisment.id)"
            ></v-btn>
            <v-btn
              icon="mdi-delete"
              color="red"
              :loading="props.loading"
              size="small"
              @click.stop="deleteAdvertisement(props.advertisment.id)"
            ></v-btn>
          </div>
          <img
            class="h-100"
            :src="
              images && images.length > 0 ? `${images[0].url}` : defaultImage
            "
            :alt="images && images.length > 0 ? images[0].description : ''"
            loading="lazy"
            @click.stop="toggleMoreDetails(), changeTab(2)"
          />
          <a
            class="image_feature right"
            @click.stop="
              toggleMoreDetails();
              changeTab(2);
            "
            >صور أكثر <v-icon>mdi-chevron-down</v-icon></a
          >
          <span class="image_feature left"
            >1 /
            {{
              props.advertisment.imageIDs
                ? props.advertisment.imageIDs.length
                : 1
            }}</span
          >
        </v-col>
        <v-col class="content py-2 px-5" cols="12" sm="5" lg="6">
          <h3>{{ props.advertisment.title }}</h3>
          <v-row class="ma-0 my-3">
            <v-card-subtitle>{{
              props.advertisment.subCategory
                ? props.advertisment.subCategory.name
                : ""
            }}</v-card-subtitle>
            <v-spacer />
            <v-card-subtitle>
              {{ props.advertisment.location || "-" }}
              <v-icon>mdi-map-marker-outline</v-icon></v-card-subtitle
            >
          </v-row>
          <v-row class="ma-0 align-center my-5">
            <v-card-subtitle
              >المساحة: {{ props.advertisment.space }}م²</v-card-subtitle
            >
            <v-spacer />
            <client-only>
              <v-row class="align-center justify-end ma-0">
                <v-card-subtitle class="mr-2" v-if="props.advertisment.nRooms">
                  {{ props.advertisment.nRooms }} &nbsp;<v-icon
                    >mdi-bed-outline</v-icon
                  >
                  <v-tooltip activator="parent" location="bottom"
                    >غرفة</v-tooltip
                  >
                </v-card-subtitle>
                <v-card-subtitle class="mr-2" v-if="props.advertisment.nHall">
                  {{ props.advertisment.nHall }} &nbsp;<v-icon
                    >mdi-sofa-outline</v-icon
                  >
                  <v-tooltip activator="parent" location="bottom"
                    >صالة</v-tooltip
                  >
                </v-card-subtitle>
                <v-card-subtitle
                  class="mr-2"
                  v-if="props.advertisment.nBathroom"
                >
                  {{ props.advertisment.nBathroom }} &nbsp;<v-icon
                    >mdi-shower</v-icon
                  >
                  <v-tooltip activator="parent" location="bottom"
                    >حمام</v-tooltip
                  ></v-card-subtitle
                >
                <v-card-subtitle class="mr-2" v-if="props.advertisment.nLands">
                  {{ props.advertisment.nLands }}&nbsp;
                  {{
                    props.advertisment.nLands > 1 ? "اراضي" : "ارض"
                  }}
                  &nbsp;<v-icon>mdi-land-plots-marker</v-icon>
                  <v-tooltip activator="parent" location="bottom"
                    >الاراضي</v-tooltip
                  ></v-card-subtitle
                >
                <v-card-subtitle class="mr-2" v-if="props.advertisment.nFloor">
                  {{ props.advertisment.nFloor }}&nbsp;
                  {{
                    props.advertisment.nFloor > 1 ? "ادوار" : "دور"
                  }}
                  &nbsp;<v-icon>mdi-stairs-up</v-icon>
                  <v-tooltip activator="parent" location="bottom"
                    >الادوار</v-tooltip
                  ></v-card-subtitle
                >
                <v-card-subtitle class="mr-2" v-if="props.advertisment.nEntry">
                  {{ props.advertisment.nEntry }}&nbsp;
                  {{
                    props.advertisment.nEntry > 1 ? "مداخل" : "مدخل"
                  }}
                  &nbsp;<v-icon>mdi-door-open</v-icon>
                  <v-tooltip activator="parent" location="bottom"
                    >المداخل</v-tooltip
                  ></v-card-subtitle>
                <v-card-subtitle class="mr-2" v-if="props.advertisment.availability">
                    يملك وثائق
                  &nbsp;<v-icon>mdi-file-document-multiple-outline</v-icon>
                  <v-tooltip activator="parent" location="bottom"
                    > يملك وثائق</v-tooltip
                  ></v-card-subtitle>
              </v-row>
            </client-only>
          </v-row>
          <v-btn
            class="w-100 justify-space-between pr-0"
            variant="text"
            append-icon="mdi-chevron-down"
            @click.stop="
              toggleMoreDetails();
              changeTab(1);
            "
          >
            معلومات اكثر</v-btn
          >
        </v-col>
        <!-- Price السعر  -->
        <v-col
          cols="12"
          sm="3"
          lg="2"
          class="text-center d-flex flex-column justify-end align-center"
          style="position: relative"
        >
          <!-- طلب عقار  -->
          <v-alert
            variant="tonal"
            width="100%"
            class="text-center request_alert justify-center pa-3"
            color="teal-darken-2"
            title="طلب عقار"
            v-if="props.advertisment.advertisementTypeId === 2"
          ></v-alert>
          <v-spacer />
          <!-- Whatsapp button  -->
          <div class="mt-md-10 mt-13">
            <!-- For All Users  -->
            <v-btn
              append-icon="mdi-whatsapp"
              color="green-accent-4"
              style="color: #fff !important"
              variant="flat"
              v-if="!isUser"
              @click.stop="directNoneUserToWhatsapp(props.advertisment)"
              >تواصل معنا</v-btn
            >
            <!-- Only for Users Sign in  -->
            <v-btn
              append-icon="mdi-whatsapp"
              color="green-accent-4"
              style="color: #fff !important"
              variant="flat"
              v-if="isUser"
              @click.stop="makeOrderAndDirect(props.advertisment)"
              :loading="loading"
              >تواصل معنا</v-btn
            >
          </div>
          <v-spacer />
          <v-card-title class="price"
            >{{ props.advertisment.price }}
            {{ props.advertisment.currency }}</v-card-title
          >
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet class="w-100" v-if="showMoreDetails" @click.stop="">
      <v-card>
        <v-tabs v-model="tab" color="primary" align-tabs="center">
          <v-tab :value="1">المعلومات</v-tab>
          <v-tab :value="2" id="images">الصور</v-tab>
        </v-tabs>
        <v-divider />
        <v-window v-model="tab">
          <v-window-item
            v-for="(component, i) in components"
            :key="i"
            :value="i + 1"
          >
            <v-container fluid>
              <component :is="component" :advertisment="props.advertisment" />
            </v-container>
          </v-window-item>
          <v-divider />
          <div class="text-left my-3 px-4">
            <v-btn
              class="text-left"
              color="primary"
              variant="outlined"
              @click="toggleMoreDetails"
              >إغلاق</v-btn
            >
          </div>
        </v-window>
      </v-card>
    </v-sheet>
  </v-card>
</template>
<style scoped>
.request_alert {
  position: absolute;
  top: 0;
}
</style>
