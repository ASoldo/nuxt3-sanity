<template>
  <!-- <div v-if="!emailSent" class="pt-14"> -->
  <!--   <h3>Forgot Password</h3> -->
  <!--   <input v-model="email" type="email" placeholder="Enter your email" /> -->
  <!--   <button @click="sendResetEmail">Send Reset Email</button> -->
  <!--   <p v-if="errorMessage">{{ errorMessage }}</p> -->
  <!-- </div> -->
  <!-- <div v-else class="pt-14"> -->
  <!--   <h3>Update Password</h3> -->
  <input v-model="newPassword" type="password" placeholder="Enter new password" />
  <input v-model="confirmPassword" type="password" placeholder="Confirm new password" />
  <button @click="updatePassword">Update Password</button>
  <p v-if="updateErrorMessage">{{ updateErrorMessage }}</p>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
const supabase = useSupabaseClient();
const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const emailSent = ref(false);
const errorMessage = ref();
const updateErrorMessage = ref();

const sendResetEmail = async () => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: "https://k-marke-t.com/forgot_password",
    });
    if (error) throw error;
    emailSent.value = true;
  } catch (error) {
    errorMessage.value = error;
  }
};

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    updateErrorMessage.value = "Passwords don't match!";
    return;
  }
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword.value,
    });
    if (error) throw error;
    // You can redirect the user or show a success message
  } catch (error) {
    updateErrorMessage.value = error;
  }
};
</script>
