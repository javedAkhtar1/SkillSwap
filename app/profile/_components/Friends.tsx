"use client";

import Loading from "@/components/shared/Loading";
import { useAuth } from "@/context/authProvider";
import { useGetProfileByUsername } from "@/tanstack-query/query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { useUnfriend } from "@/tanstack-query/mutation";

function Friends() {
  const { data: session } = useAuth();
  const query = session?.user?.username || session?.user?.email;
  const token = session?.accessToken || "";
  const { data: apiResponse, isLoading } = useGetProfileByUsername(
    query as string
  );

  const { mutate: unfriend, isPending: isUnfriending } = useUnfriend(token);

  if (isLoading) return <Loading />;

  const friends = apiResponse?.data?.friends || [];

  if (!friends.length) {
    return <p className="p-4 text-gray-600 text-center">No friends yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Friends ({friends.length})
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            {/* Left: Profile Pic + Username */}
            <Link
              href={`/profile/${friend.username}`}
              className="flex items-center gap-3 group"
            >
              <Image
                src={friend.profilePicture}
                alt={friend.username}
                width={55}
                height={55}
                className="rounded-md border object-cover" // NOT fully round
              />

              <p className="font-semibold text-gray-900 group-hover:underline">
                {friend.username}
              </p>
            </Link>

            {/* Right: Unfriend Button */}
            <Button
              size="sm"
              className="px-3 py-2 cursor-pointer bg-secondary-btn hover:bg-gray-300 text-black"
              onClick={() => unfriend(friend._id)}
              disabled={isUnfriending}
            >
                {isUnfriending ? "Removing..." : "Unfriend"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;
