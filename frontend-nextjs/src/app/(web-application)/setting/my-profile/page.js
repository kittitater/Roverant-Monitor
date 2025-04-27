"use client";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";

export default function MyProfile() {
  const { user, loading, setUser } = useAuth();

  return (
    <div className="mx-auto min-h-svh min-w-full space-y-8 ">
      <div className="py-24 border border-gray-300 rounded-2xl">
        <div className="flex flex-col items-center justify-center space-y-11">
          <img
            alt={user?.displayName || "User"}
            src={
              user?.photoURL ||
              "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            }
            className="h-72 w-72 rounded-full border border-gray-300 shadow-2xl"
          />
          <div className="flex flex-col items-center space-y-3">
            <h1 className="text-3xl font-medium text-gray-900 dark:text-white">
              Welcome Back!
            </h1>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {user?.displayName || "User"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
