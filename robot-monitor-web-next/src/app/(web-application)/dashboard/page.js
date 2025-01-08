"use client";

import Layout from "@/components/main/layout";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";

export default function Dashboard() {
  return (
    <Layout>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  This is the Dashboard Page
                </h2>
                <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                  We are under development. Please come back later.
                </p>
              </div>
              {/* <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
                <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
                  <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Speechless with how easy this was to integrate
                    </h3>
                    <p className="my-4">
                      "I recently got my hands on Flowbite Pro, and holy crap,
                      I'm speechless with how easy this was to integrate within
                      my application. Most templates are a pain, code is
                      scattered, and near impossible to theme.
                    </p>
                    <p className="my-4">
                      Flowbite has code in one place and I'm not joking when I
                      say it took me a matter of minutes to copy the code,
                      customise it and integrate within a Laravel + Vue
                      application.
                    </p>
                    <p className="my-4">
                      If you care for your time, I hands down would go with
                      this."
                    </p>
                  </blockquote>
                  <figcaption className="flex justify-center items-center space-x-3">
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                      alt="profile picture"
                    />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                      <div>Bonnie Green</div>
                      <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Developer at Open AI
                      </div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
                  <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Solid foundation for any project
                    </h3>
                    <p className="my-4">
                      "FlowBite provides a robust set of design tokens and
                      components based on the popular Tailwind CSS framework.
                      From the most used UI components like forms and navigation
                      bars to the whole app screens designed both for desktop
                      and mobile, this UI kit provides a solid foundation for
                      any project."
                    </p>
                    <p className="my-4">
                      Designing with Figma components that can be easily
                      translated to the utility classes of Tailwind CSS is a
                      huge timesaver!"
                    </p>
                  </blockquote>
                  <figcaption className="flex justify-center items-center space-x-3">
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                      alt="profile picture"
                    />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                      <div>Roberta Casas</div>
                      <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Lead designer at Dropbox
                      </div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-b border-gray-200 lg:border-b-0 md:p-12 lg:border-r dark:bg-gray-800 dark:border-gray-700">
                  <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Mindblowing workflow and variants
                    </h3>
                    <p className="my-4">
                      "As someone who mainly designs in the browser, I've been a
                      casual user of Figma, but as soon as I saw and started
                      playing with FlowBite my mind was 🤯.
                    </p>
                    <p className="my-4">
                      Everything is so well structured and simple to use (I've
                      learnt so much about Figma by just using the toolkit).
                    </p>
                    <p className="my-4">
                      Aesthetically, the well designed components are beautiful
                      and will undoubtedly level up your next application."
                    </p>
                  </blockquote>
                  <figcaption className="flex justify-center items-center space-x-3">
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                      alt="profile picture"
                    />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                      <div>Jese Leos</div>
                      <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Software Engineer at Facebook
                      </div>
                    </div>
                  </figcaption>
                </figure>
                <figure className="flex flex-col justify-center items-center p-8 text-center bg-gray-50 border-gray-200 md:p-12 dark:bg-gray-800 dark:border-gray-700">
                  <blockquote className="mx-auto mb-8 max-w-2xl text-gray-500 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Efficient Collaborating
                    </h3>
                    <p className="my-4">
                      "This is a very complex and beautiful set of elements.
                      Under the hood it comes with the best things from 2
                      different worlds: Figma and Tailwind.
                    </p>
                    <p className="my-4">
                      You have many examples that can be used to create a fast
                      prototype for your team."
                    </p>
                  </blockquote>
                  <figcaption className="flex justify-center items-center space-x-3">
                    <img
                      className="w-9 h-9 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                      alt="profile picture"
                    />
                    <div className="space-y-0.5 font-medium dark:text-white text-left">
                      <div>Joseph McFall</div>
                      <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                        CTO at Google
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <div className="text-center">
                <a
                  href="#"
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Show more...
                </a>
              </div> */}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

// import { useEffect, useRef } from 'react';

// export default function VideoStream() {
//     const videoRef = useRef(null);

//     useEffect(() => {
//         const videoSocket = new WebSocket('ws://kittitat.trueddns.com:45133/ws/video');

//         videoSocket.onopen = () => {
//             console.log("WebSocket connection opened for video stream.");
//         };

//         videoSocket.onmessage = (event) => {
//             if (event.data instanceof Blob) {
//                 // You are receiving binary data (Blob), so create an object URL
//                 const url = URL.createObjectURL(event.data);

//                 // Set the URL to your video element's source
//                 if (videoRef.current) {
//                     videoRef.current.src = url;
//                     videoRef.current.play(); // Play the video if necessary
//                 }

//                 // Optionally, you can revoke the object URL later to free up memory
//                 // URL.revokeObjectURL(url);
//             } else {
//                 console.error("Unsupported data type received:", typeof event.data);
//             }
//         };

//         videoSocket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };

//         videoSocket.onclose = () => {
//             console.log("WebSocket connection closed.");
//         };

//         return () => {
//             videoSocket.close();
//         };
//     }, []);

//     return (
//         <div>
//             <h1>Live Video Stream</h1>
//             <img ref={videoRef} alt="Live stream" style={{ width: '640px', height: '480px' }} />
//         </div>
//     );
// }

// import React, { useEffect, useState } from 'react';

// const ImageStreamComponent = () => {
//     const [imageSrc, setImageSrc] = useState(null);
//     const wsUrl = 'ws://kittitat.trueddns.com:45133/ws/video'; // Your WebSocket URL

//     useEffect(() => {
//         const videoSocket = new WebSocket(wsUrl);
//         videoSocket.binaryType = 'arraybuffer'; // Ensure WebSocket receives binary data

//         videoSocket.onmessage = (event) => {
//             // Convert the ArrayBuffer to a Blob and then to an Object URL
//             const blob = new Blob([event.data], { type: 'image/jpeg' }); // Ensure 'image/jpeg' type
//             const url = URL.createObjectURL(blob);

//             setImageSrc((prevUrl) => {
//                 // Revoke previous Object URL to free up memory
//                 if (prevUrl) URL.revokeObjectURL(prevUrl);
//                 return url;
//             });
//         };

//         videoSocket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };

//         videoSocket.onclose = () => {
//             console.log("WebSocket connection closed.");
//         };

//         return () => {
//             // Clean up WebSocket connection on unmount
//             videoSocket.close();
//             if (imageSrc) {
//                 URL.revokeObjectURL(imageSrc); // Revoke final Object URL
//             }
//         };
//     }, []); // Empty dependency array to run only on mount/unmount

//     return (
//         <div>
//             {imageSrc ? (
//                 <img src={imageSrc} alt="Live Stream" width="1920" height="1080" />
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default ImageStreamComponent;

// import React, { useEffect, useRef } from 'react';

// const VideoStreamComponent = () => {
//     const canvasRef = useRef(null);
//     const wsUrl = 'ws://kittitat.trueddns.com:45133/ws/video'; // Replace with your server's WebSocket URL

//     useEffect(() => {
//         const videoSocket = new WebSocket(wsUrl);
//         videoSocket.binaryType = 'arraybuffer'; // Ensure WebSocket receives binary data

//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
//         const img = new Image();

//         videoSocket.onopen = () => {
//             console.log("WebSocket connection opened for video stream.");
//         };

//         videoSocket.onmessage = (event) => {
//             if (event.data instanceof ArrayBuffer) {
//                 // Convert the ArrayBuffer to a Blob and then to an Object URL
//                 const blob = new Blob([event.data], { type: 'image/jpeg' });
//                 const url = URL.createObjectURL(blob);

//                 img.onload = () => {
//                     // Draw the image onto the canvas
//                     context.drawImage(img, 0, 0, canvas.width, canvas.height);
//                     // Revoke the object URL to free up memory
//                     URL.revokeObjectURL(url);
//                 };

//                 img.src = url;
//             } else {
//                 console.error("Unsupported data type received:", typeof event.data);
//             }
//         };

//         videoSocket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };

//         videoSocket.onclose = () => {
//             console.log("WebSocket connection closed.");
//         };

//         return () => {
//             // Clean up WebSocket connection on unmount
//             videoSocket.close();
//         };
//     }, [wsUrl]); // Include wsUrl as a dependency

//     return (
//         <div className=' justify-items-center pt-10 space-y-5 '>
//             <h1 className=' text-2xl'>Live Video Stream</h1>
//             <div className='flex flex-row space-x-5'>
//                 <canvas
//                     ref={canvasRef}
//                     width="800"
//                     height="600"

//                     className='px-30 border-gray-500 rounded-3xl'
//                 />
//                 <div className='bg-slate-600 rounded-3xl w-44'>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VideoStreamComponent;
