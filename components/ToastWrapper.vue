<template>
  <Transition>
    <div id="toast-success"
         v-if="toastStore.toastText"
         class="flex items-center w-full max-w-xs p-4 bg-kaufland-dark-red text-white rounded-lg shadow-xl border"
         role="alert">
      <div class="ml-3 mr-2 h-8 font-4xl font-kaufland-bold flex items-center">{{ toastStore.toastText }}</div>
      <button type="button"
              class="ml-auto -mx-1.5 -my-1.5 text-white hover:text-gray-200 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
              data-dismiss-target="#toast-success" aria-label="Close"
              @click="toastStore.closeToast()">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useToastStore } from "~/stores/toast";

const toastStore = useToastStore();
</script>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>