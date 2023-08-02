// @ts-ignore
import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const { error } = await client.rpc("generate_leaderboard");

  if (error) {
    console.error("Error generating leaderboard: ", error);
    return { error: error };
  } else {
    return { msg: "Succesfully created new leaderboard." };
  }
});

// curl -v "http://localhost:3000/api/generate_leaderboard" | jq
