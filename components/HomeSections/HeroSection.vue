<script setup>
import buildingImage from '~/assets/images/building.png'
const icons = [
    { icon: 'mdi-twitter', title: 'Twitter', link: 'https://x.com/mona25672?t=MPU4hdH5HhvotgNFcxDzaw&s=08' },
    { icon: 'mdi-facebook', title: 'Facebook', link: 'https://www.facebook.com/ALmona.202?mibextid=ZbWKwL' },
    { icon: 'mdi-instagram ', title: 'Instagram', link: 'https://www.instagram.com/almona2022?igsh=MXdvOHR2aWdwNHpocA==' },
]
</script>
<template>
    <v-container id="hero" fluid class=" heroSection py-sm-10 py-md-3 d-flex flex-column justify-evenly">
        <img src="../../assets/images/building.png" class="heroImage" width="500" />
        <v-row class="align-center flex-column flex-md-row justify-center justify-start">
            <v-col class="d-none d-md-flex">

            </v-col>
            <v-col cols="12" md="6" class="hero-content text-center">
                <span class="title"> شركة <span class="coma">المٌنى</span> للتجارة والخدمات المحدودة</span>
                <br />
                <v-btn append-icon="mdi-chevron-left-circle-outline" class="heroButton mt-8 text-center mx-auto"
                    width="200px" size="large" variant="flat" to="/real-estate/عقارات">تصفح العقارات</v-btn>
            </v-col>
            <v-col cols="12" md="3" class="text-left d-flex justify-center justify-md-end">

                <client-only >
                    <!-- Social Media Icons  -->
                    <v-sheet rounded min-width="50" class="py-1 text-center float-left d-flex flex-md-column mt-8 mt-md-0">
                        <v-btn v-for="(item, i) in icons" :key="i" icon color="black" class="mx-2 align-center ma-md-0 d-flex"
                            variant="text" :href="item.link" target="_blank" >
                            <v-tooltip activator="parent" location="bottom">{{ item.title }}</v-tooltip>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-btn>
                    </v-sheet>
                </client-only>
            </v-col>
        </v-row>


    </v-container>
</template>