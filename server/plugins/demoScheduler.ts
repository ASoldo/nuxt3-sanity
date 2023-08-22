import { useScheduler } from "#scheduler";

export default defineNitroPlugin(() => {
  // startScheduler();
});

function startScheduler() {
  const scheduler = useScheduler();

  scheduler
    .run(() => {
      // console.log("Cool beans! I run when Roots tells me to");
    })
    .everySeconds(5);
}
