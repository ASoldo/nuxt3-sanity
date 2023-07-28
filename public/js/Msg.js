document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("message", function(a) {
    switch (a.data.message) {
      case "EndGame":
        c3_callFunction("EndGame", [a.data.payload.Score]);
        break;

      case "Signal":
        console.log("Signal calling...");
        c3_callFunction("StartGame", [
          a.data.payload.Score,
          a.data.payload.CustomObject,
        ]);
        break;

      case "Handshake":
        console.log("Handshake calling...");
        c3_callFunction("InitHandshake", [a.data.payload.User_uuid]);
        break;

      default:
        break;
    }
  });
});
