"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Button } from '@headlessui/react'
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/(web-application)/(authentication)/firebase/firebase";
import { useRouter } from "next/navigation";

// 1) Import your RoverContext hook
import { useRoverContext } from "@/components/main/RoverContext"; // Adjust path as needed

const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "My Rover", href: "/my-rover", current: false },
    { name: "Tracking Map", href: "/tracking-map", current: false },
    { name: "Live Camera", href: "/live-camera", current: false },
    { name: "Patrol Log", href: "/patrol-log", current: false },
    { name: "Alert History", href: "/alerts", current: false },
    { name: "Summary Report", href: "/summary", current: false },
];

const userNavigation = [
    { name: "Setting", href: "/setting/my-profile" },
    { name: "Log out", href: "#" }, // We'll handle this differently
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const { user, loading, setUser } = useAuth();
    const router = useRouter();

    // 2) Access rovers from your RoverContext
    const { rovers, selectedRover, setSelectedRover } = useRoverContext();

    // Handler for changing which rover is selected
    const handleRoverChange = (event) => {
      const newId = event.target.value;
      const found = rovers.find(r => r.id === newId);
      if (found) {
        setSelectedRover(found);
      }
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            router.push("/signin");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // While loading, you might want to show a loading state or nothing
    if (loading) {
        return (
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
                Let us think something for you...
              </p>
            </div>
          </main>
        );
    }

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-white">
                {({ open }) => (
                    <>
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex h-24 items-center justify-between">
                                {/* Left side: brand + navigation */}
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Link href="/dashboard">
                                            <span className="text-black font-semibold text-xl">Roverant Monitor</span>
                                        </Link>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    aria-current={item.current ? "page" : undefined}
                                                    className={classNames(
                                                        item.current
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

                                {/* Right side (Desktop): Rover selector, notifications, user menu */}
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6 space-x-6">
                                        {/* 3) Rover selection dropdown (desktop) */}
                                        <div className="flex items-center space-x-2">
                                            <label htmlFor="roverSelect" className="text-sm font-medium text-gray-700">
                                                Select Rover:
                                            </label>
                                            <select
                                                id="roverSelect"
                                                value={selectedRover?.id}
                                                onChange={handleRoverChange}
                                                className="rounded border px-2 py-1 focus:outline-none"
                                            >
                                                {rovers.map((r) => (
                                                    <option key={r.id} value={r.id}>
                                                        {r.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Notification button */}
                                        <button
                                            type="button"
                                            className="relative rounded-xl ring-black ring-2 bg-white p-1 text-black hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon aria-hidden="true" className="h-7 w-7" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative flex max-w-xs items-center rounded-xl text-sm focus:outline-none ring-2 ring-black hover:ring-2 hover:ring-black">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    {user && user.photoURL ? (
                                                        <img
                                                            alt={user.displayName}
                                                            src={user.photoURL}
                                                            className="h-9 w-9 rounded-xl"
                                                        />
                                                    ) : (
                                                        <img
                                                            alt="Default User"
                                                            src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                                            className="h-9 w-9 rounded-xl"
                                                        />
                                                    )}
                                                </MenuButton>
                                            </div>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-3 p-2 space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                <div className="mx-2 my-5 w-max text-center space-y-1">
                                                    <div className="text-base font-medium leading-none text-black">
                                                        {user?.displayName}
                                                    </div>
                                                    <div className="text-sm font-medium leading-none text-gray-400">
                                                        {user?.email}
                                                    </div>
                                                </div>
                                                {userNavigation.map((item) => (
                                                    <MenuItem key={item.name} className="w-full text-center">
                                                        {({ active }) =>
                                                            item.name !== "Log out" ? (
                                                                <Link
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? "bg-gray-100" : "",
                                                                        "block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white"
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            ) : (
                                                                <Button
                                                                    onClick={handleLogout}
                                                                    className={classNames(
                                                                        active ? "bg-gray-100" : "",
                                                                        "block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white"
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </Button>
                                                            )
                                                        }
                                                    </MenuItem>
                                                ))}
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>

                                {/* Mobile menu button (Hamburger) */}
                                <div className="-mr-2 flex md:hidden">
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 ring-2 ring-black text-black hover:bg-black hover:text-white focus:outline-none">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        <Bars3Icon
                                            aria-hidden="true"
                                            className="block h-6 w-6 group-data-[open]:hidden"
                                        />
                                        <XMarkIcon
                                            aria-hidden="true"
                                            className="hidden h-6 w-6 group-data-[open]:block"
                                        />
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>

                        {/* Mobile nav panel */}
                        <DisclosurePanel className="md:hidden">
                            {/* Mobile nav links */}
                            <div className="space-y-2 px-2 pb-3 pt-2 sm:px-3">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        aria-current={item.current ? "page" : undefined}
                                        className={classNames(
                                            item.current
                                                ? "bg-gray-900 text-white"
                                                : "text-black ring-2 ring-black hover:bg-black hover:text-white",
                                            "block rounded-md px-3 py-2 text-base font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>

                            {/* Rover selection for mobile */}
                            <div className="border-t border-gray-300 py-3 px-4">
                                <div className="flex flex-col space-y-2">
                                    <span className="text-sm font-medium text-gray-700">Select Rover:</span>
                                    <select
                                        value={selectedRover?.id}
                                        onChange={handleRoverChange}
                                        className="rounded border px-2 py-1 focus:outline-none"
                                    >
                                        {rovers.map((r) => (
                                            <option key={r.id} value={r.id}>
                                                {r.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Mobile user info & sign out */}
                            <div className="border-t border-gray-300 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    {user && user.photoURL ? (
                                        <img
                                            alt={user.displayName}
                                            src={user.photoURL}
                                            className="h-10 w-10 rounded-full"
                                        />
                                    ) : (
                                        <img
                                            alt="Default User"
                                            src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                            className="h-10 w-10 rounded-full"
                                        />
                                    )}
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-black">
                                            {user?.displayName}
                                        </div>
                                        <div className="text-sm font-medium leading-none text-gray-400">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-2 px-2">
                                    {userNavigation.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            onClick={item.name === "Sign out" ? handleLogout : undefined}
                                            className={classNames(
                                                item.name === "Sign out"
                                                    ? "block w-full text-left px-3 py-2 text-base font-medium text-black rounded-xl hover:bg-black hover:text-white"
                                                    : "block rounded-md px-3 py-2 text-base ring-2 ring-black font-medium text-black hover:bg-black hover:text-white",
                                                ""
                                            )}
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </div>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>
    );
}
