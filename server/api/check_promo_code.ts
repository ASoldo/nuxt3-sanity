import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
// export default defineEventHandler(async (event) => {
//   const config = useRuntimeConfig();
//   const supabaseUrl =
//     "https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/promo_card";
//   const supabaseHeaders = {
//     apikey: config.public.supabase.key as string,
//     Authorization: `Bearer ${config.public.supabase.key as string}`,
//     "Content-Type": "application/json",
//     Prefer: "return=representation", // To return the inserted row in the response
//   };
//
//   const supabaseResponse = await fetch(supabaseUrl, {
//     method: "POST",
//     headers: supabaseHeaders,
//   });
//
//   console.log("check for promo code");
//   return;
// });

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const queryParam = getQuery(event);
  const promo_card_code = queryParam.promo_card_code;

  // 1. Extract the promo_card_code from the event (or wherever you are storing it)
  // Assuming it's a part of event's body for this example. Modify as required.
  const promoCardCode = promo_card_code;

  if (!promoCardCode) {
    console.error("Promo card code not provided");
    return { status: "error", message: "Promo card code not provided" };
  }

  const supabaseUrl = `https://kxbzixfkcjexfwfacnzq.supabase.co/rest/v1/promo_card?promo_card_code=eq.${promoCardCode}`;
  const supabaseHeaders = {
    apikey: config.public.supabase.key as string,
    Authorization: `Bearer ${config.public.supabase.key as string}`,
    "Content-Type": "application/json",
  };

  // 2. Fetch from the promo_card table
  const supabaseResponse = await fetch(supabaseUrl, {
    method: "GET",
    headers: supabaseHeaders,
  });

  const data = await supabaseResponse.json();

  // 3. Check if promo_card_code exists
  if (data && data.length > 0) {
    console.log("Promo card code exists");
    return { status: "success", message: "Promo card code exists" };
  } else {
    console.error("Promo card code does not exist");
    return { status: "error", message: "Promo card code does not exist" };
  }
});

// curl -v "http://localhost:3000/api/check_promo_code?promo_card_code=10030063922" | jq
