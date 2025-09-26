<script setup>
const postStore = usePostStore();
onMounted(() => {
  postStore.GetAllPosts()
});
</script>
<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-4xl">{{ $t("sections.news.title") }}</h1>
        </v-col>
      </v-row>
      <v-divider class="mb-8" />
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          v-for="post in postStore.posts.content || []"
          :key="post"
        >
          <PostCard :post="post" :small="true" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
