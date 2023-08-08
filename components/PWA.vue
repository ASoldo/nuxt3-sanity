<template>
  <VitePwaManifest />
  <ClientOnly>
    <div v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="bg-red-100 border-t-4 border-red-500 rounded-b text-blue-900 px-4 py-3 shadow-md sticky bottom-0 z-50"
      role="alert">
      <div class="flex">
        <div class="py-1">
          <span v-if="$pwa.offlineReady"> App ready to work offline </span>
          <span v-else>
            New content available, click on reload button to update.
          </span>
        </div>
        <div class="pl-4 flex items-center">
          <button v-if="$pwa.needRefresh" @click="$pwa.updateServiceWorker()"
            class="font-bold text-blue-500 hover:text-blue-800">
            Reload
          </button>
          <button @click="$pwa.cancelPrompt()" class="font-bold text-blue-500 hover:text-blue-800 ml-4">
            Close
          </button>
        </div>
      </div>
    </div>
    <div v-if="
            $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
          " class="bg-blue-100 border-t-4 border-red-500 rounded-b text-blue-900 px-4 py-3 shadow-md sticky bottom-0 z-50"
      role="alert">
      <div class="flex items-center">
        <div class="py-1">
          <span> Install PWA </span>
        </div>
        <div class="pl-4">
          <button @click="$pwa.install()" class="font-bold text-blue-500 hover:text-blue-800">
            Install
          </button>
          <button @click="$pwa.cancelInstall()" class="font-bold text-blue-500 hover:text-blue-800 ml-4">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
