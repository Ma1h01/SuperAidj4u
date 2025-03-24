"use client";
import { createContext, useContext, useState } from "react";
import { mockWarehouses } from "@/lib/mockData";

const UserMetaContext = createContext();

export function UserMetaProvider({ children }) {
  const [warehouses, setWarehouses] = useState(mockWarehouses);

  const addWarehouse = (newWarehouse) => {
    setWarehouses((prev) => [...prev, newWarehouse]);
  };

  const value = {
    warehouses,
    addWarehouse,
  };

  return (
    <UserMetaContext.Provider value={value}>
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