
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import Layout from "@/components/main/layout";


const navigation = [
    { name: 'My Profile', href: 'my-profile', current: false },
    { name: 'General', href: 'general', current: false },
    { name: 'N/A', href: '#', current: false },
    // { name: 'N/A', href: '#', current: false },
    // { name: 'N/A', href: '#', current: false },
    // { name: 'N/A', href: '#', current: false },
    // { name: 'N/A', href: '#', current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SettingLayout({ children }) {
    return (
        <>
            <Layout>
                <div className="min-h-full py-5 px-8">
                    <h1 className="text-4xl mb-10 text-center font-semibold">Setting</h1>
                    <div className="flex mx-auto  justify-left">
                        <div className="hidden px-14 md:block">
                            <div className="sticky top-10  flex flex-col w-32 items-baseline space-y-3">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-black text-white ring-black ring-2' : 'text-black ring-black ring-2 hover:bg-black hover:text-white',
                                            'w-32 rounded-xl px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <main className='mx-auto'>{children}</main>
                    </div>
                </div>
            </Layout>
        </>
    )
}
