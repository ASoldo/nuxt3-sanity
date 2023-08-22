<template>
  <Button text="Igraj" @clicked="playClicked()" />
</template>
<script setup lang="ts">
import { useToastStore } from "~/stores/toast";

const user = useSupabaseUser();
import { useLoginStore } from "~/stores/login";

const loginStore = useLoginStore();
const toastStore = useToastStore();
const playClicked = () => {
  // console.log(user.value);
  if (!user.value) {
    loginStore.openLogin();
    toastStore.showToast("Za igru se potrebno prijaviti!");
    return;
  }
  navigateTo("/game");
};
</script>

<style scoped></style>
