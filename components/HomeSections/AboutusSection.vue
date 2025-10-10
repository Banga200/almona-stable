<script setup>
const {t} = useI18n();
const cards = computed(() => [
  {
    icon: "mdi-bullseye",
    title: t('about_us_profile.goal.title'),
    description: t('about_us_profile.goal.description')
  },
  {
    icon: "$Eye",
    title: t('about_us_profile.vision.title'),
    description: t('about_us_profile.vision.description')
  },
  {
    icon: "mdi-heart-outline",
    title: t('about_us_profile.values.title'),
    description: t('about_us_profile.values.description')
  },
  {
    icon: "$Lamp",
    title: t('about_us_profile.excellence.title'),
    description: t('about_us_profile.excellence.description')
  },
])
</script>
<template>
    <section id="aboutus">
        <!-- <span class="top_long_line line"></span>
        <span class="top_short_line line"></span> -->
        <v-container>
            <div class="text-center mb-16">
                <h1 class="title">{{ $t('heading.about') }} <span class="text-gradient">{{ $t('heading.the_company') }}</span></h1>
                <div class="line-gradient"></div>
            </div>
            <v-row class="flex-wrap d-flex align-center ga-12 mb-16" dense>
                <v-col cols="12" md="12" lg="5">
                    <p class="text-lg">{{ $t('paragraph.about_company_part_1') }}</p>
                    <p class="mt-4 text-lg">{{ $t('paragraph.about_company_part_2') }}</p>
                    <div class="d-flex ga-4 align-center mt-6 pt-4">
                        <v-avatar size="56" image="/logo.png" class="pa-4" color="avatar"></v-avatar>
                        <div>
                            <h3 class="text-dark font-bold">{{ $t('heading.company_name') }}</h3>
                            <p class="text-sm">{{ $t('paragraph.partner_in_success') }}</p>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" md="12" lg="6">
                    <div class="card-gradient">
                        <v-img src="/images/about-us.webp" aspect-ratio="4/3" />
                        <h1 class="text-2xl font-bold">{{ $t('heading.about_us_title') }}</h1>
                        <p class="opacity-90">{{ $t("paragraph.about_us_subtitle") }}</p>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="(card, index) in cards"
                    :key="index" cols="12" md="6" lg="3">
                     <AboutCard
                        :icon="card.icon"
                        :title="card.title"
                        :description="card.description"
                        iconSize="64"
                        flat="flat-card"
                    />
                </v-col>
            </v-row>
        </v-container>
        <!-- <span class="bottom_short_line line"></span>
        <span class="bottom_long_line line"></span> -->
    </section>
</template>