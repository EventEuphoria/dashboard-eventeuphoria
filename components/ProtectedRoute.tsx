"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (currentUser) {
      if (currentUser.role === 'ORGANIZER') {
        router.push('https://dashboard.eventeuphoria.fun/');
      } else {
        router.push('https://www.eventeuphoria.fun/');
      }
    }
  }, [isAuthenticated, currentUser, router]);

  if (!isAuthenticated || !currentUser) {
    return null;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
