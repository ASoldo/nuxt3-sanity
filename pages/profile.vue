<template>
  <div class="flex flex-col pt-14">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-kaufland-red text-white  rounded shadow-xl">
          <h1 class="text-2xl text-center mb-2 font-semibold">
            Profil
          </h1>
          <!-- Insert profile related content here -->
          <div class="grid auto-rows-fr ">
            <Input
                v-model="first_name"
                :placeholder="profile_data.data[0]?.first_name"
                label="Ime"
            />
            <Input
                v-model="last_name"
                :placeholder="profile_data.data[0]?.last_name"
                label="Prezime"
            />
            <Input
                :disabled="true"
                :placeholder="profile_data.data[0]?.email"
                label="Email"
            />
            <Input
                v-model="promo"
                :placeholder="profile_data.data[0]?.promo"
                label="KAUFLAND CARD KOD"
            />
          </div>
          <div class="flex justify-center mt-4">
            <Button text="Spremi promjene"/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: [ "auth" ],
});
const user = useSupabaseUser();
const client = useSupabaseClient();
const first_name = ref("");
const last_name = ref("");
const promo = ref("");
const profile_data = ref<any>({});

profile_data.value = await client
    .from("profiles")
    .select("*")
    .eq("id", user.value?.id);

console.log("Profiles data: ", profile_data.value);

console.log(user.value?.user_metadata);

const leaderboard = ref();
leaderboard.value = await client
    .from("leaderboard")
    .select(
        "user_uuid, best_score, profiles: user_uuid(id, first_name, last_name, email)"
    );
console.log("Leaderboard: ", leaderboard.value);
watchEffect(() => {
  if (!user.value) {
    navigateTo("/");
  }
});
</script>
