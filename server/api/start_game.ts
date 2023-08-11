// @ts-ignore
// export default defineEventHandler(async (event) => {
//   console.log("fired");
//   return await serverSupabaseUser(event);
// });
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
  room_id: number;
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
  room_id: number;
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

// export default defineEventHandler(async (event) => {
//   try {
//     const gameConfigResponse = await $fetch(`/api/gameconfig`);
//     const roomDataResponse = await $fetch(`/api/roomdata`);
//     const gameItemsResponse = await $fetch(`/api/gameitems`);
//     if (gameConfigResponse && roomDataResponse && gameItemsResponse) {
//       const gameData = gameConfigResponse as GameConfig;
//       const roomsData = roomDataResponse as RoomData;
//       const itemsData = gameItemsResponse as GameItems;
//
//       if (gameData?.result && roomsData?.result && itemsData?.items) {
//         // Store correctItems in a separate variable
//         const correctItems = gameData.result.correctItems;
//
//         // Shuffling itemsData
//         const shuffledItems = shuffle(itemsData.items);
//
//         // Preparing the payload
//         const payload = {
//           gameData,
//           roomsData,
//           itemsData: {
//             ...itemsData,
//             items: shuffledItems,
//           },
//
//           // correctItems,
//         };
//
//         return {
//           // data: JSON.stringify(payload),
//           data: payload,
//         };
//       } else {
//         throw new Error("Data not found");
//       }
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

// export default defineEventHandler(async (event) => {
//   try {
//     // 1. Fetch game config
//     const gameConfigResponse = await $fetch(`/api/gameconfig`);
//
//     // If gameConfigResponse doesn't exist or doesn't have the expected properties, throw an error
//     if (
//       !gameConfigResponse ||
//       !gameConfigResponse ||
//       typeof (gameConfigResponse as GameConfig).result?.room_id === "undefined"
//     ) {
//       throw new Error(
//         "Error fetching game config or game config format is incorrect"
//       );
//     }
//
//     // 2. Use the room_id from the gameConfigResponse to fetch room data
//     const roomDataResponse = await $fetch(
//       `/api/roomdata?room_id=${(gameConfigResponse as GameConfig).result?.room_id
//       }`
//     );
//
//     // 3. Fetch game items
//     const gameItemsResponse = await $fetch(`/api/gameitems`);
//
//     // Check if all responses are available and in the expected format
//     if (gameConfigResponse && roomDataResponse && gameItemsResponse) {
//       const gameData = gameConfigResponse as GameConfig;
//       const roomsData = roomDataResponse as RoomData;
//       const itemsData = gameItemsResponse as GameItems;
//
//       if (gameData?.result && roomsData?.result && itemsData?.items) {
//         // Store correctItems in a separate variable
//         const correctItems = gameData.result.correctItems;
//
//         // Shuffling itemsData
//         const shuffledItems = shuffle(itemsData.items);
//
//         // Preparing the payload
//         const payload = {
//           gameData,
//           roomsData,
//           itemsData: {
//             ...itemsData,
//             items: shuffledItems,
//           },
//           // correctItems,
//         };
//
//         return {
//           // data: JSON.stringify(payload),
//           data: payload,
//         };
//       } else {
//         throw new Error("Data not found");
//       }
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

export default defineEventHandler(async (event) => {
  try {
    // 1. Fetch game config
    const gameConfigResponse = await $fetch(`/api/gameconfig`);

    if (
      !gameConfigResponse ||
      typeof (gameConfigResponse as GameConfig).result?.room_id === "undefined"
    ) {
      throw new Error(
        "Error fetching game config or game config format is incorrect"
      );
    }

    // 2. Use the room_id from the gameConfigResponse to fetch room data
    const roomDataResponse = await $fetch(
      `/api/roomdata?room_id=${(gameConfigResponse as GameConfig).result?.room_id
      }`
    );

    // 3. Fetch game items
    const gameItemsResponse = await $fetch(`/api/gameitems`);

    if (gameConfigResponse && roomDataResponse && gameItemsResponse) {
      const gameData = gameConfigResponse as GameConfig;
      const roomsData = roomDataResponse as RoomData;
      const itemsData = gameItemsResponse as GameItems;

      if (gameData?.result && roomsData?.result && itemsData?.items) {
        const correctItems = gameData.result.correctItems;

        // Separate correctItems from the rest
        const otherItems = itemsData.items.filter(
          (item) =>
            !correctItems.some(
              (correctItem) => correctItem.slug.current === item.slug.current
            )
        );

        // Shuffle the non-correct items
        const shuffledOtherItems = shuffle(otherItems);

        // Take the required number of non-correct items
        const selectedOtherItems = shuffledOtherItems.slice(
          0,
          20 - correctItems.length
        );

        // Combine and shuffle the final 10 items
        const finalItemsFirst = shuffle([
          ...correctItems,
          ...selectedOtherItems,
        ]);
        const finalItems = shuffle([...finalItemsFirst]);

        const sanitizedGameData = {
          ...gameData,
          result: {
            ...gameData.result,
            correctItems: gameData.result.correctItems.map((item) => {
              const { slug, ...itemWithoutSlug } = item; // Using destructuring to separate out the slug
              return itemWithoutSlug; // This doesn't have the slug property now
            }),
          },
        };

        // Preparing the payload
        const payload = {
          gameData: sanitizedGameData,
          roomsData,
          itemsData: {
            ...itemsData,
            items: finalItems,
          },
        };

        return {
          data: payload,
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

// curl http://localhost:3000/api/start_game | jq
