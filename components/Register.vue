<template>
  <div class="border-2 rounded border-gray-400 shadow-md rounded text-white relative" @keydown.enter="register">
    <div class="absolute right-2 top-2 text-white text-4xl cursor-pointer z-10 hover:text-gray-200" @click="closeDialog">
      <i class="pi pi-times"></i>
    </div>
    <div class="bg-kaufland-red skew-div absolute h-full w-full overflow-hidden -z-10 pointer-events-none"></div>
    <div class="px-8 md:px-36 md:py-10 py-8 z-10">
      <div class="flex justify-center items-center text-4xl font-kaufland-bold mb-4 pt-2 uppercase">
        Registriraj se
      </div>
      <div class="mb-2 z-10 font-kaufland-bold">
        Prije unosa podataka upoznaj se s
        <KmarketLink href="https://legal.k-marke-t.com/pravila.pdf">Pravilima natječaja</KmarketLink>, Uvjetima korištenja
        i Pravilima privatnosti
      </div>
      <div class="grid auto-rows-fr z-10">
        <Input v-model="first_name" placeholder="Ime" label="Ime*" />
        <Input v-model="last_name" placeholder="Prezime" label="Prezime*" />
        <Input type="email" v-model="email" placeholder="Email" label="Email*" />
        <Input type="password" v-model="password" placeholder="Lozinka" label="Lozinka*" />
        <Input type="password" v-model="repeatPassword" placeholder="Ponovi Lozinku" label="Ponovi Lozinku*" />
        <Input v-model="promo" placeholder="Kaufland Card Kod" label="Kaufland Card Kod" />
      </div>
      <div class="mx-4 text-sm font-kaufland-bold">
        Svoj kod za ostvarivanje prednosti u igrici K-MARKE(t) možeš potražiti u
        Kaufland Card aplikaciji i unijeti ga sad ovdje ili naknadno u svom
        profilu.
      </div>
      <div class="relative text-white text-2xl flex justify-center items-baseline min-h-[40px]">
        <i v-if="errorMsg" class="pi pi-exclamation-triangle mr-2"></i>
        {{ errorMsg }}
      </div>
      <div class="">
        <div class="flex md:flex-row flex-col items-center justify-center">
          <div class="mr-4 pt-2 z-10">
            <label class="font-kaufland-bold">
              <input type="checkbox" v-model="termsAndCond" />
              Suglasan/a sam i prihvaćam
              <KmarketLink href="https://legal.k-marke-t.com/pravila.pdf">Pravila natječaja</KmarketLink>, Uvjete
              korištenja i Pravila privatnosti te korištenje mojih
              osobnih podataka za potrebe provođenja i informiranja o nagradnom
              natječaju, odnosno za potrebe realizacije nagrade ako budem
              dobitnik/ca.
            </label>
          </div>
          <div class="pt-2 z-10">
            <label class="font-kaufland-bold">
              <input type="checkbox" />
              Prijavljujem se za dodatne pogodnosti i primanje informativnih i
              promotivnih poruka i sadržaja od strane Kauflanda, kao i kreiranje
              i informiranje o prilagođenim individualiziranim prilikama,
              akcijama ili ponudama Kauflanda koje nastaju uz primjenu napredne
              tehnologije i automatizirane obrade mojih podataka.
            </label>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <Button class="mt-6" text="Registriraj se" @clicked="register" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useLoadingStore } from "@/stores/loading";
import {
  promoCodeValidator,
  updatePromoCode,
  validateEmail,
} from "~/internals/validators";
import KmarketLink from "~/components/KmarketLink.vue";

const { auth } = useSupabaseAuthClient();
const loadingStore = useLoadingStore();

// ... [rest of your script like data properties for registration] ...
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");
const promo = ref("");
const errorMsg = ref("");
const termsAndCond = ref(false);

const requiredData = [first_name, last_name, email, password, repeatPassword];

const emit = defineEmits();

const goToLogin = () => {
  emit("open-login");
};
const closeDialog = () => {
  emit("close-dialog");
};

const emitRegister = () => {
  if (validateRegistrationData()) {
    // Emit the event with registration data
    emit("register-clicked", {
      firstName: first_name.value,
      lastName: last_name.value,
      email: email.value,
      password: password.value,
      promo: promo.value,
    });
  } else {
    console.error(
      "Validation failed. Ensure all required fields are filled and passwords match."
    );
    // You can also set some UI indication or a message for the user here.
  }
};

const validateRegistrationData = () => {
  // Add any other validation logic you need
  return (
    email.value &&
    password.value &&
    first_name.value &&
    last_name.value &&
    password.value === repeatPassword.value
  );
};
const register = async () => {
  if (!termsAndCond.value) {
    errorMsg.value = "Prihvatite uvjete korištenja!";
    return;
  }

  if (requiredData.findIndex((el) => !el.value) > -1) {
    errorMsg.value = "Upišite sve podatke!";
    return;
  }

  if (password.value != repeatPassword.value) {
    // auth.signUp({ email: email.value, password: password.value }),
    errorMsg.value = "Šifre se ne podudaraju!";
    return;
  }
  if (password.value.length < 6) {
    errorMsg.value = "Šifra mora imati barem 6 znakova!";
    return;
  }

  if (!validateEmail(email.value)) {
    errorMsg.value = "Nespravan mail!";
    return;
  }

  if (!(await promoCodeValidator(promo.value))) {
    errorMsg.value = "Nespravan Kaufland Card kod!";
    return;
  }

  if (!(await updatePromoCode(promo.value))) {
    errorMsg.value = "Kaufland Card već iskorišten!";
    return;
  }

  signUp();
};

const signUp = async () => {
  try {
    loadingStore.showLoading();
    const { error } = await auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          first_name: first_name.value,
          last_name: last_name.value,
          promo: promo.value,
          email: email.value,
        },
        emailRedirectTo: "https://k-marke-t.com/success",
      },
    });

    if (error) {
      console.error("SignUp Error:", error.message);
      errorMsg.value = error.message.includes("already exists")
        ? "Račun sa ovim emailom već postoji!"
        : "Pogreška pri registraciji!";
      return;
    }
    emitRegister();
  } catch (error) {
  } finally {
    loadingStore.hideLoading();
  }
};
</script>

<style scoped>
.skew-div::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top, #cd0000, transparent) !important;
  transform-origin: center;
  z-index: -1;
}

@media screen and (min-width: 888px) {
  .skew-div::before {
    width: 80%;
    left: 9% !important;
    right: 19% !important;
    transform: skew(0.112rad);
  }
}

@media screen and (max-width: 375px) {
  .skew-div::before {
    width: 100%;
    left: 0;
    /* Uncomment the next line if you want the skew effect on mobile */
    /* transform: skew(-0.112rad); */
  }
}
</style>
