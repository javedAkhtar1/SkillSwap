"use client";

import React from "react";
import { useGetPendingFriendRequestsSent } from "@/tanstack-query/query";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/context/authProvider";
import Link from "next/link";
import { TPopulatedUser } from "@/types/types";
import { useUnsendFriendRequest } from "@/tanstack-query/mutation";

export function isPopulatedUser(value: unknown): value is TPopulatedUser {
  return (
    typeof value === "object" && value !== null && "profilePicture" in value
  );
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);

  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `Sent ${count} ${label}${count > 1 ? "s" : ""} ago`;
  }

  return "Sent just now";
}

function RequestsSent() {
  const { data: sessionData } = useAuth();
  const token = sessionData?.accessToken || "";

  const { data } = useGetPendingFriendRequestsSent(token);
  const { mutate, isPending } = useUnsendFriendRequest(token);
  const requestsSent = data?.data?.requests || [];

  if (!requestsSent.length)
    return <p className="p-4 text-gray-600 text-center">No pending requests sent.</p>;

  return (
    <div className="space-y-4 p-4">
      {requestsSent.map((req) => (
        <div
          key={req._id}
          className="flex items-center justify-between bg-white shadow rounded-xl p-3 border"
        >
          {/* Left: Profile Image + Name */}
          <div className="flex items-center gap-3">
            {isPopulatedUser(req.to) && (
              <Image
                src={req.to.profilePicture}
                alt={req.to.name}
                width={45}
                height={45}
                className="rounded-md border"
              />
            )}

            <div>
              {isPopulatedUser(req.to) ? (
                <Link href={`/profile/${req.to.username}`}>
                  <p className="font-semibold hover:underline text-gray-900">
                    {req.to.name}
                  </p>
                </Link>
              ) : (
                <p className="font-semibold text-gray-900">Unknown User</p>
              )}

              <p className="text-xs text-gray-500">{timeAgo(req.createdAt)}</p>
            </div>
          </div>

          {/* Right: Unsend Button */}
          <Button
            variant="destructive"
            disabled={isPending}
            className="py-2 font-normal cursor-pointer hover:bg-red-700"
            onClick={() =>
              !isPending &&
              mutate(typeof req.to === "string" ? req.to : req.to._id)
            }
          >
            {isPending ? "Cancelling..." : "Unsend Request"}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default RequestsSent;
