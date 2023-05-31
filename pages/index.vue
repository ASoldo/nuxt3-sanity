<template>
  <div class="">
    <div v-if="!user">
      <h2 class="">Sign in to your account</h2>
      <input type="text" v-model="email" />
      <input type="password" v-model="password" />
      <button class="" @click="auth.signInWithPassword({ email: email, password: password })">
        Sign In
      </button>
      <button @click="navigateTo('game')">Game</button>
    </div>
    <div v-else>
      <h1>Olla {{ user.email }}</h1>
      <button @click="auth.signOut()">Log Out</button>
      <button @click="navigateTo('game')">Game</button>
    </div>
    <Dynamic :page-data="pageData[0]" />

    <div class="container">
      <div class="flex flex-column align-items-center mt-1">
        <Toast />
        <div class="mt-4">
          <InputText :pt="{ root: { class: 'p-inputtext-sm' } }" type="text" />
          <Button :pt="{
            label: { style: 'outline: 1px solid red' },
            root: { style: 'background-color: green; border-radius: 0px;' },
          }" label="Submit" />
          <i class="pi pi-check"></i>
          <i class="pi pi-times"></i>
          <span class="pi pi-search"></span>
          <span class="pi pi-user"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PageData } from "../types/types";

const query = groq`*[_type == 'page']|order(id asc){...,"components": components[visibility == true]}`;
const sanity = useSanity();
const { data } = useAsyncData("page", () => sanity.fetch(query));
const pageData = computed(() => (data.value as PageData[]) ?? []);

const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
const email = ref("");
const password = ref("");

definePageMeta({
  middleware: ["auth"],
});
</script>
