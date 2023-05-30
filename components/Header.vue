<template>
  <header>
    <h1>{{ props.title }}</h1>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>
