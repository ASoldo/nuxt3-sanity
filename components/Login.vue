<template>
    <div class="bg-kaufland-red border-2 rounded border-gray-400 shadow-xl relative overflow-auto" @keydown.enter="loginUser">
      <div class="absolute right-2 top-2 text-white text-4xl cursor-pointer z-10 hover:text-gray-200" @click="loginFinished"><i class="pi pi-times"></i></div>
      <div class="skew-div hidden md:block absolute h-full w-full overflow-hidden z-0"></div>
      <div class="flex flex-col items-center p-10">
        <h2 class="mb-10 text-center text-white text-4xl uppercase font-kaufland-bold">Prijavi se u K-marke(t) igricu</h2>
        <div class="grid auto-rows-fr z-10 w-full md:w-2/3">
          <Input type="email" v-model="email" placeholder="Email" label="Email" class="mb-2"/>
          <Input :type="'password'" v-model="password" placeholder="Lozinka" label="Lozinka"/>
        </div>
        <div class="flex flex-col z-10">
          <div class="relative text-white text-2xl flex justify-center items-baseline min-h-[40px]">
            <i v-if="error" class="pi pi-exclamation-triangle mr-2"></i>
            {{error}}
          </div>
          <div class="flex flex-col">
            <Button
                class="mb-2"
                text="Prijavi se"
                @clicked="loginUser"/>
          </div>
          <div class="text-white flex flex-col underline mt-6 gap-4">
            <button @click="forgotPassword()" class="hover:text-gray-300 font-kaufland-bold transition-colors">Zaboravljena lozinka?</button>
            <button @click="registerFromLogin()" class="hover:text-gray-300 font-kaufland-bold transition-colors">Nisi registriran? Registriraj se ovdje</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { auth } = useSupabaseAuthClient();
import { useLoadingStore } from '@/stores/loading';
import { useToastStore } from '@/stores/toast';
import { validateEmail } from "~/internals/validators";
const email = ref("");
const password = ref("");
const error = ref("");
const loadingStore = useLoadingStore();
const toastStore = useToastStore();


const loginUser = async () => {
  if(!email.value || !password.value) {
    error.value = "Upišite sve podatke!";
    return;
  }
  if( !validateEmail(email.value) ){
    error.value = "Nespravan mail!"
    return;
  }
  try {
    loadingStore.showLoading();
    const response = await auth.signInWithPassword({ email: email.value, password: password.value });
    console.log(response);
    if(response.error) {
      error.value = "Netočni login podaci";
    } else {
      loginFinished();
      toastStore.showToast("Uspješna prijava")
    }
  } catch (error) {
    error.value = "Netočni login podaci";
  } finally {
    loadingStore.hideLoading();
  }
};

const loginFinished = () => {
  emit('login-finished');
  error.value = "";
};

const emit = defineEmits();

const forgotPassword = () => {
  loginFinished();
  emit('forgot-password-clicked');
};

const registerFromLogin = () => {
  loginFinished();
  emit('register-from-login-clicked');
};

</script>

<style scoped>
.skew-div::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top, #cd0000, transparent) !important;
  transform-origin: center;
  z-index: -1;
}

@media screen and (min-width: 888px) {
  .skew-div::before {
    width: 62%;
    left: 19% !important;
    right: 29% !important;
    transform: skew(-0.112rad);
  }
}

@media screen and (max-width: 375px) {
  .skew-div::before {
    width: 100%;
    left: 0;
    /* Uncomment the next line if you want the skew effect on mobile */
    /* transform: skew(-0.112rad); */
  }
}
</style>
