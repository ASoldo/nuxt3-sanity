<template>
  <div class="h-full">
    <div class="w-full">
      <div v-if="!user">
        <h2>Sign in to your account</h2>
        <input type="text" v-model="email" />
        <input type="password" v-model="password" />
        <button @click="auth.signInWithPassword({ email: email, password: password })">
          Sign In
        </button>
        <button class="px-3 bg-blue-700 text-white" @click="navigateTo('game')">
          Game
        </button>
      </div>
      <div v-else>
        <button class="px-3 bg-blue-700 rounded-md text-white" @click="navigateTo('game')">
          Game
        </button>
      </div>
      <Dynamic :page-data="pageData[0]" />

      <input type="text" />
      <button>Submit</button>

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

      <button @click="invoke_edge()">Edge-Lord</button>
      <div v-if="edgeLordData">
        <p>{{ edgeLordData["message"] }}</p>
      </div>
      <button @click="fetchUser()">FetchUser</button>
      <button @click="increment_clicks()">Call Incremental Clics</button>
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
  console.log(data);
  edgeLordData.value = data;
};

const my_user = ref(null);
const fetchUser = async () => {
  my_user.value = await $fetch("api/me");
};

const increment_clicks = async () => {
  const { data, error } = await client.rpc("increment_clicks");
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
};

const { count, increment } = useCounterStore();

definePageMeta({
  middleware: ["auth"],
});
</script>
