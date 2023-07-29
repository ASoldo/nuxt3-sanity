export default defineEventHandler(async (event) => {
  const baseUrl =
    "https://u678c0qn.api.sanity.io/v2021-10-21/data/query/production";
  const query = `*[_type == "gameConfig"][0]{
    "correctItems": correctItems[]->{
      slug,
    }
  }`;
  const queryParam = getQuery(event);
  const user_uuid = queryParam.user_uuid;
  const encodedQuery = encodeURIComponent(query);

  const response = await fetch(`${baseUrl}?query=${encodedQuery}`);
  const data = await response.json();

  if (!response.ok) {
    return { message: `Error: ${response.statusText}` };
  }

  const result = {
    correctItems: data.result.correctItems,
  };

  const supabaseUrl =
    "https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/game_sessions";
  const supabaseHeaders = {
    apikey: import.meta.env.API_KEY,
    Authorization: `Bearer ${import.meta.env.API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation", // To return the inserted row in the response
  };

  // const user_uuid = "6912b220-b776-49ff-95b7-f003f9f5bfca";

  // Create a new game session
  const gameSessionData = {
    user_uuid: user_uuid,
    answer1: result.correctItems[0].slug.current,
    answer2: result.correctItems[1].slug.current,
    answer3: result.correctItems[2].slug.current,
    status: 0,
  };

  const supabaseResponse = await fetch(supabaseUrl, {
    method: "POST",
    headers: supabaseHeaders,
    body: JSON.stringify(gameSessionData),
  });

  if (!supabaseResponse.ok) {
    return { message: `Error: ${supabaseResponse.statusText}` };
  }

  // const gameSession = await supabaseResponse.json();

  return {
    message: "Success: Data fetched from Sanity and game session created",
    // result,
    // gameSession,
  };
});

// curl -X POST http://localhost:3000/api/start_session?user_uuid=6912b220-b776-49ff-95b7-f003f9f5bfca -H "Content-Type: application/json"
