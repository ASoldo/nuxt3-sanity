<template>
  <div class="flex flex-col pt-14">
    <div class="flex grow bg-black justify-center">
      <div class="h-full w-full bg-green-500">
        <iframe ref="game" height="1024" width="512" :src="gameSrc" frameborder="0" class="w-full h-full"></iframe>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();
const Score = ref<number>(201);
const roomData = ref({});
const drawers = ref({});
const jwt = ref<string | null>(null);

const CustomObject = ref<string>("");
// https://game.dev.kaufland.game.ecolabel.cc/
const gameSrc = ref<string>("https://game.k-marke-t.com/");
// const gameSrc = ref<string>("http://localhost:8000/");
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

// const getGameConfig = async () => {
//   const response = await fetch("/api/gameconfig");
//   if (!response.ok) {
//     console.error(`Failed to fetch game configuration: ${response.statusText}`);
//     return;
//   }
//
//   const data = await response.json();
//   return data;
// };
//
// const getRoomData = async () => {
//   const response = await fetch("/api/roomdata");
//   if (!response.ok) {
//     console.error(`Failed to fetch room data: ${response.statusText}`);
//     return;
//   }
//
//   const data = await response.json();
//   return data;
// };
//
// const getItems = async () => {
//   const response = await fetch("/api/gameitems");
//   if (!response.ok) {
//     console.error(`Failed to fetch game items: ${response.statusText}`);
//     return;
//   }
//
//   const data = await response.json();
//   return data;
// };

const startGame = async () => {
  const response = await fetch("/api/start_game");
  if (!response.ok) {
    console.error(
      `Failed to fetch start_game response: ${response.statusText}`
    );
    return;
  }

  const data = await response.json();
  return data;
};

const setUpGame = async () => {
  const [startGameData] = await Promise.all([startGame()]);

  //const correctItems = gameConfigData.correctItems;
  const activeRoom = startGameData.data.gameData.result.active_room;
  // console.log(gameConfigData);
  console.log(startGameData);
  console.log(activeRoom);

  // Store roomData to the reactive roomData reference
  // roomData.value = roomDataVal;

  // Get hotspotPositions and hotspotInteractablePositions
  const hotspotPositions = (startGameData.data.roomsData as any).result.room
    .hotspot_positions;
  const hotspotInteractablePositions = (startGameData.data.roomsData as any)
    .result.room.hotspot_interactable_positions;

  // Shuffle itemsData
  const shuffledItems = shuffle([...startGameData.data.itemsData.items]);

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
  // console.log(correctItems);

  const customObject = {
    activeRoom: activeRoom,
    roomData: startGameData.data.roomsData,
    items: items,
    drawers: drawers.value,
    questions: startGameData.data.gameData.result.correctItems,
    profile: await client.from("profiles").select("*").eq("id", user.value?.id),

    // data: startGameData,

    user: user.value,
    jwt: jwt.value ? JSON.parse(jwt.value) : null,
  };

  CustomObject.value = JSON.stringify(customObject);
  console.log(JSON.stringify(CustomObject.value));
  // console.log("JWT: ", customObject.jwt.access_token);
  return CustomObject.value;
};

onMounted(() => {
  jwt.value = window.localStorage.getItem("sb-kxbzixfkcjexfwfacnzq-auth-token");

  window.addEventListener("message", processMessage);
  // console.log("Add event listener", processMessage);

  // game.value?.addEventListener("load", loadScriptIntoIframe);
});
watchEffect(() => {
  if (!user.value) {
    navigateTo("/");
  }
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
  if (e.data.message === "Handshake" && game.value?.contentWindow != null) {
    console.log(e.data);

    game.value?.contentWindow?.postMessage(
      {
        message: "Handshake",
        payload: {
          User_uuid: user.value?.id,
        },
      },
      "*"
    );
  }
  if (e.data.message === "Homepage" && game.value?.contentWindow != null) {
    console.log(e.data);
    navigateTo("/");
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
  // console.log("Removed event listener", processMessage);
  // game.value?.removeEventListener("load", loadScriptIntoIframe);
});
</script>
