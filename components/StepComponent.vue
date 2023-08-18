<template>
  <div class="flex gap-4 justify-between">
    <div class="w-2/12 md:w-2/12  md:col-span-1 flex justify-center items-center">
      <h1 class="text-6xl text-white font-kaufland-heavy">{{ stepNumber }}</h1>
    </div>
    <div class="w-3/12 md:w-4/12 md:col-span-1 flex justify-center items-center">
      <img :src="imageSrc" :alt="imageAlt" />
    </div>
    <div class="w-7/12 md:w-6/12  md:col-span-1 flex justify-center items-center text-white md:text-xl">
      {{ stepDescription }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const { stepNumber, imageSrc, imageAlt, stepDescription } = defineProps(['stepNumber', 'imageSrc', 'imageAlt', 'stepDescription']);
</script>