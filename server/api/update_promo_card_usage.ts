import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const promo = body.promo;
  const promoCardCodeToSetTrue = promo;

  // Check if promoCardCodeToSetTrue is valid before proceeding
  if (promoCardCodeToSetTrue) {
    try {
      const { data, error } = await serverSupabaseClient(event)
        .from("promo_card")
        .update({ used: true } as never)
        .eq("promo_card_code", promoCardCodeToSetTrue);

      if (error) {
        console.error("Error updating promo card:", error.message);
        return;
      }

      console.log("Successfully updated promo card:", data);
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
