import axios from "axios";
import { IUserSignup, IUserLogin, TCompleteProfileData } from "@/types/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const userSignup = async (data: IUserSignup) => {
  try {
    const responseponse = await axios.post("/api/auth/signup", data);
    return responseponse.data;
  } catch (error) {
    console.log("Error signing up user:", error);
    throw error;
  }
};

export const userLogin = async (
  data: { email: string; password: string },
  router: AppRouterInstance
) => {
  const response = await signIn("credentials", {
    redirect: false,
    ...data,
  });

  if (response?.error === "EMAIL_NOT_VERIFIED") {
    toast.error("Email not verified. Redirecting...");
    router.push(`/verify-email?e=${encodeURIComponent(data.email)}`);
    return null; // mark as "handled"
  }

  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}

export const verifyEmail = async (data: { email: string; otp: string }) => {
  try {
    const response = await axios.post("/api/auth/verify-email", data);
    return response.data;
  } catch (error) {
    console.log("Error verifying email:", error);
    throw error;
  }
};


export const getProfileByUsername = async (username: string) => {
  try {
    const response = await axios.get(`/api/user/${username}`);
    return response.data;
  } catch (error) {
    console.log("Error getting profile by username:", error);
    throw error;
  }
};

export const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await axios.post("/api/user/change-password", data);
    return response.data;
  } catch (error) {
    console.log("Error changing password:", error);
    throw error;
  }
};

export const uploadImageToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("/api/upload", formData);
    return response.data;
  }
  catch (error) {
    console.log("Error uploading image:", error);
    throw error;
  }
}

export const completeProfile = async (data: TCompleteProfileData) => {
  try {
    const response = await axios.post("/api/user/complete-profile", data);
    return response.data;
  } catch (error) {
    console.log("Error completing profile:", error);
    throw error;
  }
}