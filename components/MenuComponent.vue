<template>
  <div :class="props.pt?.root.class" class="w-full h-10 flex items-center justify-between px-4">
    <nav class="flex items-center justify-between px-2 bg-white">
      <img class="inline-block mr-3" height="32" width="32" src="@/assets/images/kaufland-logo.png" alt="" />

      <!-- Desktop navigation menu -->
      <div class="hidden sm:flex">
        <a v-for="(item, index) in props.itemsNavigationMenu?.items" :key="index" href="#" @click.prevent="item.fn()"
          class="mr-4 text-black hover:text-red-500">
          <!-- <i :class="item.icon"></i> -->
          {{ item.label }}
        </a>
      </div>

      <!-- Mobile navigation menu -->
      <div class="sm:hidden">
        <button @click="navigationState = !navigationState" class="outline-none">
          <svg v-if="!navigationState" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" class="h-6 pt-2 w-6 text-black">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="h-6 w-6 pt-2 text-black">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="relative">
          <div v-if="navigationState"
            class="absolute left-0 mt-2 w-40 bg-white outline outline-black outline-1 overflow-hidden shadow-xl z-10"
            ref="navigationTarget">
            <a v-for="(item, index) in props.itemsNavigationMenu?.items" :key="index" href="#"
              @click.prevent="item.fn(), (navigationState = false)"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white">
              <i :class="item.icon"></i>{{ item.label }}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <div class="relative">
      <img v-if="user" src="https://secure.gravatar.com/avatar/47552ae1736c078b2068c8a87396608a?s=80&d=identicon"
        alt="Profile Picture" class="h-6 w-6 rounded-full" @click="toggleMenu()" />
      <button v-else @click="toggleMenu()" class="text-red-500">
        Login / Register
      </button>

      <div ref="target" v-if="menuState"
        class="absolute right-0 mt-2 w-40 bg-white outline outline-black outline-1 overflow-hidden shadow-xl z-10">
        <div v-if="user" class="px-4 py-2 text-sm text-gray-700 flex flex-row justify-stretch">
          <img src="https://secure.gravatar.com/avatar/47552ae1736c078b2068c8a87396608a?s=80&d=identicon"
            alt="Profile Picture" class="h-6 w-6 rounded-full" />
          {{ user?.email }}
        </div>

        <a v-if="user" v-for="(item, index) in props.itemsUserMenu?.items.loggedIn" :key="index" href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
          @click="item.fn(), toggleMenu()">
          <i :class="item.icon"></i>{{ item.label }}</a>

        <a v-else v-for="item in props.itemsUserMenu?.items.loggedOut" href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
          @click="item.fn(), toggleMenu()">{{ item.label }}</a>
      </div>
    </div>
  </div>
  <!---->
  <!--  <div class="h-96 w-full flex flex-col justify-center outline outline-black outline-1"> -->
  <!--   <dialog ref="dialog" class="m-auto absolute inset-0 p-20"> -->
  <!--     <h1>Welcome!</h1> -->
  <!--     <p>Hello</p> -->
  <!--     <div class="flex flex-row justify-end"> -->
  <!--       <button class="mt-3 px-2 rounded-md bg-red-400 text-white hover:bg-red-700" @click="dialog?.close()"> -->
  <!--         Close -->
  <!--       </button> -->
  <!--     </div> -->
  <!--   </dialog> -->
  <!--   <div class="flex flex-row w-full justify-center"> -->
  <!--     <button @click="dialog?.showModal()" -->
  <!--       class="bg-blue-500 hover:bg-blue-700 text-white hover:text-black pl-5 pr-5 rounded-2xl"> -->
  <!--       Click -->
  <!--     </button> -->
  <!--   </div> -->
  <!-- </div> -->
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
// import { DialogElement } from "../internals/interfaces";
//
// const dialog = ref<DialogElement | null>(null);

const user = useSupabaseUser();

const target = ref(null);
const navigationTarget = ref(null);

const menuState = ref(false);
const navigationState = ref(false);

onClickOutside(target, () => toggleMenu());
onClickOutside(navigationTarget, () => toggleNavigationMenu());
const props = defineProps({
  pt: {
    type: Object,
    root: {
      id: {
        type: String,
      },
      class: {
        type: String,
      },
      style: {
        type: String,
      },
    },
  },
  itemsUserMenu: {
    type: Object,
    items: {
      loggedIn: [
        {
          label: String,
          icon: String,
          fn: Function,
        },
      ],
      loggedOut: [
        {
          label: String,
          icon: String,
          fn: Function,
        },
      ],
    },
  },
  itemsNavigationMenu: {
    type: Object,
    items: [
      {
        label: String,
        icon: String,
        fn: Function,
      },
    ],
  },
});

const toggleMenu = () => {
  menuState.value = !menuState.value;
};
const toggleNavigationMenu = () => {
  navigationState.value = !navigationState.value;
};
</script>
