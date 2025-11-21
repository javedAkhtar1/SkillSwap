import "./lib/loadEnv";
import express from "express";
import { createServer } from "http";
import { initSocket } from "./lib/socket";
import dbConnect from "./lib/dbConnect";
import router from "./routes";
import cors from "cors"; 
import cookieParser from "cookie-parser";

async function main() {
  const app = express();
  const server = createServer(app);

  // Connect DB
  await dbConnect();

  // Init sockets
  initSocket(server);

  // Define API routes
    app.use(
    cors({
      origin: process.env.FRONTEND_URL, // your frontend URL
      credentials: true, // allow cookies/auth headers
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.get("/api/hello", (req, res) => res.json({ message: "Hello World" }));
  app.use(router);

  server.listen(process.env.PORT || 3001, () => {
    console.log(`✅ Backend + Socket.IO running on http://localhost:${process.env.PORT || 3001}`);
  });
}

main();
