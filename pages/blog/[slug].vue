<template>
  <div>
    <Dynamic :pageData="pageData"></Dynamic>
  </div>
</template>

<script setup lang="ts">
import { PageData } from "@/internals/types";
definePageMeta({
  middleware: ["auth"],
});
const route = useRoute();
const slug = ref((route.params as { slug: string }).slug);

const sanity = useSanity();

// Only fetch the page with the current slug and only components with visibility == true
const query = groq`*[_type == "page" && slug.current == $slug][0]{...,"components": components[visibility == true]}`;
const { data } = useAsyncData("page", () =>
  sanity.fetch(query, { slug: slug.value })
);
const pageData = computed(() => (data.value as PageData) ?? {});
</script>
