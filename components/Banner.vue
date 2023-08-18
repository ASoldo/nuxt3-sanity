<template>
  <!-- <div class="h-96 flex flex-row justify-center outline outline-black outline-1 overflow-hidden"> -->
  <!-- <img :src="imageUrl" alt="Banner Image" /> -->
  <!-- <SanityImage :asset-id="props.image?.asset._ref" auto="format"> -->
  <!--   <template #default="{ src }"> -->
  <!--     <img :src="src" class="object-cover w-full" /> -->
  <!--   </template> -->
  <!-- </SanityImage> -->

  <!-- </div> -->
  <div id="how-to-play" class="relative w-full bg-transparent overflow-hidden">
    <div class="skew-div absolute h-full w-full overflow-hidden -z-10"></div>
    <!-- Other elements -->
    <div class="container mx-auto md:grid md:grid-cols-3 mt-3 pt-14">
      <div class="md:col-span-1 md:h-full flex justify-center md:justify-end items-center">
        <!-- Content for 0 -->
        <div class="flex md:flex-col flex-row">
          <img src="../assets/images/how_to_play.png" alt="" />
          <!-- <div class="bg-kaufland-red p-3 text-white font-bold"> -->
          <!--   <h1 class="font-kaufland-heavy text-2xl md:text-6xl">KAKO</h1> -->
          <!-- </div> -->
          <!-- <div class="bg-kaufland-red p-3 text-white font-bold"> -->
          <!--   <h1 class="font-kaufland-heavy text-2xl md:text-6xl">IGRATI</h1> -->
          <!-- </div> -->
          <!-- <div class="bg-kaufland-red p-3 text-white font-bold"> -->
          <!--   <h1 class="font-kaufland-heavy text-2xl md:text-6xl">IGRICU?</h1> -->
          <!-- </div> -->
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4 p-4">
        <StepComponent
            v-for="(step, index) in steps"
            :key="index"
            :stepNumber="step.number"
            :imageSrc="step.imageSrc"
            :imageAlt="step.imageAlt"
            :stepDescription="step.description"
        />
      </div>
    </div>
    <div class="w-full pt-5 mt-5">
      <div class="w-full flex flex-col justify-center items-center">
        <PlayButton class="m-4" />
        <img class="md:hidden absolute right-0 translate-x-1/2"  />
      </div>
      <div class="w-full flex flex-col justify-center items-center p-4 z-10">
        <h1 class="text-white">Detaljniji opis igre možeš pročitati
          <a
              class="underline hover:text-black font-bold transition-colors"
              href="/docs/PravilaNatjecaja.pdf"
              target="_blank">ovdje</a></h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const steps = [
  {
    number: 1,
    imageSrc: '../assets/images/tockice_strelica.png',
    imageAlt: 'Strelica',
    description: 'Registriraj se i pokreni K-MARKE(t) igricu.'
  },
  {
    number: 2,
    imageSrc: '../assets/images/upitnik.png',
    imageAlt: 'Upitnik',
    description: 'Pročitaj i riješi 3 zagonetke.'
  },
  {
    number: 3,
    imageSrc: '../assets/images/boca.png',
    imageAlt: 'Boca',
    description: 'U prostoriji potraži proizvode koji se kriju iza zagonetki.'
  },
  {
    number: 4,
    imageSrc: '../assets/images/boca2.png',
    imageAlt: 'Boca',
    description: 'Klikni na tražene proizvode i pokupi dnevnu nagradu.'
  },
];

const igraj = () => {
  console.log("igraj");
};
// import imageUrlBuilder from "@sanity/image-url";
//
// const builder = imageUrlBuilder({
//   projectId: "u678c0qn",
//   dataset: "production",
// });
const props = defineProps({
  image: Object,
});

// console.log(props.image);

// const imageUrl = ref("");
//
// watchEffect(() => {
//   if (props.image && props.image.asset) {
//     imageUrl.value = builder.image(props.image.asset._ref).url();
//   }
// });
</script>

<style scoped>
.skew-div::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #f60101;
  transform-origin: middle;
  z-index: -1;
}

@media screen and (min-width: 888px) {
  .skew-div::before {
    width: 62%;
    left: 29% !important;
    right: 29% !important;
    transform: skew(-0.112rad);
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
