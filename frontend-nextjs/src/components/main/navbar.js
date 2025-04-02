// navbar.js
"use client";

import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
// import { BellIcon } from "@heroicons/react/24/outline";
// import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/(web-application)/(authentication)/firebase/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useRover } from "@/components/context/RoverContext";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "My Rover", href: "/my-rover" },
  { name: "Tracking Map", href: "/tracking-map" },
  { name: "Live Camera", href: "/live-camera" },
  { name: "Patrol Log", href: "/patrol-log" },
  { name: "Alert History", href: "/alert-history" },
  { name: "Summary Report", href: "/summary-report" },
];

const userNavigation = [
  { name: "Home Page", href: "/" },
  { name: "Setting", href: "/setting/my-profile" },
  { name: "Log out", href: "#" },
];

export default function Navbar() {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const { selectedRover, updateRover } = useRover();

  const handleSelectRoverLocal = (rover) => {
    updateRover(rover);
  };

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [rovers, setRovers] = useState([]);
  const [roverLoading, setRoverLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRovers = async () => {
      setRoverLoading(true);
      setError(null);

      try {
        console.log("User object:", user); // Debug the user object
        const idToken = await user.getIdToken();
        const response = await fetch(
          "https://api-roverant.mooo.com/rover/my-rovers",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setRovers(data);

        if (selectedRover === undefined && data.length > 0) {
          updateRover(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch rovers:", err);
        setError(err.message);
        if (selectedRover === undefined) {
          updateRover(null);
        }
      } finally {
        setRoverLoading(false);
      }
    };

    fetchRovers();
  }, [pathname, selectedRover, updateRover, user]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("roverant_selectedRover"); // Clear rover selection
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading || logoutLoading) {
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
    <header className="inset-x-0 fixed top-0">
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-20 items-center justify-between">
                {/* Left Logo + Nav */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a href="/dashboard" ClassName="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center ">
                        <Image
                          alt="Your Company"
                          src="/RM.png"
                          width={150}
                          height={150}
                          className="mx-auto h-auto w-auto "
                        />
                      </div>
                      {/* <span className="text-white font-semibold text-xl bg-black">
                        Rover
                      </span>
                      <span className="text-black font-semibold text-xl">
                        ant Monitor
                      </span> */}
                    </a>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-8 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={clsx(
                            pathname.startsWith(item.href)
                              ? "bg-black text-white ring-black ring-2"
                              : "text-black ring-black ring-2 hover:bg-black hover:text-white",
                            "rounded-xl px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Rover select, bell, user menu */}
                <div className="hidden md:flex items-center space-x-3">
                  <Listbox
                    value={selectedRover}
                    onChange={handleSelectRoverLocal}
                    disabled={roverLoading}
                    by="rover_id"
                  >
                    <ListboxButton className="relative block py-2 pr-8 pl-3 text-left text-sm font-medium text-black hover:bg-black hover:text-white rounded-xl ring-black ring-2 bg-white">
                      {selectedRover ? selectedRover.name : "Select a Rover"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="group pointer-events-none absolute top-1.5 right-1.5 size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </ListboxButton>
                    <ListboxOptions
                      anchor="bottom"
                      transition
                      className="max-h-40 overflow-y-auto absolute right-0 mt-3 p-2 pr-4 w-fit space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {error ? (
                        <div className="px-3 py-2 text-sm font-medium text-red-500">
                          {error}
                        </div>
                      ) : rovers.length > 0 ? (
                        rovers.map((rover) => (
                          <ListboxOption
                            key={rover.rover_id}
                            value={rover}
                            className="group flex items-center gap-2 px-3 py-2 text-sm font-medium data-[focus]:bg-black ring-2 rounded-xl ring-black"
                          >
                            {/* <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible group-data-[focus]:fill-white" /> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="invisible size-4 fill-black group-data-[selected]:visible group-data-[focus]:fill-white"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <div className="text-sm font-medium group-data-[focus]:text-white">
                              {rover.name}
                            </div>
                          </ListboxOption>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm font-medium text-gray-500">
                          No Rovers Available
                        </div>
                      )}
                    </ListboxOptions>
                  </Listbox>

                  <button
                    type="button"
                    className="relative rounded-xl ring-black ring-2 bg-white p-1 text-black hover:text-white hover:bg-black"
                  >
                    <span className="sr-only">View notifications</span>
                    {/* <BellIcon className="h-7 w-7" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-7 w-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  </button>

                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center rounded-xl ring-2 ring-black">
                      <img
                        alt={user?.displayName || "User"}
                        src={
                          user?.photoURL ||
                          "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                        }
                        className="h-9 w-9 rounded-xl"
                      />
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-3 p-2 space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="mx-2 my-5 w-max text-center space-y-1">
                        <div className="text-base font-medium leading-none text-black">
                          {user?.displayName || "Name SurName"}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user?.email || "User Email"}
                        </div>
                      </div>
                      {userNavigation.map((item) => (
                        <MenuItem
                          key={item.name}
                          className="w-full text-center"
                        >
                          {item.name === "Log out" ? (
                            <Button
                              onClick={handleLogout}
                              className="block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white "
                            >
                              {item.name}
                            </Button>
                          ) : (
                            <Link
                              href={item.href}
                              className="block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white "
                            >
                              {item.name}
                            </Link>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </header>
  );
}
