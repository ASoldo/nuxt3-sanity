<template>
  <div>
    <h1>Game</h1>
    <button @click="client.auth.signOut()">sign off</button>
    <button @click="navigateTo('/')">Back</button>
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
