export default defineEventHandler(async () => {
  const randomNumber = Math.floor(Math.random() * 500) + 1;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
  );
  const data = await response.json();

  return {
    data,
  };
});
