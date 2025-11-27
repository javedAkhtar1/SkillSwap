"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/authProvider";
import toast from "react-hot-toast";
import { useGetProfileByUsername } from "@/tanstack-query/query";
import { useEditProfile, useUploadImage } from "@/tanstack-query/mutation";
import Loading from "@/components/shared/Loading";
import Image from "next/image";
import { TSkill } from "@/types/types";
import { skills } from "@/constants/skills";

function EditProfile() {
  const { data: session } = useAuth();
  const token = session?.accessToken || "";
  const query = session?.user?.username || session?.user?.email;

  // ❗ Hooks — must be declared before ANY return
  const { data: apiResponse, isLoading } = useGetProfileByUsername(query as string);
  const { mutateAsync: saveImage, isPending: uploadPending } = useUploadImage();
  const { mutateAsync: editProfile, isPending } = useEditProfile(token);

  const profile = apiResponse?.data;

  const [form, setForm] = useState({
    name: profile?.name ?? "",
    username: profile?.username ?? "",
    bio: profile?.bio ?? "",
    skillsToTeach: (profile?.skillsToTeach ?? []) as TSkill[],
    skillsToLearn: (profile?.skillsToLearn ?? []) as TSkill[],
  });

  const [imagePreview, setImagePreview] = useState<string | undefined>(profile?.profilePicture);
  const [file, setFile] = useState<File | null>(null);

  // ❗ Only now we may return conditionally
  if (isLoading) return <Loading />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleSkill = (field: "skillsToTeach" | "skillsToLearn", skill: TSkill) => {
    const other = field === "skillsToTeach" ? "skillsToLearn" : "skillsToTeach";

    if (form[other].includes(skill)) {
      toast.error(`Skill already exists in ${other}`);
      return;
    }

    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(skill)
        ? prev[field].filter(s => s !== skill)
        : [...prev[field], skill],
    }));
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = profile?.profilePicture;

      if (file) {
        const uploaded = await saveImage(file);
        imageUrl = uploaded.data.imageUrl;
      }

      await editProfile({
        ...form,
        profilePicture: imageUrl,
      });

      toast.success("Profile updated successfully 🎉");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Update failed";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border">

        {/* Image Upload */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src={imagePreview || "/placeholder.svg"}
            width={100}
            height={100}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border shadow-sm"
          />

          <label className="px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer hover:bg-gray-700 transition">
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const selected = e.target.files?.[0];
                if (!selected) return;
                setFile(selected);
                setImagePreview(URL.createObjectURL(selected));
              }}
            />
          </label>
        </div>

        {/* Inputs */}
        <Input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
        <Input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
        <Textarea name="bio" value={form.bio} onChange={handleChange} className="resize-none" placeholder="Bio" />

        {/* Skills Teach */}
        <div>
          <p className="font-semibold mb-2">Skills to Teach</p>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <button
                key={s}
                onClick={() => toggleSkill("skillsToTeach", s as TSkill)}
                className={`px-3 py-1 rounded border text-sm ${
                  form.skillsToTeach.includes(s as TSkill) ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Learn */}
        <div>
          <p className="font-semibold mb-2">Skills to Learn</p>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <button
                key={s}
                onClick={() => toggleSkill("skillsToLearn", s as TSkill)}
                className={`px-3 py-1 rounded border text-sm ${
                  form.skillsToLearn.includes(s as TSkill) ? "bg-green-600 text-white" : "bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full py-6 bg-primary-btn hover:text-black hover:bg-primary-btn-hover text-lg cursor-pointer"
          onClick={handleSubmit}
          disabled={isPending || uploadPending}
        >
          {isPending || uploadPending ? "Updating..." : "Save Changes"}
        </Button>

      </div>
    </div>
  );
}

export default EditProfile;
