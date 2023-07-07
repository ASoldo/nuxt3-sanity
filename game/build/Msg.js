document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("message", function(a) {
    switch (a.data.message) {
      case "EndGame":
        c3_callFunction("EndGame", [a.data.payload.Score]);
        break;

      case "Signal":
        console.log("messaageeee seeeeeeeent");
        c3_callFunction("StartGame", [
          a.data.payload.Score,
          a.data.payload.CustomObject,
        ]);
        break;

      default:
        break;
    }
  });
});
