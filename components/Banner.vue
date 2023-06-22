<template>
  <div class="h-96 flex flex-row justify-center outline outline-black outline-1 overflow-hidden">
    <!-- <img :src="imageUrl" alt="Banner Image" /> -->
    <SanityImage :asset-id="props.image?.asset._ref" auto="format">
      <template #default="{ src }">
        <img :src="src" class="object-cover w-full" />
      </template>
    </SanityImage>
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

console.log(props.image);

// const imageUrl = ref("");
//
// watchEffect(() => {
//   if (props.image && props.image.asset) {
//     imageUrl.value = builder.image(props.image.asset._ref).url();
//   }
// });
</script>
