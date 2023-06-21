<template>
  <div class="flex flex-col h-screen">
    <NuxtLayout>
      <MenuComponent :pt="{ root: { class: '' } }" :items-user-menu="itemsMenu" :items-navigation-menu="items" />
      <NuxtPage class="w-full flex-grow overflow-y-auto" />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();

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

const items = ref({
  items: [
    {
      label: "New",
      icon: "pi pi-fw pi-plus",
      fn: () => {
        console.log("Olla");
      },
    },
    {
      label: "Delete",
      icon: "pi pi-fw pi-trash",
      fn: () => { },
    },
    {
      label: "Export",
      icon: "pi pi-fw pi-external-link",
      fn: () => { },
    },
    {
      label: "Bookmark",
      icon: "pi pi-fw pi-bookmark",
      fn: () => { },
    },
    {
      label: "Video",
      icon: "pi pi-fw pi-video",
      fn: () => { },
    },
  ],
});
</script>
