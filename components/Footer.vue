<template>
  <footer>
    <p>{{ props.content }}</p>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps({
  content: String,
});
</script>
