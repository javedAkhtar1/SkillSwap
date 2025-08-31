import { useMutation } from "@tanstack/react-query";
import { userLogin, userSignup, verifyEmail } from "./api";
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
    mutationFn: userLogin,
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message || "Login failed");
    },
    onSettled: () => {
      // console.log("Login mutation settled");
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
