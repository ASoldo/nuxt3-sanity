<template>
  <footer class="h-96 w-full flex flex-col justify-center align-middle outline outline-black outline-1">
    <p class="text-center">{{ props.content }}</p>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps({
  content: String,
});
</script>
