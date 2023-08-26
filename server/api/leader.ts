export default defineEventHandler(async (event) => {
  const supabaseUrl = "https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1";
  const apiKey = import.meta.env.API_KEY;
  const bearerToken = import.meta.env.API_KEY;

  const supabaseHeaders = {
    apikey: apiKey,
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
    "X-Secret-Header": "1",
  };

  // Construct URL for fetching leaderboard data
  const endpointUrl = `${supabaseUrl}/leaderboard?select=best_score,profiles:user_uuid(first_name)&order=best_score.asc&limit=10`;

  // Make a fetch request to get leaderboard data
  const leaderboardResponse = await fetch(endpointUrl, {
    method: "GET",
    headers: supabaseHeaders,
  });

  // Parse the response
  const responseData = await leaderboardResponse.json();

  // Check if response is successful
  if (!responseData || responseData.error) {
    return { error: responseData.error };
  }
  console.log(responseData);
  // Structure the data similar to the client library's response
  const structuredData = {
    data: responseData,
    error: null,
    status: leaderboardResponse.status,
    statusText: leaderboardResponse.statusText,
  };
  console.log(structuredData);

  return structuredData;
});
