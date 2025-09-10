<script setup>
const props = defineProps(['teamMembers', 'loading'])
</script>
<template>
  <section id="work-team">
    <v-container>
      <div class="text-center">
      <h1 class="title text-4xl font-bold">
        {{ $t('heading.team') }} <span class="text-gradient">{{ $t('heading.work') }}</span>
      </h1>
      <p class="mb-6 text-center">
        {{ $t('sections.work_team.description') }}
      </p>
      <div class="line-gradient"></div>
    </div>
    <v-row>
      <v-col cols="12" sm="6" md="4" xl="3" v-for="teamMember in props.teamMembers" :key="teamMember.id">
        <WorkerCard :info="teamMember"/>
      </v-col>
    </v-row>
    <div class="mt-4 text-center" v-if="props.loading">
          <v-progress-circular indeterminate color="primary"/>
        </div>
    </v-container>
  </section>
</template>
