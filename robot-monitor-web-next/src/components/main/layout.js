"use client";

import React from "react";
import { AuthProvider, useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";
// import AuthProvider from "@/app/(web-application)/(authentication)/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

import Navbar from './navbar'
import Footer from './footer'

export default function WelcomeLayout({ children }) {
    return (
        <>
            <AuthProvider>
                <ProtectedComponent>
                    <Navbar />
                    {children}
                    <Footer />
                </ProtectedComponent>
            </AuthProvider>
        </>
    )
}



function ProtectedComponent({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Define public routes
    const publicRoutes = ["/login"]; // Add more if needed

    React.useEffect(() => {
        if (!loading && !user && !publicRoutes.includes(pathname)) {
            // Redirect unauthenticated users to /signin
            router.push("/login");
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <>
                {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
                <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center justify-items-center">
                        <img
                            src="/monitor.png"
                            alt="Loading..."
                            className="w-32 h-32 animate-spin "
                        />
                        <h1 className="mt-10 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                            Hold On
                        </h1>
                        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                            Let us thinking something for you...
                        </p>
                        
                    </div>
                </main>
            </>
        );
    }

    // Allow access to public routes without authentication
    if (publicRoutes.includes(pathname)) {
        return <>{children}</>;
    }

    // If authenticated, render the protected content
    return <>{user ? children : null}</>;
}

