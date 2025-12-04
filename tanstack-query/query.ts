import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchMessages, getAllUsers, getCurrentUserConversations, getPendingFriendRequestsReceived, getPendingFriendRequestsSent, getProfileByUsername } from "./api";

export const useGetProfileByUsername = (username: string) => {
  return useQuery({ // not using suspense as I need enabled here
    queryKey: ["profile", username],
    queryFn: () => getProfileByUsername(username),
    enabled: !!username,
  });
};

export const useFetchMessages = (conversationId: string, token: string) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId, token),
    enabled: !!conversationId,
  });
}

export const useGetPendingFriendRequestsSent = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["friend-requests-sent"],
    queryFn: () => getPendingFriendRequestsSent(token),
  });
}

export const useGetPendingFriendRequestsReceived = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["friend-requests-received"],
    queryFn: () => getPendingFriendRequestsReceived(token),
  });
}

export const useGetAllUsers = (page: number = 1, limit: number = 12, search?: string) => {
  return useSuspenseQuery({
    queryKey: ["users", page, limit, search],
    queryFn: () => getAllUsers(page, limit, search),
  });
}

export const useGetCurrentUserConversations = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["user-conversations"],
    queryFn: () => getCurrentUserConversations(token),
  });
}