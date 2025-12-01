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
import { skills } from "@/constants/skills";

type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

function CompleteProfilePage() {
  const { data } = useAuth();
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
    setProfileImageFile(file || null);
  };

  async function onSubmit(values: CompleteProfileFormData) {
    if (!profileImageFile)
      return toast.error("Please select a profile picture");

    const { data } = await saveImage(profileImageFile);

    const completeProfileData = { ...values, profilePicture: data.imageUrl };

    if (!uploadPending) {
      saveCompleteProfile(completeProfileData);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#FAF9F6] to-blue-100 px-4">
      <Card className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl my-10">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-poppins">
            Complete Your <span className="text-blue-800">Profile</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* IMAGE UPLOAD */}
              <div className="flex flex-col items-center mb-4">
                <label className="cursor-pointer flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-2">
                    <AvatarImage
                      src={
                        profileImageFile
                          ? URL.createObjectURL(profileImageFile)
                          : undefined
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

              {/* AGE */}
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
                        {...field}
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-", "."].includes(e.key) &&
                          e.preventDefault()
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BIO */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SKILLS TO TEACH */}
              <FormField
                control={form.control}
                name="skillsToTeach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Skills You Can Teach
                    </FormLabel>
                    <Select
                      onValueChange={(v) =>
                        !field.value.includes(v) &&
                        field.onChange([...field.value, v])
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select skills" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {skills.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
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
                            onClick={() =>
                              field.onChange(
                                field.value.filter((s) => s !== skill)
                              )
                            }
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              {/* SKILLS TO LEARN */}
              <FormField
                control={form.control}
                name="skillsToLearn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Skills You Want to Learn
                    </FormLabel>
                    <Select
                      onValueChange={(v) =>
                        !field.value.includes(v) &&
                        field.onChange([...field.value, v])
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select skills" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {skills.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
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
                            onClick={() =>
                              field.onChange(
                                field.value.filter((s) => s !== skill)
                              )
                            }
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-10 text-lg bg-primary-btn hover:bg-primary-btn-hover hover:text-black"
                disabled={uploadPending || completePending}
              >
                {uploadPending || completePending ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CompleteProfilePage;
