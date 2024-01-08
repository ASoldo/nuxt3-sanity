<template>
  <!-- You can use $pwa directly in templates! -->
  <div v-show="$pwa.needRefresh">
    <span> New content available, click on reload button to update. </span>

    <button @click="$pwa.updateServiceWorker()">Reload</button>
  </div>
</template>

<script lang="ts" setup>
const { $pwa } = useNuxtApp();
</script>
