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

  const { data, isLoading } = useFetchMessages(conversationId, token);
  const messages: TMessage[] = data?.messages || [];

  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!conversationId) return;

    socket.emit("join_conversation", conversationId);

    return () => {
      socket.emit("leave_conversation", conversationId);
    };
  }, [conversationId]);

  useEffect(() => {
    const handleIncoming = (msg: TMessage) => {
      const senderId =
        typeof msg.sender === "string" ? msg.sender : msg.sender?._id;

      if (senderId === userId) return;

      queryClient.setQueryData(
        ["messages", conversationId],
        (old: TMessagesResponse | undefined) => ({
          messages: [...(old?.messages || []), msg],
        })
      );
    };

    socket.on("new_message", handleIncoming);

    return () => {
      socket.off("new_message", handleIncoming);
    };
  }, [conversationId, userId, queryClient]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Send message */
  const handleSend = () => {
    if (!text.trim()) return;

    const payload = { conversationId, senderId: userId, text };

    const tempMessage: TMessage = {
      _id: "temp-" + Date.now(),
      conversation: conversationId,
      sender: { _id: userId, name: senderName },
      text,
      readBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "sending",
      __v: 0,
    };

    queryClient.setQueryData(
      ["messages", conversationId],
      (old: TMessagesResponse | undefined) => ({
        messages: [...(old?.messages || []), tempMessage],
      })
    );

    socket.emit("send_message", payload);

    setText("");
    inputRef.current?.focus(); // ✅ keep cursor
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {isLoading && <p>Loading...</p>}

        {messages.map((m) => {
          const isMine = m.sender?._id === userId;

          return (
            <div
              key={m._id}
              className={`flex w-full ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-xl break-words ${
                  isMine ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {/* Text */}
                <div className="text-sm leading-relaxed">{m.text}</div>

                {/* Meta row */}
                <div
                  className={`mt-1 flex items-center justify-end gap-1 text-[10px] opacity-80 ${
                    isMine ? "text-white" : "text-black"
                  }`}
                >
                  <span>
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t flex items-center gap-2">
        <input
          ref={inputRef}
          className="flex-1 min-w-0 border rounded px-3 py-2 text-sm"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="shrink-0 bg-primary-btn hover:bg-primary-btn-hover px-3 py-2 text-sm rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
