<script setup>
const props = defineProps(['statistics'])


</script>
<template>
    <section id="our-numbers">
        <v-container>
            <div class="text-center">
                <h1 class="text-4xl">{{ $t('sections.our_numbers.title') }}</h1>
                <p class="text-center text-white mt-2 opacity-90 text-xl">{{ $t('sections.our_numbers.description') }}</p>
                <div class="line-gradient mt-8"></div>
            </div>
            <v-row class="mt-12">
                <v-col v-for="(number, index) in props.statistics" :key="index" cols="12" md="6" lg="3">
                    <div class="card text-center">
                        <v-avatar class="mb-6" size="64">
                            <v-icon :icon="number.icon" size="32" color="white"></v-icon>
                        </v-avatar>
                        <h1 class="text-4xl"><animation-number :value="number.count" :duration="3000"/> +</h1>
                        <h3 class="text-xl mb-3">{{ number.title }}</h3>
                        <p class="text-sm text-white text-center">{{ number.description }}</p>
                    </div>
                </v-col>
            </v-row>
            <div class="card text-center mt-16">
                <h1 class="text-2xl mb-4">{{ $t('sections.our_numbers.sub_title') }}</h1>
                <p class="text-center text-white">{{ $t('sections.our_numbers.sub_description') }}</p>
            </div>
        </v-container>
    </section>
</template>