<script setup lang="ts">

const emit = defineEmits()

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="border-2 bg-kaufland-red rounded shadow-xl border-gray-400 text-white">
    <div class="m-4">
      <h2 class="mb-4 text-center font-kaufland-bold text-4xl">Uspješna registracija!</h2>
      <div class="text-center text-xl mb-6">
        Registracija je bila uspješna!
        Molimo provjerite svoj e-mail za daljnje upute.
      </div>
      <div class="flex justify-center">
        <Button
            text="Zatvori"
            @clicked="close()"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>