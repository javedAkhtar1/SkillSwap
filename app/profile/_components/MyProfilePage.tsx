"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useGetProfileByUsername } from "@/tanstack-query/query";
import Loading from "@/components/shared/Loading";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function MyProfilePage() {
  const { data: session } = useSession();
  const query = session?.user?.username || session?.user?.email;

  const { data: apiResponse, isLoading: profileLoading } =
    useGetProfileByUsername(query as string);

  if (profileLoading) {
    return <Loading />;
  }
  const profile = {
    ...apiResponse?.data,
    skillsToTeach: apiResponse?.data?.skillsToTeach || [],
    skillsToLearn: apiResponse?.data?.skillsToLearn || [],
  };
  // console.log(profile.profilePicture)
  
  return (
    <div className="w-full h-auto lg:max-w-7xl max-w-4xl mx-auto">
      {profile.profileComplete === false && (
        <div className="flex gap-2 mb-3 items-center justify-center text-sm px-3 py-2 rounded-2xl bg-red-200">
          <p className="text-red-800">
            Your profile is not complete yet. Please complete your profile to
            unlock all features.
          </p>
          <Link href={"/profile/me/complete"}>
            <Button className="bg-primary-btn hover:bg-primary-btn-hover hover:text-black cursor-pointer text-sm h-8">
              Complete Profile
            </Button>
          </Link>
        </div>
      )}
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
              </div>
            </div>

            <div className="bg-slate-100 p-3 md:p-4 rounded-lg self-center md:self-start mt-4 md:mt-0">
              <div className="flex gap-4 md:gap-6">
                <div className="text-center">
                  <div className="font-bold text-base md:text-lg">{profile.friends?.length || 0}</div>
                  <div className="text-xs md:text-sm text-slate-600">
                    Connections
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-base md:text-lg">{profile.skillsToTeach.length || 0}</div>
                  <div className="text-xs md:text-sm text-slate-600">
                    Skills
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-base md:text-lg">{profile.skillsToLearn.length || 0}</div>
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
                    {profile.skillsToTeach.map((item) => (
                      <Badge key={item} variant="secondary" className="text-sm">
                        {item}
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
                    {profile.skillsToLearn.map((item) => (
                      <Badge key={item} variant="outline" className="text-sm">
                        {item}
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

export default MyProfilePage;
