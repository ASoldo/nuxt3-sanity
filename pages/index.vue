<template>
  <div class="h-full">
    <div class="w-full mt-14">
      <!-- <Carousel> </Carousel> -->
      <!-- <Dynamic :page-data="pageData[0]" /> -->
      <Header />
      <Banner />

      <BodyComponent />
      <CodePanel />

      <div
        id="ranglist"
        class="relative flex flex-col items-center justify-center p-2 bg-kaufland-red pt-14"
      >
        <div class="skew-div w-full h-full absolute z-0"></div>
        <div class="flex flex-row z-10 overflow-hidden">
          <img src="../assets/images/medalja.png" alt="" class="h-24" />
          <img src="../assets/images/rang_list.png" alt="" class="h-32" />
          <!-- <h1 class="font-kaufland-bold text-2xl md:text-4xl text-white"> -->
          <!--   K-MARKE(t) <br /> -->
          <!--   RANG LISTA -->
          <!-- </h1> -->
        </div>
        <h1 class="text-white font-kaufland-bold z-10">
          TOP 10 najboljih igrača danas
        </h1>
        <div class="overflow-x-auto w-full md:w-fit z-10">
          <div
            class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg"
          >
            <table class="min-w-full">
              <tbody class="">
                <!-- :class="{ 'bg-black': item.user_uuid == user?.id }" -->
                <tr v-for="(item, index) in leaderboard?.data" :key="index">
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    <span class="text-white text-center">
                      {{ index + 1 }}.
                    </span>
                  </td>
                  <td
                    class="text-center text-white px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium"
                  >
                    <!-- <span class="pi pi-user pr-2 text-blue-500"></span> -->
                    {{ item.profiles.first_name }}
                  </td>
                  <td
                    class="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white"
                  >
                    <!-- <span class="pi pi-check px-1 text-green-500"></span> -->
                    &nbsp;{{ sliceScore(item.best_score) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
  let re = new RegExp("^-?\\d+(?:\.\\d{0,3})?");
  return (+(number.toString().match(re)?.[0] as string)).toFixed(3);
};
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
  { deep: true },
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
