<template>
  <!-- <div class="h-96 w-full flex flex-col justify-center outline outline-black outline-1"> -->
  <!--   <dialog ref="dialog" class="m-auto absolute inset-0 p-20"> -->
  <!--     <h1>Welcome!</h1> -->
  <!--     <p>{{ props.content }}</p> -->
  <!--     <div class="flex flex-row justify-end"> -->
  <!--       <button class="mt-3 px-2 rounded-md bg-red-400 text-white hover:bg-red-700" @click="dialog?.close()"> -->
  <!--         Close -->
  <!--       </button> -->
  <!--     </div> -->
  <!--   </dialog> -->
  <!--   <div class="flex flex-row w-full justify-center"> -->
  <!--     <button @click="dialog?.showModal()" -->
  <!--       class="bg-blue-500 hover:bg-blue-700 text-white hover:text-black pl-5 pr-5 rounded-2xl"> -->
  <!--       Click -->
  <!--     </button> -->
  <!--   </div> -->
  <!-- </div> -->

  <!-- <div class="flex flex-col md:flex-row justify-between items-center bg-kaufland-red mx-auto"> -->
  <!--   <div class="md:w-full p-4"> -->
  <!--     <p class="ml-2 mb-2 text-8xl font-bold flex justify-start items-center text-white"> -->
  <!--       35.000 -->
  <!--     </p> -->
  <!--     <p class="ml-2 mb-2 text-3xl font-bold flex justify-start items-center text-white"> -->
  <!--       DNEVNIH NAGRADA* -->
  <!--     </p> -->
  <!--     <p class="ml-2 mr-2 mb-2 text-lg font-bold flex justify-start items-center text-white"> -->
  <!--       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod vero -->
  <!--       fuga, voluptate quaerat necessitatibus quam at, aspernatur aut debitis -->
  <!--       repellat molestiae odio totam enim. Atque molestias asperiores maiores -->
  <!--       perspiciatis blanditiis! -->
  <!--     </p> -->
  <!--     <p class="ml-2 mr-2 mb-2 text-lg font-bold flex justify-start items-center text-white"> -->
  <!--       Lorem ipsum dolor sit amet consectetur adipisicing elit. -->
  <!--     </p> -->
  <!--   </div> -->
  <!--   <div class="md:w-auto p-4"> -->
  <!--     <img src="../assets/images/kolica.png" alt="Description" class="w-64 h-auto" /> -->
  <!--   </div> -->
  <!-- </div> -->

  <div id="nagrade"
    class="relative flex flex-col md:flex-row justify-start items-center bg-kaufland-red mx-auto max-w-screen-lg pt-14">
    <div class="skew-div w-full h-full absolute z-0"></div>
    <div class="md:w-1/2 p-4 z-10">
      <p class="ml-2 mb-2 text-8xl font-bold flex justify-start items-center text-white font-kaufland-heavy">
        35.000
      </p>
      <p class="ml-2 mb-2 text-3xl font-bold flex justify-start items-center text-white font-kaufland-heavy">
        DNEVNIH NAGRADA*
      </p>
      <p class="ml-2 mr-2 mb-2 text-lg font-bold flex justify-start items-center text-white">
        Igraj igricu svaki dan i svaki dan osvoji naše najbolje marke. Samo brzo
        rješavaj zagonetke jer dnevne nagrade osvajaju prvih 1.000 igrača s
        najboljim rezultatom na kraju dana. Provjeri jesi li i ti među njima
        klikom na rubriku Moje nagrade.
      </p>
      <p class="ml-2 mr-2 mb-2 text-lg font-bold flex justify-start items-center">
        <span class="text-white">Aktivacija kôda prilikom preuzimanja dnevne nagrade iznosi 0,02
          €.</span>
      </p>
    </div>
    <div class="md:w-1/2 p-4 flex justify-center">
      <img src="../assets/images/kolica.png" alt="Description" class="w-64 h-auto z-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DialogElement } from "../internals/interfaces";
const props = defineProps({
  content: String,
});
const dialog = ref<DialogElement | null>(null);
</script>

<style scoped>
.skew-div::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top, #cd0000, transparent) !important;
  transform-origin: middle;
  z-index: 0;
}

@media screen and (min-width: 800px) {
  .skew-div::before {
    width: 90%;
    left: 0% !important;
    right: 5% !important;
    transform: skew(0.112rad);
  }
}

@media screen and (max-width: 375px) {
  .skew-div::before {
    width: 100%;
    left: 0;
    right: 0;
  }
}
</style>
