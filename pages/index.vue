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

// watchEffect(() => {
//   if (!user.value) {
//     navigateTo("/");
//   }
// });

definePageMeta({
  middleware: ["auth"],
});
</script>

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
    <!-- <div v-for="(page, key) in pageData" :key="key"> -->
    <!--   <h1>{{ page.title }}</h1> -->
    <!--   <Dynamic :page-data="page" /> -->
    <!-- </div> -->
  </div>
</template>
