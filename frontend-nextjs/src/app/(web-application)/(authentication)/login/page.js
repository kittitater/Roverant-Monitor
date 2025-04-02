// app/signin/page.js

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GalleryVerticalEnd } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/(web-application)/(authentication)/firebase/firebase"; // Import the Firebase auth module
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext"; // Import the useAuth hook

export default function SignInPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { user, loading, setUser } = useAuth(); // Destructure user and loading from AuthContext

  useEffect(() => {
    console.log("Auth state changed:", { user, loading }); // Debug log
    if (!loading && user) {
      console.log("User is authenticated. Redirecting to /dashboard.");
      router.push("/dashboard");
    } else if (!loading && !user) {
      console.log("No authenticated user. Staying on sign-in page.");
    }
  }, [user, loading, router]);

  async function handleGoogleSignIn() {
    setErrorMsg("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Obtain the Firebase ID token
      const idToken = await firebaseUser.getIdToken();
      console.log("Firebase ID Token:", idToken); // Debug log

      const res = await fetch(`https://api-roverant.mooo.com/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: firebaseUser.displayName,
          role: "user", // Or any default role
          id_token: idToken, // Ensure backend expects 'id_token'
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Registration failed:", errorData);
        throw new Error(
          `Failed to register user: ${errorData.detail || res.status}`
        );
      }

      const data = await res.json();
      console.log("Registration successful:", data); // Debug log

      // Set user info in AuthContext
      setUser({
        user_id: data.user_id,
        firebase_uid: data.firebase_uid,
        username: data.username,
        email: data.email,
        role: data.role,
        created_at: data.created_at,
      });

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Error during sign-in:", err);
      setErrorMsg(err.message);
    }
  }

  // Show loading state if authentication is being checked
  if (loading) {
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

  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* left Side Image (Visible on large screens) */}
        {/* <div className="relative hidden bg-muted lg:block col-span-1">
          <Image
            src="/roverant-rover.jpg"
            alt="Image"
            width={500}
            height={500}
            className="absolute inset-0 h-full w-full object-cover opacity-75"
          />
        </div> */}

        {/* right Side Content */}
        <div className="flex flex-col gap-4 p-6 md:p-10 col-span-2">
          {/* Logo and Title Section */}
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="flex items-center gap-4 font-semibold">
              <div className="flex h-7 w-7 items-center justify-center ">
                <Image
                  alt="Your Company"
                  src="/RM.png"
                  width={150}
                  height={150}
                  className="mx-auto h-auto w-auto "
                />
              </div>
              <div className="flex items-center">
                <span className="text-white font-semibold text-xl bg-black">
                  Rover
                </span>
                <span className="text-black font-semibold text-xl">
                  ant Monitor
                </span>
              </div>
            </a>
          </div>

          {/* Login Form Section */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="border-0 border-gray-200 rounded-3xl sm:p-10 p-5">
              <div className="w-full max-w-2xl ">
                <Image
                  alt="Your Company"
                  src="/RM.png"
                  width={100}
                  height={100}
                  className="mx-auto h-36 w-auto"
                />
                <div className="flex justify-center">
                  <h2 className="mt-10 text-center text-4xl sm:text-6xl font-semibold tracking-tight text-white bg-black">
                    Rover
                  </h2>
                  <h2 className="mt-10 text-center text-4xl sm:text-6xl font-semibold tracking-tight text-black">
                    ant Monitor
                  </h2>
                  {/* <h2 className="mt-10 text-center text-4xl sm:text-7xl font-semibold tracking-tight text-black bg-black animate-pulse duration-200">
                  ..
                  </h2> */}
                </div>
                <h2 className="sm:mt-4 mt-2 text-center text-2xl sm:text-2xl font-semibold tracking-tight text-gray-500">
                  Sign in to your account
                </h2>
                <div className="mt-10">
                  <div className="hidden sm:flex items-center justify-center gap-x-6">
                    <button
                      onClick={handleGoogleSignIn}
                      className="rounded-xl items-center bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 inline-block mr-3"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Sign in with Google
                    </button>
                    <Link
                      href="/"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Home Page <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  <div className="sm:hidden flex flex-col items-center justify-center gap-y-5">
                    <h1 className=" text-center text-sm font-semibold bg-white text-red-500 ring-2 ring-red-500 rounded-xl p-4">
                      We apologize, the mobile version is currently unavailable.
                      Please access it on a desktop.
                    </h1>
                    <Link
                      className="mt-5 rounded-xl items-center bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      href="/"
                    >
                      Back Home Page
                    </Link>
                  </div>

                  {errorMsg && (
                    <p className="mt-10 text-red-600 text-center">
                      Error: {errorMsg}
                    </p>
                  )}

                  <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Problem with Sign In?{" "}
                    <Link href="/#Contact" className="font-semibold text-black">
                      Contact Us
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
