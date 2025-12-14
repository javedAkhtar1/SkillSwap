"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, UserPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetProfileByUsername } from "@/tanstack-query/query";
import Loading from "@/components/shared/Loading";
import { useAuth } from "@/context/authProvider";
import {
  useCreateConversation,
  useSendFriendRequest,
} from "@/tanstack-query/mutation";

function OthersProfilePage() {
  const { username } = useParams();
  const { data: sessionData } = useAuth();
  const router = useRouter()
  const token = sessionData?.accessToken || "";
  const { mutate, isPending } = useSendFriendRequest(token);
  const { mutate: createConvo, isPending: convoPending } =
    useCreateConversation(token);

  const { data: apiResponse, isLoading: profileLoading } =
    useGetProfileByUsername(username as string);

  if (profileLoading) return <Loading />;

  if (!apiResponse || !apiResponse.data) {
    return <p className="p-4 text-center text-gray-500">Profile not found.</p>;
  }

  const profile = apiResponse.data;
  const isFriend = profile.friends.some(
    (friend) => friend._id === sessionData?.user.id
  );

  function handleSendRequest() {
    mutate(profile._id);
  }
  function handleCreateConversation() {
    createConvo(profile._id);
    router.push("/profile/me")
  }

  return (
    <div className="w-full h-auto lg:max-w-7xl max-w-4xl mx-auto mt-4 p-4">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 flex-1">
              <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-white shadow-md">
                <AvatarImage
                  // src="https://github.com/shadcn.png"
                  src={profile.profilePicture}
                  alt="Profile"
                />
                <AvatarFallback className="text-2xl">
                  {profile.username}
                </AvatarFallback>
              </Avatar>

              <div className="text-center md:text-left mt-4 md:mt-0">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {profile.name}
                </CardTitle>
                <p className="text-slate-600 mt-2">@{profile.username}</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  {isFriend ? (
                    <Badge className="bg-green-700 text-white px-4 text-sm">
                      <Check size={16} className="inline mr-1" />
                      Friend
                    </Badge>
                  ) : (
                    <Button
                      className="gap-2 bg-primary-btn hover:bg-primary-btn-hover hover:text-black text-sm h-9 hover:cursor-pointer"
                      onClick={handleSendRequest}
                      disabled={isPending}
                    >
                      <UserPlus size={16} />
                      {isPending ? "Sending..." : "Send Request"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="gap-2 text-sm h-9 bg-secondary-btn hover:cursor-pointer"
                    onClick={handleCreateConversation}
                    disabled={convoPending}
                  >
                    <MessageCircle size={16} />
                    Message
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-3 md:p-4 rounded-lg self-center md:self-start mt-4 md:mt-0">
              <div className="flex gap-4 md:gap-6">
                <div className="text-center">
                  <div className="font-bold text-base md:text-lg">
                    {profile.friends.length || 0}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600">
                    Connections
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-base md:text-lg">
                    {profile.skillsToTeach.length || 0}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600">
                    Skills
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-base md:text-lg">
                    {profile.skillsToLearn.length || 0}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600">
                    Learning
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">About Me</h3>
              <p className="text-slate-700 leading-relaxed">{profile.bio}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-blue-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="text-blue-700 font-semibold">
                      Can Teach
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsToTeach.map((s, i) => (
                      <Badge key={i} variant="secondary" className="text-sm">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="text-purple-700 font-semibold">
                      Wants to Learn
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsToLearn.map((s, i) => (
                      <Badge key={i} variant="outline" className="text-sm">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OthersProfilePage;
