<template>
  <div class="h-full">
    <div class="w-full mt-14">
      <!-- <Carousel> </Carousel> -->
      <!-- <Dynamic :page-data="pageData[0]" /> -->
      <Header />

      <Products />
      <Impressum />
      <PWA class="w-full h-full" />
      <CookieControl locale="hr">
        <template #bar>
          <div class="flex flex-col">
            <h3>
              Naša stranica koristi samo osnovne (tehnički neophodne) kolačiće.
              Klikom na gumb „Dozvoli" prihvaćate sve tehnički neophodne
              kolačiće. Klikom na gumb „Upravljaj kolačićima" možete isključiti
              korištenje tehnički neophodnih kolačića. Dodatne informacije
              možete pronaći u našoj politici o kolačićima web stranice.
            </h3>
          </div>
        </template>
        <template #modal>
          <h3>Kolačići</h3>
        </template>
      </CookieControl>
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

const client = useSupabaseClient();
// const { data: cats } = await useAsyncData<CatsResponse[] | null>(
//   "cats",
//   async () => {
//     const { data } = await client
//       .from("cats")
//       .select("*")
//       .order("age", { ascending: false });
//     return data;
//   }
// );
const edgeLordData = ref(null);

const invoke_edge = async () => {
  const { data, error } = await client.functions.invoke("edge-lord", {
    body: JSON.stringify({ name: "Functions" }),
  });

  if (error) {
    console.error("Error invoking function:", error);
    return;
  }
  // console.log(data);
  edgeLordData.value = data;
};

const my_user = ref(null);
// const fetchUser = async () => {
//   my_user.value = await $fetch("api/me");
// };

const increment_clicks = async () => {
  const { data, error } = await client.rpc("increment_clicks");
  if (error) {
    console.error(error);
  } else {
    // console.log(data);
  }
};

const { count, increment } = useCounterStore();

const leaderboard = ref();
leaderboard.value = await $fetch("/api/leaderboard-frontend");

const sliceScore = (number: Number) => {
  let re = new RegExp('^-?\\d+(?:\.\\d{0,3})?');
  return (+(number.toString().match(re)?.[0] as string)).toFixed(3);
}
// {
//   headers: { "X-Secret-Header": "1" },
// }
// console.log(leaderboard.value);

// const leader = ref();
// leader.value = await $fetch("/api/leader");
// console.log("Leader", leader.value);

definePageMeta({
  middleware: ["auth"],
});

const {
  cookiesEnabled,
  cookiesEnabledIds,
  isConsentGiven,
  isModalActive,
  moduleOptions,
} = useCookieControl();

// example: react to a cookie being accepted
watch(
  () => cookiesEnabledIds.value,
  (current, previous) => {
    if (
      !previous?.includes("google-analytics") &&
      current?.includes("google-analytics")
    ) {
      // cookie with id `google-analytics` got added
      window.location.reload(); // placeholder for your custom change handler
    }
  },
  { deep: true }
);
</script>

<style scoped>
.skew-div::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top, #cd0000, transparent) !important;
  transform-origin: middle;
  z-index: 0;
}

@media screen and (min-width: 800px) {
  .skew-div::before {
    width: 90%;
    left: 5% !important;
    right: 5% !important;
    transform: skew(0.112rad);
  }
}

@media screen and (max-width: 375px) {
  .skew-div::before {
    width: 100vw;
    left: 0;
    right: 0;
  }
}
</style>
