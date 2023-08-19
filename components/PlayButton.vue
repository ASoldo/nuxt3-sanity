

<template>
  <Button
  text="Igraj"
  @clicked="playClicked()"/>
</template>
<script setup lang="ts">
const playClicked = () => {
  navigateTo('/game');
}
</script>

<style scoped>

</style>