export default defineEventHandler(async () => {
  const baseUrl =
    "https://u678c0qn.api.sanity.io/v2021-10-21/data/query/production";
  const query = `*[_type == "item"]
  {
    name,
    slug,
    "imageUrl": image.asset->url
  }`;
  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(`${baseUrl}?query=${encodedQuery}`);
  const data = await response.json();

  console.log("data", data);

  if (!response.ok) {
    return { message: `Error: ${response.statusText}` };
  }

  const items = data.result.map((item: any) => ({
    name: item.name,
    slug: item.slug,
    imageUrl: item.imageUrl,
  }));

  return { message: "Success: Items fetched from Sanity", items };
});
