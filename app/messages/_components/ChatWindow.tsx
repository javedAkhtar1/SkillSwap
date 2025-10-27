"use client";
import React, { useState } from "react";
import useChat from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authProvider";

function ChatWindow({ conversationId }: { conversationId: string }) {
  const { data } = useAuth();
  const [text, setText] = useState("");
  const { sendMessage } = useChat(
    conversationId,
    data?.user.id as string,
    data?.user.username as string
  );


  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(text);
    setText("");
  };

  return (
    <div>
      <label>Message:</label>
      <input
        className="border border-gray-300 p-2"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSend}>Send</Button>{" "}
    </div>
  );
}

export default ChatWindow;
