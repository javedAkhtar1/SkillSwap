import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  completeProfile,
  sendMessages,
  uploadImageToCloudinary,
  userLogin,
  userSignup,
  verifyEmail,
} from "./api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  TCompleteProfileData,
  TMessage,
  TMessageData,
  TMessagesResponse,
} from "@/types/types";

export const useSignUpMutation = () => {
  const router = useRouter();
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

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadImageToCloudinary(file),
    onSuccess: () => {
      console.log("Image uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Image upload failed");
    },
  });
};

export const useCompleteProfile = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: TCompleteProfileData) => completeProfile(data),
    onSuccess: () => {
      toast.success("Profile completed successfully");
      router.push("/profile/me");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Profile completion failed");
    },
  });
};

export const useSendMessage = (
  conversationId: string,
  senderId: string,
  senderName: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TMessageData) => sendMessages(data),

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });

      // get previous cached response
      const previous = queryClient.getQueryData<TMessagesResponse>([
        "messages",
        conversationId,
      ]);

      const previousMessages = previous?.messages || [];

      // create temp message
      const tempMessage: TMessage = {
        _id: "temp-" + Date.now(),
        conversation: conversationId,
        sender: { _id: senderId, name: senderName },
        text: variables.text,
        readBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };

      // update cache optimistically
      queryClient.setQueryData(
        ["messages", conversationId],
        (old?: TMessagesResponse) => ({
          messages: [...(old?.messages || []), tempMessage],
        })
      );

      return { previous, previousMessages, tempMessage };
    },

    onError: (err, _, context) => {
      console.error("Message send failed", err);
      if (context?.previous) {
        queryClient.setQueryData(
          ["messages", conversationId],
          context.previous
        );
      }
    },

    onSuccess: (newMessage: TMessage, _, context) => {
      queryClient.setQueryData(
        ["messages", conversationId],
        (old?: TMessagesResponse) => ({
          messages: (old?.messages || []).map((m) =>
            m._id === context?.tempMessage._id ? newMessage : m
          ),
        })
      );
    },
  });
};

