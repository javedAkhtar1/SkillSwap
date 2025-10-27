"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/shared/Loading";

type UserContextType = {
  data: ReturnType<typeof useSession>["data"];
  status: ReturnType<typeof useSession>["status"];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();
  if (status === "loading") {
    return <Loading />
  }
  
  console.log(JSON.stringify(data, null, 2))
  return (
    <UserContext.Provider value={{ data, status }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("Provider missing for useAuth");
  return context;
};