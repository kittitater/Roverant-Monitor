// "use client";

// export default function MyRover() {
//   return (
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <section className="bg-white dark:bg-gray-900">
//             <div className=" px-4 mx-auto max-w-screen-xl text-center lg:px-6">
//               <div className="mx-auto max-w-screen-sm">
//                 <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
//                   This is the My Rover Page in the Setting Section
//                 </h2>
//                 <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
//                   We are under development. Please come back later.
//                 </p>
//               </div>
//               <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
//                 <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
//                   <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Speechless with how easy this was to integrate
//                     </h3>
//                     <p className="my-4">
//                       "I recently got my hands on Flowbite Pro, and holy crap,
//                       I'm speechless with how easy this was to integrate within
//                       my application. Most templates are a pain, code is
//                       scattered, and near impossible to theme.
//                     </p>
//                     <p className="my-4">
//                       Flowbite has code in one place and I'm not joking when I
//                       say it took me a matter of minutes to copy the code,
//                       customise it and integrate within a Laravel + Vue
//                       application.
//                     </p>
//                     <p className="my-4">
//                       If you care for your time, I hands down would go with
//                       this."
//                     </p>
//                   </blockquote>
//                   <figcaption className="flex justify-center items-center space-x-3">
//                     <img
//                       className="w-9 h-9 rounded-full"
//                       src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
//                       alt="profile picture"
//                     />
//                     <div className="space-y-0.5 font-medium dark:text-white text-left">
//                       <div>Bonnie Green</div>
//                       <div className="text-sm font-light text-gray-500 dark:text-gray-400">
//                         Developer at Open AI
//                       </div>
//                     </div>
//                   </figcaption>
//                 </figure>
//                 <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
//                   <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Solid foundation for any project
//                     </h3>
//                     <p className="my-4">
//                       "FlowBite provides a robust set of design tokens and
//                       components based on the popular Tailwind CSS framework.
//                       From the most used UI components like forms and navigation
//                       bars to the whole app screens designed both for desktop
//                       and mobile, this UI kit provides a solid foundation for
//                       any project."
//                     </p>
//                     <p className="my-4">
//                       Designing with Figma components that can be easily
//                       translated to the utility classes of Tailwind CSS is a
//                       huge timesaver!"
//                     </p>
//                   </blockquote>
//                   <figcaption className="flex justify-center items-center space-x-3">
//                     <img
//                       className="w-9 h-9 rounded-full"
//                       src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
//                       alt="profile picture"
//                     />
//                     <div className="space-y-0.5 font-medium dark:text-white text-left">
//                       <div>Roberta Casas</div>
//                       <div className="text-sm font-light text-gray-500 dark:text-gray-400">
//                         Lead designer at Dropbox
//                       </div>
//                     </div>
//                   </figcaption>
//                 </figure>
//                 <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 lg:border-b-0 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
//                   <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Mindblowing workflow and variants
//                     </h3>
//                     <p className="my-4">
//                       "As someone who mainly designs in the browser, I've been a
//                       casual user of Figma, but as soon as I saw and started
//                       playing with FlowBite my mind was 🤯.
//                     </p>
//                     <p className="my-4">
//                       Everything is so well structured and simple to use (I've
//                       learnt so much about Figma by just using the toolkit).
//                     </p>
//                     <p className="my-4">
//                       Aesthetically, the well designed components are beautiful
//                       and will undoubtedly level up your next application."
//                     </p>
//                   </blockquote>
//                   <figcaption className="flex justify-center items-center space-x-3">
//                     <img
//                       className="w-9 h-9 rounded-full"
//                       src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
//                       alt="profile picture"
//                     />
//                     <div className="space-y-0.5 font-medium dark:text-white text-left">
//                       <div>Jese Leos</div>
//                       <div className="text-sm font-light text-gray-500 dark:text-gray-400">
//                         Software Engineer at Facebook
//                       </div>
//                     </div>
//                   </figcaption>
//                 </figure>
//                 <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
//                   <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Efficient Collaborating
//                     </h3>
//                     <p className="my-4">
//                       "This is a very complex and beautiful set of elements.
//                       Under the hood it comes with the best things from 2
//                       different worlds: Figma and Tailwind.
//                     </p>
//                     <p className="my-4">
//                       You have many examples that can be used to create a fast
//                       prototype for your team."
//                     </p>
//                   </blockquote>
//                   <figcaption className="flex justify-center items-center space-x-3">
//                     <img
//                       className="w-9 h-9 rounded-full"
//                       src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
//                       alt="profile picture"
//                     />
//                     <div className="space-y-0.5 font-medium dark:text-white text-left">
//                       <div>Joseph McFall</div>
//                       <div className="text-sm font-light text-gray-500 dark:text-gray-400">
//                         CTO at Google
//                       </div>
//                     </div>
//                   </figcaption>
//                 </figure>
//               </div>
//               <div className="text-center">
//                 <a
//                   href="#"
//                   className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                 >
//                   Show more...
//                 </a>
//               </div>
//             </div>
//           </section>
//         </div>
//   );
// }


// app/rovers/register.js

// "use client";

// import React, { useState } from "react";
// import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function RegisterRover() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   const [roverData, setRoverData] = useState({
//     name: "",
//     model: "",
//     ip_address: ""
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [configMsg, setConfigMsg] = useState("");
//   const [errors, setErrors] = useState({});

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!user) {
//     router.push("/signin");
//     return null;
//   }

//   const handleChange = (e) => {
//     setRoverData({
//       ...roverData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!roverData.name.trim()) {
//       newErrors.name = "Name is required.";
//     }
//     if (!roverData.model.trim()) {
//       newErrors.model = "Model is required.";
//     }
//     if (!roverData.ip_address.trim()) {
//       newErrors.ip_address = "IP address is required.";
//     } 

//     return newErrors;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setSuccessMsg("");
//     setConfigMsg("");

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const idToken = await user.getIdToken();
//       const res = await fetch(`https://api-roverant.mooo.com/rover/registe`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${idToken}`,
//         },
//         body: JSON.stringify(roverData),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         setErrorMsg(errorData.detail || "Failed to register rover.");
//         return;
//       }


//       setSuccessMsg("Rover registered successfully!");
//       setRoverData({ name: "", model: "", ip_address: "" });
//     } catch (error) {
//       setErrorMsg("An unexpected error occurred.");
//     }
//   };

//   return (
//     <form onSubmit={handleRegister} className="mx-auto max-w-xl p-6 bg-gray-50 rounded-2xl">
//       <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

//         <div className="">
//           <label className="block text-sm font-semibold text-gray-900">
//             Rover Name <span className="text-red-500">*</span>
//           </label>
//           <div className="mt-2.5">
//             <input
//               type="text"
//               name="name"
//               value={roverData.name}
//               onChange={handleChange}
//               placeholder="Rover Alpha"
//               className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline ${errors.name ? 'outline-red-500 outline-2' : 'outline-gray-300 focus:outline-2 focus:outline-black'} placeholder:text-gray-400`}
//             />
//             {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
//           </div>
//         </div>

//         <div className="">
//           <label className="block text-sm font-semibold text-gray-900">
//             Model <span className="text-red-500">*</span>
//           </label>
//           <div className="mt-2.5">
//             <input
//               type="text"
//               name="model"
//               value={roverData.model}
//               onChange={handleChange}
//               placeholder="XJ-900"
//               className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline ${errors.model ? 'outline-red-500 outline-2' : 'outline-gray-300 focus:outline-2 focus:outline-black'} placeholder:text-gray-400`}
//             />
//             {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
//           </div>
//         </div>

//         <div className="sm:col-span-2">
//           <label className="block text-sm font-semibold text-gray-900">
//             IP Address <span className="text-red-500">*</span>
//           </label>
//           <div className="mt-2.5">
//             <input
//               type="text"
//               name="ip_address"
//               value={roverData.ip_address}
//               onChange={handleChange}
//               placeholder="192.168.0.50"
//               className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline ${errors.ip_address ? 'outline-red-500 outline-2' : 'outline-gray-300 focus:outline-2 focus:outline-black'} placeholder:text-gray-400`}
//             />
//             {errors.ip_address && <p className="mt-1 text-sm text-red-600">{errors.ip_address}</p>}
//           </div>
//         </div>
//       </div>
//       <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">Register Rover</button>
//     </form>
//   );
// }



"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterRover() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [roverData, setRoverData] = useState({
    name: "",
    model: "",
    ip_address: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [configMsg, setConfigMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoverData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const sendRoverConfiguration = async (roverId, token, ipAddress) => {
    // Build the rover configuration endpoint URL
    const configUrl = `http://${ipAddress}:8000/api/configure-rover`;
    console.log("Configuring rover at:", configUrl);

    try {
      const res = await fetch(configUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rover_id: roverId,
          registration_token: token,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setConfigMsg(`Configuration error: ${errorData.detail || "Failed to configure rover."}`);
        return;
      }
      const data = await res.json();
      setConfigMsg(`Configuration successful: ${data.message}`);
    } catch (error) {
      console.error("Error configuring rover:", error);
      setConfigMsg("An unexpected error occurred during rover configuration.");
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!roverData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!roverData.model.trim()) {
      newErrors.model = "Model is required.";
    }
    if (!roverData.ip_address.trim()) {
      newErrors.ip_address = "IP address is required.";
    } else if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(roverData.ip_address)) {
      newErrors.ip_address = "Invalid IP address format.";
    }

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setConfigMsg("");
    setIsSubmitting(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const res = await fetch(`https://api-roverant.mooo.com/rover/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify(roverData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMsg(errorData.detail || "Failed to register rover.");
        setIsSubmitting(false);
        return;
      }

      const data = await res.json();
      setSuccessMsg("Rover registered successfully!");

      // Now send configuration directly to the rover using its IP address.
      await sendRoverConfiguration(data.rover_id, data.token, roverData.ip_address);

      setRoverData({ name: "", model: "", ip_address: "" });
    } catch (error) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="mx-auto max-w-4xl p-6 bg-gray-50 rounded-2xl">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Rover Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              value={roverData.name}
              onChange={handleChange}
              placeholder="Roverant Rover 99"
              className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline ${errors.name
                ? 'outline-red-500 outline-2 outline-2-red-500'
                : 'outline-gray-300 outline-2 focus:outline-2  focus:outline-black'
                } placeholder:text-gray-400`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900">
            Model <span className="text-red-500">*</span>
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="model"
              value={roverData.model}
              onChange={handleChange}
              placeholder="RR-99"
              className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline ${errors.model
                ? 'outline-red-500 outline-2 outline-2-red-500'
                : 'outline-gray-300 outline-2 focus:outline-2  focus:outline-black'
                } placeholder:text-gray-400`} />
            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
          </div>
        </div>

        <div >
          <label className="block text-sm font-semibold text-gray-900">
            IP Address <span className="text-red-500">*</span>
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="ip_address"
              value={roverData.ip_address}
              onChange={handleChange}
              placeholder="192.168.1.1"
              className={`block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 outline ${errors.ip_address
                ? 'outline-red-500 outline-2 outline-2-red-500'
                : 'outline-gray-300 outline-2 focus:outline-2  focus:outline-black'
                } placeholder:text-gray-400`} />
            {errors.ip_address && <p className="mt-1 text-sm text-red-600">{errors.ip_address}</p>}
          </div>
        </div>
      </div>
      {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
      {successMsg && <p className="mt-4 text-sm text-green-600">{successMsg}</p>}
      {configMsg && <p className="mt-4 text-sm text-blue-600">{configMsg}</p>}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`block w-full rounded-xl bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:ring-black hover:ring-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isSubmitting ? 'Registering...' : 'Register Rover'}
        </button>
      </div>
    </form>
  );
}

