export default defineEventHandler(async () => {
  const baseUrl =
    "https://u678c0qn.api.sanity.io/v2021-10-21/data/query/production";
  const query = `*[_type == "game"][0]{
    title,
    slug,
    "Room": rooms[0]{
      room_name,
      hotspot_positions,
      hotspot_interactable_positions
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
    slug: data.result.slug,
    room: data.result.Room,
  };

  return { message: "Success: Data fetched from Sanity", result };
});
