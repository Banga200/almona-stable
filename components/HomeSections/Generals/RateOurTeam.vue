<script setup>
const rateOurTeam = [
    {
        title: "التعاون",
        description: "نعمل كفريق واحد لتحقيق أهداف مشتركة",
        icon: "🤝"
    },
    {
        title: "التميز",
        description: "نسعى للتميز في كل ما نقوم به",
        icon: "⭐"
    },
    {
        title: "الإبداع",
        description: "نبتكر حلولاً مبدعة لتحديات عملائنا",
        icon: "💡"
    }
]
</script>
<template>
  <v-container class="mt-16">
    <v-card class=" pa-8"  >
      <h1 class="text-center text-3xl font-bold mb-4">قيم فريقنا</h1>
      <v-row class="text-center">
        <v-col cols="12" md="4" v-for="item in rateOurTeam" :key="item.title">
            <AboutCard flat="true" isEmoji="true" :title="item.title" :description="item.description" :icon="item.icon" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
