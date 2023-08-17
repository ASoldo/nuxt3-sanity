<template>
  <div class="flex flex-col pt-14">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-white rounded shadow-lg">
          <h1 class="text-2xl text-center mb-2 font-semibold text-gray-700">
            Profile
          </h1>
          <!-- Insert profile related content here -->

          <div class="relative">
            <span class="absolute h-11 inset-y-0 left-0 flex items-center pl-3">
              <i class="pi pi-fw pi-user"></i>
            </span>
            <input
              class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" v-model="first_name" :placeholder="profile_data.data[0]?.first_name" />
            <!-- <button class="absolute h-10 inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r"> -->
            <!--   <i class="pi pi-fw pi-check"></i> -->
            <!-- </button> -->
          </div>

          <div class="relative">
            <span class="absolute h-11 inset-y-0 left-0 flex items-center pl-3">
              <i class="pi pi-fw pi-user"></i>
            </span>
            <input
              class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" v-model="last_name" :placeholder="profile_data.data[0]?.last_name" />
            <!-- <button class="absolute h-10 inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r"> -->
            <!--   <i class="pi pi-fw pi-check"></i> -->
            <!-- </button> -->
          </div>

          <div class="relative">
            <span class="absolute h-11 inset-y-0 left-0 flex items-center pl-3">
              <i class="pi pi-fw pi-envelope"></i>
            </span>
            <input
              class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" v-model="first_name" disabled :placeholder="user?.email" />
            <!-- <button class="absolute h-10 inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r"> -->
            <!--   <i class="pi pi-fw pi-check"></i> -->
            <!-- </button> -->
          </div>

          <div class="relative">
            <span class="absolute h-11 inset-y-0 left-0 flex items-center pl-3">
              <i class="pi pi-fw pi-hashtag"></i>
            </span>
            <input
              class="pl-10 mb-4 outline-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" v-model="promo" :placeholder="profile_data.data[0]?.promo" />
            <!-- <button class="absolute h-10 inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r"> -->
            <!--   <i class="pi pi-fw pi-check"></i> -->
            <!-- </button> -->
          </div>
          <button class="h-10 w-full inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r">
            <i class="w-full pi pi-fw pi-check">
              <span class="ml-2">Submit</span>
            </i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: ["auth"],
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
