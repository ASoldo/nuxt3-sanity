<template>
    <div class="bg-kaufland-red border-2 rounded border-gray-400 shadow-xl relative">
      <div class="skew-div absolute h-full w-full overflow-hidden z-0"></div>
      <div class="flex flex-col items-center p-10">
        <h2 class="mb-10 text-center text-white text-4xl uppercase font-bold">Prijavi se u K-marke(t) igricu</h2>
        <div class="flex flex-col z-10 w-full md:w-2/3">
          <Input type="email" v-model="password" placeholder="Email" label="Email" class="mb-2"/>
          <Input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Lozinka" label="Lozinka"/>
          <div class="relative text-white text-2xl flex justify-center items-baseline h-[40px]">
            <i v-if="error" class="pi pi-exclamation-triangle mr-2"></i>
            {{error}}
          </div>
          <button class="mb-2 bg-kaufland-teal hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="loginUser">
            Prijavi se
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="loginFinished">
            Odustani
          </button>
          <div class="text-white flex flex-col underline mt-6 gap-4">
            <button @click="forgotPassword()" class="hover:text-gray-300 transition-colors">Zaboravljena lozinka?</button>
            <button @click="registerFromLogin()" class="hover:text-gray-300 transition-colors">Nisi registriran? Registriraj se ovdje</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { auth } = useSupabaseAuthClient();
import { useLoadingStore } from '@/stores/loading';
const email = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);
const loadingStore = useLoadingStore();

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
}

const loginUser = async () => {
  try {
    loadingStore.showLoading();
    const response = await auth.signInWithPassword({ email: email.value, password: password.value });
    console.log(response);
    if(response.error) {
      error.value = "Netočni login podaci";
    } else {
      loginFinished();
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
