<script setup>
import AnimationNumber from '../AnimationNumber.vue';
const props = defineProps(['statistics'])

</script>
<template>
    <div class="heroSection ">
        <v-container id="hero" fluid class=" py-sm-10 d-flex flex-column justify-evenly">
        <!-- <img src="../../assets/images/building.png" class="heroImage" width="500" /> -->
        <v-row class="align-center flex-column justify-center justify-center">
                <div class="hero-title mb-6 text-6xl text-center">{{ $t('heading.company') }} {{ $t('heading.company_name') }}
                    <br/>
                    <h3 class="text-4xl">{{ $t('heading.company_sub_name') }}</h3>
                </div>

            <h4 class="text-2xl mb-8 text-center">{{ $t('heading.heroTitle') }}</h4>
            <h6 class="text-lg opacity-80 mb-10 text-center">{{ $t('paragraph.hero_description') }} </h6>
            <v-btn :text="$t('button.discover_our_services')" append-icon="mdi-arrow-down" rounded="xl" size="x-large" class="font-bold mb-16 custom-button" @click="() => $router.push('/#ourServices')"/>
           <!-- <v-col cols="12" md="3" class="text-left d-flex justify-center justify-md-end">

                 <client-only >
                    Social Media Icons 
                    <v-sheet rounded min-width="50" class="py-1 text-center float-left d-flex flex-md-column mt-8 mt-md-0">
                        <v-btn v-for="(item, i) in icons" :key="i" icon color="black" class="mx-2 align-center ma-md-0 d-flex"
                            variant="text" :href="item.link" target="_blank" >
                            <v-tooltip activator="parent" location="bottom">{{ item.title }}</v-tooltip>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-btn>
                    </v-sheet>
                </client-only> 
            </v-col> -->
                <v-row class="ga-8 w-100 hero-info-row justify-space-around">
                <v-col cols="auto" v-for="info in props.statistics" :key="info.title">
                    <div class="d-flex flex-column align-center ga-2">
                        <v-avatar  size="64" class="transparent-20">
                            <v-icon  size="x-large" :icon="info.icon" color="#fff"/>
                        </v-avatar>
                        <div class="text-center">
                            <div class="text-3xl font-bold mb-1"><AnimationNumber :value="info.count"/> </div>
                            <div class="text-sm">{{ info.title }}</div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-row>
        
    </v-container>
            <a href="#aboutus"  class="hero-navigate">
                <div class="scroll"></div>
            </a>
     
    </div>
    
</template>