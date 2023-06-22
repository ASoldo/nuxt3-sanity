<template>
  <div class="h-96 w-full flex flex-col justify-center outline outline-black outline-1">
    <dialog ref="dialog" class="m-auto absolute inset-0 p-20">
      <h1>Welcome!</h1>
      <p>{{ props.content }}</p>
      <div class="flex flex-row justify-end">
        <button class="mt-3 px-2 rounded-md bg-red-400 text-white hover:bg-red-700" @click="dialog?.close()">
          Close
        </button>
      </div>
    </dialog>
    <div class="flex flex-row w-full justify-center">
      <button @click="dialog?.showModal()"
        class="bg-blue-500 hover:bg-blue-700 text-white hover:text-black pl-5 pr-5 rounded-2xl">
        Click
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DialogElement } from "../internals/interfaces";
const props = defineProps({
  content: String,
});
const dialog = ref<DialogElement | null>(null);
</script>
