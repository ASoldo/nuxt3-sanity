
<template>
  <a :href="href" target="_blank" class="underline cursor-pointer font-kaufland-bold">
    <slot></slot>
  </a>
</template>
<script setup lang="ts">

defineProps({
  href: String,
})
</script>
