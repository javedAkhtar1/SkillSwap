import axios from "axios";
import { IUserSignup, IUserLogin } from "@/types/types";
import { signIn } from "next-auth/react";

export const userSignup = async (data: IUserSignup) => {
  try {
    const responseponse = await axios.post("/api/auth/signup", data);
    return responseponse.data;
  } catch (error) {
    console.log("Error signing up user:", error);
    throw error;
  }
};

export const userLogin = async (data: IUserLogin) => {
  const response = await signIn("credentials", {
    redirect: false,
    ...data,
  });

  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
};
