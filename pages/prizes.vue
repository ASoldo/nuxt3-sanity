<template>
  <div class="flex flex-col">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-white rounded shadow-lg">
          <h1 class="text-2xl font-semibold text-gray-700">Prizes</h1>
          <!-- Insert profile related content here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>
