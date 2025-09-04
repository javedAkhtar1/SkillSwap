import { useQuery } from "@tanstack/react-query";
import { getProfileByUsername } from "./api";

export const useGetProfileByUsername = (username: string) => {
  return useQuery({ // not using suspense as i need enabled here
    queryKey: ["profile", username],
    queryFn: () => getProfileByUsername(username),
    enabled: !!username,
  });
};
