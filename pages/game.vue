<template>
  <div class="flex flex-col">
    <div class="flex grow bg-black justify-center">
      <div class="h-full w-full md:w-1/2 bg-green-500">
        <iframe height="1024" width="512" src="http://localhost:8000/" frameborder="0" class="w-full h-full"></iframe>
      </div>
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
