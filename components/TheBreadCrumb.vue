<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute()

const crumbsRoute = computed(() => {
  let fullPath = "";
  const routes = route.fullPath.substring(1).split("/");
  return routes
    .map((route) => {
      if (route) {
        fullPath = `${fullPath}/${route}`;
        return router.resolve(fullPath);
      }
    })
    .filter(Boolean);

  // const fullPath = route.fullPath
  // const params = fullPath.startsWith('/')
  //   ? fullPath.substring(1).split('/')
  //   : fullPath.split('/')
  // const crumbs = []
  // let path = ''
  // params.forEach((param, index) => {
  //   path = `${path}/${param}`
  //   const match = router.resolve(path)
  //   if (match.name !== null) {
  //     crumbs.push(match)
  //   }
  // })
  // return crumbs
},
);
</script>
<template>
  <v-breadcrumbs :items="crumbsRoute">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
    <template v-slot:item="{ item, index }">
      <v-breadcrumbs-item :to="item.href" :disabled="index === crumbsRoute.length - 1">
        {{ item.meta.breadcrumb }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>