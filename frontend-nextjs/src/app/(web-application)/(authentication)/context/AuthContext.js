// app/context/AuthContext.js

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/(web-application)/(authentication)/firebase/firebase";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle the initial loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser(firebaseUser);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {
  //       try {
  //         // Obtain the Firebase ID token
  //         const idToken = await firebaseUser.getIdToken();

  //         // Fetch custom user data from the backend
  //         const res = await fetch(`https://api-roverant.mooo.com/user/register`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             username: firebaseUser.displayName,
  //             role: "user", // Or any default role
  //             id_token: idToken, // Pass the ID token in the request body
  //           }),
  //         });

  //         if (!res.ok) {
  //           const errorData = await res.json();
  //           throw new Error(`Failed to fetch user data: ${errorData.detail || res.status}`);
  //         }

  //         const data = await res.json();
  //         // data should be the registered user information

  //         // Set user info in context
  //         setUser({
  //           user_id: data.user_id,
  //           firebase_uid: data.firebase_uid,
  //           username: data.username,
  //           email: data.email,
  //           role: data.role,
  //           created_at: data.created_at,
  //         });
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //         setUser(null); // Ensure user is set to null on error
  //       }
  //     } else {
  //       // User is signed out
  //       setUser(null);
  //     }
  //     setLoading(false);
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}