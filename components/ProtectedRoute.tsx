"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, currentUser, isLoading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/login');
        } else if (currentUser && currentUser.role !== 'ORGANIZER') {
          router.push('https://www.eventeuphoria.fun');
        }
      }
    }, [isLoading, isAuthenticated, currentUser, router]);
  
    if (isLoading || !isAuthenticated || (currentUser && currentUser.role !== 'ORGANIZER')) {
      return null;
    }
  
    return <>{children}</>;

};

export default ProtectedRoute;
