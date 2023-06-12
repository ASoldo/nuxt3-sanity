import { serverSupabaseUser } from "#supabase/server";
export default defineEventHandler(async (event) => {
  console.log("fired");
  return await serverSupabaseUser(event);
});
