<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      class="text-white flex w-full md:w-1/2 justify-center items-center flex-col bg-kaufland-red shadow-xl rounded p-6 m-4"
    >
      <div>
        <h1 class="text-4xl text-center mb-2 font-kaufland-bold">Čestitamo!</h1>
        <h1 class="text-2xl text-center mb-6 font-kaufland-bold">
          Uspješno ste registrirali korisnika
        </h1>
      </div>
      <div class="grid grid-rows-2 gap-2">
        <Button text="Idi na naslovnu stranicu" @clicked="navigateToHome" />
        <Button text="Idi na igru" @clicked="navigateToGame" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useToastStore } from "~/stores/toast";
import { useLoadingStore } from "~/stores/loading";

const { auth } = useSupabaseAuthClient();
const toastStore = useToastStore();
const loadingStore = useLoadingStore();

onMounted(() => {
  // setInterval(() => {
  // auth.signOut();
  toastStore.showToast("Uspješna registracija");
  loadingStore.showLoading();
  // }, 1000);

  setTimeout(() => {
    loadingStore.hideLoading();
  }, 200);
});

const navigateToHome = () => {
  navigateTo("/");
};
const navigateToGame = () => {
  navigateTo("/game");
};
</script>
