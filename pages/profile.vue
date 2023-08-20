<template>
  <Loading />
  <div class="flex flex-col pt-14">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-kaufland-red text-white rounded shadow-xl">
          <h1 class="text-2xl text-center mb-2 font-semibold">Profil</h1>
          <!-- Insert profile related content here -->
          <div class="grid auto-rows-fr">
            <Input v-model="first_name" :placeholder="first_name" label="Ime" />
            <Input v-model="last_name" :placeholder="last_name" label="Prezime" />
            <Input v-model="email" :disabled="true" :placeholder="email" label="Email" />
            <Input v-model="promo" :placeholder="promo" label="KAUFLAND CARD KOD" />
          </div>
          <div class="flex justify-center mt-4">
            <Button @click="updateProfile()" text="Spremi promjene" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface UserProfile {
  first_name: string;
  last_name: string;
  // email: string;
  promo: number;
}
import { ref, onMounted } from "vue";
import { useLoadingStore } from "~/stores/loading";

definePageMeta({
  middleware: ["auth"],
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const promo = ref();
const profile_data = ref<any>({});
const loadingStore = useLoadingStore();
// const leaderboard = ref();

// Fetch user's profile data on component mount
onMounted(async () => {
  loadingStore.showLoading();
  profile_data.value = await client
    .from("profiles")
    .select("*")
    .eq("id", user.value?.id);

  first_name.value = profile_data.value.data[0].first_name;
  last_name.value = profile_data.value.data[0].last_name;
  email.value = profile_data.value.data[0].email;
  promo.value = profile_data.value.data[0].promo;
  console.log("profile data: ", profile_data.value.data[0].first_name);

  // leaderboard.value = await client
  //   .from("leaderboard")
  //   .select(
  //     "user_uuid, best_score, profiles: user_uuid(id, first_name, last_name, email)"
  //   );
  loadingStore.hideLoading();
  // console.log("Leaderboard: ", leaderboard.value);
});

// Update profile function
const updateProfile = async () => {
  loadingStore.showLoading();
  try {
    const updatedData: UserProfile = {
      first_name: first_name.value,
      last_name: last_name.value,
      // email: email.value,
      promo: promo.value,
    };

    const response = await client
      .from("profiles")
      .update(updatedData as never)
      .eq("id", user.value?.id);

    if (response.error) {
      console.error("Error updating profile:", response.error);
    } else {
      console.log("Profile updated successfully:", response.data);
    }
  } finally {
    loadingStore.hideLoading();
  }
};
</script>
