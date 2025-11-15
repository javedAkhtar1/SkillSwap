import axios from "axios";
import {
  IUserSignup,
  TCompleteProfileData,
  TMessageData,
  TMessagesResponse,
} from "@/types/types";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import customAxios from "@/lib/axios-interceptor";

export const userSignup = async (data: IUserSignup) => {
  try {
    const response = await customAxios.post(
      `/api/auth/signup`,
      data
    );
    return response.data;
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
};

export const verifyEmail = async (data: { email: string; otp: string }) => {
  try {
    const response = await customAxios.post(
      `/api/auth/verify-email`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Error verifying email:", error);
    throw error;
  }
};

export const getProfileByUsername = async (query: string) => {
  try {
    const response = await customAxios.get(
      `/api/user/profile?q=${query}` // can be username or email
    );
    return response.data;
  } catch (error) {
    console.log("Error getting profile by username:", error);
    throw error;
  }
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}, token: string) => {
  try {
    const response = await customAxios.post(
      `/api/user/change-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
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
    const response = await customAxios.post(
      `/api/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log("Error uploading image:", error);
    throw error;
  }
};

export const completeProfile = async (data: TCompleteProfileData, token: string) => {
  try {
    const response = await customAxios.post(
      `/api/user/complete-profile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error completing profile:", error);
    throw error;
  }
};

export const fetchMessages = async (
  conversationId: string,
  token: string,
): Promise<TMessagesResponse> => {
  try {
    const response = await customAxios.get(
      `/api/message?chat=${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessages = async (data: TMessageData, token: string) => {
  try {
    const response = await customAxios.post(
      `/api/message/send`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error sending message:", error);
    throw error;
  }
};
