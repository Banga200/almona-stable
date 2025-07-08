<script setup>
const icons = [
    { icon: 'mdi-twitter', title: 'Twitter', link: 'https://x.com/mona25672?t=MPU4hdH5HhvotgNFcxDzaw&s=08' },
    { icon: 'mdi-facebook', title: 'Facebook', link: 'https://www.facebook.com/ALmona.202?mibextid=ZbWKwL' },
    { icon: 'mdi-instagram ', title: 'Instagram', link: 'https://www.instagram.com/almona2022?igsh=MXdvOHR2aWdwNHpocA==' },
]
const heroInfo = [
    {icon: "$Quality", title: 'معارض ناجحة', count: '10+'},
    {icon: "$Customers", title: 'عميل موثوق', count: '50+'},
    {icon: "mdi-star-outline", title: 'سنوات الخبرة', count: '5+'},
]
</script>
<template>
    <div class="heroSection ">
        <v-container id="hero" fluid class=" py-sm-10 d-flex flex-column justify-evenly">
        <!-- <img src="../../assets/images/building.png" class="heroImage" width="500" /> -->
        <v-row class="align-center flex-column justify-center justify-center">
                <h1 class="hero-title mb-6 text-6xl text-center">شركة المٌنى الذهبية
                    <br/>
                    <h3 class="text-4xl">للتجارة والخدمات المحدودة</h3>
                </h1>

            <h4 class="text-2xl mb-8">خدماتنا تجمع بين الإبداع والاحتراف</h4>
            <h6 class="text-lg opacity-80 mb-10">نحن شركة يمنية رائدة في تقديم خدمات المعارض، التسويق، إدارة المشاريع، وإنجاز الأعمال</h6>
            <v-btn text="اكتشف خدماتنا" append-icon="mdi-arrow-down" rounded="xl" size="x-large" class="font-bold mb-16 custom-button" />
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
                <v-col cols="auto" v-for="info in heroInfo" :key="info.title">
                    <div class="d-flex flex-column align-center ga-2">
                        <v-avatar  size="64" class="transparent-20">
                            <v-icon  size="x-large" :icon="info.icon" color="#fff"/>
                        </v-avatar>
                        <div class="text-center">
                            <div class="text-3xl font-bold mb-1">{{ info.count }}</div>
                            <div class="text-sm">{{ info.title }}</div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-row>
        
    </v-container>
            <div class="hero-navigate">
                <div class="scroll"></div>
            </div>
     
    </div>
    
</template>