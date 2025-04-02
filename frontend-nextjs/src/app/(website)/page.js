"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "../../components/main/footer";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";

import { useState } from "react";
import {
  Field,
  Switch,
  Label,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";

import axios from "axios";

const people = [
  {
    name: "Phithatsanan Lertthanasiriwat", // Home
    role: "Project Founder",
    imageUrl: "/profile_image/Home.jpg",
  },
  {
    name: "Kittitat Songsakseree", // Giang
    role: "Project Founder",
    imageUrl: "/profile_image/Giang.jpg",
  },
  {
    name: "Woradon Samphanphaisarn", // Pond
    role: "Project Founder",
    imageUrl: "/profile_image/Pond.jpg",
  },
  {
    name: "Dr.Prapong Prechaprapranwong", // Aj.Prapong
    role: "Project Advisor",
    imageUrl:
      "https://www.cpe.kmutt.ac.th/media/staff/ad30341f-05af-4e85-aa37-9a60759b09ed.jpg",
  },
  {
    name: "Dr.Kharittha Jangsamsi", // Aj.Karitta
    role: "Project Co-Advisor",
    imageUrl:
      "https://www.cpe.kmutt.ac.th/media/staff/8305a7ae-fab3-4422-910a-e04ac25182d4.jpg",
  },
  // More people...
];

export default function Home() {
  const { user, loading, setUser } = useAuth();

  const [openPolicy, setOpenPolicy] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  // New state for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field as user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^0\d{8,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to the privacy policy.";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await axios.post(
        "https://api-roverant.mooo.com/contact/",
        {
          name: formData.name,
          email: formData.email,
          phone_number: formData.phoneNumber,
          message: formData.message,
          agreed_to_policies: agreed, // Ensure this field is sent
        }
      );

      setStatus({
        loading: false,
        success: "Your message has been submitted!",
        error: null,
      });
      setFormData({ name: "", email: "", phoneNumber: "", message: "" });
      setAgreed(false);
      setErrors({});
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        Array.isArray(error.response.data.detail)
      ) {
        const serverErrors = {};
        error.response.data.detail.forEach((err) => {
          const field = err.loc[err.loc.length - 1]; // Assumes the last item in loc is the field name
          serverErrors[field] = err.msg;
        });
        setErrors(serverErrors);
        setStatus({
          loading: false,
          success: null,
          error: "Please fix the errors below.",
        });
      } else {
        setStatus({
          loading: false,
          success: null,
          error: error.message || "Something went wrong!",
        });
      }
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-black py-0 sm:py-22">
        {/* Greeting */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 min-h-svh flex items-center justify-center">
          <div className="mx-auto  max-w-2xl  gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="grid justify-items-center ">
              <div className="lg:max-w-5xl ">
                <div className="grid justify-items-center">
                  <div className="hidden sm:mb-8 sm:flex sm:justify-left ">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white hover:ring-gray-300 hover:text-gray-300">
                      Announcing our Project proposal.{" "}
                      <Link
                        href="https://mailkmuttacth-my.sharepoint.com/:b:/g/personal/kittitat_song_kmutt_ac_th/EVFX1ffhVFJHqYvAZC0ModcBbCdn_f80wSfjWVH4OL1UjA?e=PTjsUP"
                        target="_blank"
                        className="font-semibold text-white hover:text-gray-300"
                      >
                        <span aria-hidden="true" className="absolute inset-0" />
                        Read more <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                  <div className="">
                    <div className="text-center flex justify-center">
                      <h1 className="text-4xl font-bold tracking-tight  sm:text-8xl text-black bg-white">
                        Rover
                      </h1>
                      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-8xl ">
                        ant Monitorrr
                      </h1>
                      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-8xl bg-white animate-pulse duration-200"> 
                        .
                      </h1>
                    </div>
                    <p className="mt-6 lg:max-w-xl mx-auto text-lg  text-white text-center">
                      The Security Guard Rover Monitoring Web Application.
                      Curious with our project ? Hit the "About Roverant" to get
                      to know our project .
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      {user ? (
                        // If the user is logged in, show "Go to Dashboard"
                        <Link
                          href="/dashboard"
                          className="rounded-xl bg-white px-10 py-3 text-sm font-semibold text-black shadow-2xl shadow-white hover:shadow-2xl hover:shadow-red-600 transition duration-500 hover:bg-white hover:text-red-600 hover:ring-red-600 hover:ring-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Go to Dashboard
                        </Link>
                      ) : (
                        // If not logged in, show "Log in"
                        <Link
                          href="/login"
                          className="rounded-xl bg-white px-10 py-3 text-sm font-semibold text-black shadow-2xl shadow-white hover:shadow-2xl hover:shadow-red-600 transition duration-500 hover:bg-white hover:text-red-600 hover:ring-red-600 hover:ring-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Get Started Now !!!
                        </Link>
                      )}
                      <Link
                        href="/#About"
                        className="text-sm font-semibold leading-6 text-white"
                      >
                        About Roverant <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 text-white animate-bounce"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet our innovator */}
        <div id="Innovator" className="bg-white py-24 sm:py-32 ">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl justify-center">
              <h2 className="text-4xl font-semibold text-center sm:text-left tracking-tight text-gray-900 ">
                Meet our Innovator
              </h2>
              <p className="mt-6 text-lg leading-8 mx-auto text-gray-600">
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
                      alt={person.name}
                      src={person.imageUrl}
                      className="h-16 w-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {person.name}
                      </h3>
                      <p className="text-sm font-semibold leading-6 text-gray-400">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Roverant quote */}
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
                  “Security is not just about protection, It's all about trust
                  and peace of mind”
                </p>
              </blockquote>
              <figcaption className="mt-10">
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                  <div className="font-semibold text-xl text-gray-900">
                    - Roverant Development Group -
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* About Roverant */}
        <div
          id="About"
          className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32"
        >
          <img
            alt="Background"
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
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
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
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            />
          </div>
          <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-3 max-w-7xl px-6 lg:px-5">
            {/* <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2"> */}
            <div className="my-auto max-w-2xl mx-auto text-left md:col-span-2">
              <h2 className="text-center md:text-left text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-10">
                About Roverant
              </h2>
              <p className=" text-pretty text-lg font-medium text-white ">
                Roverant is an innovative security solution designed to enhance
                safety and efficiency in indoor environments. This mobile robot
                autonomously patrols designated areas, leveraging advanced
                technologies like Simultaneous Localization and Mapping (SLAM),
                YOLO-based object detection, and integrated sensors. Its primary
                objective is to detect unauthorized individuals, suspicious
                objects, and abnormal activities while providing real-time video
                feeds and alerts to security personnel via a web application.
              </p>
              <p className="mt-8 text-pretty text-lg font-medium text-white ">
                The project combines robust hardware, including the NVIDIA
                Jetson TX2 and LIDAR, with cutting-edge software technologies
                such as FastAPI and Next.js. The web-based interface enables
                live monitoring, control, and reporting, ensuring seamless
                communication between the robot and human operators. Designed
                for facilities like offices, campuses, medical department, and
                co-working spaces, Roverant aims to improve security coverage,
                reduce human error, and streamline security operations.
              </p>
            </div>

            <div className="my-auto">
              <Image
                src="/roverant-rover.jpg"
                alt="Image"
                width={300}
                height={300}
                className=" w-auto rounded-2xl mx-auto"
              />
            </div>

            {/* </div> */}
          </div>
        </div>

        {/* Contact Roverant */}
        <div
          id="Contact"
          className="isolate grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 bg-white px-6 py-24 sm:py-32 lg:px-24"
        >
          {/* <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            />
          </div> */}
          <div className="mx-auto max-w-2xl text-left">
            <h2 className="text-center md:text-left text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
              Contact Roverant
            </h2>
            <p className=" text-center sm:text-left mt-6 text-lg text-gray-600">
              You can either get in touch with us via information or fill in the
              form{" "}
            </p>
            <div className="mt-10 mb-10 sm:mb-0 sm:mt-16 mx-6 sm:mx-0 items-center space-y-4">
              <div className="flex items-center justify-left gap-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>
                <p className="text-base font-medium">
                  Roverant Development Group
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <Link
                  href="https://maps.app.goo.gl/apHLs7wqCGnaELP87"
                  target="_blank"
                  className="text-base font-medium hover:underline"
                >
                  Bangkok, Thailand
                </Link>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                <Link
                  href="https://roverantdevelopmentgroup.vercel.app"
                  target="_blank"
                  className="text-base font-medium hover:underline"
                >
                  roverantdevelopmentgroup.vercel.app
                </Link>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                  />
                </svg>
                <Link
                  href="mailto:roverantdevelopmentgroup@gmail.com"
                  className="text-base font-medium hover:underline"
                >
                  roverantdevelopmentgroup@gmail.com
                </Link>
              </div>
            </div>
          </div>

          {/* Updated Form with Validation */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-xl p-6 bg-gray-50 rounded-2xl"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {/* Name Field */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-900"
                >
                  How can we call you <span className="text-red-500">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your preffered name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2  focus:ring-black  ${
                      errors.name
                        ? "ring-2  ring-red-500 focus:ring-red-500"
                        : "ring-2  ring-gray-300  focus:ring-black "
                    } placeholder:text-gray-400`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2  focus:ring-black  ${
                      errors.email
                        ? "ring-2  ring-red-500 focus:ring-red-500"
                        : "ring-2  ring-gray-300  focus:ring-black "
                    } placeholder:text-gray-400`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Phone number <span className="text-red-500">*</span>
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone-number"
                    name="phoneNumber"
                    type="text"
                    maxLength={10}
                    placeholder="123-456-7890"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2  focus:ring-black  ${
                      errors.phoneNumber
                        ? "ring-2  ring-red-500 focus:ring-red-500"
                        : "ring-2  ring-gray-300  focus:ring-black "
                    } placeholder:text-gray-400`}
                  />

                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Anything you want to tell us..."
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2  focus:ring-black  ${
                      errors.message
                        ? "ring-2  ring-red-500 focus:ring-red-500"
                        : "ring-2  ring-gray-300  focus:ring-black "
                    } placeholder:text-gray-400`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Agreement Switch */}
              <Field className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={(value) => {
                      setAgreed(value);
                      // Clear the error for the "agreed" field when toggled
                      setErrors((prev) => ({ ...prev, agreed: "" }));
                    }}
                    className={`${
                      agreed
                        ? "bg-black"
                        : errors.agreed
                        ? "bg-gray-200 outline-2 outline-2-red-500"
                        : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                      errors.agreed
                        ? "ring-2 ring-offset-2 ring-red-500"
                        : "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    }`}
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      className={`${
                        agreed ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
                <Label className="text-sm text-gray-600">
                  By selecting this, you agree to our{" "}
                  <button
                    onClick={() => setOpenPolicy(true)}
                    className="font-semibold text-gray-900"
                  >
                    privacy&nbsp;policy
                  </button>
                  .
                </Label>
              </Field>
              {errors.agreed && (
                <div className="sm:col-span-2">
                  <p className="mt-1 text-sm text-red-600">{errors.agreed}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-10">
              <button
                type="submit"
                disabled={status.loading}
                className={`block w-full rounded-xl bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-2 ${
                  status.loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {status.loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {/* Status Messages */}
            {status.success && (
              <p className="mt-4 text-green-600">{status.success}</p>
            )}
            {status.error && (
              <p className="mt-4 text-red-600">{status.error}</p>
            )}
          </form>
        </div>

        {/* Privacy Policy Modal */}
        <Dialog
          open={openPolicy}
          onClose={() => setOpenPolicy(false)}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-20 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-10 sm:w-full sm:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-10 sm:pb-4 ">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h1 className="text-5xl font-medium mb-8">
                        Roverant - Privacy Policy
                      </h1>
                      <p className="text-xl mb-2">
                        <strong>Effective Date:</strong> 1 January 2025{" "}
                      </p>
                      <p className="mb-2">
                        This Privacy Policy explains how data is collected,
                        used, and protected by the Roverant Monitoring Web
                        Application (the “Application”). By using the
                        Application, you agree to the terms of this Privacy
                        Policy.
                      </p>

                      <h2 className="text-lg font-semibold mt-5 mb-3">
                        1. Data Collection
                      </h2>
                      <p className="mb-1">
                        We collect and process the following types of data:
                      </p>
                      <h3 className="font-semibold">
                        1.1 Personal Information
                      </h3>
                      <p>
                        Information such as your name, email address, and login
                        credentials required for user authentication and account
                        management.
                      </p>
                      <h3 className="font-semibold">1.2 Operational Data</h3>
                      <p>
                        Data generated by the Roverant robot, including patrol
                        routes, real-time video feeds, object detection alerts,
                        and incident logs.
                      </p>
                      <h3 className="font-semibold">1.3 Usage Data</h3>
                      <p>
                        Information regarding your interactions with the
                        Application, such as access times, navigation behavior,
                        and system performance metrics, to enhance user
                        experience.
                      </p>

                      <h2 className="text-lg font-semibold mt-5 mb-3">
                        2. Purpose of Data Use
                      </h2>
                      <p className="mb-1">
                        The collected data is used for the following purposes:
                      </p>
                      <ul class="list-disc list-inside">
                        <li>
                          To facilitate real-time monitoring and control of the
                          Roverant robot.
                        </li>
                        <li>
                          To ensure the safety and security of monitored areas.
                        </li>
                        <li>
                          To log and analyze patrol data for incident review and
                          auditing.
                        </li>
                        <li>
                          To enhance and improve the functionality, reliability,
                          and security of the Application.
                        </li>
                      </ul>

                      <h2 className="text-lg font-semibold mt-5 mb-3">
                        3. Data Sharing and Disclosure
                      </h2>
                      <p className="mb-1">
                        We value your privacy and ensure that your data is
                        shared only under the following conditions:
                      </p>
                      <ul className="mb-1 list-disc list-inside">
                        <li>
                          <strong>With Trusted Service Providers:</strong>{" "}
                          Engaged to assist in the operation and maintenance of
                          the Application under strict confidentiality
                          obligations.
                        </li>
                        <li>
                          <strong>When Required by Law:</strong> To comply with
                          applicable legal obligations or government requests.
                        </li>
                        <li>
                          <strong>In Emergency Situations:</strong> When
                          necessary to protect the safety and security of
                          individuals or property.
                        </li>
                      </ul>
                      <p>
                        We do not sell or rent your personal data to third
                        parties.
                      </p>

                      <h2 className="text-lg font-semibold mt-5 mb-3">
                        4. Data Security
                      </h2>
                      <p>We are committed to safeguarding your data through:</p>
                      <ul className="mb-1 list-disc list-inside">
                        <li>
                          Encrypted communication protocols (SSL/TLS) to secure
                          data transmission.
                        </li>
                        <li>
                          Secure data storage systems with limited access to
                          authorized personnel.
                        </li>
                        <li>
                          Regular security audits, software updates, and
                          adherence to industry standards for data protection.
                        </li>
                      </ul>
                      <p>
                        Despite our efforts, no system is entirely immune to
                        risks. Users are encouraged to take appropriate security
                        precautions.
                      </p>

                      <h2 className="text-lg font-semibold mt-5 mb-3">
                        5. Data Retention
                      </h2>
                      <p>
                        We retain data only as long as necessary to fulfill the
                        purposes outlined in this policy or comply with legal
                        and operational requirements. Upon the expiration of
                        retention periods, data will be securely deleted or
                        anonymized.
                      </p>

                      <h2 className="text-lg font-semibold mt-5 mb-3">
                        6. Your Rights
                      </h2>
                      <p className="mb-1">
                        As a user, you have the following rights regarding your
                        personal data:
                      </p>
                      <ul className="mb-1 list-disc list-inside">
                        <li>
                          <strong>Access:</strong> You can request details about
                          the data we have collected about you.
                        </li>
                        <li>
                          <strong>Correction:</strong> You may request updates
                          to correct inaccurate or incomplete information.
                        </li>
                        <li>
                          <strong>Deletion:</strong> You can request the
                          deletion of your data, subject to any legal or
                          operational obligations.
                        </li>
                      </ul>
                      <p>
                        To exercise these rights, please contact us using the
                        information in Section 8.
                      </p>

                      <h2 className="text-lg font-semibold mt-5 mb-3">
                        7. Updates to This Privacy Policy
                      </h2>
                      <p>
                        We may periodically update this Privacy Policy to
                        reflect changes in legal requirements, technology, or
                        operational practices. Notifications of significant
                        updates will be provided through the Application or via
                        email.
                      </p>

                      <h2 className="text-lg font-semibold mt-5 mb-3">
                        8. Contact Information
                      </h2>
                      <p className="mb-1">
                        For any questions, concerns, or requests regarding this
                        Privacy Policy or your data, please contact us at:
                      </p>
                      <ul className="mb-1 list-disc list-inside">
                        <li>
                          <strong>Email:</strong>{" "}
                          roverantdevelopmentgroup@gmail.com
                        </li>
                        <li>
                          <strong>Address:</strong> Computer engineering
                          department, KMUTT{" "}
                        </li>
                      </ul>

                      <p>
                        This Privacy Policy is governed by the applicable laws
                        of [Insert Jurisdiction]. By using the Application, you
                        consent to the collection, use, and disclosure of your
                        data as described in this Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    onClick={() => setOpenPolicy(false)}
                    className="rounded-xl font-semibold bg-black text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
                  >
                    Close
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
      <Footer />
    </>
  );
}

// 'use client'

// import Link from "next/link";
// import Footer from "../../components/main/footer";
// import { useState, useEffect } from "react";
// import { Field, Switch, Label, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
// import axios from 'axios';

// // API Base URL
// const API_BASE_URL = "https://api-roverant.mooo.com";

// const people = [
//   {
//     name: "Phithatsanan Lertthanasiriwat", // Home
//     role: "Project Founder",
//     imageUrl: "../profile_image/Home.jpg",
//   },
//   {
//     name: "Kittitat Songsakseree", // Giang
//     role: "Project Founder",
//     imageUrl: "../profile_image/Giang.jpg",
//   },
//   {
//     name: "Woradon Samphanphaisarn", // Pond
//     role: "Project Founder",
//     imageUrl: "../profile_image/Pond.jpg",
//   },
//   {
//     name: "Dr.Prapong Prechaprapranwong", // Aj.Prapong
//     role: "Project Advisor",
//     imageUrl: "https://www.cpe.kmutt.ac.th/media/staff/ad30341f-05af-4e85-aa37-9a60759b09ed.jpg",
//   },
//   {
//     name: "Dr.Kharittha Jangsamsi", // Aj.Karitta
//     role: "Project Co-Advisor",
//     imageUrl: "https://www.cpe.kmutt.ac.th/media/staff/8305a7ae-fab3-4422-910a-e04ac25182d4.jpg",
//   },
// ];

// export default function Home() {
//   const [rovers, setRovers] = useState([]); // Store fetched rovers data
//   const [openPolicy, setOpenPolicy] = useState(false);
//   const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', message: '' });
//   const [agreed, setAgreed] = useState(false);
//   const [status, setStatus] = useState({ loading: false, success: null, error: null });
//   const [errors, setErrors] = useState({});
//   const [authToken, setAuthToken] = useState(null);

//   // Fetch rovers data
//   async function fetchRovers() {
//     try {
//         const token = localStorage.getItem("auth_token");
//         setAuthToken(token);

//         const response = await fetch("https://api-roverant.mooo.com/rover/my-rovers", {
//             headers: {
//                 "Authorization": token ? `Bearer ${token}` : "",
//                 "Content-Type": "application/json"
//             }
//         });

//         // Check if response is OK
//         if (!response.ok) {
//             if (response.status === 403) {
//                 console.error("Token expired or unauthorized. Redirecting...");
//                 window.location.href = "/login"; // Redirect to login page
//                 return;
//             }
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         // Check if response is empty before parsing
//         const textResponse = await response.text();
//         if (!textResponse) {
//             console.error("Empty API response received.");
//             setRovers([]);
//             return;
//         }

//         // Parse JSON safely
//         const data = JSON.parse(textResponse);
//         console.log("Parsed Data:", data);

//         setRovers(data.rovers || []);
//     } catch (error) {
//         console.error("Failed to fetch rovers:", error);
//         setRovers([]); // Prevent further errors
//     }
// }

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error
//   };

//   // Validate form fields
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required.';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required.';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
//       newErrors.email = 'Invalid email address.';
//     }
//     if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
//     if (!formData.message.trim()) newErrors.message = 'Message is required.';
//     if (!agreed) newErrors.agreed = 'You must agree to the privacy policy.';
//     return newErrors;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setStatus({ loading: true, success: null, error: null });

//     try {
//       const response = await axios.post(`${API_BASE_URL}/contact/`, {
//         name: formData.name,
//         email: formData.email,
//         phone_number: formData.phoneNumber,
//         message: formData.message,
//         agreed_to_policies: agreed,
//       });

//       setStatus({ loading: false, success: 'Your message has been submitted!', error: null });
//       setFormData({ name: '', email: '', phoneNumber: '', message: '' });
//       setAgreed(false);
//       setErrors({});
//     } catch (error) {
//       setStatus({ loading: false, success: null, error: error.response?.data?.message || 'Something went wrong!' });
//     }
//   };

//   return (
//     <>
//       <div className="overflow-hidden bg-white py-0 sm:py-22">
//         {/* Greeting */}
//         <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
//           <div className="grid justify-items-center">
//             <div className="lg:max-w-xl">
//               <div className="text-center">
//                 <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//                   Welcome to the Roverant Monitor
//                 </h1>
//                 <p className="mt-6 text-lg leading-8 text-gray-600">
//                   Our Security Guard Rover Monitoring Web Application.
//                 </p>
//                 <div className="mt-10 flex items-center justify-center gap-x-6">
//                   <Link href="/dashboard" className="rounded-xl bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-black hover:ring-black hover:ring-2">
//                     Try an amazing thing now!
//                   </Link>
//                   <Link href="/#About" className="text-sm font-semibold leading-6 text-gray-900">
//                     About Roverant →
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Meet our innovators */}
//         <div id="Innovator" className="bg-white sm:py-32">
//           <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
//             <div className="max-w-2xl">
//               <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
//                 Meet our Innovator
//               </h2>
//               <p className="mt-6 text-lg leading-8 text-gray-600">
//                 Our team is highly skilled and committed to delivering the best service.
//               </p>
//             </div>
//             <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
//               {people.map((person) => (
//                 <li key={person.name}>
//                   <div className="flex items-center gap-x-6">
//                     <img alt={person.name} src={person.imageUrl} className="h-16 w-16 rounded-full" />
//                     <div>
//                       <h3 className="text-base font-semibold text-gray-900">{person.name}</h3>
//                       <p className="text-sm font-semibold text-indigo-600">{person.role}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Footer */}
//         <Footer />
//       </div>
//     </>
//   );
// }
