<template>
  <div>
    <button
      class="fixed z-50 w-10 h-10 bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full"
      @click="openDialog = true">
      🍪
    </button>

    <div v-if="openDialog"
      class="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div class="p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="text-center">
          <p>Do you accept cookies?</p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="setCookieValue(true)">
            Accept
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="setCookieValue(false)">
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const openDialog = ref(false);
const cookieConsent = useCookie("cookie-consent");

const setCookieValue = (value: boolean) => {
  cookieConsent.value = value.toString();
  openDialog.value = false;
  window.location.reload();
};

const initializeAnalytics = () => {
  if (cookieConsent.value) {
    console.log("Analytics initialized");
  } else {
    console.log("Analytics not initialized");
  }
};

onMounted(() => {
  initializeAnalytics();
});
</script>

<style></style>
