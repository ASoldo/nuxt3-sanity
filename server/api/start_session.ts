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

interface GameConfig {
  result?: GameConfigResponse;
}
interface GameConfigResponse {
  title: string;
  active_room: string;
  correctItems: Item[];
}

interface Item {
  _id: string;
  name: string;
  slug: {
    current: string;
    _type: string;
  };
  imageUrl: string | null;
}

interface GameItems {
  message: string;
  items?: Item[];
}

interface RoomData {
  message: string;
  result?: RoomDataResponse;
}

interface RoomDataResponse {
  title: string;
  slug: Slug;
  room: Room;
}

interface Slug {
  current: string;
  _type: string;
}

interface Room {
  room_name: string;
  hotspot_positions: Position[];
  hotspot_interactable_positions: Position[];
}

interface Position {
  _type: string;
  x: number;
  y: number;
  _key: string;
}

// export default defineEventHandler(async () => {
//   try {
//     const gameConfigResponse = await $fetch(`/api/gameconfig`);
//     const roomDataResponse = await $fetch(`/api/roomdata`);
//     const gameItemsResponse = await $fetch(`/api/gameitems`);
//
//     if (gameConfigResponse && roomDataResponse && gameItemsResponse) {
//       const gameData = gameConfigResponse as GameConfig;
//       const roomsData = roomDataResponse as RoomData;
//       const itemsData = gameItemsResponse as GameItems;
//       console.log(gameData.result?.correctItems);
//       console.log(roomsData.result?.room.room_name);
//       console.log(itemsData?.items?.[0].slug.current);
//
//       return {
//         data: JSON.stringify({ gameData, roomsData, itemsData }),
//       };
//     } else {
//       throw new Error("Error fetching data");
//     }
//   } catch (error: any) {
//     console.error(`Error in start session: ${error.message}`);
//     return {
//       error: { message: "Internal server error" },
//     };
//   }
// });

export default defineEventHandler(async () => {
  try {
    const gameConfigResponse = await $fetch(`/api/gameconfig`);
    const roomDataResponse = await $fetch(`/api/roomdata`);
    const gameItemsResponse = await $fetch(`/api/gameitems`);

    if (gameConfigResponse && roomDataResponse && gameItemsResponse) {
      const gameData = gameConfigResponse as GameConfig;
      const roomsData = roomDataResponse as RoomData;
      const itemsData = gameItemsResponse as GameItems;

      if (gameData?.result && roomsData?.result && itemsData?.items) {
        // Store correctItems in a separate variable
        const correctItems = gameData.result.correctItems;

        // Shuffling itemsData
        const shuffledItems = shuffle(itemsData.items);

        // Preparing the payload
        const payload = {
          gameData,
          roomsData,
          itemsData: {
            ...itemsData,
            items: shuffledItems,
          },
          // correctItems,
        };

        return {
          data: JSON.stringify(payload),
        };
      } else {
        throw new Error("Data not found");
      }
    } else {
      throw new Error("Error fetching data");
    }
  } catch (error: any) {
    console.error(`Error in start session: ${error.message}`);
    return {
      error: { message: "Internal server error" },
    };
  }
});
