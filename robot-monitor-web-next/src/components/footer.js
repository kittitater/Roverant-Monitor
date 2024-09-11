import Link from "next/link";

export default function Footer() {
    return (
        <footer className="">
            <div className="w-full  mx-auto px-8 py-4 md:py-6 ">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                        <span className="self-center text-xl font-medium whitespace-nowrap dark:text-white">Robot Monitoring System</span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-3 text-sm font-medium text-black sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Kittitat x Phithatsanan x Woradon's Senior project™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}