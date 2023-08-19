<template>
  <div class="border-2 rounded border-gray-400 shadow-md rounded text-white relative">
    <div class="bg-kaufland-red skew-div absolute h-full w-full overflow-hidden -z-10 pointer-events-none"></div>
    <div class="px-8 pt-6 pb-8 mb-4 z-10">
      <Input />
      <Input type="email" v-model="email" placeholder="Email" label="Email" class="mb-2"/>

      <button @click="sendResetEmail">Resetiraj email</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { auth } = useSupabaseAuthClient();
import { useLoadingStore } from '@/stores/loading';

const email = ref("");
const loadingStore = useLoadingStore();

const sendResetEmail = async () => {
  await auth.resetPasswordForEmail(email.value, {
    redirectTo: "https://k-marke-t.com/forgot_password",
  });
  emit('close-dialog')
};

const emit = defineEmits();

const closeDialog = () => {
  emit('close-dialog');
}

</script>

<style scoped>
</style>
