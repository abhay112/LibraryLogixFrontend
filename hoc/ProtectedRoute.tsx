"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>; // Show loading while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
