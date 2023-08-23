<template>
  <div class="flex flex-col pt-14">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-kaufland-red text-white rounded shadow-xl">
          <h1 class="text-2xl text-center mb-2 font-semibold">
            Uspjesno ste napravili korisnika
          </h1>
          <a class="text-center flex justify-center" href="#" @click.prevent="navigateTo('/')">Naslovnica</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
const { auth } = useSupabaseAuthClient();
onMounted(() => {
  auth.signOut();
});
</script>
