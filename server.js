const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});



io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("stream", (data) => {
    console.log(data);
    // socket.broadcast.emit("stream", data);
  }
  );

});


http.listen(3000, () => {
  console.log("listening on *:3000");
});