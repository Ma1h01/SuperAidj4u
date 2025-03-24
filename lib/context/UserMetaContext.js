"use client";
import { createContext, useContext } from "react";

const UserMetaContext = createContext();

export function UserMetaProvider({ children }) {
  return (
    <UserMetaContext.Provider value={{}}>
      {children}
    </UserMetaContext.Provider>
  );
}

export function useUserMeta() {
  const context = useContext(UserMetaContext);
  if (!context) {
    throw new Error("useUserMeta must be used within a UserMetaProvider");
  }
  return context;
} 