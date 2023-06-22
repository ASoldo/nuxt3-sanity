<template>
  <div class="h-full">
    <div class="w-full">
      <Dynamic :page-data="pageData[0]" />

      <div class="flex flex-col items-center justify-center p-2">
        <h1>Leaderboard</h1>
        <div class="overflow-x-auto w-full md:w-fit">
          <div
            class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-red-200 border-2">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-red-500 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    #
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-red-600 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-red-500 text-center text-xs leading-4 font-medium text-white uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="(item, index) in cats" :key="index" class="border-t border-gray-200"
                  :class="index % 2 !== 0 ? 'bg-red-50' : undefined">
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                    <span class="text-red-800">
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                    <span class="pi pi-user pr-2 text-blue-500"></span>{{ item.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <span class="pi pi-check px-1 text-green-500"></span>
                    &nbsp;{{ item.age }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-around p-2 bg-red-500">
        <button class="outline outline-1 outline-white px-4 rounded-md text-white hover:bg-red-600"
          @click="invoke_edge()">
          Edge-Function
        </button>
        <div v-if="edgeLordData">
          <p>{{ edgeLordData["message"] }}</p>
        </div>
        <button class="outline outline-1 outline-white px-4 rounded-md text-white hover:bg-red-600" @click="fetchUser()">
          Fetch-User
        </button>
        <button class="outline outline-1 outline-white px-4 rounded-md text-white hover:bg-red-600"
          @click="increment_clicks()">
          Call-Incremental-Clicks
        </button>
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

const client = useSupabaseClient();
const { data: cats } = await useAsyncData<CatsResponse[] | null>(
  "cats",
  async () => {
    const { data } = await client
      .from("cats")
      .select("*")
      .order("age", { ascending: false });
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
