<template>
  <div class="flex flex-col">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-white rounded shadow-lg">
          <h1 class="text-2xl font-semibold text-gray-700">Prizes</h1>
          <!-- Insert profile related content here -->
          <div>
            <h1 v-for="(item, key) in user_prizes_data" :key="key">
              {{ item.profile_id }}
              {{ item.prize_id }}
            </h1>
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
const jwt = ref(
  window.localStorage.getItem("sb-kxbzixfkcjexfwfacnzq-auth-token")
);
console.log(JSON.parse(jwt.value as string));

onMounted(async () => {
  const supabaseUrl = `https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/user_prizes`;
  console.log(user);

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
