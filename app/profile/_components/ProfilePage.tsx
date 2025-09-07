"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, UserPlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetProfileByUsername } from "@/tanstack-query/query";
import { TUserProfile } from "@/types/types";
import Loading from "@/components/shared/Loading";

function ProfilePage() {
  const { username } = useParams();
  const { data: apiResponse, isLoading: profileLoading } =
    useGetProfileByUsername(username as string);
  const profile: TUserProfile = apiResponse?.data || {};

  if (profileLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-start justify-center py-4 px-4 sm:px-6 lg:px-8">
      {/* <ProfileSidebar /> */}
      <div className="w-full h-full lg:max-w-7xl max-w-4xl mt-14 mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 flex-1">
                <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-white shadow-md">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
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
                    <Button className="gap-2 bg-primary-btn hover:bg-primary-btn-hover hover:text-black text-sm h-9 hover:cursor-pointer">
                      <UserPlus size={16} />
                      Send Request
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 text-sm h-9 bg-secondary-btn hover:cursor-pointer"
                    >
                      <MessageCircle size={16} />
                      Message
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats section - on right for larger screens, centered below for smaller */}
              <div className="bg-slate-100 p-3 md:p-4 rounded-lg self-center md:self-start mt-4 md:mt-0">
                <div className="flex gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="font-bold text-base md:text-lg">42</div>
                    <div className="text-xs md:text-sm text-slate-600">
                      Connections
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-base md:text-lg">18</div>
                    <div className="text-xs md:text-sm text-slate-600">
                      Skills
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-base md:text-lg">7</div>
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
                      <Badge variant="secondary" className="text-sm">
                        React
                      </Badge>
                      <Badge variant="secondary" className="text-sm">
                        TypeScript
                      </Badge>
                      <Badge variant="secondary" className="text-sm">
                        UI/UX Design
                      </Badge>
                      <Badge variant="secondary" className="text-sm">
                        Figma
                      </Badge>
                      <Badge variant="secondary" className="text-sm">
                        CSS Animations
                      </Badge>
                      <Badge variant="secondary" className="text-sm">
                        Next.js
                      </Badge>
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
                      <Badge variant="outline" className="text-sm">
                        Three.js
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        GraphQL
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        AWS
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        Machine Learning
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        Rust
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
