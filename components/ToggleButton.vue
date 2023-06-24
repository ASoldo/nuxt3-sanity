<template>
  <div @click="toggleBtn()" :class="toggle ? 'justify-end outline-green-300' : 'justify-start outline-red-600'
    " class="relative w-10 h-5 bg-white flex flex-row rounded-2xl outline outline-1">
    <div class="text-red align-middle justify-stretch text-center absolute w-full z-50">
      <span class="text-white p-1 select-none">0</span>
      <span class="text-white p-1 select-none">1</span>
    </div>
    <div class="w-5 h-5" :class="toggle ? 'rounded-r-2xl bg-red-500' : 'rounded-l-2xl bg-red-800'"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const toggle = ref(false);
const toggleBtn = () => {
  toggle.value = !toggle.value;
};
</script>
