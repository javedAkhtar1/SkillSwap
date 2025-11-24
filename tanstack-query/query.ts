import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchMessages, getPendingFriendRequestsReceived, getPendingFriendRequestsSent, getProfileByUsername } from "./api";

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