export default defineEventHandler(async (event) => {
  const supabaseUrl = "https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YnppeGZrY2pleGZ3ZmFjbnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ5NTQzODEsImV4cCI6MjAwMDUzMDM4MX0.Jl5GMoQSyVVgOFAHRIyCEFFgsGe1YahNVCaCjehO0hw";
  const bearerToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YnppeGZrY2pleGZ3ZmFjbnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ5NTQzODEsImV4cCI6MjAwMDUzMDM4MX0.Jl5GMoQSyVVgOFAHRIyCEFFgsGe1YahNVCaCjehO0hw";

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
