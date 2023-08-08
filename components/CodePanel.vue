<template>
  <!-- <div class="h-96 flex flex-row justify-center outline outline-black outline-1 overflow-hidden"> -->
  <!-- <img :src="imageUrl" alt="Banner Image" /> -->
  <!-- <SanityImage :asset-id="props.image?.asset._ref" auto="format"> -->
  <!--   <template #default="{ src }"> -->
  <!--     <img :src="src" class="object-cover w-full" /> -->
  <!--   </template> -->
  <!-- </SanityImage> -->

  <!-- </div> -->
  <div id="promo" class="relative flex flex-col w-full bg-kaufland-red overflow-hidden p-4 pt-14">
    <!-- Other elements -->
    <div class="bg-kaufland-red container mx-auto md:grid md:grid-cols-3">
      <div class="md:col-span-1 md:h-full flex justify-center md:justify-end items-center">
        <!-- Content for 0 -->
        <div class="flex md:flex-col flex-row">
          <div class="bg-kaufland-red p-3 text-white font-bold text-2xl">
            <div class="p-2 bg-kaufland-blue text-center">
              <h1 class="font-kaufland-heavy">UNESI KOD</h1>
            </div>
            <div class="bg-kaufland-red p-3 text-white font-bold text-xl">
              <h1>
                Iz Kaufland card aplikacije i ostvari
                <span class="font-kaufland-heavy">10 SEKUNDI PREDNOSTI U IGRICI!</span>
              </h1>
            </div>
          </div>
        </div>
        <div class="flex flex-row">
          <img src="../assets/images/mobitel_card.png" class="justify-center-center items-center bg-kaufland-red" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4 p-4">
        <div class="md:col-span-1">
          <!-- Content for 1 -->
          <div class="flex md:grid md:grid-cols-3 gap-4 justify-between">
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 0 -->
              <h1 class="text-6xl text-white font-kaufland-heavy">1</h1>
            </div>
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 1 -->
              <h1 class="text-white">
                Uđi u Kaufland card aplikaciju i klikni na kupone.
              </h1>
            </div>
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 2 -->
              <!-- <h1 class="text-white">Content</h1> -->
              <img src="../assets/images/popust_box.png" alt="" />
            </div>
          </div>
        </div>

        <div class="md:col-span-1">
          <!-- Content for 2 -->
          <div class="flex md:grid md:grid-cols-3 gap-4 justify-between">
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 0 -->
              <h1 class="text-6xl text-white font-kaufland-heavy">2</h1>
            </div>
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 1 -->
              <h1 class="text-white">
                Pronađi kupon za 10 sekundi prednosti u K-MARKE(t) igrici.
              </h1>
            </div>
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 2 -->
              <!-- <h1 class="text-white">Content</h1> -->
              <img src="../assets/images/popust.png" alt="" />
            </div>
          </div>
        </div>

        <div class="md:col-start-1 md:col-span-1">
          <!-- Content for 3 -->
          <div class="flex md:grid md:grid-cols-3 gap-4 justify-between">
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 0 -->
              <h1 class="text-6xl text-white font-kaufland-heavy">3</h1>
            </div>
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 1 -->
              <h1 class="text-white">
                Registriraj se prije početka igre i pritom unesi broj kupona.
              </h1>
            </div>
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 2 -->
              <!-- <h1 class="text-white">Content</h1> -->
              <img src="../assets/images/tockice.png" alt="" />
            </div>
          </div>
        </div>

        <div class="md:col-start-2 md:col-span-1">
          <!-- Content for 4 -->
          <div class="flex md:grid md:grid-cols-3 gap-4 justify-between">
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 0 -->
              <h1 class="text-6xl text-white font-kaufland-heavy">4</h1>
            </div>
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 1 -->
              <h1 class="text-white">
                Svaki dan u igrici iskoristi 10 sekundi prednosti.
              </h1>
            </div>
            <div class="md:col-span-1 flex justify-center items-center">
              <!-- Inner content for 2 -->
              <!-- <h1 class="text-white">Content</h1> -->
              <img src="../assets/images/stoperica.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full pt-5 mt-5">
      <!-- <div class="w-full flex flex-col justify-center items-center"> -->
      <!--   <button class="px-5 py-2 bg-white rounded-md text-3xl">Igraj</button> -->
      <!-- </div> -->
      <div class="w-full flex flex-col justify-center items-center p-4">
        <h1 class="text-white">
          Ako još uvijek nemaš Kaufland card, nabavi ga
          <a href="#" class="text-kaufland-dark-red">ovdje</a>
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import imageUrlBuilder from "@sanity/image-url";
//
// const builder = imageUrlBuilder({
//   projectId: "u678c0qn",
//   dataset: "production",
// });
const props = defineProps({
  image: Object,
});

console.log(props.image);

// const imageUrl = ref("");
//
// watchEffect(() => {
//   if (props.image && props.image.asset) {
//     imageUrl.value = builder.image(props.image.asset._ref).url();
//   }
// });
</script>

<style>
@media screen and (min-width: 700px) {
  .skew-div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f60101;
    /* background color */
    transform: skew(-0.112rad);
    transform-origin: middle;
    z-index: -1;
  }
}

@media screen and (max-width: 700px) {
  .skew-div::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f60101;
    /* background color */
    /* transform: skew(-0.112rad); */
    transform-origin: middle;
    z-index: -1;
  }
}
</style>
