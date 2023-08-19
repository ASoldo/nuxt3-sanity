<template>
  <div class="flex flex-col pt-14">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-white rounded shadow-lg">
          <h1 class="text-2xl font-semibold text-gray-700">Moje nagrade</h1>
          <!-- Insert profile related content here -->
          <div>
            <div v-for="(item, key) in user_prizes_data" :key="key" class="p-3">
              Prize: {{ key + 1 }}
              <!-- {{ item.profile_id }} -->
              Prize_id: {{ item.prize_id }}
              <img src="../assets/images/qrcodedummy.png" alt="" />
            </div>
          </div>
          <div class="mt-5 ml-2" v-if="user_prizes_data?.length === 0">
            Još uvijek nemate nagrada
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();
const config = useRuntimeConfig();
const client = useSupabaseClient();
const user_prizes_data = ref<any>({});
const jwt = ref("");

onMounted(async () => {
  const supabaseUrl = `https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/user_prizes?profile_id=eq.${user.value?.id}`;
  console.log(user);

  jwt.value = localStorage.getItem(
    "sb-kxbzixfkcjexfwfacnzq-auth-token"
  ) as string;

  const supabaseHeaders = {
    apikey: config.public.supabase.key as string,
    Authorization: `Bearer ${JSON.parse(jwt.value as string).access_token}`,
    "Content-Type": "application/json",
  };

  const supabaseResponse = await fetch(supabaseUrl, {
    method: "GET",
    headers: supabaseHeaders,
  });

  if (!supabaseResponse.ok) {
    console.error(`Error fetching user prizes: ${supabaseResponse.statusText}`);
    return;
  }

  user_prizes_data.value = await supabaseResponse.json();

  console.log("User Prizes data: ", user_prizes_data.value);
});

watchEffect(() => {
  if (!user.value) {
    navigateTo("/");
  }
});
</script>
