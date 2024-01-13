<script setup>
import { useDisplay } from 'vuetify';
import { ref, watch, computed } from 'vue';
import { useAdvertismentStore } from '~/stores/advertisment';
import { useCategoryStore } from '~/stores/category';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const props = defineProps(['subCategories'])
const { mobile } = useDisplay();
const advertismentStore = useAdvertismentStore();
const categoryStore = useCategoryStore()
const advertismentId = route.name === 'RealEstateRequest' ? 2 : 1
function getSpecific(id, name) {
  if (id === 0) {
    advertismentStore.GetAllAdvertisments(advertismentId);
  }
  else { advertismentStore.GetAllAdvertismentsBySubcategory(id) }

}
const subcategories = computed(() => {
  const all = categoryStore.SubCategoies.find(item => {
    return item.id === 0
  })
  if (!all) {
    categoryStore.SubCategoies.unshift({
      id: 0,
      name: 'الكل'
    })
    return categoryStore.getSubCategories
  }

})
</script>
<template>
  <v-sheet >
    <v-slide-group show-arrows mandatory>
      <v-slide-group-item v-for="category in subcategories" :key="category.id" v-slot="{ isSelected, toggle }">
        <v-btn class="ma-2" rounded :color="isSelected ? 'primary' : undefined"
          @click="toggle(), getSpecific(category.id,category.name)" border>
          {{ category.name }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>