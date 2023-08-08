<template>
  <div class="relative bg-kaufland-red text-white z-auto">
    <div class="skew-div w-full h-full absolute z-0"></div>

    <h1 class="md:mb-2 md:pl-20 text-3xl font-kaufland-heavy text-center z-auto">
      Jamcimo vrhunsku kvalitetu po povoljnoj cijeni
    </h1>
    <div class="w-full flex flex-row justify-center">
      <img src="../assets/images/proizvodi.png" alt="Description" class="h-full justify-center z-10" />
      <div class="absolute inset-0 flex items-end justify-end pt-10 z-10">
        <div class="bg-white rounded-full p-4 text-center text-kaufland-red w-32">
          <p class="transform rotate-12">
            Vise od <br />
            <span class="text-2xl font-kaufland-heavy">4.000 <br /></span>
            proizvoda <br />
            nasih marki
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

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
    left: 5% !important;
    right: 5% !important;
    transform: skew(-0.112rad);
  }
}

@media screen and (max-width: 375px) {
  .skew-div::before {
    width: 100vw;
    left: 0;
    right: 0;
  }
}
</style>
