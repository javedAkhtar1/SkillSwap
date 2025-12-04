"use client";
import { useAuth } from "@/context/authProvider";
import { useGetCurrentUserConversations } from "@/tanstack-query/query";
import { TConversationUser } from "@/types/types";
import Image from "next/image";

type Props = {
  activeConvo: string | null;
  setActiveConvo: (id: string) => void;
  setActiveUser: (user: TConversationUser) => void;
};

export default function MessagesSidebar({
  activeConvo,
  setActiveConvo,
  setActiveUser,
}: Props) {
  const { data: sessionData } = useAuth();
  const token = sessionData?.accessToken || "";

  const { data, isLoading } = useGetCurrentUserConversations(token);

  const convos = data?.data || [];

  if (isLoading) return <p className="p-4">Loading...</p>;

  if (convos.length === 0)
    return <p className="p-4 text-gray-500">No conversations yet.</p>;

  return (
    <div className="h-full overflow-y-auto">
      {convos.map((convo) => {
        const other = convo.participants.find(
          (p) => p._id !== sessionData?.user?.id
        );

        // if somehow missing a second participant, skip
        if (!other) return null;

        return (
          <div
            key={convo._id}
            onClick={() => {
              setActiveConvo(convo._id);
              setActiveUser(other);
            }}
            className={`flex items-center gap-3 p-4 cursor-pointer border-b transition ${
              activeConvo === convo._id ? "bg-gray-200" : ""
            }`}
          >
            <Image
              src={other.profilePicture}
              width={24}
              height={24}
              alt={other.name}
              className="rounded-full object-cover"
            />

            <div>
              <p className="font-semibold">{other.name}</p>
              <p className="text-sm text-gray-500 line-clamp-1">
                {convo?.lastMessage?.text || "Say hi!"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
