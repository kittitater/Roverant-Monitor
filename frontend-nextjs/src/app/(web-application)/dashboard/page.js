// "use client";

// import Layout from "@/components/main/AppLayout";
// // import Navbar from "@/components/navbar";
// // import Footer from "@/components/footer";

// export default function Dashboard() {
//   return (
//     <Layout>
//       <main className="pt-[85px]">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <section className="bg-white dark:bg-gray-900">
//             <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
//               <div className="mx-auto max-w-screen-sm">
//                 <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
//                   This is the Dashboard Page
//                 </h2>
//                 <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
//                   We are under development. Please come back later.
//                 </p>
//               </div>
//               {/* <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
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
//               </div> */}
//             </div>
//           </section>
//         </div>
//       </main>
//     </Layout>
//   );
// }

// // import { useEffect, useRef } from 'react';

// // export default function VideoStream() {
// //     const videoRef = useRef(null);

// //     useEffect(() => {
// //         const videoSocket = new WebSocket('ws://kittitat.trueddns.com:45133/ws/video');

// //         videoSocket.onopen = () => {
// //             console.log("WebSocket connection opened for video stream.");
// //         };

// //         videoSocket.onmessage = (event) => {
// //             if (event.data instanceof Blob) {
// //                 // You are receiving binary data (Blob), so create an object URL
// //                 const url = URL.createObjectURL(event.data);

// //                 // Set the URL to your video element's source
// //                 if (videoRef.current) {
// //                     videoRef.current.src = url;
// //                     videoRef.current.play(); // Play the video if necessary
// //                 }

// //                 // Optionally, you can revoke the object URL later to free up memory
// //                 // URL.revokeObjectURL(url);
// //             } else {
// //                 console.error("Unsupported data type received:", typeof event.data);
// //             }
// //         };

// //         videoSocket.onerror = (error) => {
// //             console.error("WebSocket error:", error);
// //         };

// //         videoSocket.onclose = () => {
// //             console.log("WebSocket connection closed.");
// //         };

// //         return () => {
// //             videoSocket.close();
// //         };
// //     }, []);

// //     return (
// //         <div>
// //             <h1>Live Video Stream</h1>
// //             <img ref={videoRef} alt="Live stream" style={{ width: '640px', height: '480px' }} />
// //         </div>
// //     );
// // }

// // import React, { useEffect, useState } from 'react';

// // const ImageStreamComponent = () => {
// //     const [imageSrc, setImageSrc] = useState(null);
// //     const wsUrl = 'ws://kittitat.trueddns.com:45133/ws/video'; // Your WebSocket URL

// //     useEffect(() => {
// //         const videoSocket = new WebSocket(wsUrl);
// //         videoSocket.binaryType = 'arraybuffer'; // Ensure WebSocket receives binary data

// //         videoSocket.onmessage = (event) => {
// //             // Convert the ArrayBuffer to a Blob and then to an Object URL
// //             const blob = new Blob([event.data], { type: 'image/jpeg' }); // Ensure 'image/jpeg' type
// //             const url = URL.createObjectURL(blob);

// //             setImageSrc((prevUrl) => {
// //                 // Revoke previous Object URL to free up memory
// //                 if (prevUrl) URL.revokeObjectURL(prevUrl);
// //                 return url;
// //             });
// //         };

// //         videoSocket.onerror = (error) => {
// //             console.error("WebSocket error:", error);
// //         };

// //         videoSocket.onclose = () => {
// //             console.log("WebSocket connection closed.");
// //         };

// //         return () => {
// //             // Clean up WebSocket connection on unmount
// //             videoSocket.close();
// //             if (imageSrc) {
// //                 URL.revokeObjectURL(imageSrc); // Revoke final Object URL
// //             }
// //         };
// //     }, []); // Empty dependency array to run only on mount/unmount

// //     return (
// //         <div>
// //             {imageSrc ? (
// //                 <img src={imageSrc} alt="Live Stream" width="1920" height="1080" />
// //             ) : (
// //                 <p>Loading...</p>
// //             )}
// //         </div>
// //     );
// // };

// // export default ImageStreamComponent;

// // import React, { useEffect, useRef } from 'react';

// // const VideoStreamComponent = () => {
// //     const canvasRef = useRef(null);
// //     const wsUrl = 'ws://kittitat.trueddns.com:45133/ws/video'; // Replace with your server's WebSocket URL

// //     useEffect(() => {
// //         const videoSocket = new WebSocket(wsUrl);
// //         videoSocket.binaryType = 'arraybuffer'; // Ensure WebSocket receives binary data

// //         const canvas = canvasRef.current;
// //         const context = canvas.getContext('2d');
// //         const img = new Image();

// //         videoSocket.onopen = () => {
// //             console.log("WebSocket connection opened for video stream.");
// //         };

// //         videoSocket.onmessage = (event) => {
// //             if (event.data instanceof ArrayBuffer) {
// //                 // Convert the ArrayBuffer to a Blob and then to an Object URL
// //                 const blob = new Blob([event.data], { type: 'image/jpeg' });
// //                 const url = URL.createObjectURL(blob);

// //                 img.onload = () => {
// //                     // Draw the image onto the canvas
// //                     context.drawImage(img, 0, 0, canvas.width, canvas.height);
// //                     // Revoke the object URL to free up memory
// //                     URL.revokeObjectURL(url);
// //                 };

// //                 img.src = url;
// //             } else {
// //                 console.error("Unsupported data type received:", typeof event.data);
// //             }
// //         };

// //         videoSocket.onerror = (error) => {
// //             console.error("WebSocket error:", error);
// //         };

// //         videoSocket.onclose = () => {
// //             console.log("WebSocket connection closed.");
// //         };

// //         return () => {
// //             // Clean up WebSocket connection on unmount
// //             videoSocket.close();
// //         };
// //     }, [wsUrl]); // Include wsUrl as a dependency

// //     return (
// //         <div className=' justify-items-center pt-10 space-y-5 '>
// //             <h1 className=' text-2xl'>Live Video Stream</h1>
// //             <div className='flex flex-row space-x-5'>
// //                 <canvas
// //                     ref={canvasRef}
// //                     width="800"
// //                     height="600"

// //                     className='px-30 border-gray-500 rounded-3xl'
// //                 />
// //                 <div className='bg-slate-600 rounded-3xl w-44'>

// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default VideoStreamComponent;

"use client";

import React from "react";
import Layout from "@/components/main/AppLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  FaBatteryThreeQuarters,
  FaTachometerAlt,
  FaCompass,
  FaThermometerHalf,
  FaRobot,
} from "react-icons/fa";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Mock telemetries (Dashboard-level quick stats)
  const batteryLevel = 65;
  const speed = 2.8; // km/h
  const orientation = 78; // degrees
  const temperature = 27.3; // Celsius

  // Mock line chart data: e.g., temperature over time
  const temperatureChartData = {
    labels: ["10:00", "10:05", "10:10", "10:15", "10:20", "10:25"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [26.5, 26.8, 27.1, 27.2, 27.0, 27.3],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  // Mock bar chart data: e.g., distance traveled daily
  const distanceChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Distance (km)",
        data: [0.5, 1.2, 2.0, 1.8, 2.5, 3.1, 3.8],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  // Mock logs
  const logs = [
    { id: 1, time: "09:00", message: "Rover system booted." },
    { id: 2, time: "09:05", message: "Battery at 80%." },
    { id: 3, time: "09:20", message: "Detecting minor obstacle." },
  ];

  // Mock sensor statuses
  const sensors = [
    { id: 1, name: "LIDAR", status: "Active" },
    { id: 2, name: "Camera Front", status: "Active" },
    { id: 3, name: "Camera Rear", status: "Inactive" },
    { id: 4, name: "Ultrasonic", status: "Active" },
  ];

  // Mock system logs or statuses
  const systemLogs = [
    { id: 1, timestamp: "09:00", detail: "Power On" },
    { id: 2, timestamp: "09:05", detail: "Self-check OK" },
    { id: 3, timestamp: "09:15", detail: "Calibration complete" },
  ];

  return (
    <Layout>
      <main className="pt-[95px] mx-auto max-w-screen px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        {/* <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Overview of rover’s status and activity.
          </p>
        </section> */}

        {/* Stats row */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          {/* Battery */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaBatteryThreeQuarters className="text-3xl text-green-500 mb-2" />
            <p className="text-2xl font-bold">{batteryLevel}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Battery</p>
          </div>
          {/* Speed */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaTachometerAlt className="text-3xl text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{speed.toFixed(1)} km/h</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Speed</p>
          </div>
          {/* Orientation */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaCompass className="text-3xl text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{orientation}°</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Orientation
            </p>
          </div>
          {/* Temperature */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaThermometerHalf className="text-3xl text-red-500 mb-2" />
            <p className="text-2xl font-bold">{temperature.toFixed(1)}°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Temperature
            </p>
          </div>
        </section>

        {/* Sensors */}
        <section className="bg-white dark:bg-gray-900 p-6 border border-gray-300 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            System Status
          </h2>
          <ul className="list-inside space-y-2">
            {sensors.map((sensor) => (
              <li key={sensor.id} className="flex items-center space-x-2">
                <FaRobot className="text-gray-500 dark:text-gray-300" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {sensor.name}:
                </span>
                <span
                  className={
                    sensor.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {sensor.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Temperature line chart */}
          <div className="bg-white dark:bg-gray-900 p-6 border  border-gray-300 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Temperature Over Time
            </h2>
            <div className="h-64">
              <Line data={temperatureChartData} />
            </div>
          </div>
          {/* Distance bar chart */}
          <div className="bg-white dark:bg-gray-900 p-6 border  border-gray-300 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Weekly Distance
            </h2>
            <div className="h-64">
              <Bar data={distanceChartData} />
            </div>
          </div>
        </section>

        {/* Logs */}
        <section className="bg-white dark:bg-gray-900 p-6 mx-auto  border  border-gray-300 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Events
          </h2>
          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700  ">
              <thead className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Time
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
                {logs.map((log) => (
                  <tr className="hover:bg-gray-100" key={log.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {log.time}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* System Logs */}
        <section className="bg-white dark:bg-gray-900 p-6 border border-gray-300 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            System Logs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-3 py-2 text-left font-medium">Time</th>
                  <th className="px-3 py-2 text-left font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {systemLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-3 py-2">{log.timestamp}</td>
                    <td className="px-3 py-2">{log.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </Layout>
  );
}
