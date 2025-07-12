<script setup>
const postStore = usePostStore();
const route = useRoute();
const { post } = storeToRefs(postStore);
const currentIndex = ref(0)
onMounted(() => {
  const id = route.params.id;
  postStore.GetPostById(id);
});
</script>
<template>
  <article>
    <v-container>
      <v-sheet class="pt-12">
        <v-defaults-provider
          :defaults="{ VBtn: { variant: 'outlined', color: '#eee' } }"
        >
          <v-sheet class="overflow-hidden" rounded="xl">
            <v-carousel
              id="verticalCarousel"
              v-model="currentIndex"
              direction="vertical"
              height="400"
              vertical-arrows="left"
              vertical-delimiters="right"
              hide-delimiter-background
              cycle
            >
              <template v-slot:prev="{ props }">
                <v-btn @click="props.onClick" icon="mdi-chevron-up"></v-btn>
              </template>
              <template v-slot:next="{ props }">
                <v-btn icon="mdi-chevron-down" @click="props.onClick"></v-btn>
              </template>

              <v-carousel-item
                v-for="(item, i) in post.content.images"
                :key="i"
                :src="useImageStream(item)"
                cover
              ></v-carousel-item>
            </v-carousel>
          </v-sheet>
        </v-defaults-provider>
        <h1 class="text-4xl mt-8">{{ post.content.title}}</h1>
        <v-divider class="my-4"/>
        <p class="mb-4">{{ post.content.content }}</p>
      </v-sheet>
    </v-container>
  </article>
</template>
