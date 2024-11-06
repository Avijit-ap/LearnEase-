"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAuth as useAuthStore } from "@/hooks/use-auth";

const AuthContext = createContext<ReturnType<typeof useAuthStore> | undefined>(
  undefined
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthStore();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}