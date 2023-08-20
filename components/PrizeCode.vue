
<template>
  <img :src="prize.prizes.qr_code_url" alt="QR kod nagrade" />
</template>

<script setup lang="ts">
const props = defineProps({
  prize: Object,
})
</script>

<style scoped>

</style>