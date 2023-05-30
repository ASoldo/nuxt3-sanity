<script setup lang="ts">
import { PageData } from "../types/types";
import Header from "./Header.vue";
import Banner from "./Banner.vue";
import Body from "./Body.vue";
import Footer from "./Footer.vue";

type ComponentType = "header" | "banner" | "body" | "footer";

const props = defineProps({
  pageData: {
    type: Object as () => PageData,
    required: true,
  },
});

const componentMap = {
  header: Header,
  banner: Banner,
  body: Body,
  footer: Footer,
};

const getComponentName = (type: ComponentType) => componentMap[type] || null;
</script>

<template>
  <div v-for="(page, key) in props" :key="key">
    <h1>{{ page.title }}</h1>
    <div v-for="component in pageData.components" :key="component._key">
      <component :is="getComponentName(component._type)" v-bind="component" />
    </div>
  </div>
</template>
