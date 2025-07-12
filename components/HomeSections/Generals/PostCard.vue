<script setup>
const {post, isAdmin, small} = defineProps(['post','isAdmin', 'small'])
</script>
<template>
    <v-card>
          
          <v-row no-gutters class="mb-4">
            <v-img :src="useImageStream(post.images[0])" height="200" cover />
          </v-row>
          <h2>{{ post.title }}</h2>
          <v-divider class="my-4" />
          <div :class="{'overflow-auto': isAdmin,'text-truncate': small}" :style="{height: isAdmin ? '200px' : 'auto'}">
            {{ post.content }}
          </div>
          <div class="text-end mt-4" v-if="!isAdmin">
            <v-btn :to="`/posts/${post.id}`" text="اعرف المزيد" append-icon="$ExternalLink" color="primary" />
          </div>
        </v-card>
</template>