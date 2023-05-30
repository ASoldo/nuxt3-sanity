<template>
  <div>
    <!-- <img :src="imageUrl" alt="Banner Image" /> -->
    <SanityImage :asset-id="props.image?.asset._ref" auto="format" />
  </div>
</template>

<script setup lang="ts">
// import imageUrlBuilder from "@sanity/image-url";
//
// const builder = imageUrlBuilder({
//   projectId: "u678c0qn",
//   dataset: "production",
// });

const props = defineProps({
  image: Object,
});

// const imageUrl = ref("");
//
// watchEffect(() => {
//   if (props.image && props.image.asset) {
//     imageUrl.value = builder.image(props.image.asset._ref).url();
//   }
// });
</script>
