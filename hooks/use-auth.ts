"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: async (email: string, password: string) => {
        // In a real app, this would make an API call
        const mockUser = {
          id: "1",
          email,
          name: email.split("@")[0],
        };
        set({ user: mockUser });
      },
      signUp: async (email: string, password: string, name: string) => {
        // In a real app, this would make an API call
        const mockUser = {
          id: "1",
          email,
          name,
        };
        set({ user: mockUser });
      },
      signOut: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);