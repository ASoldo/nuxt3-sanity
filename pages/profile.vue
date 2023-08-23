<template>
  <Loading />
  <div class="flex flex-col pt-14">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-kaufland-red text-white rounded shadow-xl" @keydown.enter="updateProfile">
          <h1 class="text-2xl text-center mb-2 font-semibold">Profil</h1>
          <!-- Insert profile related content here -->
          <div class="grid auto-rows-fr">
            <Input v-model="email" :readonly="true" placeholder="Email" label="Email" />
            <Input v-model="first_name" placeholder="Upišite ime" label="Ime" />
            <Input v-model="last_name" placeholder="Upišite prezime" label="Prezime" />
            <Input v-model="promo" label="KAUFLAND CARD KOD" />
            <p>
              Svoj kod za ostvarivanje prednosti možeš potražiti u Kaufland Card
              aplikaciji u odjeljku „Moji kuponi" i unijeti ga sad ovdje ili
              naknadno u svom profilu.
            </p>
          </div>
          <div class="relative text-white text-2xl flex justify-center items-baseline min-h-[40px]">
            <i v-if="errorMsg" class="pi pi-exclamation-triangle mr-2"></i>
            {{ errorMsg }}
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
import { promoCodeValidator, updatePromoCode } from "~/internals/validators";

interface UserProfile {
  first_name: string;
  last_name: string;
  // email: string;
  promo: number;
}

import { ref, onMounted } from "vue";
import { useLoadingStore } from "~/stores/loading";
import { useToastStore } from "~/stores/toast";
import { useProfileUpdateStore } from "~/stores/profile_update";

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
const errorMsg = ref("");
// const leaderboard = ref();

const loadingStore = useLoadingStore();
const toastStore = useToastStore();
const profileUpdatedStore = useProfileUpdateStore();

loadingStore.showLoading();
profile_data.value = await client
  .from("profiles")
  .select("*")
  .eq("id", user.value?.id);

first_name.value = profile_data.value.data[0].first_name;
last_name.value = profile_data.value.data[0].last_name;
email.value = profile_data.value.data[0].email;
promo.value = profile_data.value.data[0].promo;
// console.log("profile data: ", profile_data.value.data[0].first_name);

// leaderboard.value = await client
//   .from("leaderboard")
//   .select(
//     "user_uuid, best_score, profiles: user_uuid(id, first_name, last_name, email)"
//   );
loadingStore.hideLoading();
// console.log("Leaderboard: ", leaderboard.value);
// Update profile function
const updateProfile = async () => {
  if (!first_name.value || !last_name.value) {
    errorMsg.value = "Ime i prezime ne smiju biti prazni!";
    return;
  }

  if (!(await promoCodeValidator(promo.value))) {
    errorMsg.value = "Nespravan Kaufland Card kod!";
    return;
  }

  if (
    promo.value != profile_data.value.data[0].promo &&
    !(await updatePromoCode(promo.value))
  ) {
    errorMsg.value = "Kaufland Card već iskorišten!";
    return;
  }

  errorMsg.value = "";

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
      toastStore.showToast("Greška pri ažuriranju profila.");
    } else {
      console.log("Profile updated successfully:", response.data);
      toastStore.showToast("Profil uspješno ažuriran!");
      profileUpdatedStore.profileUpdated();
    }
  } catch (e) {
    toastStore.showToast("Greška pri ažuriranju profila.");
  } finally {
    loadingStore.hideLoading();
  }
};
</script>
