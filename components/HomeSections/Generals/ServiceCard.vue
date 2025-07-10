<script setup>
const props = defineProps(['info', 'isAdmin'])
const emit = defineEmits(['edit', 'delete']);
const isHovered = ref(false);
</script>
<template>
  <div
    class="service-card card relative"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="position-absolute" style="left: 0; z-index: 1;" v-if="props.isAdmin">
        <v-btn class="ma-2 white" icon="mdi-pencil" color="success" size="small" @click="emit('edit',props.info)"/>
        <v-btn class="ma-2 white" icon="mdi-delete" color="red" size="small" @click="emit('delete',props.info)"/>
      </div>
    <v-row>
      <v-col cols="12" md="3"  class="pa-0">
        
        <v-img :src="useImageStream(props.info.images[0])" height="100%" cover/>
      </v-col>
      <v-col cols="10" md="9" class="d-flex flex-column ga-4 pa-6">
        <div class="d-flex ga-4 align-center">
          <v-avatar size="72" :color="isHovered ? 'primary' : 'avatar'">
            <v-img height="54" :src="useImageStream(props.info.logoId)" :color="isHovered ? '#fff' : 'primary'" />
          </v-avatar>
          <h3 class="text-2xl font-bold">{{ props.info.name }}</h3>
        </div>
        <p class="text-lg">
          {{ props.info.description }}
        </p>
        <ul class="list">
          <li v-for="(item, index) in props.info.serviceDetails" :key="index">
            <div class="list-dot"></div>
            <span >{{ item.value }}</span>
          </li>
          
        </ul>

        <div class="d-flex" v-if="!props.isAdmin">
          <v-btn
            class="mt-4 pa-0"
            color="primary"
            variant="text"
            append-icon="mdi-arrow-left"
            >اعرف المزيد</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>
