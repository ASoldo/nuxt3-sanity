import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabaseUrl = (import.meta as any).env.SUPABASE_QUERY_URL;
  const apiKey = import.meta.env.API_KEY;
  const bearerToken = import.meta.env.API_KEY;
  const supabaseHeaders = {
    apikey: apiKey,
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  const client = serverSupabaseClient(event);

  // Fetch leaderboard data with related user details
  const leaderboardResponse = await client
    .from("leaderboard")
    .select(
      "user_uuid, best_score, profiles: user_uuid(id, first_name, last_name, email)"
    )
    .order("best_score", { ascending: true });

  // Check if response is successful
  if (!leaderboardResponse || leaderboardResponse.error) {
    return { error: leaderboardResponse.error };
  }
  console.log(leaderboardResponse);
  return leaderboardResponse;
});
