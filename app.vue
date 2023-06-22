<template>
  <div class="flex flex-col h-screen">
    <NuxtLayout>
      <MenuComponent :pt="{ root: { class: '' } }" :items-user-menu="itemsMenu" :items-navigation-menu="items" />
      <NuxtPage class="w-full flex-grow overflow-y-auto" />
    </NuxtLayout>
    <dialog ref="dialog" class="m-auto absolute inset-0 p-20">
      <h2>Prijavi se</h2>
      <div class="flex flex-col">
        <input class="m-2 pb-2 outline outline-1 outline-blue-500 rounded-md p-2" type="text" v-model="email"
          placeholder="Email" />
        <input class="m-2 pb-2 outline outline-1 outline-blue-500 rounded-md p-2" type="password" v-model="password"
          placeholder="Password" />
        <button class="bg-green-500 px-5 rounded-md text-white" @click="
          auth.signInWithPassword({ email: email, password: password }),
          dialog?.close()
          ">
          Sign In
        </button>
        <button class="mt-3 px-2 rounded-md bg-red-400 text-white hover:bg-red-700" @click="dialog?.close()">
          Close
        </button>
      </div>
    </dialog>
    <!-- <div class="flex flex-row w-full justify-center"> -->
    <!--   <button @click="dialog?.showModal()" -->
    <!--     class="bg-blue-500 hover:bg-blue-700 text-white hover:text-black pl-5 pr-5 rounded-2xl"> -->
    <!--     Click -->
    <!--   </button> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
import { DialogElement } from "@/internals/interfaces";

const email = ref("");
const password = ref("");

const dialog = ref<DialogElement | null>(null);
const itemsMenu = ref({
  items: {
    loggedIn: [
      {
        label: "Profile",
        icon: "pi pi-fw pi-user",
        fn: () => {
          console.log("Profile");
        },
      },
      {
        label: "Settings",
        icon: "pi pi-fw pi-cog",
        fn: () => {
          console.log("Setting");
        },
      },
      {
        label: "Log Out",
        icon: "pi pi-fw pi-cog",
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
      icon: "pi pi-fw pi-plus",
      fn: () => {
        navigateTo("/");
      },
    },
    {
      label: "Game",
      icon: "pi pi-fw pi-trash",
      fn: () => {
        navigateTo("game");
      },
    },
    {
      label: "Link",
      icon: "pi pi-fw pi-external-link",
      fn: game,
    },
    {
      label: "Link",
      icon: "pi pi-fw pi-bookmark",
      fn: () => { },
    },
    {
      label: "Link",
      icon: "pi pi-fw pi-video",
      fn: () => { },
    },
  ],
});
</script>
