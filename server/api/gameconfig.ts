export default defineEventHandler(async () => {
  const baseUrl = import.meta.env.BASE_URL;
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
