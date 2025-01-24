// app/signin/page.js

"use client";

import React, { useState, useEffect } from "react"; // Import useEffect
import Link from "next/link";
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
    if (user) {
      console.log("User is authenticated. Redirecting to /dashboard.");
      router.push("/dashboard");
    } else if (!user) {
      console.log("No authenticated user. Staying on sign-in page.");
    }
  }, [user, loading, router]);

  async function handleGoogleSignIn() {
    setErrorMsg("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Obtain the Firebase ID token
      const idToken = await user.getIdToken();

      const res = await fetch(`https://api-roverant.mooo.com/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.displayName,
          role: "user", // Or any default role
          id_token: idToken, // Pass the ID token in the request body
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to register user: ${errorData.detail || res.status}`);
      }

      const data = await res.json();
      // data should be the registered user information

      // Set user info in AuthContext
      setUser({
        user_id: data.user_id,
        firebase_uid: data.firebase_uid,
        username: data.username,
        email: data.email,
        role: data.role,
        created_at: data.created_at,
      });

      // Redirect to the home page or any protected route
      router.push("/dashboard");
    } catch (err) {
      console.error("Error during sign-in:", err);
      setErrorMsg(err.message);
    }
  }

  // // useEffect to handle redirection if user is already authenticated
  // useEffect(() => {
  //   if (!loading && user) {
  //     router.push("/dashboard");
  //   }
  // }, [user, loading, router]);

  // async function handleGoogleSignIn() {
  //   setErrorMsg("");

  //   try {
  //     const provider = new GoogleAuthProvider();
  //     await signInWithPopup(auth, provider);
  //     // No need to setUser here; AuthContext will handle it
  //     // The useEffect will redirect once user state is updated
  //   } catch (err) {
  //     console.error("Error during sign-in:", err);
  //     setErrorMsg(err.message);
  //   }
  // }

  // Show loading state if authentication is being checked
  if (loading) {
    return (
      <>
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

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-left px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/monitor.png"
            className="mx-auto h-32 w-auto"
          />
          <h2 className="text-black mt-5 text-center font-semibold text-4xl">Roverant Monitor</h2>
          <h2 className="mt-5 text-center text-xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <div className=" flex items-center justify-center gap-x-6">
            <button
              onClick={handleGoogleSignIn}
              className="rounded-xl bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in with Google
            </button>
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home Page <span aria-hidden="true">→</span>
            </Link>

          </div>
          {errorMsg && <p className="mt-10 text-red-600 text-center">Error: {errorMsg}</p>}
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Problem with Sign In?{' '}
            <a href="/#Contact" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </>


  );
}


