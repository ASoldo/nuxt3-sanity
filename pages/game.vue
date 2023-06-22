<template>
  <div class="flex flex-col">
    <!-- <div class="flex flex-row w-full"> -->
    <!--   <h1>Game</h1> -->
    <!--   <button @click="client.auth.signOut()">sign off</button> -->
    <!--   <button @click="navigateTo('/')">Back</button> -->
    <!-- </div> -->
    <div class="flex flex-grow bg-black justify-center">
      <div class="h-full w-full md:w-1/2 bg-green-500"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
const client = useSupabaseClient();
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
