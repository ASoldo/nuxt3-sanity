<template>
  <div class="flex flex-col h-screen">
    <NuxtLayout>
      <MenuComponent :pt="{ root: { class: '' } }" :items-user-menu="itemsMenu" :items-navigation-menu="items"
                     class="fixed top-0"/>
      <NuxtPage ref="page" class="w-full grow"/>
    </NuxtLayout>

    <dialog ref="dialog" class="mx-auto my-auto absolute inset-0 w-[95%] md:w-2/3 md:h-4/5">
      <Loading />
      <Login
          class="w-full h-full"
          @login-finished="closeLogin()"
          @register-from-login-clicked="registerFromLogin()"
          @forgot-password-clicked="forgotPassword()"/>
    </dialog>
    <dialog ref="dialog2" class="mx-auto my-auto absolute inset-0 container md:w-1/2 w-full">
      <Loading />
      <Register
          @close-dialog="closeRegister()"
          @register-clicked="handleRegister()"/>
    </dialog>

    <dialog ref="success_msg" class="mx-auto my-auto absolute inset-0 container md:w-1/2 w-full">
      <div class="bg-kaufland-yellow shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <h2 class="mb-4 text-center text-blue-900 text-xl">Uspješna registracija!</h2>
          <p class="text-center mb-4">
            Registracija je bila uspješna!
            Molimo provjerite svoj e-mail za daljnje upute.
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
    <dialog ref="forgot_password" class="mx-auto my-auto absolute inset-0 container md:w-1/2 w-full">
      <div class="bg-kaufland-yellow shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input v-model="email" type="email" placeholder="Enter your email"/>

        <button @click="sendResetEmail">Send Reset Email</button>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
const { auth } = useSupabaseAuthClient();
import { DialogElement } from "@/internals/interfaces";
import { document } from "postcss";
// import { client } from "process";
const config = useRuntimeConfig();
const logRegToggle = ref(true);
const page = ref(null);
const email = ref("");

const dialog = ref<DialogElement | null>(null);
const dialog2 = ref<DialogElement | null>(null);
const success_msg = ref<DialogElement | null>(null);
const forgot_password = ref<DialogElement | null>(null);

const closeLogin = () => {
  dialog.value?.close();
}

const sendResetEmail = async () => {
  await auth.resetPasswordForEmail(email.value, {
    redirectTo: "https://k-marke-t.com/forgot_password",
  });
  forgot_password.value?.close();
};
const forgotPassword = async () => {
  // await auth.resetPasswordForEmail(email.value, {
  //   redirectTo: "https://k-marke-t.com/forgot_password",
  // });
  forgot_password.value?.showModal();
};

const handleRegister = () => {
  dialog2.value?.close();
  success_msg.value?.showModal();
}

const closeRegister = () => {
  dialog2.value?.close();
}

const registerFromLogin = async () => {
  // await auth.resetPasswordForEmail(email.value, {
  //   redirectTo: "https://k-marke-t.com/forgot_password",
  // });
  dialog2.value?.showModal();
};


const itemsMenu = ref({
  items: {
    loggedIn: [
      {
        label: "Profil",
        icon: "pi pi-fw pi-user",
        fn: () => {
          console.log("Profil");
          navigateTo("/profile");
        },
      },
      {
        label: "Moje nagrade",
        icon: "pi pi-fw pi-star-fill",
        fn: () => {
          console.log("Setting");
          navigateTo("/prizes");
        },
      },
      {
        label: "Odjavi se",
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
      label: "Naslovnica",
      icon: "pi pi-fw pi-home",
      fn: () => {
        navigateTo("/");
      },
    },
    {
      label: "Igraj",
      icon: "pi pi-fw pi-palette",
      fn: () => {
        navigateTo("/game");
      },
    },
    {
      label: "Kako igrati",
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
      label: "Rang lista",
      icon: "pi pi-fw pi-list",
      fn: () => {
        navigateTo("#ranglist");
      },
    },
  ],
});

useHead({
  title: 'K-MARKE-T',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
</script>

<style>
dialog {
  background: transparent;
  /* width: 100%; */
  /* height: 100%; */
  /* padding-right: 30px; */
}
</style>
