
<template>
  <dialog ref="loadingDialog" v-if="loadingStore.loading" class="bg-white bg-opacity-60 fixed top-0 left-0 w-full h-full flex justify-center items-center z-[1000]">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </dialog>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { DialogElement } from "@/internals/interfaces";

const loadingDialog = ref<DialogElement | null>(null);
const loadingStore = useLoadingStore();
loadingStore.$subscribe((mutation, state) => {
  if(state.loading) {
    loadingDialog.value?.showModal();
  } else {
    loadingDialog.value?.close();
  }
})
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
  background: #F60101;
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