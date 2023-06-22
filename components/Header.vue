<template>
  <header class="h-96 w-full flex flex-col justify-center align-middle outline outline-black outline-1">
    <h1 class="text-center">{{ props.title }}</h1>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>
