<script setup>
definePageMeta({
  name: "Posts",
  breadcrumb: "النشرات الإخبارية",
  middleware: ["dashboard"],
  layout: "dashboard",
});
useHead({
    title: "النشرات الإخبارية"
})
const postStore = usePostStore();
onMounted(() => {
  postStore.GetAllPosts();
});
const formDialog = ref(false);
const isEdit = ref(false);
const postForm = ref(null);

const editPost = (post) => {
  formDialog.value = true;
  requestAnimationFrame(() => {
    postForm.value.form = { ...post };
    isEdit.value = true;
  });
};
const deletePost = (post) => {
  let confirmMessage = confirm(`هل تريد حذف هذه النشرة الإخبارية : ${post.title} ؟`);
  if (confirmMessage) {
    postStore.DeletePost(post.id);
  }
};
const savePost = async (payload) => {
  if (isEdit.value) {
    await postStore.EditPost(payload);
  } else {
    await postStore.AddNewPost(payload);
  }
  if (postStore.success) {
    formDialog.value = false;
    postStore.GetAllPosts();
  }
};
</script>
<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1>النشرات الإخبارية</h1>
      <v-btn
        text="إضافة جديد"
        append-icon="mdi-plus"
        color="primary"
        class="white"
        @click="formDialog = true"
      />
    </div>
    <v-dialog v-model="formDialog" max-width="800">
      <v-card>
        <div class="text-end">
          <v-btn
            icon="mdi-close"
            color="#000"
            class="white" 
            @click="formDialog = false"
          />
        </div>
        <Post @save="savePost" ref="postForm" />
      </v-card>
    </v-dialog>
    <v-progress-linear indeterminate class="mt-4" v-if="postStore.posts.loading"></v-progress-linear>
    <v-row class="mt-8">
      <v-col cols="4" v-for="post in postStore.posts.content" :key="post.id" class="relative">
        <div
            class="position-absolute"
            style="left: 10px; z-index: 1; top: 10px;"
          >
            <v-btn
              class="ma-2 white"
              icon="mdi-pencil"
              color="success"
              size="small"
              @click="editPost(post)"
            />
            <v-btn
              class="ma-2 white"
              icon="mdi-delete"
              color="red"
              size="small"
              @click="deletePost(post)"
            />
          </div>
          <PostCard :post="post" :isAdmin="true"/>
      </v-col>
    </v-row>
  </div>
</template>
