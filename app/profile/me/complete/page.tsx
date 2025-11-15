"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { completeProfileSchema } from "@/zod/schemas";
import { Input } from "@/components/ui/input";
import { useCompleteProfile, useUploadImage } from "@/tanstack-query/mutation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authProvider";

const skills = [
  "Web Development",
  "Graphic Design",
  "Guitar",
  "Cooking",
  "English",
  "Chess",
  "Yoga",
  "Video Editing",
  "Photography",
  "App Development",
  "UI/UX Design",
  "Drawing",
  "Singing",
  "Dancing",
  "Hindi",
];

type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

function CompleteProfilePage() {
  const {data} = useAuth()
  const token = data?.accessToken || "";
  
  const { mutateAsync: saveImage, isPending: uploadPending } = useUploadImage();
  const { mutate: saveCompleteProfile, isPending: completePending } =
    useCompleteProfile(token);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const form = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      profilePicture: "",
      age: 0,
      bio: "",
      skillsToTeach: [],
      skillsToLearn: [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setProfileImageFile(file as File);
  };

  async function onSubmit(values: CompleteProfileFormData) {
    // console.log(values);
    if (!profileImageFile) {
      toast.error("Please select a profile picture");
      return;
    }
    const { data } = await saveImage(profileImageFile);

    const completeProfileData = {
      ...values,
      profilePicture: data.imageUrl,
    };

    if (!uploadPending) {
      saveCompleteProfile(completeProfileData);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 min-h-screen justify-center items-center bg-gradient-to-tr from-[#FAF9F6] to-blue-100">
        <Card className="w-[650px] h-auto my-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-poppins">
              Complete Your <span className="text-blue-800">Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-4">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-2">
                      <AvatarImage
                        src={
                          profileImageFile
                            ? URL.createObjectURL(profileImageFile)
                            : ""
                        }
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Upload className="h-4 w-4 text-gray-400" />
                  </label>
                </div>

                {/* Age */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your age"
                          onKeyDown={(e) => {
                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          {...field}
                          value={field.value ?? 0}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[100px]"
                          placeholder="Tell us about yourself..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills You Can Teach */}
                <FormField
                  control={form.control}
                  name="skillsToTeach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Skills You Can Teach
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const currentValues = field.value || [];
                          if (!currentValues.includes(value)) {
                            field.onChange([...currentValues, value]);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select skills you can teach" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skills.map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2 max-h-[100px] overflow-auto">
                        {field.value?.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center"
                          >
                            {skill}
                            <button
                              type="button"
                              className="ml-1 text-gray-500 hover:text-red-500"
                              onClick={() => {
                                field.onChange(
                                  field.value?.filter((s) => s !== skill)
                                );
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skillsToLearn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Skills You Want to Learn
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const currentValues = field.value || [];
                          if (!currentValues.includes(value)) {
                            field.onChange([...currentValues, value]);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select skills you want to learn" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {skills.map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2 max-h-[100px] overflow-auto">
                        {field.value?.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center"
                          >
                            {skill}
                            <button
                              type="button"
                              className="ml-1 text-gray-500 hover:text-red-500"
                              onClick={() => {
                                field.onChange(
                                  field.value?.filter((s) => s !== skill)
                                );
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={uploadPending || completePending}
                  className="w-full h-10 text-lg bg-primary-btn hover:bg-primary-btn-hover hover:text-black cursor-pointer"
                >
                  {uploadPending || completePending ? "Saving..." : "Save"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
export default CompleteProfilePage;
