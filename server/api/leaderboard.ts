// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

// export default defineEventHandler(async (event) => {
//   const supabaseUrl = (import.meta as any).env.SUPABASE_QUERY_URL;
//   const apiKey = import.meta.env.API_KEY;
//   const bearerToken = import.meta.env.API_KEY;
//   const supabaseHeaders = {
//     apikey: apiKey,
//     Authorization: `Bearer ${bearerToken}`,
//     "Content-Type": "application/json",
//     Prefer: "return=minimal",
//   };
//   const client = serverSupabaseClient(event);
//   const response = client
//     .from("leaderboard")
//     .select(
//       `
//       user_uuid,
//       best_score,
//       profiles: {
//         id,
//         first_name,
//         last_name,
//         email
//       }
//     `
//     )
//     .order("best_score", { ascending: false });
//
//   return response;
// });
//
//
//
//
// export default defineEventHandler(async (event) => {
//   const supabaseUrl = (import.meta as any).env.SUPABASE_QUERY_URL;
//   const apiKey = import.meta.env.API_KEY;
//   const bearerToken = import.meta.env.API_KEY;
//   const supabaseHeaders = {
//     apikey: apiKey,
//     Authorization: `Bearer ${bearerToken}`,
//     "Content-Type": "application/json",
//     Prefer: "return=minimal",
//   };
//
//   const client = serverSupabaseClient(event);
//
//   // Fetch leaderboard data
//   const leaderboardResponse = await client
//     .from("leaderboard")
//     .select("user_uuid, best_score, profiles: user_uuid")
//     .order("best_score", { ascending: false });
//
//   // Check if response is successful
//   if (!leaderboardResponse || leaderboardResponse.error) {
//     return { error: leaderboardResponse.error };
//   }
//   const profilesResponse = await client
//     .from("profiles")
//     .select("id, first_name")
//     .eq("id", leaderboardResponse.data[0].user_uuid);
//   if (!profilesResponse || profilesResponse.error) {
//     return { error: profilesResponse.error };
//   }
//   console.log(leaderboardResponse);
//   console.log(profilesResponse);
//   return leaderboardResponse;
//
//   // const leaderboardData = leaderboardResponse.data;
//   //
//   // // Fetch profiles for each user_uuid
//   // const profilesPromises = leaderboardData.map(async (entry) => {
//   //   const profileResponse = await client
//   //     .from("profiles")
//   //     .select("*")
//   //     .eq("id", entry.user_uuid);
//   //   // console.log(entry.user_uuid);
//   //
//   //   if (!profileResponse || profileResponse.error) {
//   //     return null;
//   //   }
//   //   console.log(profileResponse);
//   //   return profileResponse.data[0];
//   // });
//   //
//   // const profilesData = await Promise.all(profilesPromises);
//   // // Merge leaderboard and profiles data
//   // const result = leaderboardData.map((entry, index) => {
//   //   return {
//   //     user_uuid: entry.user_uuid,
//   //     best_score: entry.best_score,
//   //     profile: profilesData[index], // this line should add the profile data to the result
//   //   };
//   // });
//   //
//   // return result;
// });

// export default defineEventHandler(async (event) => {
//   const supabaseUrl = (import.meta as any).env.SUPABASE_QUERY_URL;
//   const apiKey = import.meta.env.API_KEY;
//   const bearerToken = import.meta.env.API_KEY;
//   const supabaseHeaders = {
//     apikey: apiKey,
//     Authorization: `Bearer ${bearerToken}`,
//     "Content-Type": "application/json",
//     Prefer: "return=minimal",
//   };
//
//   const client = serverSupabaseClient(event);
//
//   // Fetch leaderboard data with related user details
//   const leaderboardResponse = await client
//     .from("leaderboard")
//     .select(
//       "user_uuid, best_score, profiles: user_uuid(id, first_name, last_name, email)"
//     )
//     .order("best_score", { ascending: true });
//
//   // Check if response is successful
//   if (!leaderboardResponse || leaderboardResponse.error) {
//     return { error: leaderboardResponse.error };
//   }
//   console.log(leaderboardResponse);
//   return leaderboardResponse;
// });

export default defineEventHandler(async (event) => {
  // const supabaseUrl = (import.meta as any).env.SUPABASE_QUERY_URL;
  // const apiKey = import.meta.env.API_KEY;
  // const bearerToken = import.meta.env.API_KEY;
  // const supabaseHeaders = {
  //   apikey: apiKey,
  //   Authorization: `Bearer ${bearerToken}`,
  //   "Content-Type": "application/json",
  //   Prefer: "return=minimal",
  // };
  //
  // const client = serverSupabaseClient(event);
  //
  // // Fetch leaderboard data with related user details
  // const leaderboardResponse = await client
  //   .from("leaderboard")
  //   .select(
  //     "user_uuid, best_score, profiles: user_uuid(id, first_name, last_name, email)"
  //   )
  //   .order("best_score", { ascending: true });
  //
  // // Check if response is successful
  // if (!leaderboardResponse || leaderboardResponse.error) {
  //   return { error: leaderboardResponse.error };
  // }
  // console.log(leaderboardResponse);
  // return leaderboardResponse;
  return { message: "Not Found" };
});

// (id = auth.uid())
