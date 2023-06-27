<template>
  <div class="flex flex-col">
    <div class="flex grow bg-black justify-center">
      <div class="h-full w-full md:w-1/2 bg-green-500"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
definePageMeta({
  middleware: ["auth"],
});
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo("/");
    }
  });
});
</script>
