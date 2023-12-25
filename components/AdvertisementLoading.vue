<template>
    <v-container>
        <v-card class="p-0" elevation="0">
            <v-row class="ma-0">
                <v-col cols="12" md="4" class="pa-3">
                    <v-skeleton-loader  type="image"></v-skeleton-loader>
                </v-col>
                <v-col cols="12" md="4" class="py-2">
                    <v-skeleton-loader  type="article"></v-skeleton-loader>
                </v-col>
                <v-col cols="12" md="4" class="py-2">
                    <v-row class="ma-0 align-end h-100">
                        <v-skeleton-loader width="100%" type="list-item" ></v-skeleton-loader>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>