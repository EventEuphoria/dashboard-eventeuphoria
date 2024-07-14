// context/AuthContext.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthUser } from "@/types/datatypes";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/"
    });
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const currentUser = session?.user as AuthUser | null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
