type GameSessionResponse = {
  error?: string;
  message?: string;
  code?: boolean;
  latestSession?: string;
  currentDate?: string;
};
export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  async function checkGameSession() {
    try {
      const response = await $fetch("/api/check_game_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_uuid: user.value?.id, // Assuming user.value has an 'id' property for the UUID
        }),
      });

      const data = response;

      // Check the response data for whatever conditions you have. For instance:
      if ((data as GameSessionResponse)?.code === false) {
        return navigateTo("/"); // Redirect if the user has already played
      }
      return navigateTo("/game");
    } catch (error) {
      console.error("Error checking game session:", error);
      return navigateTo("/");
    }
  }

  if (!user.value && to.path === "/game") {
    return navigateTo("/");
  }
  if (user.value && to.path === "/game") {
    // checkGameSession();
    console.log("Check Game Session");
    console.log(checkGameSession());
  }

  if (!user.value && to.path === "/profile") {
    return navigateTo("/");
  }
  if (!user.value && to.path === "/prizes") {
    return navigateTo("/");
  }
  // if (user.value && to.path === "/success") {
  //   return navigateTo("/");
  // }
});
