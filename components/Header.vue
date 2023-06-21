<template>
  <header class="w-full flex flex-row justify-center outline outline-black outline-1">
    <h1>{{ props.title }}</h1>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>
