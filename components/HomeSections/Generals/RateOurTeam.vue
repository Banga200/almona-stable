<script setup>
const {t} = useI18n();
const rateOurTeam = [
    {
        title: t("sections.work_team.rate_our_team.collaboration.title"),
        description: t("sections.work_team.rate_our_team.collaboration.description"),
        icon: "🤝"
    },
    {
        title: t("sections.work_team.rate_our_team.excellence.title"),
        description: t("sections.work_team.rate_our_team.excellence.description"),
        icon: "⭐"
    },
    {
        title: t("sections.work_team.rate_our_team.creativity.title"),
        description: t("sections.work_team.rate_our_team.creativity.description"),
        icon: "💡"
    }
]
</script>
<template>
  <v-container class="mt-16">
    <v-card class=" pa-8"  >
      <h1 class="text-center text-3xl font-bold mb-4">{{ t("sections.work_team.rate_our_team.title") }}</h1>
      <v-row class="text-center">
        <v-col cols="12" md="4" v-for="item in rateOurTeam" :key="item.title">
            <AboutCard flat="true" isEmoji="true" :title="item.title" :description="item.description" :icon="item.icon" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
