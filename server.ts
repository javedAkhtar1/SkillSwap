import express from "express";
import { createServer } from "http";
import next from "next";
import { initSocket } from "./lib/socket";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);

  initSocket(server);

  // Use middleware to handle all requests
  app.use((req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("Server + Socket.IO running on http://localhost:3000");
  });
});
