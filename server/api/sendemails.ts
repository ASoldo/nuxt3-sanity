export default defineEventHandler(async () => {
  try {
    const users = [
      {
        email: "soldo.andrej@gmail.com",
        name: "User One",
        progress: "5 out of 6 games played this week",
      },
      {
        email: "tonci.braskic@digitalarena.hr",
        name: "User Two",
        progress: "3 out of 6 games played this week",
      },
    ];

    for (const user of users) {
      const message = {
        from_email: "noreply@k-marke-t.com",
        to: [{ email: user.email, type: "to" }],
        subject: "K-MARKE-T Nagrada",
        global_merge_vars: [
          {
            name: "our_custom_field",
            content: user.progress,
          },
        ],
      };

      const response = await fetch(
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

      if (!response.ok) {
        console.error(
          `Error sending email to ${user.email}: ${response.statusText}`
        );
      }
    }

    return { status: "success", message: "Emails sent" };
  } catch (error: any) {
    console.error(`Error in sendmails.ts: ${error.message}`);
    return { status: "error", message: "Internal server error" };
  }
});
