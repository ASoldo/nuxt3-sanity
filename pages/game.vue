<template>
  <div class="flex flex-col">
    <div class="flex grow bg-black justify-center">
      <div class="h-full w-full md:w-1/2 bg-green-500">
        <iframe ref="game" height="1024" width="512" :src="gameSrc" frameborder="0" class="w-full h-full"></iframe>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
const Score = ref<number>(1000);
const json = {
  name: "My Name",
  last_name: "My Last Name",
};
const jsonString = JSON.stringify(json);

const CustomObject = ref<string>(jsonString);

const gameSrc = ref<string>("https://game.dev.kaufland.game.ecolabel.cc/");
const game = ref<null | HTMLIFrameElement>(null);
definePageMeta({
  middleware: ["auth"],
});
onMounted(() => {
  window.addEventListener("message", processMessage);
  console.log("Add event listener", processMessage);
  // game.value?.addEventListener("load", loadScriptIntoIframe);
  watchEffect(() => {
    if (!user.value) {
      navigateTo("/");
    }
  });
});

const processMessage = (e: MessageEvent) => {
  if (e.data.message === "EndGame") {
    console.log(e.data);
    // HERE WE SIMPLY SET VALUES
    Score.value = e.data.payload.Score;
  }
  //HERE WE CHECK WHEN GAME SEND SIGNAL TO FRONTEND AND THEN FRONTEND IS INITIALIZING VALUES
  if (e.data.message === "Signal" && game.value?.contentWindow != null) {
    console.log(e.data);
    game.value?.contentWindow?.postMessage(
      {
        message: "Signal",
        payload: {
          Score: Score.value,
          CustomObject: CustomObject.value,
        },
      },
      "*"
    );
  }
};
const loadScriptIntoIframe = () => {
  let script = game.value?.contentWindow?.document.createElement("script");
  if (script) {
    console.log("Load script into iframe");
    script.src = "@/public/js/Msg.js";
    script.async = false;
    game.value?.contentWindow?.document.body.appendChild(script);
  }
};

onUnmounted(() => {
  window.removeEventListener("message", processMessage);
  console.log("Removed event listener", processMessage);
  // game.value?.removeEventListener("load", loadScriptIntoIframe);
});
</script>
