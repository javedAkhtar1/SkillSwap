import { useQuery } from "@tanstack/react-query";
import { fetchMessages, getProfileByUsername } from "./api";

export const useGetProfileByUsername = (username: string) => {
  return useQuery({ // not using suspense as I need enabled here
    queryKey: ["profile", username],
    queryFn: () => getProfileByUsername(username),
    enabled: !!username,
  });
};

export const useFetchMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
  });
}