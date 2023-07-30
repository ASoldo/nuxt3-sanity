export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Body: ", body);
  return { body };
});
