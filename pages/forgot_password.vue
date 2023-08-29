<template>
  <div class="pt-14">
  </div>
  <div class="flex flex-col pt-14">
    <div class="flex grow justify-center">
      <div class="flex w-full md:w-1/2 justify-center">
        <div class="w-full p-6 m-4 bg-kaufland-red text-white  rounded shadow-xl">
          <h1 class="text-2xl text-center mb-2 font-semibold">
            Upišite novu lozinku
          </h1>
          <!-- Insert profile related content here -->
          <div class="grid auto-rows-fr ">
            <Input type="password" v-model="newPassword" placeholder="Lozinka" label="Lozinka*"/>
            <Input type="password" v-model="confirmPassword" placeholder="Ponovi Lozinku" label="Ponovi Lozinku*" />
          </div>
          <div class="relative text-white text-2xl flex justify-center items-baseline min-h-[40px]">
            <i v-if="updateErrorMessage" class="pi pi-exclamation-triangle mr-2"></i>
            {{ updateErrorMessage }}
          </div>
          <div class="flex justify-center mt-4">
            <Button @clicked="updatePassword" text="Promijeni lozinku"/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useLoadingStore } from "~/stores/loading";
import { useToastStore } from "~/stores/toast";
const supabase = useSupabaseClient();
// const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
// const emailSent = ref(false);
// const errorMessage = ref();
const updateErrorMessage = ref();
const loadingStore = useLoadingStore();
const toastStore = useToastStore();

// const sendResetEmail = async () => {
//   try {
//     const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
//       redirectTo: "https://k-marke-t.com/forgot_password",
//     });
//     if (error) throw error;
//     emailSent.value = true;
//   } catch (error) {
//     errorMessage.value = error;
//   }
// };

const updatePassword = async () => {
  if(!newPassword.value || !confirmPassword.value) {
    updateErrorMessage.value = "Upišite sve potrebne podatke!";
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    updateErrorMessage.value = "Lozinke moraju biti jednake!";
    return;
  }
  loadingStore.showLoading();
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value,
    });
    if (error) throw error;
    // You can redirect the user or show a success message
    navigateTo("/");
    toastStore.showToast("Lozinka uspješno izmijenjena!")
  } catch (error) {
    updateErrorMessage.value = "Pogreška pri promjeni lozinke";
  } finally {
    loadingStore.hideLoading();
  }
};
</script>
