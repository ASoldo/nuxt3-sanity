<template>
  <div
    :class="props.pt?.root.class"
    class="w-full h-10 flex items-center justify-between px-4"
  >
    <nav class="flex items-center justify-between px-2 bg-white">
      <img
        class="inline-block mr-3"
        height="32"
        width="32"
        src="@/assets/images/kaufland-logo.png"
        alt=""
      />

      <!-- Desktop navigation menu -->
      <div class="hidden sm:flex">
        <a
          v-for="(item, index) in props.itemsNavigationMenu?.items"
          :key="index"
          href="#"
          @click="item.fn()"
          class="mr-4 text-black"
        >
          <!-- <i :class="item.icon"></i> -->
          {{ item.label }}
        </a>
      </div>

      <!-- Mobile navigation menu -->
      <div class="sm:hidden">
        <button
          @click="navigationState = !navigationState"
          class="outline-none"
        >
          <svg
            v-if="!navigationState"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 pt-2 w-6 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 pt-2 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div class="relative">
          <div
            v-if="navigationState"
            class="absolute left-0 mt-2 w-40 bg-white outline outline-black outline-1 overflow-hidden shadow-xl z-10"
            ref="navigationTarget"
          >
            <a
              v-for="(item, index) in props.itemsNavigationMenu?.items"
              :key="index"
              href="#"
              @click="item.fn(), (navigationState = false)"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              <i :class="item.icon"></i>{{ item.label }}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <div class="relative">
      <img
        v-if="user"
        src="https://secure.gravatar.com/avatar/47552ae1736c078b2068c8a87396608a?s=80&d=identicon"
        alt="Profile Picture"
        class="h-6 w-6 rounded-full"
        @click="toggleMenu()"
      />
      <button v-else @click="toggleMenu()">Login</button>

      <div
        ref="target"
        v-if="menuState"
        class="absolute right-0 mt-2 w-40 bg-white outline outline-black outline-1 overflow-hidden shadow-xl z-10"
      >
        <div
          v-if="user"
          class="px-4 py-2 text-sm text-gray-700 flex flex-row justify-stretch"
        >
          <img
            src="https://secure.gravatar.com/avatar/47552ae1736c078b2068c8a87396608a?s=80&d=identicon"
            alt="Profile Picture"
            class="h-6 w-6 rounded-full"
          />
          {{ user?.email }}
        </div>

        <a
          v-if="user"
          v-for="(item, index) in props.itemsUserMenu?.items.loggedIn"
          :key="index"
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
          @click="item.fn()"
        >
          <i :class="item.icon"></i>{{ item.label }}</a
        >

        <a
          v-else
          v-for="item in props.itemsUserMenu?.items.loggedOut"
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
          @click="item.fn(), toggleMenu()"
          >{{ item.label }}</a
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

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
