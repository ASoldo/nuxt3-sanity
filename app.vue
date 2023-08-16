<template>
  <div class="flex flex-col h-screen">
    <NuxtLayout>
      <MenuComponent :pt="{ root: { class: '' } }" :items-user-menu="itemsMenu" :items-navigation-menu="items"
        class="fixed top-0" />
      <NuxtPage ref="page" class="w-full grow" />
    </NuxtLayout>

    <dialog ref="dialog" class="mx-auto my-auto absolute inset-0">
      <div class="bg-kaufland-yellow shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div v-if="logRegToggle">
          <h2 class="mb-4 text-center text-blue-900 text-xl">Prijavi se</h2>
          <div class="flex flex-col">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
                <i class="pi pi-fw pi-user"></i>
              </span>

              <input
                class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" v-model="email" placeholder="Email" />
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
                <i class="pi pi-fw pi-envelope"></i>
              </span>

              <input
                class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password" v-model="password" placeholder="Password" />
            </div>
            <button class="mb-2 bg-kaufland-teal hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="
              auth.signInWithPassword({ email: email, password: password }),
              dialog?.close()
              ">
              Sign In
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="dialog?.close()">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
    <dialog ref="dialog2" class="mx-auto my-auto absolute inset-0 container md:w-1/2 w-full">
      <div class="bg-kaufland-yellow shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <h2 class="mb-4 text-center text-blue-900 text-xl">Register</h2>
          <div class="flex flex-col">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
                <i class="pi pi-fw pi-user"></i>
              </span>
              <input
                class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" v-model="first_name" placeholder="First Name*" />
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
                <i class="pi pi-fw pi-user"></i>
              </span>
              <input
                class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" v-model="last_name" placeholder="Last Name*" />
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
                <i class="pi pi-fw pi-envelope"></i>
              </span>
              <input
                class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" v-model="email" placeholder="Email*" />
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
                <i class="pi pi-fw pi-lock"></i>
              </span>
              <input
                class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password" v-model="password" placeholder="Password*" />
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
                <i class="pi pi-fw pi-lock"></i>
              </span>
              <input
                class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password" v-model="repeatPassword" placeholder="Repeat Password*" />
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 h-11 flex items-center pl-3">
                <i class="pi pi-fw pi-hashtag"></i>
              </span>
              <input
                class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password" v-model="promo" placeholder="Promo Code" />
            </div>
            <div class="flex md:flex-row flex-col items-center justify-center">
              <div class="">
                <input type="checkbox" />
                Suglasan/a sam i prihvaćam Pravila natječaja, Uvjete korištenja
                i Pravila privatnosti te korištenje mojih osobnih podataka za
                potrebe provođenja i informiranja o nagradnom natječaju, odnosno
                za potrebe realizacije nagrade ako budem dobitnik/ca.
              </div>
              <div class="pt-2">
                <input type="checkbox" />
                Prijavljujem se za dodatne pogodnosti i primanje informativnih i
                promotivnih poruka i sadržaja od strane Kauflanda, kao i
                kreiranje i informiranje o prilagođenim individualiziranim
                prilikama, akcijama ili ponudama Kauflanda koje nastaju uz
                primjenu napredne tehnologije i automatizirane obrade mojih
                podataka.
              </div>
            </div>
            <button class="mt-4 mb-2 bg-kaufland-teal hover:bg-red-700 text-white font-bold py-2 px-4 rounded" :class="{
              'bg-gray-50':
                email !== repeatPassword &&
                email !== '' &&
                repeatPassword !== '',
            }" @click="checkPasswords()">
              Sign Up
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="dialog2?.close()">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>

    <dialog ref="success_msg" class="mx-auto my-auto absolute inset-0 container md:w-1/2 w-full">
      <div class="bg-kaufland-yellow shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <h2 class="mb-4 text-center text-blue-900 text-xl">Success!</h2>
          <p class="text-center mb-4">
            Your registration was successful. Please check your email for
            further instructions.
          </p>
          <div class="flex justify-center">
            <button class="bg-kaufland-teal hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              @click="success_msg?.close()">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
const { auth } = useSupabaseAuthClient();
import { DialogElement } from "@/internals/interfaces";
import { document } from "postcss";
const config = useRuntimeConfig();
const logRegToggle = ref(true);
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const promo = ref("");
const errorMsg = ref(null);
const successMsg = ref(null);
const page = ref(null);
const checkPasswords = () => {
  if (
    email.value !== repeatPassword.value &&
    email.value !== "" &&
    repeatPassword.value !== ""
  ) {
    // auth.signUp({ email: email.value, password: password.value }),
    signUp();
    success_msg.value?.showModal();
  }
};

const signUp = () => {
  try {
    const data = auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: first_name.value,
          last_name: last_name.value,
          promo: promo.value,
        },
      },
    });
    console.log("SignUp Data: ", data);
    dialog2.value?.close();
  } catch (error) { }
};

const dialog = ref<DialogElement | null>(null);
const dialog2 = ref<DialogElement | null>(null);
const success_msg = ref<DialogElement | null>(null);
const itemsMenu = ref({
  items: {
    loggedIn: [
      {
        label: "Profile",
        icon: "pi pi-fw pi-user",
        fn: () => {
          console.log("Profile");
          navigateTo("/profile");
        },
      },
      {
        label: "Prizes",
        icon: "pi pi-fw pi-star-fill",
        fn: () => {
          console.log("Setting");
          navigateTo("/prizes");
        },
      },
      {
        label: "Log Out",
        icon: "pi pi-fw pi-sign-out",
        fn: () => {
          console.log("Log Out");
          auth.signOut();
        },
      },
    ],
    loggedOut: [
      {
        label: "Prijavi se",
        icon: "pi pi-fw pi-user",
        fn: () => {
          console.log("Log In");
          dialog?.value?.showModal();
        },
      },
      {
        label: "Registriraj se",
        icon: "pi pi-fw pi-cog",
        fn: () => {
          console.log("Register");
          dialog2?.value?.showModal();
        },
      },
    ],
  },
});

const game = () => {
  console.log("Game");
  navigateTo("game");
};

const items = ref({
  items: [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      fn: () => {
        navigateTo("/");
      },
    },
    {
      label: "Game",
      icon: "pi pi-fw pi-palette",
      fn: () => {
        navigateTo("/game");
      },
    },
    {
      label: "Kako Igrati",
      icon: "pi pi-fw pi-external-link",
      fn: () => {
        navigateTo("#how-to-play");
      },
    },
    {
      label: "Nagrade",
      icon: "pi pi-fw pi-qrcode",
      fn: () => {
        navigateTo("#nagrade");
      },
    },
    {
      label: "Kaufland Card",
      icon: "pi pi-fw pi-id-card",
      fn: () => {
        navigateTo("#promo");
      },
    },
    {
      label: "Rang Lista",
      icon: "pi pi-fw pi-list",
      fn: () => {
        navigateTo("#ranglist");
      },
    },
  ],
});
</script>

<style>
dialog {
  background: transparent;
  /* width: 100%; */
  /* height: 100%; */
  /* padding-right: 30px; */
}
</style>
