import net from "net";
import initServer from "./init/index.js";

const PORT = 5555;

const server = net.createServer((socket) => {
  console.log(
    `Client connected from: ${socket.remoteAddress}:${socket.remotePort}`,
  );

  socket.on("data", (data) => {
    console.log(data);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

initServer()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Echo server listening on port ${PORT}`);
      console.log(server.address());
    });
  })
  .catch((err) => {
    console.error(err);
  });
