<template>
  <div>
    <div v-if="!user">
      <h2>Sign in to your account</h2>
      <InputText type="text" v-model="email" />
      <InputText type="password" v-model="password" />
      <Button :pt="{
        root: { class: 'bg-red-500 hover:bg-red-900 p-2 m-1 rounded-md' },
      }" @click="auth.signInWithPassword({ email: email, password: password })" label="Sign In" />
      <Button @click="navigateTo('game')" label="Game" />
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
          <Button label="Submit" />
          <i class="pi pi-check"></i>
          <i class="pi pi-times"></i>
          <span class="pi pi-search"></span>
          <span class="pi pi-user"></span>
          <fieldset>
            <legend>Cats</legend>
            <ul>
              <li v-for="(item, key) in cats" :key="key">
                <span class="pi pi-user"></span> &nbsp;{{ item.name }}
                <span class="pi pi-check"></span> &nbsp;{{ item.age }}
              </li>
            </ul>
          </fieldset>

          <Button label="Edge-Lord" @click="invoke_edge()" />
          <div v-if="edgeLordData">
            <p>{{ edgeLordData["message"] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PageData } from "../internals/types";
import { CatsResponse } from "../internals/interfaces";
import { useCounterStore } from "../stores/counter";

const query = groq`*[_type == 'page']|order(id asc){...,"components": components[visibility == true]}`;
const sanity = useSanity();
const { data } = useAsyncData("page", () => sanity.fetch(query));
const pageData = computed(() => (data.value as PageData[]) ?? []);

const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();
const email = ref("");
const password = ref("");

const client = useSupabaseClient();
const { data: cats } = await useAsyncData<CatsResponse[] | null>(
  "cats",
  async () => {
    const { data } = await client.from("cats").select("*");
    return data;
  }
);
const edgeLordData = ref(null);

const invoke_edge = async () => {
  const { data, error } = await client.functions.invoke("edge-lord", {
    body: JSON.stringify({ name: "Functions" }),
  });

  if (error) {
    console.error("Error invoking function:", error);
    return;
  }
  // You could also show the error to the user in some way here, if appropriate
  console.log(data);
  edgeLordData.value = data;
};

const { count, increment } = useCounterStore();

definePageMeta({
  middleware: ["auth"],
});
</script>
