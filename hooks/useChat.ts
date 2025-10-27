"use client";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useFetchMessages } from "@/tanstack-query/query";
import { TMessage } from "@/types/types";
import { useSendMessage } from "@/tanstack-query/mutation";

export default function useChat(conversationId: string, senderId: string, senderName: string) {
  const { data, isLoading } = useFetchMessages(conversationId);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const {mutateAsync: sendMessageMutation, isPending: isSending} = useSendMessage(conversationId, senderId, senderName);
  const socketRef = useRef<any>(null);

  // load existing messages
  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    if (!conversationId) return;

    socketRef.current = io(process.env.BACKEND_URL, {transports: ["websocket"]});

    // join conversation
    socketRef.current.emit("join_conversation", conversationId);

    // listening for new messages
    socketRef.current.on("new_message", (msg: TMessage) => {
      console.log("Got new message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [conversationId]);

  const sendMessage = async (text:string) => {
    if (!socketRef.current || !text.trim()) return;

    const payload = { conversationId, senderId, text };
    const newMessage = await sendMessageMutation(payload);

    // Emit via socket so other user sees it in real time
    socketRef.current.emit("send_message", newMessage);
  }

  return {
    messages,
    isLoading,
    sendMessage,
    isSending,
  };
}
