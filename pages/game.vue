<template>
  <div class="flex flex-col">
    <div class="flex grow bg-black justify-center">
      <div class="h-full w-full bg-green-500">
        <iframe ref="game" height="1024" width="512" :src="gameSrc" frameborder="0" class="w-full h-full"></iframe>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
const Score = ref<number>(201);
const roomData = ref({});
const drawers = ref({});

const CustomObject = ref<string>("");
// https://game.dev.kaufland.game.ecolabel.cc/
const gameSrc = ref<string>("http://localhost:8000");
const game = ref<null | HTMLIFrameElement>(null);
definePageMeta({
  middleware: ["auth"],
});

// Fisher-Yates shuffle function
const shuffle = (array: any[]) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const getGameConfig = async () => {
  const response = await fetch("/api/gameconfig");
  if (!response.ok) {
    console.error(`Failed to fetch game configuration: ${response.statusText}`);
    return;
  }

  const data = await response.json();
  return data;
};

const getRoomData = async () => {
  const response = await fetch("/api/roomdata");
  if (!response.ok) {
    console.error(`Failed to fetch room data: ${response.statusText}`);
    return;
  }

  const data = await response.json();
  return data;
};

const getItems = async () => {
  const response = await fetch("/api/gameitems");
  if (!response.ok) {
    console.error(`Failed to fetch game items: ${response.statusText}`);
    return;
  }

  const data = await response.json();
  return data;
};

const setUpGame = async () => {
  const [roomDataVal, itemsData, gameConfigData] = await Promise.all([
    getRoomData(),
    getItems(),
    getGameConfig(),
  ]);

  const correctItems = gameConfigData.correctItems || [];
  const activeRoom = gameConfigData.active_room;

  // Store roomData to the reactive roomData reference
  roomData.value = roomDataVal;

  // Get hotspotPositions and hotspotInteractablePositions
  const hotspotPositions = (roomData.value as any).result.room
    .hotspot_positions;
  const hotspotInteractablePositions = (roomData.value as any).result.room
    .hotspot_interactable_positions;

  // Shuffle itemsData
  const shuffledItems = shuffle([...itemsData.items]);

  // Match itemsData to hotspot_positions
  const items = shuffledItems.slice(0, hotspotPositions.length);

  // Create drawers for remaining items
  const drawersArr = [];
  for (let i = 0; i < hotspotInteractablePositions.length; i++) {
    const drawer = shuffledItems.slice(
      hotspotPositions.length + i * 4,
      hotspotPositions.length + (i + 1) * 4
    );
    drawersArr.push(drawer);
  }

  // Store drawers to the reactive drawers reference
  drawers.value = drawersArr;

  const customObject = {
    roomData: roomData.value,
    items: items,
    drawers: drawers.value,
  };

  CustomObject.value = JSON.stringify(customObject);
  console.log(JSON.stringify(CustomObject.value));
  return CustomObject.value;
};
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
const processMessage = async (e: MessageEvent) => {
  if (e.data.message === "Signal" && game.value?.contentWindow != null) {
    console.log(e.data);

    game.value?.contentWindow?.postMessage(
      {
        message: "Signal",
        payload: {
          Score: Score.value,
          CustomObject: await setUpGame(),
        },
      },
      "*"
    );
  }
  // if (e.data.message === "EndGame") {
  //   console.log(e.data);
  //   // HERE WE SIMPLY SET VALUES
  //   Score.value = e.data.payload.Score;
  // }

  //HERE WE CHECK WHEN GAME SEND SIGNAL TO FRONTEND AND THEN FRONTEND IS INITIALIZING VALUES
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
