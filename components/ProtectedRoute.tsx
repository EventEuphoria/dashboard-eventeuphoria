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
    } else if (currentUser && currentUser.role !== 'ORGANIZER') {
      router.push('/');
    } else{
        router.push('dashboard/')
    }
  }, [isAuthenticated, currentUser, router]);

  if (!isAuthenticated || (currentUser && currentUser.role !== 'ORGANIZER')) {
    return null;
  } else{
    return <>{children}</>;
  }

};

export default ProtectedRoute;
