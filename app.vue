<template>
  <div class="fixed top-16 right-2 z-[10000]">
    <ToastWrapper/>
  </div>
  <div class="flex flex-col h-screen">
    <NuxtLayout>
      <MenuComponent :pt="{ root: { class: '' } }" :items-user-menu="itemsMenu" :items-navigation-menu="items"
                     class="fixed top-0"/>
      <NuxtPage ref="page" class="w-full grow"/>
    </NuxtLayout>

    <dialog data-modal ref="login_dialog" class="mx-auto my-auto inset-0 container h-4/5 md:h-2/3 w-[95%] md:w-2/3">
      <Loading/>
      <Login
          class="w-full h-full"
          @login-finished="closeLogin()"
          @register-from-login-clicked="registerFromLogin()"
          @forgot-password-clicked="forgotPassword()"/>
    </dialog>
    <dialog ref="registerDialog" class="mx-auto my-auto inset-0 container md:w-2/3 w-full">
      <Loading/>
      <Register
          @open-login="loginFromRegister()"
          @close-dialog="closeRegister()"
          @register-clicked="handleRegister()"/>
    </dialog>

    <dialog ref="success_msg" class="mx-auto my-auto inset-0 container md:w-1/2 w-full">
      <Loading/>
      <RegisterSuccess @close="success_msg?.close()"/>
    </dialog>
    <dialog ref="forgot_password" class="mx-auto my-auto inset-0 container md:w-1/2 w-full">
      <Loading/>
      <ForgotPassword @close-dialog="forgot_password?.close()"/>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import RegisterSuccess from "~/components/RegisterSuccess.vue";

const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
import { DialogElement } from "@/internals/interfaces";
import { useToastStore } from "@/stores/toast";
import { document } from "postcss";
import { useLoginStore } from "~/stores/login";
import { useLoadingStore } from "~/stores/loading";
// import { client } from "process";
const config = useRuntimeConfig();
const logRegToggle = ref(true);
const page = ref(null);
const toastStore = useToastStore();
const loadingStore = useLoadingStore();
const loginStore = useLoginStore();
loginStore.$onAction(({ name }) => {
  login_dialog.value?.showModal();
})

const login_dialog = ref<DialogElement | null>(null);
const registerDialog = ref<DialogElement | null>(null);
const success_msg = ref<DialogElement | null>(null);
const forgot_password = ref<DialogElement | null>(null);

const closeLogin = () => {
  login_dialog.value?.close();
}

const forgotPassword = async () => {
  // await auth.resetPasswordForEmail(email.value, {
  //   redirectTo: "https://k-marke-t.com/forgot_password",
  // });
  forgot_password.value?.showModal();
};

const handleRegister = () => {
  registerDialog.value?.close();
  success_msg.value?.showModal();
}

const closeRegister = () => {
  registerDialog.value?.close();
}

const registerFromLogin = () => {
  // await auth.resetPasswordForEmail(email.value, {
  //   redirectTo: "https://k-marke-t.com/forgot_password",
  // });
  login_dialog.value?.close();
  registerDialog.value?.showModal();
};

const loginFromRegister = () => {
  registerDialog.value?.close();
  login_dialog.value?.showModal();
}


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
          loadingStore.showLoading();
          navigateTo("/");
          auth.signOut();
          toastStore.showToast("Uspješna odjava")
          loadingStore.hideLoading();
        },
      },
    ],
    loggedOut: [
      {
        label: "Prijavi se",
        icon: "pi pi-fw pi-user",
        fn: () => {
          console.log("Log In");
          login_dialog?.value?.showModal();
        },
      },
      {
        label: "Registriraj se",
        icon: "pi pi-fw pi-cog",
        fn: () => {
          console.log("Register");
          registerDialog?.value?.showModal();
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
        if(!user.value) {
          loginStore.openLogin();
          toastStore.showToast("Za igru se potrebno prijaviti!");
          return;
        }
        navigateTo("/game");
      },
    },
    {
      label: "Kako igrati",
      icon: "pi pi-fw pi-external-link",
      fn: () => {
        navigateTo("/#how-to-play");
      },
    },
    {
      label: "Nagrade",
      icon: "pi pi-fw pi-qrcode",
      fn: () => {
        navigateTo("/#nagrade");
      },
    },
    {
      label: "Kaufland Card",
      icon: "pi pi-fw pi-id-card",
      fn: () => {
        navigateTo("/#promo");
      },
    },
    {
      label: "Rang lista",
      icon: "pi pi-fw pi-list",
      fn: () => {
        navigateTo("/#ranglist");
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
dialog::backdrop{
  background-color: white;
  opacity: 0.35;
}
</style>
