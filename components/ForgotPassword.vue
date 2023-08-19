<template>
  <div class="border-2 bg-kaufland-red rounded border-gray-400 shadow-md rounded text-white relative"
       @keydown.enter="sendResetEmail">
    <div class="absolute right-2 top-2 text-white text-4xl cursor-pointer z-10 hover:text-gray-200"
         @click="closeDialog"><i class="pi pi-times"></i></div>
    <div class="p-8 md:p-16 mb-4 z-10 flex flex-col justify-center items-center">
      <div class="uppercase text-4xl font-kaufland-bold mb-6 text-center">Zaboravljena lozinka</div>
      <Input type="email" v-model="email" placeholder="Upišite svoj email" label="Email" class="mb-2 w-full"/>
      <div class="relative text-white text-2xl flex justify-center items-baseline h-[40px]">
        <i v-if="error" class="pi pi-exclamation-triangle mr-2"></i>
        {{ error }}
      </div>
      <Button
          text="Obnovi lozinku"
          @clicked="sendResetEmail"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { auth } = useSupabaseAuthClient();
import { useLoadingStore } from '@/stores/loading';
import { useToastStore } from '@/stores/toast';
import { validateEmail } from '@/internals/validators';

const email = ref("");
const error = ref("");
const loadingStore = useLoadingStore();
const toastStore = useToastStore();

const emit = defineEmits();

const sendResetEmail = async () => {
  if (!validateEmail(email.value)) {
    error.value = "Nespravan mail!"
    return;
  }
  loadingStore.showLoading();
  try {
    await auth.resetPasswordForEmail(email.value, {
      redirectTo: "https://k-marke-t.com/forgot_password",
    });
    toastStore.showToast("Upute za ispravak su poslane na vaš mail")
  } finally {
    loadingStore.hideLoading();
  }
  closeDialog();
};

const closeDialog = () => {
  emit('close-dialog');
  error.value = '';
}

</script>

<style scoped>
</style>
