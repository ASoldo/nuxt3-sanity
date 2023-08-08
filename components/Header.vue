<template>
  <!-- <header class="h-96 w-full flex flex-col justify-center align-middle outline outline-black outline-1"> -->
  <!--   <h1 class="text-center">{{ props.title }}</h1> -->
  <!-- </header> -->
  <div class="w-full bg-gradient-to-t from-kaufland-dark-red to-kaufland-red">
    <!-- <header class="h-96 w-full flex flex-col justify-center align-middle outline outline-black outline-1"> -->
    <!--   <h1 class="text-center">{{ props.title }}</h1> -->
    <!-- </header> -->

    <div class="flex flex-col md:flex-row mx-auto h-auto container">
      <div class="flex flex-col md:flex-1 md:h-auto">
        <div class="flex justify-center items-end md:h-full">
          <!-- Content for the first box -->
          <img src="../assets/images/kmarket_logo_extra.png" alt="" class="h-20" />
          <!-- <h1 class="text-3xl p-3 text-white">K-MARKE(t)</h1> -->
        </div>
        <div class="md:h-full flex flex-col justify-start items-center">
          <div class="bg-kaufland-red text-white p-3 font-bold text-2xl flex flex-row justify-end">
            <h1 class="text-center transform -rotate-1 font-kaufland-heavy">
              IGRAJ K-MARKET(t) IGRICU
            </h1>
          </div>
          <div class="bg-kaufland-red text-white p-3 font-bold text-2xl">
            <h1 class="text-center font-kaufland-heavy">
              SVAKI DAN I OTKRIJ NASE
            </h1>
          </div>
          <div class="bg-kaufland-red text-white p-3 font-bold text-2xl">
            <h1 class="text-center transform rotate-1 font-kaufland-heavy">
              NAJBOLJE PROIZVODE
            </h1>
          </div>
        </div>
      </div>

      <div class="flex flex-row md:justify-start md:flex-1 md:h-auto md:ml-4 mt-4 md:mt-0">
        <img src="../assets/images/mobitel.png" alt="Image description" class="h-full object-cover" />
        <!-- This is the right box -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>
