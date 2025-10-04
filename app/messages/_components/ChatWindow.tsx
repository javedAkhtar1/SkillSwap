"use client"
import React from "react";
import useChat from "@/hooks/useChat";
import { Button } from "@/components/ui/button";

function ChatWindow({ conversationId }: { conversationId: string }) {
  const { sendMessage } = useChat(conversationId);

  const handleSend = () => {
    sendMessage({ conversation: conversationId, text: "Hello!" });
  };

  return (
    <div>
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}

export default ChatWindow;
