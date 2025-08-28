<script setup>
const props = defineProps(["info", 'isAdmin']);
const emit = defineEmits(['edit', 'delete'])
</script>
<template>
  <div class="worker-card card">
    <div class="relative">
      <div class="position-absolute" style="left: 0; z-index: 1;" v-if="props.isAdmin">
          <v-btn class="ma-2 white" icon="mdi-pencil" color="success" size="small" @click="emit('edit',props.info)"/>
          <v-btn class="ma-2 white" icon="mdi-delete" color="red" size="small" @click="emit('delete',props.info)"/>
        </div>
      <v-img :src="useImageStream(props.info?.images[0])" cover height="256" />
    </div>
    <div
      class="d-flex flex-column align-center justify-center ga-4 text-center pa-6"
    >
      <div>
        <h1 class="text-xl font-bold">{{ props.info.fullName }}</h1>
        <h3 class="job-name mt-2 text-primary">{{ props.info.jobTitle }}</h3>
      </div>
      <p>{{ props.info.description }}</p>
      <div>
        <h4>التخصصات:</h4>
        <div class="d-flex flex-wrap justify-center ga-2 mt-2">
          <v-chip
            :text="skill.skillName"
            color="primary"
            size="small"
            v-for="skill in props.info.skills"
            :key="skill.id"
          />
        </div>
      </div>
      <!-- Socail Media  -->
      <div class="d-flex align-center justify-center ga-2 social-media-icons">
        <v-btn icon variant="text">
          <v-icon icon="$Linkedin" />
        </v-btn>
        <a :href="`mailto:${props.info.email}`">
          <v-btn icon variant="text">
            <v-icon>mdi-email-outline </v-icon>
          </v-btn>
        </a>
        <a :href="`mailto:${props.info.email}`">
          <v-btn icon variant="text">
            <v-icon>mdi-phone</v-icon>
          </v-btn>
        </a>
      </div>
    </div>
  </div>
</template>
