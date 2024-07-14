// components/ProtectedRoute.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role: string }) => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (currentUser?.role !== role) {
        router.push('/');
      }
    }
  }, [isLoading, isAuthenticated, currentUser, router, role]);

  if (isLoading || !isAuthenticated || (currentUser && currentUser.role !== role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
