<template>
  <div class="flex md:grid md:grid-cols-3 gap-4 justify-between">
    <div class="w-2/12 md:w-full  md:col-span-1 flex justify-center items-center">
      <h1 class="text-6xl text-white font-kaufland-heavy">{{ stepNumber }}</h1>
    </div>
    <div class="w-3/12 md:w-full md:col-span-1 flex justify-center items-center">
      <img :src="getImageUrl(imageSrc)" :alt="imageAlt" />
    </div>
    <div class="w-7/12 md:w-full  md:col-span-1 flex justify-center items-center">
      <h1 class="text-white">{{ stepDescription }}</h1>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const getImageUrl = (imageSrc) => new URL(imageSrc, import.meta.url).href
const { stepNumber, imageSrc, imageAlt, stepDescription } = defineProps(['stepNumber', 'imageSrc', 'imageAlt', 'stepDescription']);
</script>