// import { serverSupabaseClient } from "#supabase/server";
//
// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const promo = body.promo;
//   const promoCardCodeToSetTrue = promo;
//
//   // Check if promoCardCodeToSetTrue is valid before proceeding
//   if (promoCardCodeToSetTrue) {
//     try {
//       const { data, error } = await serverSupabaseClient(event)
//         .from("promo_card")
//         .update({ used: true } as never)
//         .eq("promo_card_code", promoCardCodeToSetTrue);
//
//       if (error) {
//         console.error("Error updating promo card:", error.message);
//         return;
//       }
//
//       console.log("Successfully updated promo card:", data);
//       return { status: "Ispravan kod kartice", code: true };
//     } catch (err) {
//       console.error("Exception occurred:", err);
//       return { status: "Problem prilikom provjere kartice", code: false };
//     }
//   } else {
//     console.error("Invalid promo card code provided.");
//     return { status: "Neispravan kod kartice", code: false };
//   }
// });

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const queryParam = getQuery(event);
  const promo = queryParam.promo;
  const promoCardCodeToSetTrue = promo;

  // Check if promoCardCodeToSetTrue is valid before proceeding
  if (promoCardCodeToSetTrue) {
    try {
      // First, check if the promo card code is already used
      const { data: existingData, error: fetchError } =
        await serverSupabaseClient(event)
          .from("promo_card")
          .select("used")
          .eq("promo_card_code", promoCardCodeToSetTrue)
          .single();

      if (fetchError) {
        console.error("Error fetching promo card data:", fetchError.message);
        return { status: "Problem prilikom provjere kartice", code: false };
      }

      // If the promo card code is already used, return an error
      if ((existingData as any)?.used) {
        console.error("Promo card code is already used.");
        return { status: "Kod kartice je već iskorišten", code: false };
      }

      // If not used, then update the promo card to used
      const { data: updateData, error: updateError } =
        await serverSupabaseClient(event)
          .from("promo_card")
          .update({ used: true } as never)
          .eq("promo_card_code", promoCardCodeToSetTrue);

      if (updateError) {
        console.error("Error updating promo card:", updateError.message);
        return { status: "Problem prilikom ažuriranja kartice", code: false };
      }

      console.log("Successfully updated promo card:", updateData);
      return { status: "Ispravan kod kartice", code: true };
    } catch (err) {
      console.error("Exception occurred:", err);
      return { status: "Problem prilikom provjere kartice", code: false };
    }
  } else {
    console.error("Invalid promo card code provided.");
    return { status: "Neispravan kod kartice", code: false };
  }
});
