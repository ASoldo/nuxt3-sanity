<template>
  <Loading />
  <div class="flex flex-col pt-14 h-full">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-2/3 justify-center">
        <div class="w-full p-6 m-4 bg-kaufland-red text-white min-h-[95%] rounded shadow-lg">
          <h1 class="text-2xl font-semibold">Moje nagrade</h1>
          <!-- Insert profile related content here -->
          <div>
            <div v-for="(item, key) in user_prizes_data" :key="key" class="p-3 flex flex-wrap justify-center gap-8">
              <Prize :prize="item" />
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

onMounted(async () => {
  loadingStore.showLoading();

  try {
    // Set JWT from local storage
    jwt.value = localStorage.getItem(
        "sb-kxbzixfkcjexfwfacnzq-auth-token"
    ) as string;

    // Fetch user prizes based on profile_id
    const { data: userPrizes, error: userPrizesError } = await client
        .from("user_prizes")
        .select(
            "id,prize_id, profile_id, created_at, prizes: prize_id(id,prize_code,description, qr_code_url)"
        )
        .eq("profile_id", user.value?.id);

    if (userPrizesError) {
      console.error("Error fetching user prizes:", userPrizesError.message);
      return;
    }

    user_prizes_data.value = userPrizes;
    console.log("User prize data: ", user_prizes_data.value);

  } catch (error) {
    console.error("Unexpected error:", error);
  } finally {

    loadingStore.hideLoading();
  }
});

watchEffect(() => {
  if (!user.value) {
    navigateTo("/");
  }
});
</script>
