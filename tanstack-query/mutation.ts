import { useMutation } from "@tanstack/react-query";
import { changePassword, userLogin, userSignup, verifyEmail } from "./api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export const useSignUpMutation = () => {
  const router= useRouter();
  return useMutation({
    mutationFn: userSignup,
   onSuccess: (data, variables) => {
      const email = variables.email;
      toast.success("Account created successfully");
      router.push(`/verify-email?e=${encodeURIComponent(email)}`);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.error || "Signup failed");
    },
    onSettled: () => {
      // console.log("Signup mutation settled");
    },
  });
};

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      userLogin(data, router),

    onSuccess: (res) => {
      if (!res) return; // case when redirected to verify-email
      toast.success("Logged in successfully");
      router.push("/");
    },

    onError: (error: any) => {
      toast.error(error.message || "Login failed");
    },
  });
};
export const useVerifyEmailMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyEmail({ email, otp }),
    onSuccess: async () => {
      toast.success("Email verified successfully. Redirecting to login...");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Email verification failed");
    },
  });
};

export const useChangePasswordMutation = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      changePassword(data),
    onSuccess: () => {
      toast.success("Password changed successfully");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Password change failed");
    },
  });
};