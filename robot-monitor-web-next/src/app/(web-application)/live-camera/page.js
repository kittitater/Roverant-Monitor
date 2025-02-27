// "use client";

// import Layout from "@/components/main/AppLayout";
// import MotorControl from "@/components/live-camera/control";
// import { FaVideoSlash, FaVideo } from "react-icons/fa";
// import React, { useEffect, useRef, useState } from "react";
// import { useRover } from "@/components/context/RoverContext";

// export default function LiveCamera() {

//   const canvasRef = useRef(null);
//   const [isStreaming, setIsStreaming] = useState(true);
//   const [wsStatus, setWsStatus] = useState("Connecting...");
//   const pendingImageBitmap = useRef(null); // Holds the next frame to be drawn
//   const isDrawing = useRef(false); // Prevents overlapping draw calls
//   const { selectedRover } = useRover();

//   //const wsUrl = 'wss://10.35.27.180:443/ws/client/video?token=32e1ec9d3b16a6867acad889878b8c32d9ff2ae0692a170c9c137fb3cf9c1d11'; // WebSocket URL from environment
//   // const wsUrl = 'wss://api-roverant.mooo.com/ws/client/video?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3Zlcl9pZCI6ImI3NTkzYzJjLTY5M2QtNDNhMS1iMzg5LTQ4ODU0YmE3ZDQ5NSIsImV4cCI6MTc3MDQwMjczMSwiaWF0IjoxNzM4ODY2NzMxLCJ0eXBlIjoicmVnaXN0cmF0aW9uIn0.pxJRBu9xAn9FaF0vynyfKyDceOOgLqFnXvUjHQoVRWs&rover_id=b7593c2c-693d-43a1-b389-48854ba7d495'; // WebSocket URL from environment
//   //const wsUrl = 'ws://192.168.1.84:8000/ws/video'; // WebSocket URL from environment
//   const wsUrl = `wss://api-roverant.mooo.com/ws/client/video?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`;

//   useEffect(() => {
//     if (
//       !selectedRover ||
//       !selectedRover.rover_id ||
//       !selectedRover.registration_token
//     ) {
//       setWsStatus("No rover selected");
//       return;
//     }

//     if (!isStreaming) {
//       videoSocketRef.current?.close();
//       setWsStatus("Unavailable");
//       return;
//     }

//     setWsStatus("Connecting...");

//     const canvas = canvasRef.current;
//     if (!canvas) {
//       console.error("Canvas element not found.");
//       setWsStatus("Error");
//       return;
//     }
//     const context = canvas.getContext("2d");
//     if (!context) {
//       console.error("Failed to get canvas context.");
//       setWsStatus("Error");
//       return;
//     }

//     // Rendering Loop: Draw frame onto canvas
//     const drawFrame = () => {
//       if (pendingImageBitmap.current && !isDrawing.current) {
//         isDrawing.current = true;
//         try {
//           const imageBitmap = pendingImageBitmap.current;
//           pendingImageBitmap.current = null;

//           // Draw the frame on the canvas
//           context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
//           imageBitmap.close(); // Free resources
//         } catch (error) {
//           console.error("Error drawing frame:", error);
//         } finally {
//           isDrawing.current = false;
//         }
//       }
//       requestAnimationFrame(drawFrame); // Continue rendering loop
//     };
//     requestAnimationFrame(drawFrame); // Start rendering loop

//     // WebSocket Handlers
//     videoSocket.onopen = () => {
//       //console.log("WebSocket connection opened for video.");
//       setWsStatus("Connected");
//     };

//     videoSocket.onmessage = async (event) => {
//       if (event.data instanceof ArrayBuffer) {
//         try {
//           const blob = new Blob([event.data], { type: "image/jpeg" });
//           const imageBitmap = await createImageBitmap(blob);
//           pendingImageBitmap.current = imageBitmap; // Store the frame for rendering
//         } catch (error) {
//           console.error("Error processing frame:", error);
//         }
//       } else {
//         console.error("Unsupported data type received:", typeof event.data);
//       }
//     };

//     videoSocket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//       setWsStatus("Error");
//     };

//     videoSocket.onclose = () => {
//       console.log("WebSocket connection closed.");
//       setWsStatus("Unavailable");
//     };

//     // Clean up WebSocket connection and animation frame on unmount
//     return () => {
//       videoSocket.close();
//     };
//   }, [wsUrl]);

//   function getStatusColor() {
//     switch (wsStatus) {
//       case "Connected":
//         return "text-green-500";
//       case "Error":
//         return "text-red-500";
//       case "Unavailable":
//         return "text-yellow-500";
//       default: // "Connecting..."
//         return "text-yellow-500";
//     }
//   }

//   return (
//     // <Layout>
//     //   <main className="pt-[85px]">
//     //     <div className="grid justify-items-center py-2 space-y-5">
//     //       <h1 className="text-2xl mb-3 font-semibold">Live Camera</h1>
//     //       <div className="flex flex-col space-x-10">
//     //         <div className="flex flex-row space-x-20 items-center">
//     //           {/* Canvas for video stream */}
//     //           <canvas
//     //             ref={canvasRef}
//     //             style={{ border: "2px solid black" }}
//     //             width="640"
//     //             height="480"
//     //             className="rounded-3xl"
//     //           />
//     //           <div className="flex flex-col">
//     //             {/* WebSocket connection status */}
//     //             <div className="mb-3 justify-center flex flex-row space-x-5">
//     //               <h1 className="text-lg font-semibold">Camera connection status:</h1>
//     //               <span
//     //                 className={`font-semibold text-lg ${wsStatus === "Connected"
//     //                   ? "text-green-500"
//     //                   : wsStatus === "Error"
//     //                     ? "text-red-500"
//     //                     : "text-yellow-500"
//     //                   }`}
//     //               >
//     //                 {wsStatus}
//     //               </span>
//     //             </div>
//     //             <div>
//     //               <MotorControl />
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </main>
//     // </Layout>

//     <Layout>
//       <div className="pt-[110px] mx-auto max-w-7xl px-4 py-6 space-y-6">
//         <section className="text-center">
//           <h1 className="text-3xl font-extrabold">Live Camera</h1>
//           <p className="mt-2 text-gray-500">
//             Streaming from: <strong>{selectedRover?.name}</strong>
//           </p>
//         </section>

//         {/* Toggle streaming */}
//         <div className="flex justify-center">
//           <button
//             onClick={() => setIsStreaming(!isStreaming)}
//             className={`px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 ${
//               isStreaming
//                 ? "bg-red-600 hover:bg-red-700"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             {isStreaming ? (
//               <>
//                 <FaVideoSlash />
//                 <span>Stop Streaming</span>
//               </>
//             ) : (
//               <>
//                 <FaVideo />
//                 <span>Start Streaming</span>
//               </>
//             )}
//           </button>
//         </div>

//         {/* Camera + Motor Control */}
//         <section className="flex flex-col lg:flex-row lg:space-x-8 justify-center items-center space-y-6 lg:space-y-0">
//           {/* Canvas */}
//           <div className="relative">
//             <canvas
//               ref={canvasRef}
//               width={640}
//               height={480}
//               style={{ border: "2px solid black" }}
//               className="rounded-3xl"
//             />
//             {/* Status overlay */}
//             <div className="absolute top-2 left-2 bg-white border  border-gray-300 rounded-2xl px-2 py-1 ">
//               <span className={`font-semibold text-sm ${getStatusColor()}`}>
//                 {wsStatus}
//               </span>
//             </div>
//           </div>

//           {/* Motor Control */}
//           <div className="flex flex-col items-center bg-white border border-gray-300 rounded-2xl p-4 w-full max-w-sm">
//             <h2 className="text-lg font-semibold mb-2">Rover Control</h2>
//             <MotorControl />
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// }

"use client";

import Layout from "@/components/main/AppLayout";
import MotorControl from "@/components/live-camera/control";
import { FaVideoSlash, FaVideo, FaExpand, FaTimes } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useRover } from "@/components/context/RoverContext";

export default function LiveCamera() {
  const canvasRef = useRef(null);
  const videoSocketRef = useRef(null); // Store WebSocket instance
  const [isStreaming, setIsStreaming] = useState(true);
  const [wsStatus, setWsStatus] = useState("Connecting...");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pendingImageBitmap = useRef(null);
  const isDrawing = useRef(false);
  const { selectedRover } = useRover();

  const wsUrl = selectedRover
    ? `wss://api-roverant.mooo.com/ws/client/video?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
    : null;

  useEffect(() => {
    if (
      !selectedRover ||
      !selectedRover.rover_id ||
      !selectedRover.registration_token
    ) {
      setWsStatus("No rover selected");
      return;
    }

    if (!isStreaming) {
      videoSocketRef.current?.close();
      setWsStatus("Unavailable");
      return;
    }

    setWsStatus("Connecting...");

    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas element not found.");
      setWsStatus("Error");
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Failed to get canvas context.");
      setWsStatus("Error");
      return;
    }

    // Create WebSocket connection
    videoSocketRef.current = new WebSocket(wsUrl);

    // Rendering Loop: Draw frame onto canvas
    const drawFrame = () => {
      if (pendingImageBitmap.current && !isDrawing.current) {
        isDrawing.current = true;
        try {
          const imageBitmap = pendingImageBitmap.current;
          pendingImageBitmap.current = null;

          // Draw the frame on the canvas
          context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
          imageBitmap.close(); // Free resources
        } catch (error) {
          console.error("Error drawing frame:", error);
        } finally {
          isDrawing.current = false;
        }
      }
      requestAnimationFrame(drawFrame); // Continue rendering loop
    };
    requestAnimationFrame(drawFrame); // Start rendering loop

    // WebSocket Event Handlers
    videoSocketRef.current.onopen = () => {
      setWsStatus("Connected");
    };

    videoSocketRef.current.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        try {
          // Convert Blob to ArrayBuffer
          const arrayBuffer = await event.data.arrayBuffer();
          const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

          // Create an ImageBitmap for rendering
          const imageBitmap = await createImageBitmap(blob);
          pendingImageBitmap.current = imageBitmap;
        } catch (error) {
          console.error("Error processing Blob frame:", error);
        }
      } else {
        console.error("Unsupported data type received:", event.data);
      }
    };

    videoSocketRef.current.onerror = (error) => {
      console.log("WebSocket error:", error);
      setWsStatus("Error");
    };

    videoSocketRef.current.onclose = () => {
      setWsStatus("Unavailable");
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      videoSocketRef.current?.close();
    };
  }, [wsUrl, selectedRover, isStreaming]);

  function getStatusColor() {
    switch (wsStatus) {
      case "Connected":
        return "text-green-500";
      case "Error":
        return "text-red-500";
      case "Unavailable":
        return "text-yellow-500";
      default:
        return "text-yellow-500";
    }
  }

  // 📌 Modal Toggle Functions
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // Close modal with Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Layout>
      <div className="pt-[110px] mx-auto max-w-7xl px-4 py-6 space-y-6">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold">Live Camera</h1>
          <p className="mt-2 text-gray-500">
            Streaming from: <strong>{selectedRover?.name}</strong>
          </p>
        </section>

        {/* Toggle streaming */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 ${
              isStreaming
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isStreaming ? (
              <>
                <FaVideoSlash />
                <span>Stop Streaming</span>
              </>
            ) : (
              <>
                <FaVideo />
                <span>Start Streaming</span>
              </>
            )}
          </button>

          {/* Full-Screen Modal Toggle Button */}
          <button
            onClick={openModal}
            className="px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 bg-gray-700 hover:bg-gray-800"
          >
            <FaExpand />
            <span>Full Screen</span>
          </button>
        </div>

        {/* Camera + Motor Control */}
        <section className="flex flex-col lg:flex-row lg:space-x-8 justify-center items-center space-y-6 lg:space-y-0">
          {/* Canvas */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              className="rounded-3xl border-2 border-black"
            />
            {/* Status overlay */}
            <div className="absolute top-2 left-2 bg-white border border-gray-300 rounded-2xl px-2 py-1">
              <span className={`font-semibold text-sm ${getStatusColor()}`}>
                Status : {wsStatus}
              </span>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex flex-col items-center bg-white border border-gray-300 rounded-2xl p-4 py-14 w-full max-w-md">
            <h2 className="text-xl text-center font-semibold mb-10">
              Rover Connection Status
            </h2>
            <div className="flex space-x-4 mb-3">
              <h1 className="text-lg font-semibold">Camera Streaming :</h1>
              <span
                className={`font-semibold text-lg ${
                  wsStatus === "Connected"
                    ? "text-green-500"
                    : wsStatus === "Error"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {wsStatus}
              </span>
            </div>
            <MotorControl />
          </div>
        </section>
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50">
          <div className="relative flex flex-col justify-center items-center w-full h-full">
            {/* Full-Screen Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
              style={{ maxWidth: "100vw", maxHeight: "100vh" }}
            />

            {/* Status overlay & Motor Control in Fullscreen */}
            <div className="absolute top-5 left-5 px-4 py-2 bg-white rounded-lg text-black font-bold">
              Status: <span className={getStatusColor()}>{wsStatus}</span>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-white bg-gray-800 p-3 rounded-full hover:bg-gray-900"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
