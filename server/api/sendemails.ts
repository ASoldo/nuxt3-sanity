// export default defineEventHandler(async () => {
//   try {
//     const users = [
//       {
//         email: "soldo.andrej@gmail.com",
//         name: "User One",
//         progress: "5 out of 6 games played this week",
//       },
//       {
//         email: "tonci.braskic@digitalarena.hr",
//         name: "User Two",
//         progress: "3 out of 6 games played this week",
//       },
//     ];
//
//     for (const user of users) {
//       const message = {
//         from_email: "noreply@k-marke-t.com",
//         to: [{ email: user.email, type: "to" }],
//         subject: "K-MARKE-T Nagrada",
//         global_merge_vars: [
//           {
//             name: "our_custom_field",
//             content: user.progress,
//           },
//         ],
//       };
//
//       const response = await fetch(
//         "https://mandrillapp.com/api/1.0/messages/send-template.json",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             key: "md-pJDueXYIpD8oYQInMqPDVA",
//             template_name: "kauf-weekly",
//             template_content: [
//               { name: "main", content: "<h1>Example content</h1>" },
//             ],
//             message: message,
//           }),
//         }
//       );
//
//       if (!response.ok) {
//         console.error(
//           `Error sending email to ${user.email}: ${response.statusText}`
//         );
//       }
//     }
//
//     return { status: "success", message: "Emails sent" };
//   } catch (error: any) {
//     console.error(`Error in sendmails.ts: ${error.message}`);
//     return { status: "error", message: "Internal server error" };
//   }
// });

import { serverSupabaseClient } from "#supabase/server";
type UserPrize = {
  profile_id: string;
  prize_id?: number; // Assuming prize_id is a number, make it optional if not always provided
};

export default defineEventHandler(async (event) => {
  const queryParam = getQuery(event);
  const qr_code_url = queryParam.qr_code_url;
  const item_name = queryParam.item_name;
  const validity = queryParam.validity;
  const prize_id = queryParam.prize_id;
  try {
    // Initialize the Supabase client
    const client = serverSupabaseClient(event);

    // 1. Fetch leaderboard from the API
    const leaderboardResponse = await fetch("https://k-marke-t.com/api/draw", {
      headers: {
        "X-Secret-Header": "1",
      },
    });
    if (!leaderboardResponse.ok) {
      throw new Error(
        `Failed to fetch leaderboard: ${leaderboardResponse.statusText}`
      );
    }
    const { data } = await leaderboardResponse.json();

    for (const user of data) {
      const userPrizeData: UserPrize[] = [
        {
          profile_id: user.user_uuid,
          prize_id: prize_id as any,
        },
      ];
      console.log(userPrizeData);

      // 2a. Insert record in user_prizes table
      const { error: supabaseError } = await client
        .from("user_prizes")
        .insert(userPrizeData as any);

      if (supabaseError) {
        console.error(
          `Error inserting data for ${user.profiles.email}: ${supabaseError.message}`
        );
      }

      // 2b. Send email
      const message = {
        from_email: "noreply@k-marke-t.com",
        to: [{ email: user.profiles.email, type: "to" }],
        subject: "ČESTITAMO NA NAGRADI!",
        global_merge_vars: [
          {
            name: "our_custom_field",
            content: qr_code_url,
          },
          {
            name: "item_name",
            content: item_name,
          },
          {
            name: "validity",
            content: validity,
          },
        ],
      };

      const emailResponse = await fetch(
        "https://mandrillapp.com/api/1.0/messages/send-template.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: "md-pJDueXYIpD8oYQInMqPDVA",
            template_name: "kauf-weekly",
            template_content: [
              { name: "main", content: "<h1>Example content</h1>" },
            ],
            message: message,
          }),
        }
      );

      if (!emailResponse.ok) {
        console.error(
          `Error sending email to ${user.profiles.email}: ${emailResponse.statusText}`
        );
      }
    }

    // return { status: 'success', message: 'Emails sent' };
    return { status: "success", message: "logic done" };
  } catch (error: any) {
    console.error(`Error in sendmails.ts: ${error.message}`);
    return { status: "error", message: "Internal server error" };
  }
});

// (profile_id = auth.uid()) for user_prizes
// curl -v "http://localhost:3000/api/sendemails?prize_id=1&qr_code_url=https://cdn.sanity.io/images/u678c0qn/production/2a9a59e4276d36ac58e764574724607502efeb30-300x300.png" | jq
// curl -v "http://k-marke-t.com/api/sendemails?prize_id=1&qr_code_url=https://cdn.sanity.io/images/u678c0qn/production/2a9a59e4276d36ac58e764574724607502efeb30-300x300.png" | jq
// curl -v "https://k-marke-t.com/api/sendemails?prize_id=1&qr_code_url=https://cdn.sanity.io/images/u678c0qn/production/2a9a59e4276d36ac58e764574724607502efeb30-300x300.png" | jq
// "https://k-marke-t.com/api/sendemails?prize_id=2&qr_code_url=https://cdn.sanity.io/images/u678c0qn/production/67468e1c0c14b42baed8a574107d2bf5e2520a80-375x375.png&validity=25.8.2023-26.8.2023&item_name=K-Classic American cookies čokolada"
// curl -v "https://k-marke-t.com/api/sendemails?prize_id=2&qr_code_url=https://cdn.sanity.io/images/u678c0qn/production/67468e1c0c14b42baed8a574107d2bf5e2520a80-375x375.png&validity=25.8.2023-26.8.2023&item_name=K-Classic%20American%20cookies%20cokolada"
