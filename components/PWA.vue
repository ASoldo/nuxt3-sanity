<!-- <template> -->
<!--   <VitePwaManifest /> -->
<!--   <ClientOnly> -->
<!--     <div v-if="$pwa?.offlineReady || $pwa?.needRefresh" -->
<!--       class="bg-red-100 border-t-4 border-red-500 rounded-b text-blue-900 px-4 py-3 shadow-md sticky bottom-0 z-50" -->
<!--       role="alert"> -->
<!--       <div class="flex"> -->
<!--         <div class="py-1"> -->
<!--           <span v-if="$pwa.offlineReady"> Aplikacija spremna za izvanmrežni rad.</span> -->
<!--           <span v-else> -->
<!--             Novi sadržaj dostupan, kliknite na gumb za ponovno učitavanje kako biste ažurirali. -->
<!--           </span> -->
<!--         </div> -->
<!--         <div class="pl-4 flex items-center"> -->
<!--           <button v-if="$pwa.needRefresh" @click="$pwa.updateServiceWorker()" -->
<!--             class="font-bold text-blue-500 hover:text-blue-800"> -->
<!--             Ponovno učitavanje -->
<!--           </button> -->
<!--           <button @click="$pwa.cancelPrompt()" class="font-bold text-blue-500 hover:text-blue-800 ml-4"> -->
<!--             Zatvori -->
<!--           </button> -->
<!--         </div> -->
<!--       </div> -->
<!--     </div> -->
<!--     <div v-if=" -->
<!--             $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh -->
<!--           " class="bg-blue-100 border-t-4 border-red-500 rounded-b text-blue-900 px-4 py-3 shadow-md sticky bottom-0 z-50" -->
<!--       role="alert"> -->
<!--       <div class="flex items-center"> -->
<!--         <div class="py-1"> -->
<!--           <span> Instaliraj PWA za lakše igranje i potpuni doživljaj. </span> -->
<!--         </div> -->
<!--         <div class="pl-4 flex"> -->
<!--           <button @click="$pwa.install()" class="font-bold text-blue-500 hover:text-blue-800"> -->
<!--             Instaliraj -->
<!--           </button> -->
<!--           <button @click="$pwa.cancelInstall()" class="font-bold text-blue-500 hover:text-blue-800 ml-4"> -->
<!--             Odustani -->
<!--           </button> -->
<!--         </div> -->
<!--       </div> -->
<!--     </div> -->
<!--   </ClientOnly> -->
<!-- </template> -->

<script setup>
// If you want to use it in setup, import from the nuxtApp.
const { $pwa } = useNuxtApp();

// const toast = useToast();

onMounted(() => {
  if ($pwa.offlineReady) {
    // toast.success("App ready to work offline");
    console.log("App ready to work offline");
  }
});
</script>

<template>
  <VitePwaManifest />
  <ClientOnly>
    <!-- You can use $pwa directly in templates! -->
    <!-- <div v-show="$pwa.needRefresh" -->
    <!--   class="bg-red-100 border-t-4 border-red-500 rounded-b text-blue-900 px-4 py-3 shadow-md sticky bottom-0 z-50"> -->
    <!--   <span> New content available, click on reload button to update. </span> -->
    <!---->
    <!--   <button class="font-bold text-blue-500 hover:text-blue-800 ml-4" @click="$pwa.updateServiceWorker()"> -->
    <!--     Reload now -->
    <!--   </button> -->
    <!-- </div> -->
    <div v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="bg-blue-100 border-t-4 border-red-500 rounded-b text-blue-900 px-4 py-3 shadow-md sticky bottom-0 z-50"
      role="alert">
      <div class="flex">
        <div class="py-1">
          <span v-if="$pwa.offlineReady">
            Aplikacija spremna za izvanmrežni rad!</span>
          <span v-else>
            Novi sadržaj dostupan, kliknite na gumb za ponovno učitavanje kako
            biste ažurirali.
          </span>
        </div>
        <div class="pl-4 flex items-center">
          <button v-if="$pwa.needRefresh" @click="$pwa.updateServiceWorker()"
            class="font-bold text-blue-500 hover:text-blue-800">
            Ponovno učitavanje
          </button>
          <button @click="$pwa.cancelPrompt()" class="font-bold text-blue-500 hover:text-blue-800 ml-4">
            Zatvori
          </button>
        </div>
      </div>
    </div>
    <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
      " class="bg-blue-100 border-t-4 border-red-500 rounded-b text-blue-900 px-4 py-3 shadow-md sticky bottom-0 z-50"
      role="alert">
      <div class="flex items-center">
        <div class="py-1">
          <span> Instaliraj PWA za lakše igranje i potpuni doživljaj. </span>
        </div>
        <div class="pl-4 flex">
          <button @click="$pwa.install()" class="font-bold text-blue-500 hover:text-blue-800">
            Instaliraj
          </button>
          <button @click="$pwa.cancelInstall()" class="font-bold text-blue-500 hover:text-blue-800 ml-4">
            Odustani
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
