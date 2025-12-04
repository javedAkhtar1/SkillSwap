"use client";

import ChatWindow from "./_components/ChatWindow";
import MessagesSidebar from "./_components/MessagesSidebar";
import { useState } from "react";
import Image from "next/image";
import { TConversationUser } from "@/types/types";

export default function MessagesPage() {
  const [activeConvo, setActiveConvo] = useState<string | null>(null);

  // the active user object (NOT just id!)
  const [activeUser, setActiveUser] = useState<TConversationUser | null>(null);

  const handleBack = () => {
    setActiveConvo(null);
    setActiveUser(null);
  };

  return (
    <div className="h-[calc(100vh-80px)]">
      {/* DESKTOP VIEW */}
      <div className="hidden md:grid grid-cols-12 h-full">
        {/* Sidebar */}
        <div className="col-span-4 border-r">
          <MessagesSidebar
            activeConvo={activeConvo}
            setActiveConvo={setActiveConvo}
            setActiveUser={setActiveUser}
          />
        </div>

        {/* Chat Window */}
        <div className="col-span-8">
          {activeConvo ? (
            <ChatWindow conversationId={activeConvo} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden h-full">
        {/* Sidebar when no convo selected */}
        {!activeConvo && (
          <MessagesSidebar
            activeConvo={activeConvo}
            setActiveConvo={setActiveConvo}
            setActiveUser={setActiveUser}
          />
        )}

        {/* Mobile Chat View */}
        {activeConvo && (
          <div className="relative h-full">
            {/* MOBILE HEADER (name + image) */}
            {activeUser && (
              <div className="flex items-center gap-3 p-3 border-b bg-white shadow-md sticky top-0 z-20">
                <button
                  onClick={handleBack}
                  className="text-blue-700 font-semibold"
                >
                  ←
                </button>

                <Image
                  src={activeUser.profilePicture}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="user"
                />

                <div>
                  <p className="font-semibold">{activeUser.name}</p>
                  <p className="text-sm text-gray-600">@{activeUser.username}</p>
                </div>
              </div>
            )}

            {/* Chat Window */}
            <div className="h-full">
              <ChatWindow conversationId={activeConvo} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
