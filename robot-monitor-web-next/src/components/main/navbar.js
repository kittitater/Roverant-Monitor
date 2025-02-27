// app/components/Navbar.js

"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Button, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { BellIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import clsx from 'clsx';
import Link from "next/link";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/(web-application)/(authentication)/firebase/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useRover } from "@/components/context/RoverContext"; // ✅ Import the global rover context
import { useEffect, useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Rover", href: "/my-rover" },
    { name: "Tracking Map", href: "/tracking-map" },
    { name: "Live Camera", href: "/live-camera" },
    { name: "Patrol Log", href: "/patrol-log" },
    { name: "Alert History", href: "/alert-history" },
    { name: "Summary Report", href: "#" },
];

const userNavigation = [
    { name: "Setting", href: "/setting/my-profile" },
    { name: "Log out", href: "#" },
];

export default function Navbar() {
    const { user, loading, setUser } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const { selectedRover, updateRover } = useRover(); // ✅ Use global `rover_id`

    const handleSelectRover = (rover) => {
        updateRover(rover); // ✅ Store the full object
    };

    const [logoutLoading, setLogoutLoading] = useState(false);

    const [rovers, setRovers] = useState([]);
    // const [selected, setSelected] = useState(null);
    const [roverLoading, setRoverLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRovers = async () => {
            setRoverLoading(true);
            setError(null);

            try {
                const idToken = await user.getIdToken();
                const response = await fetch(`https://api-roverant.mooo.com/rover/my-rovers`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${idToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

                const data = await response.json();
                setRovers(data);

                if (!selectedRover) {
                    updateRover(data[0]); // ✅ Store full object (not just `rover_id`)
                }

                // // Extract `rover_id` from the current URL path
                // const pathParts = pathname.split("/");
                // const existingRoverIdIndex = pathParts.findIndex((part) => data.some((r) => r.rover_id === part));
                // const existingRoverId = existingRoverIdIndex !== -1 ? pathParts[existingRoverIdIndex] : null;

                // // Set the currently selected rover based on the URL or default to the first one
                // const defaultRover = data.find(rover => rover.rover_id === existingRoverId) || data[0];
                // setSelected(defaultRover);
            } catch (err) {
                console.error("Failed to fetch rovers:", err);
                setError(err.message);
            } finally {
                setRoverLoading(false);
            }
        };

        fetchRovers();
    }, [pathname]); // ✅ Updates when the URL changes

    // const excludedPages = ["/setting/my-profile", "/login", "/register"]; // Pages without rover_id

    // const handleSelectRover = (rover) => {
    //     setSelected(rover);

    //     // If the current page is in the excluded list, don't modify the URL
    //     if (excludedPages.includes(pathname)) return;

    //     // ✅ Ensure the URL follows `/page/{rover_id}` format
    //     const pathParts = pathname.split("/").filter(Boolean);
    //     const lastPart = pathParts[pathParts.length - 1];

    //     // Check if the last part of the URL is a `rover_id`
    //     const isLastPartRoverId = rovers.some((r) => r.rover_id === lastPart);

    //     if (isLastPartRoverId) {
    //         pathParts[pathParts.length - 1] = rover.rover_id; // Replace existing rover_id
    //     } else {
    //         pathParts.push(rover.rover_id); // Append rover_id if not present
    //     }

    //     router.push(`/${pathParts.join("/")}`, { scroll: false });
    // };

    // Handle Logout
    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setLogoutLoading(false);
        }
    };

    // Show loading screen while processing
    if (loading || logoutLoading) {
        return (
            <main className="flex h-screen items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <img src="/monitor.png" alt="Loading..." className="w-32 h-32 animate-spin mx-auto" />
                    <h1 className="mt-10 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        Hold On
                    </h1>
                    <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">
                        Let us think something for you...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <header className="inset-x-0 fixed top-0 ">
            <Disclosure as="nav" className="bg-white">
                {({ open }) => (
                    <>
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex h-20 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="/dashboard">
                                            <span className="text-black font-semibold text-xl">Roverant Monitor</span>
                                        </a>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}

                                                    href={item.href} // ✅ No need to modify URL for rover_id
                                                    // href={
                                                    //     excludedPages.includes(item.href)
                                                    //         ? item.href // ✅ No rover_id for excluded pages
                                                    //         : `${item.href}/${selected?.rover_id || ''}` // ✅ Pass rover_id for allowed pages
                                                    // }
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
                                <div className="hidden md:flex items-center space-x-3">

                                    {/* Select rover Dropdown */}
                                    {/* <Listbox value={selected} onChange={setSelected} >
                                        <ListboxButton className=" relative block py-2 pr-8 pl-3 text-left text-sm font-medium text-black hover:bg-black hover:text-white rounded-xl ring-black ring-2 bg-white">
                                            {selected.name}
                                            <ChevronDownIcon className="group pointer-events-none absolute top-1.5 right-1.5 size-6 " />
                                        </ListboxButton>
                                        <ListboxOptions anchor="bottom"
                                            transition className="absolute right-0 mt-3 z-50 p-2 w-fit space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                            {people.map((person) => (
                                                <ListboxOption key={person.id} value={person} className="group flex items-center gap-2 px-3 py-2 text-sm font-medium data-[focus]:bg-black ring-2 rounded-xl ring-black">
                                                    <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible group-data-[focus]:fill-white" />
                                                    <div className="text-sm font-medium group-data-[focus]:text-white">{person.name}</div>
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </Listbox> */}

                                    {/* Select rover Dropdown */}
                                    <Listbox value={selectedRover} onChange={handleSelectRover} disabled={roverLoading}>
                                        <ListboxButton className="relative block py-2 pr-8 pl-3 text-left text-sm font-medium text-black hover:bg-black hover:text-white rounded-xl ring-black ring-2 bg-white">
                                            {/* {roverLoading ? "Loading..." : selected?.name || "Select a Rover"} */}
                                            {roverLoading ? "Loading..." : selectedRover?.name || "Select a Rover"}
                                            <ChevronDownIcon className="group pointer-events-none absolute top-1.5 right-1.5 size-6" />
                                        </ListboxButton>
                                        <ListboxOptions anchor="bottom" transition className="max-h-40   overflow-y-auto absolute right-0 mt-3 p-2 pr-4 w-fit space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                            {error ? (
                                                <div className="px-3 py-2 text-sm font-medium text-red-500">{error}</div>
                                            ) : rovers.length > 0 ? (
                                                rovers.map((rover) => (
                                                    <ListboxOption key={rover.rover_id} value={rover} className="group flex items-center gap-2 px-3 py-2 text-sm font-medium data-[focus]:bg-black ring-2 rounded-xl ring-black">
                                                        <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible group-data-[focus]:fill-white" />
                                                        <div className="text-sm font-medium group-data-[focus]:text-white">{rover.name}</div>
                                                    </ListboxOption>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-sm font-medium text-gray-500">No Rovers Available</div>
                                            )}
                                        </ListboxOptions>
                                    </Listbox>


                                    {/* Alert Dropdown */}
                                    <button
                                        type="button"
                                        className="relative rounded-xl ring-black ring-2 bg-white p-1 text-black hover:text-white hover:bg-black"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-7 w-7" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative">
                                        <MenuButton className="flex items-center rounded-xl ring-2 ring-black">
                                            <img
                                                alt={user?.displayName || "User"}
                                                src={user?.photoURL || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"}
                                                className="h-9 w-9 rounded-xl"
                                            />
                                        </MenuButton>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-3 p-2  space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
                                                <MenuItem key={item.name} className="w-full text-center">
                                                    {item.name === "Log out" ? (
                                                        <Button onClick={handleLogout} className="block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white ">
                                                            {item.name}
                                                        </Button>
                                                    ) : (
                                                        <Link href={item.href} className="block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white ">
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












// "use client";

// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Button, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
// import { BellIcon } from "@heroicons/react/24/outline";
// import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

// import clsx from 'clsx';
// import Link from "next/link";
// import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";
// import { signOut } from "firebase/auth";
// import { auth } from "@/app/(web-application)/(authentication)/firebase/firebase";
// import { useRouter, usePathname } from "next/navigation";
// import { useState } from "react";

// const navigation = [
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "My Rover", href: "/my-rover" },
//     { name: "Tracking Map", href: "#" },
//     { name: "Live Camera", href: "/live-camera" },
//     { name: "Patrol Log", href: "#" },
//     { name: "Alert History", href: "#" },
//     { name: "Summary Report", href: "#" },
// ];

// const userNavigation = [
//     { name: "Setting", href: "/setting/my-profile" },
//     { name: "Log out", href: "#" },
// ];

// const people = [
//     { id: 1, name: 'Roverant Rover Beta 1 ' },
//     { id: 2, name: 'Wade Cooper' },
//     { id: 3, name: 'Tanya Fox' },
//     { id: 4, name: 'Arlene Mccoy' },
//     { id: 5, name: 'Devon Webb' },
// ];

// export default function Navbar() {
//     const { user, loading, setUser } = useAuth();
//     const router = useRouter();
//     const pathname = usePathname();
//     const [logoutLoading, setLogoutLoading] = useState(false);
//     const [selected, setSelected] = useState(people[1]); // Default selection

//     // Handle Logout
//     const handleLogout = async () => {
//         setLogoutLoading(true);
//         try {
//             await signOut(auth);
//             setUser(null);
//             router.push("/login");
//         } catch (error) {
//             console.error("Error during logout:", error);
//         } finally {
//             setLogoutLoading(false);
//         }
//     };

//     // Show loading screen while processing
//     if (loading || logoutLoading) {
//         return (
//             <main className="flex h-screen items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
//                 <div className="text-center">
//                     <img src="/monitor.png" alt="Loading..." className="w-32 h-32 animate-spin mx-auto" />
//                     <h1 className="mt-10 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
//                         Hold On
//                     </h1>
//                     <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">
//                         Let us think something for you...
//                     </p>
//                 </div>
//             </main>
//         );
//     }

//     return (
//         <div className="min-h-full sticky top-0 z-50 ">
//             <Disclosure as="nav" className="bg-white">
//                 {({ open }) => (
//                     <>
//                         <div className="mx-auto px-4 sm:px-6 lg:px-8">
//                             <div className="flex h-20 items-center justify-between">
//                                 <div className="flex items-center">
//                                     <div className="flex-shrink-0">
//                                         <Link href="/dashboard">
//                                             <span className="text-black font-semibold text-xl">Roverant Monitor</span>
//                                         </Link>
//                                     </div>
//                                     <div className="hidden md:block">
//                                         <div className="ml-10 flex items-baseline space-x-4">
//                                             {navigation.map((item) => (
//                                                 <Link
//                                                     key={item.name}
//                                                     href={item.href}
//                                                     className={clsx(
//                                                         pathname === item.href
//                                                             ? "bg-black text-white ring-black ring-2"
//                                                             : "text-black ring-black ring-2 hover:bg-black hover:text-white",
//                                                         "rounded-xl px-3 py-2 text-sm font-medium"
//                                                     )}
//                                                 >
//                                                     {item.name}
//                                                 </Link>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="hidden md:flex items-center space-x-3">

//                                     {/* Select rover Dropdown */}
//                                     <Listbox value={selected} onChange={setSelected} >
//                                         <ListboxButton className=" relative block py-2 pr-8 pl-3 text-left text-sm font-medium text-black hover:bg-black hover:text-white rounded-xl ring-black ring-2 bg-white">
//                                             {selected.name}
//                                             <ChevronDownIcon className="group pointer-events-none absolute top-1.5 right-1.5 size-6 " />
//                                         </ListboxButton>
//                                         <ListboxOptions anchor="bottom"
//                                             transition className="absolute right-0 mt-3 z-50 p-2 w-fit space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
//                                             {people.map((person) => (
//                                                 <ListboxOption key={person.id} value={person} className="group flex items-center gap-2 px-3 py-2 text-sm font-medium data-[focus]:bg-black ring-2 rounded-xl ring-black">
//                                                     <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible group-data-[focus]:fill-white" />
//                                                     <div className="text-sm font-medium group-data-[focus]:text-white">{person.name}</div>
//                                                 </ListboxOption>
//                                             ))}
//                                         </ListboxOptions>
//                                     </Listbox>

//                                     {/* Alert Dropdown */}
//                                     <button
//                                         type="button"
//                                         className="relative rounded-xl ring-black ring-2 bg-white p-1 text-black hover:text-white hover:bg-black"
//                                     >
//                                         <span className="sr-only">View notifications</span>
//                                         <BellIcon className="h-7 w-7" />
//                                     </button>

//                                     {/* Profile dropdown */}
//                                     <Menu as="div" className="relative">
//                                         <MenuButton className="flex items-center rounded-xl ring-2 ring-black">
//                                             <img
//                                                 alt={user?.displayName || "User"}
//                                                 src={user?.photoURL || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"}
//                                                 className="h-9 w-9 rounded-xl"
//                                             />
//                                         </MenuButton>
//                                         <MenuItems
//                                             transition
//                                             className="absolute right-0 z-10 mt-3 p-2  space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                                         >
//                                             <div className="mx-2 my-5 w-max text-center space-y-1">
//                                                 <div className="text-base font-medium leading-none text-black">
//                                                     {user?.displayName || "Name SurName"}
//                                                 </div>
//                                                 <div className="text-sm font-medium leading-none text-gray-400">
//                                                     {user?.email || "User Email"}
//                                                 </div>
//                                             </div>
//                                             {userNavigation.map((item) => (
//                                                 <MenuItem key={item.name} className="w-full text-center">
//                                                     {item.name === "Log out" ? (
//                                                         <Button onClick={handleLogout} className="block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white ">
//                                                             {item.name}
//                                                         </Button>
//                                                     ) : (
//                                                         <Link href={item.href} className="block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white ">
//                                                             {item.name}
//                                                         </Link>
//                                                     )}
//                                                 </MenuItem>
//                                             ))}
//                                         </MenuItems>
//                                     </Menu>
//                                 </div>
//                             </div>



//                         </div>
//                     </>
//                 )}
//             </Disclosure>
//         </div>
//     );
// }



// "use client";

// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Button } from '@headlessui/react'
// import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
// import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
// import clsx from 'clsx'
// import Link from "next/link";

// import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext"; // Adjust the path as needed
// import { signOut } from "firebase/auth";
// import { auth } from "@/app/(web-application)/(authentication)/firebase/firebase"; // Adjust the path as needed
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const navigation = [
//     { name: "Dashboard", href: "/dashboard", current: false },
//     { name: "My Rover", href: "/my-rover", current: false },
//     { name: "Tracking Map", href: "#", current: false },
//     { name: "Live Camera", href: "/live-camera", current: false },
//     { name: "Patrol Log", href: "#", current: false },
//     { name: "Alert History", href: "#", current: false },
//     { name: "Summary Report", href: "#", current: false },
// ];

// const userNavigation = [
//     { name: "Setting", href: "/setting/my-profile" },
//     { name: "Log out", href: "#" }, // We'll handle this differently
// ];

// const people = [
//     { id: 1, name: 'Tom Cook' },
//     { id: 2, name: 'Wade Cooper' },
//     { id: 3, name: 'Tanya Fox' },
//     { id: 4, name: 'Arlene Mccoy' },
//     { id: 5, name: 'Devon Webb' },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
// }

// export default function Navbar() {
//     const { user, loading, setUser } = useAuth();
//     const router = useRouter();
//     const [logoutLoading, setLogoutLoading] = useState(false);
//     const [selected, setSelected] = useState(people[1])

//     // Handle Logout
//     const handleLogout = async () => {
//         setLogoutLoading(true);
//         try {
//             await signOut(auth);
//             setUser(null); // Clear user from context
//             router.push("/login"); // Redirect to Sign-In page
//         } catch (error) {
//             console.error("Error during logout:", error);
//             // Optionally: display an error message to the user
//         } finally {
//             setLogoutLoading(false);
//         }
//     };


//     // While loading, you might want to show a loading state or nothing
//     if (loading || logoutLoading) {
//         return (
//             <main className="flex h-screen items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
//                 <div className="text-center">
//                     <img src="/monitor.png" alt="Loading..." className="w-32 h-32 animate-spin mx-auto" />
//                     <h1 className="mt-10 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
//                         Hold On
//                     </h1>
//                     <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">
//                         Let us thinking something for you...
//                     </p>
//                 </div>
//             </main>
//         );
//     }

//     return (
//         <>
//             {/*
//         This example requires updating your template:

//         ```
//         <html className="h-full bg-gray-100">
//         <body className="h-full">
//         ```
//       */}
//             <div className="min-h-full">
//                 <Disclosure as="nav" className="bg-white">
//                     {({ open }) => (
//                         <>
//                             <div className="mx-auto px-4 sm:px-6 lg:px-8">
//                                 <div className="flex h-24 items-center justify-between">
//                                     <div className="flex items-center">
//                                         <div className="flex-shrink-0">
//                                             <Link href="/dashboard">
//                                                 <span className="text-black font-semibold text-xl">Roverant Monitor</span>
//                                             </Link>
//                                         </div>
//                                         <div className="hidden md:block">
//                                             <div className="ml-10 flex items-baseline space-x-4">
//                                                 {navigation.map((item) => (
//                                                     <Link
//                                                         key={item.name}
//                                                         href={item.href}
//                                                         aria-current={item.current ? "page" : undefined}
//                                                         className={classNames(
//                                                             item.current
//                                                                 ? "bg-black text-white ring-black ring-2"
//                                                                 : "text-black ring-black ring-2 hover:bg-black hover:text-white",
//                                                             "rounded-xl px-3 py-2 text-sm font-medium"
//                                                         )}
//                                                     >
//                                                         {item.name}
//                                                     </Link>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="hidden md:block">
//                                         <div className="ml-4 flex items-center md:ml-6">

//                                             <Listbox value={selected} onChange={setSelected}>
//                                                 <ListboxButton
//                                                     className={clsx(
//                                                         'mr-3 relative block  py-2 pr-8 pl-3 text-left text-sm font-medium text-black hover:bg-black hover:text-white',
//                                                         'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
//                                                         'rounded-xl ring-black ring-2 bg-white'
//                                                     )}
//                                                 >
//                                                     {selected.name}
//                                                     <ChevronDownIcon
//                                                         className="group pointer-events-none absolute top-1.5 right-1.5 size-6 "
//                                                         aria-hidden="true"
//                                                     />
//                                                 </ListboxButton>
//                                                 <ListboxOptions
//                                                     anchor="bottom"
//                                                     transition
//                                                     className=
// "absolute right-0 z-10 mt-3 p-2 w-fit space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                                                 >
//                                                     {people.map((person) => (
//                                                         <ListboxOption
//                                                             key={person.name}
//                                                             value={person}
//                                                             className="group flex items-center gap-2 px-3 py-2 text-sm font-medium data-[focus]:bg-black ring-2 rounded-xl ring-black "

//                                                         >
//                                                             <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible group-data-[focus]:fill-white" />
//                                                             <div className="text-sm font-medium group-data-[focus]:text-white">{person.name}</div>
//                                                         </ListboxOption>
//                                                     ))}
//                                                 </ListboxOptions>
//                                             </Listbox>

//                                             <button
//                                                 type="button"
//                                                 className="relative rounded-xl ring-black ring-2 bg-white p-1 text-black hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                                             >
//                                                 <span className="absolute -inset-1.5" />
//                                                 <span className="sr-only">View notifications</span>
//                                                 <BellIcon aria-hidden="true" className="h-7 w-7" />
//                                             </button>

//                                             {/* Profile dropdown */}
//                                             <Menu as="div" className="relative ml-3">
//                                                 <div>
//                                                     <MenuButton className="relative flex max-w-xs items-center rounded-xl  text-sm focus:outline-none ring-2 ring-black hover:ring-2 hover:ring-black">
//                                                         <span className="absolute -inset-1.5" />
//                                                         <span className="sr-only">Open user menu</span>
//                                                         {user && user.photoURL ? (
//                                                             <img
//                                                                 alt={user.displayName}
//                                                                 src={user.photoURL}
//                                                                 className="h-9 w-9 rounded-xl"
//                                                             />
//                                                         ) : (
//                                                             <img
//                                                                 alt="Default User"
//                                                                 src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
//                                                                 className="h-9 w-9 rounded-xl"
//                                                             />
//                                                         )}
//                                                     </MenuButton>
//                                                 </div>
//                                                 <MenuItems
//                                                     transition
//                                                     className="absolute right-0 z-10 mt-3 p-2  space-y-2 origin-top-right rounded-2xl bg-white shadow-lg ring-2 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//                                                 >
//                                                     <div className="mx-2 my-5 w-max text-center space-y-1">
//                                                         <div className="text-base font-medium leading-none text-black">
//                                                             {user?.displayName}
//                                                         </div>
//                                                         <div className="text-sm font-medium leading-none text-gray-400">
//                                                             {user?.email}
//                                                         </div>
//                                                     </div>
//                                                     {userNavigation.map((item) => (
//                                                         <MenuItem key={item.name} className=" w-full text-center">
//                                                             {({ active }) =>
//                                                                 item.name !== "Log out" ? (
//                                                                     <Link
//                                                                         href={item.href}
//                                                                         className={classNames(
//                                                                             active ? "bg-gray-100" : "",
//                                                                             "block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white "
//                                                                         )}
//                                                                     >
//                                                                         {item.name}
//                                                                     </Link>
//                                                                 ) : (
//                                                                     <Button
//                                                                         onClick={handleLogout}
//                                                                         className={classNames(
//                                                                             active ? "bg-gray-100" : "",
//                                                                             "block px-3 py-2 text-sm font-medium ring-2 rounded-xl ring-black text-black hover:bg-black hover:text-white "
//                                                                         )}
//                                                                     >
//                                                                         {item.name}
//                                                                     </Button>
//                                                                 )
//                                                             }
//                                                         </MenuItem>
//                                                     ))}
//                                                 </MenuItems>
//                                             </Menu>
//                                         </div>
//                                     </div>

//         <div className="-mr-2 flex md:hidden">
//             {/* Mobile menu button */}
//             <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 ring-2 ring-black text-black hover:bg-black hover:text-white focus:outline-none">
//                 <span className="absolute -inset-0.5" />
//                 <span className="sr-only">Open main menu</span>
//                 <Bars3Icon
//                     aria-hidden="true"
//                     className="block h-6 w-6 group-data-[open]:hidden"
//                 />
//                 <XMarkIcon
//                     aria-hidden="true"
//                     className="hidden h-6 w-6 group-data-[open]:block"
//                 />
//             </DisclosureButton>
//         </div>
//     </div>
// </div>

//                             <DisclosurePanel className="md:hidden">
//                                 <div className="space-y-2 px-2 pb-3 pt-2 sm:px-3">
//                                     {navigation.map((item) => (
//                                         <DisclosureButton
//                                             key={item.name}
//                                             as="a"
//                                             href={item.href}
//                                             aria-current={item.current ? "page" : undefined}
//                                             className={classNames(
//                                                 item.current
//                                                     ? "bg-gray-900 text-white"
//                                                     : "text-black ring-2 ring-black hover:bg-black hover:text-white",
//                                                 "block rounded-md px-3 py-2 text-base font-medium"
//                                             )}
//                                         >
//                                             {item.name}
//                                         </DisclosureButton>
//                                     ))}
//                                 </div>
//                                 <div className="border-t border-gray-700 pb-3 pt-4">
//                                     <div className="flex items-center px-5">
//                                         {user && user.photoURL ? (
//                                             <img
//                                                 alt={user.displayName}
//                                                 src={user.photoURL}
//                                                 className="h-10 w-10 rounded-full"
//                                             />
//                                         ) : (
//                                             <img
//                                                 alt="Default User"
//                                                 src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
//                                                 className="h-10 w-10 rounded-full"
//                                             />
//                                         )}
//                                         <div className="ml-3">
//                                             <div className="text-base font-medium leading-none text-black">
//                                                 {user?.displayName}
//                                             </div>
//                                             <div className="text-sm font-medium leading-none text-gray-400">
//                                                 {user?.email}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="mt-3 space-y-2 px-2">
//                                         {userNavigation.map((item) => (
//                                             <DisclosureButton
//                                                 key={item.name}
//                                                 as="a"
//                                                 href={item.href}
//                                                 onClick={item.name === "Sign out" ? handleLogout : undefined}
//                                                 className={classNames(
//                                                     item.name === "Sign out"
//                                                         ? "block w-full text-left px-3 py-2 text-base font-medium text-black rounded-xl hover:bg-black hover:text-white"
//                                                         : "block rounded-md px-3 py-2 text-base ring-2 ring-black font-medium text-black hover:bg-black hover:text-white",
//                                                     ""
//                                                 )}
//                                             >
//                                                 {item.name}
//                                             </DisclosureButton>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </DisclosurePanel>
//                         </>
//                     )}
//                 </Disclosure>
//             </div>
//         </>
//     );
// }

