// export default defineEventHandler(async (event) => {
//   const query = getQuery(event);
//   const user_uuid = query.user_uuid;
//   const user_answer = query.answer;
//   const answer = event.context.params?.answer;
//
//   const supabaseUrl = `${(import.meta as any).env.SUPABASE_URL
//     }/rest/v1/game_sessions`;
//   const supabaseHeaders = {
//     apikey: import.meta.env.API_KEY,
//     Authorization: `Bearer ${import.meta.env.API_KEY}`,
//     "Content-Type": "application/json",
//     Prefer: "return=representation", // To return the inserted row in the response
//   };
//
//   // Fetch the latest game session for the user with a GET request
//   let fetchUrl = `${supabaseUrl}?user_uuid=eq.${user_uuid}&order=created_at.desc`;
//   let fetchResponse = await fetch(fetchUrl, { headers: supabaseHeaders });
//
//   if (!fetchResponse.ok) {
//     return { error: fetchResponse.statusText };
//   }
//
//   const gameSession = await fetchResponse.json();
//
//   const latestSession = gameSession[0];
//   // const correctAnswer = latestSession[`answer${answer}`];
//   console.log("latestSession", latestSession);
//   // console.log("correctAnswer", correctAnswer);
//   // console.log("user_answer", user_answer);
//   // console.log("answer", answer);
//
//   if (latestSession[`answer${answer}`] !== user_answer) {
//     return { correct: 0 };
//   }
//
//   // If the answer is correct, update the game session with a PATCH request
//   const fetchOptions = {
//     method: "PATCH",
//     headers: supabaseHeaders,
//     body: JSON.stringify({ [`user_answer${answer}`]: user_answer }),
//   };
//
//   fetchUrl = `${supabaseUrl}?session_id=eq.${latestSession.session_id}`;
//   fetchResponse = await fetch(fetchUrl, fetchOptions);
//
//   if (!fetchResponse.ok) {
//     return { error: fetchResponse.statusText };
//   }
//
//   return { correct: 1 };
// });

// export default defineEventHandler(async (event) => {
//   const query = getQuery(event);
//   const user_uuid = query.user_uuid;
//   const user_answer = query.answer;
//   const answer = event.context.params?.answer;
//
//   const supabaseUrl = `${(import.meta as any).env.SUPABASE_URL
//     }/rest/v1/game_sessions`;
//   const supabaseHeaders = {
//     apikey: import.meta.env.API_KEY,
//     Authorization: `Bearer ${import.meta.env.API_KEY}`,
//     "Content-Type": "application/json",
//     Prefer: "return=representation", // To return the inserted row in the response
//   };
//
//   // Fetch the latest game session for the user with a GET request
//   let fetchUrl = `${supabaseUrl}?user_uuid=eq.${user_uuid}&order=created_at.desc`;
//   let fetchResponse = await fetch(fetchUrl, { headers: supabaseHeaders });
//
//   if (!fetchResponse.ok) {
//     return { error: fetchResponse.statusText };
//   }
//
//   const gameSession = await fetchResponse.json();
//   const latestSession = gameSession[0];
//
//   if (latestSession[`answer${answer}`] !== user_answer) {
//     return { correct: 0 };
//   }
//
//   // If the answer is correct, update the game session with a PATCH request
//   let fetchOptions = {
//     method: "PATCH",
//     headers: supabaseHeaders,
//     body: JSON.stringify({ [`user_answer${answer}`]: user_answer }),
//   };
//
//   fetchUrl = `${supabaseUrl}?session_id=eq.${latestSession.session_id}`;
//   fetchResponse = await fetch(fetchUrl, fetchOptions);
//
//   if (!fetchResponse.ok) {
//     return { error: fetchResponse.statusText };
//   }
//
//   // If this was the third correct answer, set status to 1
//   if (answer === "3") {
//     fetchOptions = {
//       method: "PATCH",
//       headers: supabaseHeaders,
//       body: JSON.stringify({ status: 1 }),
//     };
//
//     fetchUrl = `${supabaseUrl}?session_id=eq.${latestSession.session_id}`;
//     fetchResponse = await fetch(fetchUrl, fetchOptions);
//
//     if (!fetchResponse.ok) {
//       return { error: fetchResponse.statusText };
//     }
//   }
//
//   return { correct: 1 };
// });

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const user_uuid = query.user_uuid;
  const user_answer = query.answer;
  const answer = event.context.params?.answer;

  const supabaseUrl = `https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/game_sessions`;
  const supabaseHeaders = {
    apikey: import.meta.env.API_KEY,
    Authorization: `Bearer ${import.meta.env.API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation", // To return the inserted row in the response
  };

  // Fetch the latest game session for the user with a GET request
  let fetchUrl = `${supabaseUrl}?user_uuid=eq.${user_uuid}&order=created_at.desc`;
  let fetchResponse = await fetch(fetchUrl, { headers: supabaseHeaders });

  if (!fetchResponse.ok) {
    return { error: fetchResponse.statusText };
  }

  const gameSession = await fetchResponse.json();
  const latestSession = gameSession[0];

  if (latestSession[`answer${answer}`] !== user_answer) {
    return { correct: 0 };
  }

  // If the answer is correct, update the game session with a PATCH request
  let fetchOptions = {
    method: "PATCH",
    headers: supabaseHeaders,
    body: JSON.stringify({ [`user_answer${answer}`]: user_answer }),
  };

  fetchUrl = `${supabaseUrl}?session_id=eq.${latestSession.session_id}`;
  fetchResponse = await fetch(fetchUrl, fetchOptions);

  if (!fetchResponse.ok) {
    return { error: fetchResponse.statusText };
  }

  // If all user answers are provided, set status to 1
  if (
    latestSession.user_answer1 !== null &&
    latestSession.user_answer2 !== null &&
    answer === "3"
  ) {
    fetchOptions = {
      method: "PATCH",
      headers: supabaseHeaders,
      body: JSON.stringify({ status: 1 }),
    };

    fetchUrl = `${supabaseUrl}?session_id=eq.${latestSession.session_id}`;
    fetchResponse = await fetch(fetchUrl, fetchOptions);

    if (!fetchResponse.ok) {
      return { error: fetchResponse.statusText };
    }
  }

  return { correct: 1 };
});

/**
 * curl -X POST -H "Content-Type: application/json" "http://localhost:3000/api/answer/3?answer=item-3&user_uuid=6912b220-b776-49ff-95b7-f003f9f5bfca"
 */
