
'use client'

import Link from "next/link";
import Footer from "../components/footer";

import { useState } from "react";
import { Field, Label, Switch } from '@headlessui/react'


const people = [
  {
    name: "Phithatsanan Lertthanasiriwat", // Home
    role: "Project Founder",
    imageUrl: "../profile_image/Home.jpg",
  },
  {
    name: "Dr.Prapong Prechaprapranwong", // Aj.Prapong
    role: "Project Advisor",
    imageUrl:
      "https://www.cpe.kmutt.ac.th/media/staff/ad30341f-05af-4e85-aa37-9a60759b09ed.jpg",
  },
  {
    name: "Woradon Samphanphaisarn", // Pond
    role: "Project Founder",
    imageUrl: "../profile_image/Pond.jpg",
  },
  {
    name: "Dr.Kharittha Jangsamsi", // Aj.Karitta
    role: "Project Co-Advisor",
    imageUrl:
      "https://www.cpe.kmutt.ac.th/media/staff/8305a7ae-fab3-4422-910a-e04ac25182d4.jpg",
  },
  {
    name: "Kittitat Songsakseree", // Giang
    role: "Project Founder",
    imageUrl: "../profile_image/Giang.jpg",
  },
  // More people...
];

const links = [
  { name: 'Open roles', href: '#' },
  { name: 'Internship program', href: '#' },
  { name: 'Our values', href: '#' },
  { name: 'Meet our leadership', href: '#' },
]
const stats = [
  { name: 'Offices worldwide', value: '12' },
  { name: 'Full-time colleagues', value: '300+' },
  { name: 'Hours per week', value: '40' },
  { name: 'Paid time off', value: 'Unlimited' },
]

export default function Home() {
  const [agreed, setAgreed] = useState(false)

  return (
    <>
      <div className="overflow-hidden bg-white py-0 sm:py-22">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
          <div className="mx-auto  max-w-2xl  gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="grid justify-items-center ">
              <div className="lg:max-w-xl ">
                <div className="grid justify-items-center">
                  <div className="hidden sm:mb-8 sm:flex sm:justify-left ">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      Announcing our Project proposal.{" "}
                      <Link href="https://mailkmuttacth-my.sharepoint.com/:b:/g/personal/kittitat_song_kmutt_ac_th/EVFX1ffhVFJHqYvAZC0ModcBbCdn_f80wSfjWVH4OL1UjA?e=PTjsUP" target="_blank" className="font-semibold text-black">
                        <span aria-hidden="true" className="absolute inset-0" />
                        Read more <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                  <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Welcome to the Roverant Monitor
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      Our Security Guard Rover Monitoring Web Application.
                      Curious with our project ? Hit the learn more to read our
                      project idea proposal.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <Link
                        href="/Dashboard"
                        className="rounded-xl bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Try an amazing things now!!!
                      </Link>
                      <Link
                        href="https://mailkmuttacth-my.sharepoint.com/:b:/g/personal/kittitat_song_kmutt_ac_th/EVFX1ffhVFJHqYvAZC0ModcBbCdn_f80wSfjWVH4OL1UjA?e=PTjsUP"
                        target="_blank"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="bg-white  sm:py-16 ">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 ">
                Meet our Innovator
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our team is made up of highly skilled and experienced
                individuals who are passionate about the project. We are
                committed to providing the best service to our users.
              </p>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img
                      alt=""
                      src={person.imageUrl}
                      className="h-16 w-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {person.name}
                      </h3>
                      <p className="text-sm font-semibold leading-6 text-indigo-600">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <section className="relative isolate overflow-hidden bg-white px-6 py-28 ">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            {/* <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/workcation-logo-indigo-600.svg"
              className="mx-auto h-12"
            /> */}
            <figure className="mt-0">
              <blockquote className="text-center text-4xl font-semibold text-gray-900 ">
                <p>
                  “Security is not just about protection, It's all about trust and peace of mind”
                </p>
              </blockquote>
              <figcaption className="mt-10">

                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                  <div className="font-semibold text-xl text-gray-900">- Roverant Founder -</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>


        <div id="About" className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
            className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
          />
          <div
            aria-hidden="true"
            className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-5xl font-semibold tracking-tight text-white ">About Roverant</h2>
              <p className="mt-8 text-pretty text-lg font-medium text-white ">
                Roverant is an innovative security solution designed to enhance safety and efficiency in indoor environments. This mobile robot autonomously patrols designated areas, leveraging advanced technologies like Simultaneous Localization and Mapping (SLAM), YOLO-based object detection, and integrated sensors. Its primary objective is to detect unauthorized individuals, suspicious objects, and abnormal activities while providing real-time video feeds and alerts to security personnel via a web application.
              </p>
              <p className="mt-8 text-pretty text-lg font-medium text-white ">
                The project combines robust hardware, including the NVIDIA Jetson TX2 and LIDAR, with cutting-edge software technologies such as FastAPI and Next.js. The web-based interface enables live monitoring, control, and reporting, ensuring seamless communication between the robot and human operators. Designed for facilities like offices, campuses, medical department, and co-working spaces, Roverant aims to improve security coverage, reduce human error, and streamline security operations.
              </p>
            </div>
          </div>
        </div>

        <div id="Contact" className="isolate flex flex-row bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-left text-5xl font-semibold tracking-tight text-gray-900">Contact Roverant</h2>
            <p className="mt-6 text-lg text-gray-600">You can either get in touch with us via information or fill in the form </p>
          </div>
          <form action="#" method="POST" className="mx-auto max-w-xl ">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
                  How can we called you
                </label>
                <div className="mt-2.5">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black"
                  />
                </div>
              </div>
              <div >
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <div className="flex rounded-xl bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-black">

                    <input
                      id="phone-number"
                      name="phone-number"
                      type="text"
                      maxLength={10}
                      placeholder="123-456-7890"
                      autoComplete="tel"
                      className="block min-w-0 grow py-2 px-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black"
                    defaultValue={''}
                  />
                </div>
              </div>
              <Field className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black data-[checked]:bg-black"
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                    />
                  </Switch>
                </div>
                <Label className="text-sm/6 text-gray-600">
                  By selecting this, you agree to our{' '}
                  <a href="#" className="font-semibold text-gray-900">
                    privacy&nbsp;policy
                  </a>
                  .
                </Label>
              </Field>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-xl bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white  shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-2 "
              >
                Submit
              </button>
            </div>
          </form>
        </div>


      </div>
      <Footer />
    </>
  );
}
