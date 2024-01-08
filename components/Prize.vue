<template>
  <div
    class="bg-kaufland-dark-red text-white border rounded-xl p-8 shadow-xl w-fit cursor-pointer hover:scale-105 transition-all flex flex-col items-center gap-4"
    @click="showQRFull">
    <div class="flex flex-wrap justify-center items-center gap-4">
      <div class="flex flex-col gap-4 justify-center items-center">
        <div class="flex flex-col items-center uppercase text-center">
          <img class="w-28 h-28 bg-white rounded-xl p-2" :src="props.prize?.prizes.prize_image_url" alt="" />
          <div class="text-2xl font-kaufland-bold">Opis</div>
          <div class="text-xl">{{ prize?.prizes.description }}</div>
        </div>
        <div class="flex flex-col items-center uppercase text-center">
          <div class="text-2xl font-kaufland-bold">Datum dobitka</div>
          <div class="text-xl">{{ date }}</div>
        </div>
      </div>
      <PrizeCode class="rounded" :prize="prize" />
    </div>
    <Button text="Uvećaj" @clicked="showQRFull" />
  </div>
  <dialog ref="fullScreenQR" class="w-full h-full md:w-2/3 mx-auto mt-20">
    <div
      class="text-white bg-kaufland-red border rounded-xl shadow-xl relative flex flex-col justify-center items-center gap-6 p-2">
      <div class="absolute right-2 top-2 text-white text-4xl cursor-pointer z-10 hover:text-gray-200"
        @click="fullScreenQR?.close">
        <i class="pi pi-times"></i>
      </div>
      <div class="text-4xl font-kaufland-bold">Kod nagrade</div>

      <PrizeCode class="w-full md:w-1/3 rounded" :prize="prize" />
      <Button text="Zatvori" @clicked="fullScreenQR?.close()" />
    </div>
  </dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { onMounted } from "vue";
import moment from "moment";
import type { DialogElement } from "~/internals/types";
import PrizeCode from "~/components/PrizeCode.vue";

const date = ref("");
const fullScreenQR = ref<DialogElement | null>(null);

const props = defineProps({
  prize: Object,
});

onMounted(() => {
  date.value = moment(String(props.prize?.created_at)).format("DD.MM.YYYY");
  // console.log(props.prize?.prizes.prize_image_url);
});

const showQRFull = () => {
  fullScreenQR.value?.showModal();
};
</script>

<style scoped></style>
