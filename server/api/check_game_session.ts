export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user_uuid = body.user_uuid;

  const config = useRuntimeConfig();

  const supabaseUrl = `https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/game_sessions`;
  const supabaseHeaders = {
    apikey: config.public.supabase.key as string,
    Authorization: `Bearer ${config.public.supabase.key as string}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  // Fetch the latest game session for the user on the current day with status=1
  const currentDate = new Date().toISOString().slice(0, 10);
  let fetchUrl = `${supabaseUrl}?user_uuid=eq.${user_uuid}&status=eq.1&created_at.gte.${currentDate}T00:00:00+02:00&order=created_at.desc`;
  let fetchResponse = await fetch(fetchUrl, { headers: supabaseHeaders });

  if (!fetchResponse.ok) {
    return { error: fetchResponse.statusText };
  }

  const gameSession = await fetchResponse.json();
  const latestSession = gameSession[0];

  const sessionDate = new Date(latestSession.created_at)
    .toISOString()
    .slice(0, 10);
  // If user has a session with status 1 for the current day, don't allow another play
  if (latestSession && sessionDate === currentDate) {
    return {
      message: "Iskoristili ste svoj dnevni limit, igrajte ponovno nakon 00:00",
      error: "You've already played today. Try again tomorrow!",
      code: false,
      latestSession: latestSession.created_at,
      currentDate: currentDate,
    };
  }

  return { code: true, message: "Igraj Igru!", error: null };
});

// curl -X POST -v "http://localhost:3000/api/check_game_session" -H "Content-Type: application/json" -d '{"user_uuid": "2c524b6d-6460-49f7-9475-314ef044c313"}' | jq
// curl -X POST -v "https://k-marke-t.com/api/check_game_session" -H "Content-Type: application/json" -d '{"user_uuid": "2c524b6d-6460-49f7-9475-314ef044c313"}' | jq
