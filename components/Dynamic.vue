<template>
  <div v-for="(page, key) in props" :key="key" class="w-full flex flex-col justify-center">
    <!-- <h1 class="h-40 flex flex-col text-center justify-center align-middle outline outline-black outline-1"> -->
    <!--   {{ page.title }} -->
    <!-- </h1> -->
    <div v-for="component in pageData.components" :key="component._key"
      :class="{ 'bg-kaufland-red': component._type === 'body' }">
      <component :is="getComponentName(component._type)" v-bind="component" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageData } from "../internals/types";
import Header from "./Header.vue";
import Banner from "./Banner.vue";
import BodyComponent from "./BodyComponent.vue";
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
  body: BodyComponent,
  footer: Footer,
};

const getComponentName = (type: ComponentType) => componentMap[type] || null;
</script>
