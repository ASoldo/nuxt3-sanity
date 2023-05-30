<template>
  <div>
    <dialog ref="dialog">
      <h1>Ja sam modal</h1>
      <p>{{ props.content }}</p>
      <button @click="dialog?.close()">Close</button>
    </dialog>
    <button @click="dialog?.showModal()">Click</button>
  </div>
</template>

<script setup lang="ts">
import { DialogElement } from "../types/interfaces";
const props = defineProps({
  content: String,
});
const dialog = ref<DialogElement | null>(null);
</script>
