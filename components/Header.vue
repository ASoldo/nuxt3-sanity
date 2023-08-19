<template>
  <!-- <header class="h-96 w-full flex flex-col justify-center align-middle outline outline-black outline-1"> -->
  <!--   <h1 class="text-center">{{ props.title }}</h1> -->
  <!-- </header> -->
  <div class="pb-5 w-full bg-gradient-to-t from-kaufland-dark-red to-kaufland-red">
    <!-- <header class="h-96 w-full flex flex-col justify-center align-middle outline outline-black outline-1"> -->
    <!--   <h1 class="text-center">{{ props.title }}</h1> -->
    <!-- </header> -->

    <div class="flex flex-col md:flex-row mx-auto h-auto container">
      <div class="flex flex-col md:flex-1 md:h-auto">
        <div class="flex justify-center items-end md:h-full">
          <!-- Content for the first box -->
          <img src="../assets/images/kmarket_logo_extra.png" alt="K-market" class="px-2 -mb-8" />
          <!-- <h1 class="text-3xl p-3 text-white">K-MARKE(t)</h1> -->
        </div>
        <div class="md:h-full flex flex-col justify-start items-center">
          <img src="../assets/images/Headline.png" alt="Igraj k-market igricu" class="h-24 md:h-40" />
        </div>
      </div>

      <div class="flex flex-col md:justify-start md:flex-1 md:h-auto md:ml-4 mt-4 md:mt-0">
        <div ref="imageWrapper" class="fade-effect h-full object-cover overflow-hidden">
          <img :src="images[currentImageIndex].src" :alt="images[currentImageIndex].alt" class="h-full scale-[1.2] object-cover" />
        </div>
        <div class="flex justify-center mb-2 md:mb-4">
          <PlayButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});

import { ref, onMounted, onUnmounted } from "vue";
import mobitel from "../assets/images/mobitel.png";
import mobitel2 from "../assets/images/mobitel2.png";
import mobitel3 from "../assets/images/mobitel3.png";
import mobitel4 from "../assets/images/mobitel4.png";
import mobitel5 from "../assets/images/mobitel5.png";

const images = ref([
  { src: mobitel, alt: "Image description" },
  { src: mobitel2, alt: "Image description" },
  { src: mobitel3, alt: "Image description" },
  { src: mobitel4, alt: "Image description" },
  { src: mobitel5, alt: "Image description" },
]);

const currentImageIndex = ref(0);

let interval: ReturnType<typeof setInterval>;
let imageWrapper = ref<HTMLElement | null>(null);

onMounted(async () => {
  // Initial display for the first image
  if (imageWrapper.value) {
    imageWrapper.value.style.opacity = "1";
  }

  // Wait for a moment to display the first image before beginning the loop
  await new Promise((resolve) => setTimeout(resolve, 3000));

  interval = setInterval(async () => {
    // Fade out
    if (imageWrapper.value) {
      imageWrapper.value.style.opacity = "0";
    }

    // Wait for fade out effect to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Switch the image
    currentImageIndex.value =
      (currentImageIndex.value + 1) % images.value.length;

    // Using nextTick to ensure the DOM has updated with the new image
    await nextTick();

    // Fade in
    if (imageWrapper.value) {
      imageWrapper.value.style.opacity = "1";
    }
  }, 6000); // Giving an extra second for transitions (5s for image display + 1s for transitions)
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.fade-effect {
  transition: opacity 1s ease-in-out;
  opacity: 0;
}
</style>
