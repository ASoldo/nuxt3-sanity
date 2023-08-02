// @ts-ignore
// import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
//
// export default defineEventHandler(async (event) => {
//   const client = serverSupabaseClient(event);
//   const user = serverSupabaseUser(event);
//   const config = useRuntimeConfig();
//   console.log(client);
//
//   const supabaseUrl = `https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/user_prizes?select=profile_id,prize_id`;
//   const supabaseHeaders = {
//     apikey: config.public.supabase.key as string,
//     Authorization: `Bearer ${config.public.supabase.key as string}`,
//     "Content-Type": "application/json",
//     Prefer: "return=representation",
//   };
//
//   const supabaseResponse = await fetch(supabaseUrl, {
//     method: "GET",
//     headers: supabaseHeaders,
//   });
//
//   if (!supabaseResponse.ok) {
//     console.error(`Error fetching user prizes: ${supabaseResponse.statusText}`);
//     return { message: `Error: ${supabaseResponse.statusText}` };
//   }
//
//   const data = await supabaseResponse.json();
//
//   return {
//     message: "Success: User prizes fetched successfully",
//     data,
//   };
// });

// curl -v "http://localhost:3000/api/user_prizes" | jq
