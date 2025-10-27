import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { TMessageData } from "../types/types";
import {sendMessage} from "../services/message.service"

let io: Server | null = null;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
      console.log("User joined conversation ", conversationId);
    });

    // sending message and saving to db
    socket.on("send_message", async (data: TMessageData) => {
      const { conversationId, senderId, text } = data;

      const message = await sendMessage({ conversationId, senderId, text });
      io?.to(conversationId).emit("new_message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}
