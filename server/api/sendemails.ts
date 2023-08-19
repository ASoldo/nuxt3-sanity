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
  try {
    // Initialize the Supabase client
    const client = serverSupabaseClient(event);

    // 1. Fetch leaderboard from the API
    const leaderboardResponse = await fetch(
      "https://k-marke-t.com/api/leaderboard"
    );
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
          prize_id: 1, // Uncomment and set if you have a prize_id
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
      // const message = {
      //   from_email: 'noreply@k-marke-t.com',
      //   to: [{ email: user.profiles.email, type: 'to' }],
      //   subject: 'K-MARKE-T Nagrada',
      //   global_merge_vars: [
      //     {
      //       name: 'our_custom_field',
      //       content: `Best score: ${user.best_score}`, // Assuming you want to send the best score
      //     },
      //   ],
      // };
      //
      // const emailResponse = await fetch('https://mandrillapp.com/api/1.0/messages/send-template.json', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     key: 'md-pJDueXYIpD8oYQInMqPDVA',
      //     template_name: 'kauf-weekly',
      //     template_content: [{ name: 'main', content: '<h1>Example content</h1>' }],
      //     message: message,
      //   }),
      // });
      //
      // if (!emailResponse.ok) {
      //   console.error(`Error sending email to ${user.profiles.email}: ${emailResponse.statusText}`);
      // }
    }

    // return { status: 'success', message: 'Emails sent' };
    return { status: "success", message: "logic done" };
  } catch (error: any) {
    console.error(`Error in sendmails.ts: ${error.message}`);
    return { status: "error", message: "Internal server error" };
  }
});

// (profile_id = auth.uid()) for user_prizes
