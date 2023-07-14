export default defineEventHandler(async () => {
  const baseUrl = import.meta.env.BASE_URL;
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
