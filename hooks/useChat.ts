"use client"
import { io } from "socket.io-client";
import { useEffect } from "react";

export default function useChat(conversationId: string) {
  const socket = io(process.env.BACKEND_URL);

  useEffect(() => {
    socket.emit("join_conversation", conversationId);

    socket.on("new_message", (msg) => {
      console.log("Got new message:", msg);
      // ui update here
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  const sendMessage = (message: any) => {
    socket.emit("send_message", message);
  };

  return { sendMessage };
}
