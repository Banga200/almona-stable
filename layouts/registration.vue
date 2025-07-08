<template>
        <v-container>
            <v-row class="my-5">
                <v-btn variant="text" prepend-icon="mdi-arrow-right" @click="$router.back" style="z-index: 999;" class="white">الرجوع الى الخلف</v-btn>
                <v-spacer />
            </v-row>
            <!-- <v-row class="ma-0" style="z-index: 999;">
                <v-col cols="12" md="6">
                    
                </v-col>
                <v-col class="d-none d-md-block" md="6">
                    
                </v-col>
                
            </v-row> -->
            <div class="registration-left " >
                <v-col>
                    <slot/>
                </v-col>
                <v-col class="text-center d-none d-sm-block">
                    <span class="title"> شركة المٌنى الذهبية للتجارة والخدمات المحدودة</span>
                <br />
                <v-btn append-icon="mdi-home-outline"  class="heroButton mt-8 text-center mx-auto"
                    width="200px" size="large" @click="$router.push('/')" variant="flat"> الصفحة الرئيسية</v-btn>
                </v-col>
            </div>
    </v-container>
</template>