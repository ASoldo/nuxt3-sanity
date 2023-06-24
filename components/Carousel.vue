<template>
  <div class="relative flex flex-col overflow-x-hidden outline outline-1 outline-black">
    <div class="relative flex justify-center">
      <button class="absolute top-1/2 transform -translate-y-1/2 left-4 z-50 outline outline-2 rounded-3xl h-10 w-10"
        :class="activeSlide !== 0 ? 'text-black outline-black' : 'hidden'" :disabled="activeSlide === 0"
        @click="activeSlide--">
        <i class="pi pi-arrow-left"></i>
      </button>

      <button class="absolute top-1/2 transform -translate-y-1/2 right-4 z-50 outline outline-2 rounded-3xl h-10 w-10"
        :class="activeSlide !== slides.length - 1
            ? 'text-black outline-black'
            : 'hidden'
          " :disabled="activeSlide === slides.length - 1" @click="activeSlide++">
        <i class="pi pi-arrow-right"></i>
      </button>

      <div ref="target" class="flex transition-transform duration-500 ease-in-out w-full"
        :style="{ transform: `translateX(-${activeSlide * 100}%)` }">
        <div class="w-full h-96 flex-none" :class="`bg-${slides[index].color}-500`" v-for="(slide, index) in slides"
          :key="index">
          <div class="flex flex-col justify-center items-center align-middle h-full">
            <div class="p-4 text-6xl md:text-9xl font-kaufland-heavy">
              {{ slide.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div class="flex flex-col z-50">
      <div class="bottom-0 w-full">
        <div class="flex justify-center space-x-2 p-2">
          <div v-for="(_, index) in slides" :key="index" :class="index === activeSlide
              ? 'bg-red-500 outline-red-500'
              : 'outline-gray-500'
            " class="w-4 h-4 rounded-full cursor-pointer outline outline-1" @click="activeSlide = index"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { UseSwipeDirection } from "@vueuse/core";
import { useSwipe } from "@vueuse/core";
const target = ref<HTMLElement | null>(null);
const activeSlide = ref(0);
const slides = [
  {
    content: "Slide 1",
    color: "emerald",
  },
  {
    content: "Slide 2",
    color: "lime",
  },
  {
    content: "Slide 3",
    color: "cyan",
  },
];

useSwipe(target, {
  passive: true,
  onSwipe(_: TouchEvent) { },
  onSwipeEnd(_: TouchEvent, direction: UseSwipeDirection) {
    if (direction === "right" && activeSlide.value > 0) {
      activeSlide.value--;
    } else if (direction === "left" && activeSlide.value < slides.length - 1) {
      activeSlide.value++;
    }
  },
});
</script>
