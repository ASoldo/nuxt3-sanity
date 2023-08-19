<template>
  <div class="border-2 rounded border-gray-400 shadow-md rounded text-white relative">
    <div class="bg-kaufland-red skew-div absolute h-full w-full overflow-hidden -z-10 pointer-events-none"></div>
    <div class="px-8 pt-6 pb-8 mb-4 z-10">
      <input v-model="email" type="email" placeholder="Enter your email"/>

      <button @click="sendResetEmail">Resetiraj email</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { auth } = useSupabaseAuthClient();
import { useLoadingStore } from '@/stores/loading';

// ... [rest of your script like data properties for registration] ...
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const promo = ref("");
const successMsg = ref(null);
const errorMsg = ref(null);
const showPassword = ref(false);
const loadingStore = useLoadingStore();

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
}

const emit = defineEmits();

const closeDialog = () => {
  emit('close-dialog');
}

</script>

<style scoped>
</style>
