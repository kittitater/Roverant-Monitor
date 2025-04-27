
import Link from "next/link";
import Layout from "@/components/main/AppLayout";


const navigation = [
    { name: 'My Profile', href: 'my-profile', current: false },
    { name: 'My Rover ', href: 'my-rover', current: false },
    { name: 'General', href: 'general', current: false },
    // { name: 'menu 2', href: '#', current: false },
    // { name: 'menu 3', href: '#', current: false },
    // { name: 'menu 4', href: '#', current: false },
    // { name: 'menu 5', href: '#', current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SettingLayout({ children }) {
    return (
        <>
            <Layout>
                <main className="pt-[80px]">
                    <div className="min-h-full py-5 px-16">
                        <div className="flex mx-auto justify-left  divide-gray-200">
                            <div className="fixed py-5">
                                <h1 className=" text-4xl mb-10 text-left font-semibold">Setting</h1>
                                <div className=" flex flex-col w-32 items-baseline space-y-3 ">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-black text-white ring-black ring-2' : 'text-black  hover:ring-black hover:ring-2 hover:text-black',
                                                'w-32 rounded-xl px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <main className="w-full ml-48">{children}</main>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}
