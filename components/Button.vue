

<template>
  <button @click="emit('clicked')"
          class="transition-colors duration-500 px-5 py-2 bg-gradient-to-r from-white to-gray-300 hover:from-kaufland-red hover:to-red-600 rounded-xl text-kaufland-red hover:text-white border-b-4 border-red-800 hover:border-gray-500 text-3xl font-kaufland-heavy z-10">
    {{text}}
  </button>
</template>
<script setup lang="ts">
const emit = defineEmits();

const { text } = defineProps(['text']);
</script>

<style scoped>

</style>