<template>
  <footer class="w-full flex flex-row justify-center outline outline-black outline-1">
    <p>{{ props.content }}</p>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps({
  content: String,
});
</script>
