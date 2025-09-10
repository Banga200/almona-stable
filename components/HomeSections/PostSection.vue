<script setup>
const props = defineProps(['post', "loading"])
const posts = ref([])
onMounted(() => {
    posts.value = chunkArray(props.post,3)
})
</script>
<template>
  <section>
    <v-container>
    <div class="text-center">
      <h1 class="text-4xl title text-gradient">{{ $t("sections.news.title") }}</h1>
      <div class="line-gradient mt-8"></div>
    </div>
    <div class="text-end mb-4" v-if="props.post?.length > 3">
      <v-btn
        variant="outlined"
        :text="$t('buttons.view_all')"
        append-icon="mdi-arrange-bring-forward"
        to="/posts"
        color="primary"
        />
    </div>
    <v-row v-if="props.post?.length < 3">
        <v-col cols="12" md="6" lg="4" v-for="post in props.post" :key="post">
            <PostCard :post="post" :small="true"/>
        </v-col>
    </v-row>
    <div class="mt-4 text-center" v-if="props.loading">
          <v-progress-circular indeterminate color="primary"/>
        </div>
    <v-carousel cycle hide-delimiter-background v-if="props.post?.length > 3">
        <v-carousel-item v-for="postGroup in posts" :key="postGroup">
            <v-row>
                <v-col v-for="post in postGroup" :key="post" cols="12" md="6" lg="4">
                    <PostCard :post="post" :small="true"/>
                </v-col>
            </v-row>
        </v-carousel-item>
    </v-carousel>
  </v-container>
  </section>
</template>
