"use client";

import React from "react";
import { RoverProvider } from "@/components/context/RoverContext";
import {
  AuthProvider,
  useAuth,
} from "@/app/(web-application)/(authentication)/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <RoverProvider>
        <ProtectedComponent>{children}</ProtectedComponent>
      </RoverProvider>
    </AuthProvider>
  );
}

function ProtectedComponent({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Define public routes
  const publicRoutes = ["/login", "/"]; // Add more if needed

  React.useEffect(() => {
    if (
      !loading &&
      !user &&
      !publicRoutes.includes(pathname) &&
      pathname !== "/login"
    ) {
      router.replace("/login");
    }
  }, [user, loading, router, pathname]);

  if (loading && pathname !== "/") {
    return (
      <main className="flex h-screen items-center justify-center bg-black px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center flex ">
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-black bg-white sm:text-9xl duration-500 animate-bounce">
            Rover
          </h1>
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-white sm:text-9xl ">
            ant Monitor
          </h1>
        </div>
      </main>
    );
  }

  if (publicRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return <>{user ? children : null}</>;
}
