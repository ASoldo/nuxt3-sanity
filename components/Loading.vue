<template>
  <div></div>
   <div v-if="loadingStore.loading"
     class="bg-white bg-opacity-80 fixed bottom-4 left-4 rounded-2xl border-2 shadow-2xl w-[100px] h-[100px] flex flex-col justify-center items-center z-[1000] text-kaufland-dark-red">
     <i class="pi pi-spin pi-spinner opacity-100 font-bold" style="font-size: 3rem"></i>
   </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import { DialogElement } from "@/internals/interfaces";

const loadingDialog = ref<DialogElement | null>(null)
const loadingStore = useLoadingStore();
loadingStore.$subscribe((mutation, state) => {
  if (state.loading) {
    console.log("Showing loading");
    showLoading();
  } else {
    console.log("Hide loading");
    hideLoading();
  }
});

const showLoading = () => {
  // loadingDialog.value?.showModal();
}

const hideLoading = () => {
  // loadingDialog.value?.close();
}
</script>

<style scoped>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  opacity: 1;
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #f60101;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  opacity: 1;
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
