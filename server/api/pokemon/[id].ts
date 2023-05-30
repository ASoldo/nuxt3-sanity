export default defineEventHandler(async (event) => {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${event.context.params?.id}`
  );
  const data = await pokemon.json();
  return {
    data: data,
  };
});
