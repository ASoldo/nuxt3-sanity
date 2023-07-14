export default defineEventHandler(async (event) => {
  const baseUrl =
    "https://u678c0qn.api.sanity.io/v2021-10-21/data/query/production";
  const query = `*[_type == "gameConfig"][0]{
    title,
    active_room,
    "correctItems": correctItems[]->{
      _id,
      name,
      slug,
      imageUrl
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
    active_room: data.result.active_room,
    correctItems: data.result.correctItems,
  };

  return { message: "Success: Data fetched from Sanity", result };
});
