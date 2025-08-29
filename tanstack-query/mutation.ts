import { useMutation } from "@tanstack/react-query";
import { userLogin, userSignup } from "./api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: userSignup,
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (error: any) => {
      console.log(error)
      toast.error(error.response?.data?.error || "Signup failed");
    },
    onSettled: () => {
      console.log("Signup mutation settled");
    },
  });
};

export const useLoginMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message|| "Login failed");
    },
    onSettled: () => {
      console.log("Login mutation settled");
    },
  });
};
