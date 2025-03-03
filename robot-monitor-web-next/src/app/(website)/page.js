'use client'

import Link from "next/link";
import Footer from "../../components/main/footer";
import { useState, useEffect } from "react";
import { Field, Switch, Label, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axios from 'axios';

// API Base URL
const API_BASE_URL = "https://api-roverant.mooo.com";

const people = [
  {
    name: "Phithatsanan Lertthanasiriwat", // Home
    role: "Project Founder",
    imageUrl: "../profile_image/Home.jpg",
  },
  {
    name: "Kittitat Songsakseree", // Giang
    role: "Project Founder",
    imageUrl: "../profile_image/Giang.jpg",
  },
  {
    name: "Woradon Samphanphaisarn", // Pond
    role: "Project Founder",
    imageUrl: "../profile_image/Pond.jpg",
  },
  {
    name: "Dr.Prapong Prechaprapranwong", // Aj.Prapong
    role: "Project Advisor",
    imageUrl: "https://www.cpe.kmutt.ac.th/media/staff/ad30341f-05af-4e85-aa37-9a60759b09ed.jpg",
  },
  {
    name: "Dr.Kharittha Jangsamsi", // Aj.Karitta
    role: "Project Co-Advisor",
    imageUrl: "https://www.cpe.kmutt.ac.th/media/staff/8305a7ae-fab3-4422-910a-e04ac25182d4.jpg",
  },
];

export default function Home() {
  const [rovers, setRovers] = useState([]); // Store fetched rovers data
  const [openPolicy, setOpenPolicy] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', message: '' });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: null, error: null });
  const [errors, setErrors] = useState({});
  const [authToken, setAuthToken] = useState(null);

  // Fetch rovers data
  async function fetchRovers() {
    try {
        const token = localStorage.getItem("auth_token");
        setAuthToken(token);

        const response = await fetch("https://api-roverant.mooo.com/rover/my-rovers", {
            headers: {
                "Authorization": token ? `Bearer ${token}` : "",
                "Content-Type": "application/json"
            }
        });

        // Check if response is OK
        if (!response.ok) {
            if (response.status === 403) {
                console.error("Token expired or unauthorized. Redirecting...");
                window.location.href = "/login"; // Redirect to login page
                return;
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if response is empty before parsing
        const textResponse = await response.text();
        if (!textResponse) {
            console.error("Empty API response received.");
            setRovers([]);
            return;
        }

        // Parse JSON safely
        const data = JSON.parse(textResponse);
        console.log("Parsed Data:", data);

        setRovers(data.rovers || []);
    } catch (error) {
        console.error("Failed to fetch rovers:", error);
        setRovers([]); // Prevent further errors
    }
}

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    if (!agreed) newErrors.agreed = 'You must agree to the privacy policy.';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/contact/`, {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phoneNumber,
        message: formData.message,
        agreed_to_policies: agreed,
      });

      setStatus({ loading: false, success: 'Your message has been submitted!', error: null });
      setFormData({ name: '', email: '', phoneNumber: '', message: '' });
      setAgreed(false);
      setErrors({});
    } catch (error) {
      setStatus({ loading: false, success: null, error: error.response?.data?.message || 'Something went wrong!' });
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-white py-0 sm:py-22">
        {/* Greeting */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
          <div className="grid justify-items-center">
            <div className="lg:max-w-xl">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Welcome to the Roverant Monitor
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Our Security Guard Rover Monitoring Web Application.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link href="/dashboard" className="rounded-xl bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-black hover:ring-black hover:ring-2">
                    Try an amazing thing now!
                  </Link>
                  <Link href="/#About" className="text-sm font-semibold leading-6 text-gray-900">
                    About Roverant →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet our innovators */}
        <div id="Innovator" className="bg-white sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
                Meet our Innovator
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our team is highly skilled and committed to delivering the best service.
              </p>
            </div>
            <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img alt={person.name} src={person.imageUrl} className="h-16 w-16 rounded-full" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{person.name}</h3>
                      <p className="text-sm font-semibold text-indigo-600">{person.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
