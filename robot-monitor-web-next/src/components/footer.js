import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

export default function Footer() {
    const [openPolicy, setOpenPolicy] = useState(false)
    const [openLicense, setOpenLicense] = useState(false)

    return (
        <>
            <footer className="">
                <div className="w-full  mx-auto px-8 py-4 md:py-6 ">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                            <span className="self-center text-xl font-medium whitespace-nowrap dark:text-white">Roverant Monitor</span>
                        </Link>
                        <ul className="flex flex-wrap items-center mb-3 text-sm font-medium text-black sm:mb-0 dark:text-gray-400">
                            <li>
                                <Link href="/#About" className="hover:underline me-4 md:me-6">About</Link>
                            </li>
                            <li>
                                <Link href="/#Innovator" className="hover:underline me-4 md:me-6">Innovator</Link>
                            </li>
                            <li>
                                <button onClick={() => setOpenPolicy(true)} className="hover:underline me-4 md:me-6">Privacy Policy</button>
                            </li>
                            <li>
                                <button onClick={() => setOpenLicense(true)} className="hover:underline me-4 md:me-6">Licensing</button>
                            </li>
                            <li>
                                <Link href="/#Contact" className="hover:underline">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline"> Roverant Project™</a>. All Rights Reserved. | Founded by Kittitat x Phithatsanan x Woradon</span>
                </div>
            </footer>


            {/* Privacy Policy Modal */}
            <Dialog open={openPolicy} onClose={() => setOpenPolicy(false)} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-20 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-10 sm:w-full sm:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-10 sm:pb-4 ">
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h1 className="text-5xl font-medium mb-8">Roverant - Privacy Policy</h1>
                                        <p className="text-xl mb-2"><strong>Effective Date:</strong> 1 January 2025 </p>
                                        <p className="mb-2">
                                            This Privacy Policy explains how data is collected, used, and protected by the Roverant Monitoring Web Application (the “Application”). By using the Application, you agree to the terms of this Privacy Policy.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">1. Data Collection</h2>
                                        <p className="mb-1">We collect and process the following types of data:</p>
                                        <h3 className="font-semibold">1.1 Personal Information</h3>
                                        <p>
                                            Information such as your name, email address, and login credentials required for user authentication and account management.
                                        </p>
                                        <h3 className="font-semibold">1.2 Operational Data</h3>
                                        <p>
                                            Data generated by the Roverant robot, including patrol routes, real-time video feeds, object detection alerts, and incident logs.
                                        </p>
                                        <h3 className="font-semibold">1.3 Usage Data</h3>
                                        <p>
                                            Information regarding your interactions with the Application, such as access times, navigation behavior, and system performance metrics, to enhance user experience.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">2. Purpose of Data Use</h2>
                                        <p className="mb-1">The collected data is used for the following purposes:</p>
                                        <ul class="list-disc list-inside">
                                            <li>To facilitate real-time monitoring and control of the Roverant robot.</li>
                                            <li>To ensure the safety and security of monitored areas.</li>
                                            <li>To log and analyze patrol data for incident review and auditing.</li>
                                            <li>To enhance and improve the functionality, reliability, and security of the Application.</li>
                                        </ul>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">3. Data Sharing and Disclosure</h2>
                                        <p className="mb-1">
                                            We value your privacy and ensure that your data is shared only under the following conditions:
                                        </p>
                                        <ul className="mb-1 list-disc list-inside">
                                            <li>
                                                <strong>With Trusted Service Providers:</strong> Engaged to assist in the operation and maintenance of the Application under strict confidentiality obligations.
                                            </li>
                                            <li>
                                                <strong>When Required by Law:</strong> To comply with applicable legal obligations or government requests.
                                            </li>
                                            <li>
                                                <strong>In Emergency Situations:</strong> When necessary to protect the safety and security of individuals or property.
                                            </li>
                                        </ul>
                                        <p>We do not sell or rent your personal data to third parties.</p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">4. Data Security</h2>
                                        <p>
                                            We are committed to safeguarding your data through:
                                        </p>
                                        <ul className="mb-1 list-disc list-inside">
                                            <li>Encrypted communication protocols (SSL/TLS) to secure data transmission.</li>
                                            <li>Secure data storage systems with limited access to authorized personnel.</li>
                                            <li>Regular security audits, software updates, and adherence to industry standards for data protection.</li>
                                        </ul>
                                        <p>
                                            Despite our efforts, no system is entirely immune to risks. Users are encouraged to take appropriate security precautions.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">5. Data Retention</h2>
                                        <p>
                                            We retain data only as long as necessary to fulfill the purposes outlined in this policy or comply with legal and operational requirements. Upon the expiration of retention periods, data will be securely deleted or anonymized.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">6. Your Rights</h2>
                                        <p className="mb-1">As a user, you have the following rights regarding your personal data:</p>
                                        <ul className="mb-1 list-disc list-inside">
                                            <li><strong>Access:</strong> You can request details about the data we have collected about you.</li>
                                            <li><strong>Correction:</strong> You may request updates to correct inaccurate or incomplete information.</li>
                                            <li><strong>Deletion:</strong> You can request the deletion of your data, subject to any legal or operational obligations.</li>
                                        </ul>
                                        <p>
                                            To exercise these rights, please contact us using the information in Section 8.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">7. Updates to This Privacy Policy</h2>
                                        <p>
                                            We may periodically update this Privacy Policy to reflect changes in legal requirements, technology, or operational practices. Notifications of significant updates will be provided through the Application or via email.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">8. Contact Information</h2>
                                        <p className="mb-1">
                                            For any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at:
                                        </p>
                                        <ul className="mb-1 list-disc list-inside">
                                            <li><strong>Email:</strong> roverant.development@gmail.com</li>
                                            <li><strong>Address:</strong> Computer engineering department, KMUTT </li>
                                        </ul>

                                        <p>
                                            This Privacy Policy is governed by the applicable laws of [Insert Jurisdiction]. By using the Application, you consent to the collection, use, and disclosure of your data as described in this Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"

                                    onClick={() => setOpenPolicy(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>



            {/* License Modal */}
            <Dialog open={openLicense} onClose={() => setOpenLicense(false)} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-20 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-10 sm:w-full sm:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-10 sm:pb-4 ">
                                <div className="sm:flex sm:items-start">

                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h1 className="text-5xl font-medium mb-8">Roverant - License Agreement</h1>
                                        <p>
                                            This License Agreement ("Agreement") is a legal agreement between you ("User") and the developers of the Roverant Monitoring Web Application (the "Application"). By using the Application, you agree to be bound by the terms of this Agreement.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">1. Grant of License</h2>
                                        <p>
                                            The Application is licensed, not sold. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Application solely for its intended purpose.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">2. Restrictions</h2>
                                        <p>You agree to the following restrictions:</p>
                                        <ul className="list-disc list-inside">
                                            <li>You may not copy, modify, distribute, or create derivative works based on the Application without prior written consent.</li>
                                            <li>You may not reverse engineer, decompile, disassemble, or attempt to discover the source code of the Application.</li>
                                            <li>You may not rent, lease, or sublicense the Application to any third party.</li>
                                            <li>You may not use the Application for unlawful or unauthorized purposes.</li>
                                        </ul>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">3. Ownership</h2>
                                        <p>
                                            All intellectual property rights, including but not limited to copyrights, trademarks, and patents, in the Application are owned by the developers. This Agreement does not grant you any ownership rights to the Application.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">4. Disclaimer of Warranties</h2>
                                        <p>
                                            The Application is provided "as is" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the Application will be uninterrupted, error-free, or meet your requirements.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">5. Limitation of Liability</h2>
                                        <p>
                                            To the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, arising out of or related to your use or inability to use the Application.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">6. Termination</h2>
                                        <p>
                                            This license is effective until terminated. Your rights under this Agreement will terminate automatically without notice if you fail to comply with its terms. Upon termination, you must cease all use of the Application and destroy all copies in your possession.
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">7. Governing Law</h2>
                                        <p>
                                            This Agreement is governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising from this Agreement shall be resolved in the courts of [Insert Jurisdiction].
                                        </p>

                                        <h2 className="text-lg font-semibold mt-5 mb-3">8. Contact Information</h2>
                                        <p>
                                            For questions regarding this License Agreement, please contact us at:
                                        </p>
                                        <ul>
                                            <li><strong>Email:</strong> roverant.development@gmail.com</li>
                                            <li><strong>Address:</strong> Computer engineering department, KMUTT</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"

                                    onClick={() => setOpenLicense(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>

    );
}