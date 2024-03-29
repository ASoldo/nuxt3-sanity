export default defineEventHandler(async (event) => {
  const baseUrl =
    "https://u678c0qn.api.sanity.io/v2021-10-21/data/query/production";
  const query = `*[_type == "gameConfig"][0]{
    title,
    "active_room": active_room->{
      slug,
      room_id
    },
    "correctItems": correctItems[]->{
      name,
      question,
      slug, 
      "imageUrl": image.asset->url,
      description
    }
  }`;
  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(`${baseUrl}?query=${encodedQuery}`);
  const data = await response.json();

  console.log("data", data);

  if (!response.ok) {
    return { message: `Error: ${response.statusText}` };
  }

  const result = {
    title: data.result.title,
    active_room: data.result.active_room.slug.current,
    correctItems: data.result.correctItems,
    room_id: data.result.active_room.room_id,
  };

  console.log("gameConfig", result);
  return { message: "Success: Data fetched from Sanity", result };
});
