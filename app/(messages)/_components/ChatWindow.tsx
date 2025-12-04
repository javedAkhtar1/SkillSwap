"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/authProvider";
import { useFetchMessages } from "@/tanstack-query/query";
import { useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socket";
import { TMessage, TMessagesResponse } from "@/types/types";

type Props = {
  conversationId: string;
};

export default function ChatWindow({ conversationId }: Props) {
  const { data: session } = useAuth();
  const token = session?.accessToken || "";
  const userId = session?.user?.id || "";
  const senderName = session?.user?.username || "";

  /** Fetch initial messages */
  const { data, isLoading } = useFetchMessages(conversationId, token);
  const messages: TMessage[] = data?.messages || [];

  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  /** Join conversation room */
  useEffect(() => {
    if (!conversationId) return;

    socket.emit("join_conversation", conversationId);

    return () => {
      socket.emit("leave_conversation", conversationId);
    };
  }, [conversationId]);

  /* Listen for REALTIME incoming messages */
  useEffect(() => {
    const handleIncoming = (msg: TMessage) => {
      const senderIdFromMsg =
        typeof msg.sender === "string" ? msg.sender : msg.sender?._id;

      if (senderIdFromMsg === userId) return;

      queryClient.setQueryData(
        ["messages", conversationId],
        (oldData: TMessagesResponse | undefined) => {
          const prev = oldData?.messages || [];
          return { messages: [...prev, msg] };
        }
      );
    };

    socket.on("new_message", handleIncoming);

    // CLEANUP MUST RETURN void
    return () => {
      socket.off("new_message", handleIncoming);
    };
  }, [conversationId, userId, queryClient]);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /** Send message */
  const handleSend = () => {
    if (!text.trim()) return;

    const payload = { conversationId, senderId: userId, text };

    // OPTIMISTIC UI update
    const tempMessage: TMessage = {
      _id: "temp-" + Date.now(),
      conversation: conversationId,
      sender: { _id: userId, name: senderName },
      text,
      readBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };

    queryClient.setQueryData(
      ["messages", conversationId],
      (oldData: TMessagesResponse | undefined) => {
        const prev = oldData?.messages || [];
        return { messages: [...prev, tempMessage] };
      }
    );
    socket.emit("send_message", payload);

    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading && <p>Loading...</p>}

        {messages.map((m) => {
          const isMine = m.sender?._id === userId;

          return (
            <div
              key={m._id}
              className={`max-w-xs px-4 py-2 rounded-xl ${
                isMine
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              {m.text}
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-primary-btn hover:bg-primary-btn-hover px-4 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
