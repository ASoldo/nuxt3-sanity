<!-- <template> -->
<!--   <Loading /> -->
<!--   <div class="flex flex-col pt-14 h-full"> -->
<!--     <div class="flex grow justify-center"> -->
<!--       <div class="flex w-full md:w-2/3 justify-center"> -->
<!--         <div class="w-full p-6 m-4 bg-kaufland-red text-white min-h-[95%] rounded shadow-lg"> -->
<!--           <h1 class="text-2xl font-kaufland-bold">Moje nagrade</h1> -->
<!--           <div> -->
<!--             <div v-for="(item, key) in user_prizes_data" :key="key" class="p-3 flex flex-wrap justify-center gap-8"> -->
<!--               <Prize :prize="item" /> -->
<!--             </div> -->
<!--           </div> -->
<!--           <div class="mt-5 ml-2 font-kaufland-bold" v-if="user_prizes_data?.length === 0"> -->
<!--             Još uvijek nemate nagrada -->
<!--           </div> -->
<!--         </div> -->
<!--       </div> -->
<!--     </div> -->
<!--   </div> -->
<!-- </template> -->

<template>
  <Loading />
  <div class="flex flex-col pt-14 h-full">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-2/3 justify-center">
        <div class="w-full p-6 m-4 bg-kaufland-red text-white min-h-[95%] rounded shadow-lg">
          <h1 class="text-2xl font-kaufland-bold">Moje nagrade</h1>
          <!-- Insert profile related content here -->
          <div>
            <div v-for="(item, key) in user_prizes_data" :key="key" class="p-3 flex flex-wrap justify-center gap-8">
              <Prize :prize="item" />
            </div>
          </div>
          <div class="mt-5 ml-2 font-kaufland-bold" v-if="user_prizes_data?.length === 0">
            Još uvijek nemate nagrada
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useLoadingStore } from "~/stores/loading";

definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();
const config = useRuntimeConfig();
const client = useSupabaseClient();
const user_prizes_data = ref<any>({});
const jwt = ref("");

const loadingStore = useLoadingStore();

const isPrizeValid = (prize: any) => {
  const currentDate = new Date();
  const validFrom = new Date(prize.prizes.valid_from);
  const validTo = new Date(prize.prizes.valid_to);

  return currentDate >= validFrom && currentDate <= validTo;
};

onMounted(async () => {
  const supabaseUrl = `https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/user_prizes?profile_id=eq.${user.value?.id}`;
  // console.log(user);
  try {
    jwt.value = localStorage.getItem(
      "sb-kxbzixfkcjexfwfacnzq-auth-token"
    ) as string;

    // Fetch user prizes based on profile_id
    const { data: userPrizes, error: userPrizesError } = await client
      .from("user_prizes")
      .select(
        "id,prize_id, profile_id, created_at, prizes: prize_id(id,prize_code,description, qr_code_url, valid_from, valid_to, prize_image_url)"
      )
      .eq("profile_id", user.value?.id);

    if (userPrizesError) {
      console.error("Error fetching user prizes:", userPrizesError.message);
      return;
    }

    user_prizes_data.value = userPrizes?.filter(prize => isPrizeValid(prize));
    // isPrizeValid(user_prizes_data.value);
    // console.log("User prize data: ", user_prizes_data.value);
  } catch (error) {
    console.error("Unexpected error:", error);
  } finally {
    loadingStore.hideLoading();
  }
  // // Fetch detailed information for each prize
  // for (let userPrize of user_prizes_data.value) {
  //   const { data: prizeDetails, error: prizeError } = await client
  //     .from("prizes")
  //     .select("*")
  //     .eq("id", 1);
  //   console.log("Prize response: ", userPrize);
  //
  //   if (prizeError) {
  //     console.error("Error fetching prize details:", prizeError.message);
  //     continue;
  //   }
  //
  //   userPrize.prizeDetails = prizeDetails[0]; // Assuming each prize ID corresponds to a single prize
  // }
  //
  // console.log("User Prizes with details:", user_prizes_data.value);
});

// onMounted(async () => {
//   const supabaseUrl = `https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/user_prizes?profile_id=eq.${user.value?.id}`;
//   console.log(user);
//
//   jwt.value = localStorage.getItem(
//     "sb-kxbzixfkcjexfwfacnzq-auth-token"
//   ) as string;
//
//   const supabaseHeaders = {
//     apikey: config.public.supabase.key as string,
//     Authorization: `Bearer ${JSON.parse(jwt.value as string).access_token}`,
//     "Content-Type": "application/json",
//   };
//
//   const supabaseResponse = await fetch(supabaseUrl, {
//     method: "GET",
//     headers: supabaseHeaders,
//   });
//
//   if (!supabaseResponse.ok) {
//     console.error(`Error fetching user prizes: ${supabaseResponse.statusText}`);
//     return;
//   }
//
//   user_prizes_data.value = await supabaseResponse.json();
//
//   console.log("User Prizes data: ", user_prizes_data.value);
// });
</script>
