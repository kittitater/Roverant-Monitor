// "use client";

"use client";

import Layout from "@/components/main/AppLayout";
import MotorControl from "@/components/live-camera/control";
import {
  FaVideoSlash,
  FaVideo,
  FaExpand,
  FaTimes,
  FaMapMarkedAlt,
} from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useRover } from "@/components/context/RoverContext";

export default function OperationConsole() {
  // Mock location data
  const [currentLocation] = useState({ lat: 13.73, lng: 100.51 }); // e.g., Bangkok

  const canvasRef = useRef(null);
  const modalCanvasRef = useRef(null);
  const videoSocketRef = useRef(null); // For video WebSocket
  const statusSocketRef = useRef(null); // New ref for status WebSocket
  const [isStreaming, setIsStreaming] = useState(true);
  const [videoWsStatus, setVideoWsStatus] = useState("Connecting..."); // Renamed for clarity
  const [status, setStatus] = useState({
    status: "disconnected",
    control: false,
    video: false,
  }); // New state for status endpoint data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pendingImageBitmap = useRef(null);
  const isDrawing = useRef(false);
  const { selectedRover } = useRover();

  // WebSocket URLs
  const videoWsUrl = selectedRover
    ? `wss://api-roverant.mooo.com/ws/client/video?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
    : null;

  const statusWsUrl = selectedRover
    ? `wss://api-roverant.mooo.com/ws/status?rover_id=${selectedRover.rover_id}`
    : null;

  // Video WebSocket Effect
  useEffect(() => {
    if (
      !selectedRover ||
      !selectedRover.rover_id ||
      !selectedRover.registration_token
    ) {
      setVideoWsStatus("No rover selected");
      setStatus({ status: "disconnected", control: false, video: false });
      return;
    }

    if (!isStreaming) {
      videoSocketRef.current?.close();
      setVideoWsStatus("Unavailable");
      return;
    }

    setVideoWsStatus("Connecting...");
    const mainCanvas = canvasRef.current;
    if (!mainCanvas) {
      console.log("Main canvas element not found.");
      setVideoWsStatus("Error");
      return;
    }
    const mainContext = mainCanvas.getContext("2d");
    let modalContext = null;
    if (modalCanvasRef.current) {
      modalContext = modalCanvasRef.current.getContext("2d");
    }
    if (!mainContext) {
      console.log("Failed to get main canvas context.");
      setVideoWsStatus("Error");
      return;
    }

    // Video WebSocket connection
    videoSocketRef.current = new WebSocket(videoWsUrl);

    const drawFrame = () => {
      if (pendingImageBitmap.current && !isDrawing.current) {
        isDrawing.current = true;
        try {
          const imageBitmap = pendingImageBitmap.current;
          pendingImageBitmap.current = null;
          mainContext.drawImage(
            imageBitmap,
            0,
            0,
            mainCanvas.width,
            mainCanvas.height
          );
          if (modalContext) {
            modalContext.drawImage(
              imageBitmap,
              0,
              0,
              modalCanvasRef.current.width,
              modalCanvasRef.current.height
            );
          }
          imageBitmap.close();
        } catch (error) {
          console.log("Error drawing frame:", error);
        } finally {
          isDrawing.current = false;
        }
      }
      requestAnimationFrame(drawFrame);
    };
    requestAnimationFrame(drawFrame);

    videoSocketRef.current.onopen = () => {
      setVideoWsStatus("Connected");
    };

    videoSocketRef.current.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        try {
          const arrayBuffer = await event.data.arrayBuffer();
          const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
          const imageBitmap = await createImageBitmap(blob);
          pendingImageBitmap.current = imageBitmap;
        } catch (error) {
          console.log("Error processing Blob frame:", error);
        }
      } else {
        console.log("Unsupported data type received:", event.data);
      }
    };

    videoSocketRef.current.onerror = (error) => {
      console.log("Video WebSocket error:", error);
      setVideoWsStatus("Error");
    };

    videoSocketRef.current.onclose = () => {
      setVideoWsStatus("Unavailable");
    };

    return () => {
      videoSocketRef.current?.close();
    };
  }, [videoWsUrl, selectedRover, isStreaming]);

  // Status WebSocket Effect
  useEffect(() => {
    if (!selectedRover || !selectedRover.rover_id) return;

    statusSocketRef.current = new WebSocket(statusWsUrl);

    statusSocketRef.current.onopen = () => {
      console.log(
        `Status WebSocket connected for rover ${selectedRover.rover_id}`
      );
    };

    statusSocketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type !== "ping") {
          setStatus(data);
        }
      } catch (error) {
        console.log("Error parsing status message:", error);
      }
    };

    statusSocketRef.current.onerror = (error) => {
      console.log("Status WebSocket error:", error);
    };

    statusSocketRef.current.onclose = () => {
      console.log(
        `Status WebSocket closed for rover ${selectedRover.rover_id}`
      );
      setStatus({ status: "disconnected", control: false, video: false });
    };

    return () => {
      statusSocketRef.current?.close();
    };
  }, [statusWsUrl, selectedRover]);

  function getStatusColor(statusText) {
    switch (statusText) {
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

  // Modal Toggle Functions
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

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
      <div className="pt-[110px] min-h-svg mx-auto max-w-screen px-8 py-6 space-y-6">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold">Operation Console</h1>
          <p className="mt-2 text-gray-500">
            Live Streaming from : <strong>{selectedRover?.name}</strong>
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
          <button
            onClick={openModal}
            className="px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 bg-gray-700 hover:bg-gray-800"
          >
            <FaExpand />
            <span>Focus</span>
          </button>
        </div>

        {/* Camera + Status */}
        <section className="grid grid-cols-5 gap-5 justify-center items-center space-y-6 lg:space-y-0">
          <div className="col-span-3">
            <canvas
              onClick={openModal}
              ref={canvasRef}
              width={800}
              height={600}
              className="min-w-full  rounded-2xl border border-gray-300 hover:opacity-80 "
            />
          </div>

          {/* Map Placeholder */}
          <section className="col-span-2 bg-white dark:bg-gray-900 p-4 border border-gray-300 rounded-2xl  flex items-center justify-center min-h-full">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <FaMapMarkedAlt className="text-5xl mb-2" />
              <p>
                [ Map Placeholder ] Current Position: ({currentLocation.lat},{" "}
                {currentLocation.lng})
              </p>
            </div>
          </section>

          
        </section>

        {/* Connection Status */}
          <div className="col-span-5 flex flex-col items-center bg-white border border-gray-300 rounded-2xl p-5  w-full max-w-full">
            <h2 className="text-xl text-center font-semibold mb-10">
              Connection Status
            </h2>
            <div className=" w-full space-y-4">
              <div className="flex justify-center flex-row space-x-5">
                <h1 className="text-lg font-semibold">Rover Status :</h1>
                <span
                  className={`font-semibold text-lg ${
                    status.control ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {status.control ? "Available" : "Unavailable"}
                </span>
              </div>
              <div className="flex justify-center flex-row space-x-5">
                <h1 className="text-lg font-semibold">
                  Camera Streaming Gateway :
                </h1>
                <span
                  className={`font-semibold text-lg ${getStatusColor(
                    videoWsStatus
                  )}`}
                >
                  {videoWsStatus}
                </span>
              </div>
            </div>
            <MotorControl />
          </div>
      </div>

      {/* Full-Screen Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center transition-opacity duration-200 ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="relative flex flex-col justify-center items-center w-fit h-fit">
          <canvas
            ref={modalCanvasRef}
            width={1152}
            height={864}
            className="object-contain min-h-svh max-h-svh"
            // style={{ maxWidth: "99vw", maxHeight: "100vh" }}
          />
          <div className="absolute top-5 left-5 px-4 py-2 bg-white rounded-lg text-black font-bold">
            Camera:{" "}
            <span className={getStatusColor(videoWsStatus)}>
              {videoWsStatus}
            </span>{" "}
            | Rover Status :{" "}
            <span
              className={status.control ? "text-green-500" : "text-yellow-500"}
            >
              {status.control ? "Available" : "Unavailable"}
            </span>{" "}
          </div>
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-black bg-white p-2 rounded-xl hover:bg-gray-400"
          >
            <FaTimes size={24} />
          </button>
        </div>
      </div>
    </Layout>
  );
}

// import Layout from "@/components/main/AppLayout";
// import MotorControl from "@/components/live-camera/control";
// import { FaVideoSlash, FaVideo, FaExpand, FaTimes } from "react-icons/fa";
// import React, { useEffect, useRef, useState } from "react";
// import { useRover } from "@/components/context/RoverContext";

// export default function LiveCamera() {
//   const canvasRef = useRef(null);
//   const modalCanvasRef = useRef(null); // ✅ New ref for fullscreen modal
//   const videoSocketRef = useRef(null); // Store WebSocket instance
//   const [isStreaming, setIsStreaming] = useState(true);
//   const [wsStatus, setWsStatus] = useState("Connecting...");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const pendingImageBitmap = useRef(null);
//   const isDrawing = useRef(false);
//   const { selectedRover } = useRover();

//   const wsUrl = selectedRover
//     ? `wss://api-roverant.mooo.com/ws/client/video?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
//     : null;

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
//     const mainCanvas = canvasRef.current;
//     if (!mainCanvas) {
//       console.log("Main canvas element not found.");
//       setWsStatus("Error");
//       return;
//     }
//     const mainContext = mainCanvas.getContext("2d");

//     // For modal, the canvas may not be mounted when modal is closed.
//     let modalContext = null;
//     if (modalCanvasRef.current) {
//       modalContext = modalCanvasRef.current.getContext("2d");
//     }
//     if (!mainContext) {
//       console.error("Failed to get main canvas context.");
//       setWsStatus("Error");
//       return;
//     }

//     // Create WebSocket connection
//     videoSocketRef.current = new WebSocket(wsUrl);

//     // Rendering Loop: Draw frame onto canvas
//     const drawFrame = () => {
//       if (pendingImageBitmap.current && !isDrawing.current) {
//         isDrawing.current = true;
//         try {
//           const imageBitmap = pendingImageBitmap.current;
//           pendingImageBitmap.current = null;

//           // Draw the frame on the main canvas
//           mainContext.drawImage(
//             imageBitmap,
//             0,
//             0,
//             mainCanvas.width,
//             mainCanvas.height
//           );

//           // If the modal is open and modalContext exists, draw on it as well.
//           if (modalContext) {
//             modalContext.drawImage(
//               imageBitmap,
//               0,
//               0,
//               modalCanvasRef.current.width,
//               modalCanvasRef.current.height
//             );
//           }

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

//     // WebSocket Event Handlers
//     videoSocketRef.current.onopen = () => {
//       setWsStatus("Connected");
//     };

//     videoSocketRef.current.onmessage = async (event) => {
//       if (event.data instanceof Blob) {
//         try {
//           // Convert Blob to ArrayBuffer
//           const arrayBuffer = await event.data.arrayBuffer();
//           const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

//           // Create an ImageBitmap for rendering
//           const imageBitmap = await createImageBitmap(blob);
//           pendingImageBitmap.current = imageBitmap;
//         } catch (error) {
//           console.error("Error processing Blob frame:", error);
//         }
//       } else {
//         console.error("Unsupported data type received:", event.data);
//       }
//     };

//     videoSocketRef.current.onerror = (error) => {
//       console.log("WebSocket error:", error);
//       setWsStatus("Error");
//     };

//     videoSocketRef.current.onclose = () => {
//       setWsStatus("Unavailable");
//     };

//     // Cleanup WebSocket connection on unmount
//     return () => {
//       videoSocketRef.current?.close();
//     };
//   }, [wsUrl, selectedRover, isStreaming]);

//   function getStatusColor() {
//     switch (wsStatus) {
//       case "Connected":
//         return "text-green-500";
//       case "Error":
//         return "text-red-500";
//       case "Unavailable":
//         return "text-yellow-500";
//       default:
//         return "text-yellow-500";
//     }
//   }

//   // 📌 Modal Toggle Functions
//   function openModal() {
//     setIsModalOpen(true);
//   }

//   function closeModal() {
//     setIsModalOpen(false);
//   }

//   // Close modal with Escape key
//   useEffect(() => {
//     function handleKeyDown(event) {
//       if (event.key === "Escape") {
//         closeModal();
//       }
//     }
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   return (
//     <Layout>
//       <div className="pt-[110px] mx-auto max-w-7xl px-4 py-6 space-y-6">
//         <section className="text-center">
//           <h1 className="text-3xl font-extrabold">Live Camera</h1>
//           <p className="mt-2 text-gray-500">
//             Streaming from: <strong>{selectedRover?.name}</strong>
//           </p>
//         </section>

//         {/* Toggle streaming */}
//         <div className="flex justify-center space-x-4">
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

//           {/* Full-Screen Modal Toggle Button */}
//           <button
//             onClick={openModal}
//             className="px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 bg-gray-700 hover:bg-gray-800"
//           >
//             <FaExpand />
//             <span>Focus</span>
//           </button>
//         </div>

//         {/* Camera + Motor Control */}
//         <section className="flex flex-col lg:flex-row lg:space-x-8 justify-center items-center space-y-6 lg:space-y-0">
//           {/* Canvas */}
//           <div className="relative">
//             <canvas
//             onClick={openModal}
//               ref={canvasRef}
//               width={640}
//               height={480}
//               className="rounded-3xl border-2 border-black hover:opacity-80 "
//             />
//             {/* Status overlay */}
//             {/* <div className="absolute top-2 left-2 bg-white border border-gray-300 rounded-2xl px-2 py-1">
//               <span className={`font-semibold text-sm ${getStatusColor()}`}>
//                 Status : {wsStatus}
//               </span>
//             </div> */}
//           </div>

//           {/* Connection Status */}
//           <div className="flex flex-col items-center bg-white border border-gray-300 rounded-2xl p-4 py-14 w-full max-w-md">
//             <h2 className="text-xl text-center font-semibold mb-10">
//               Gateway Connection Status
//             </h2>
//             <div className="flex space-x-4 mb-3">
//               <h1 className="text-lg font-semibold">Camera Streaming :</h1>
//               <span
//                 className={`font-semibold text-lg ${
//                   wsStatus === "Connected"
//                     ? "text-green-500"
//                     : wsStatus === "Error"
//                     ? "text-red-500"
//                     : "text-yellow-500"
//                 }`}
//               >
//                 {wsStatus}
//               </span>
//             </div>
//             <MotorControl />
//           </div>
//         </section>
//       </div>

//       {/* Full-Screen Modal */}

//       <div
//         className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center transition-opacity duration-200 ${
//           isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       >
//         <div className="relative flex flex-col justify-center items-center w-fit h-fit">
//           {/* Full-Screen Canvas */}
//           <canvas
//             ref={modalCanvasRef}
//             width={1152}
//             height={864}
//             className=" object-contain rounded-3xl"
//             style={{ maxWidth: "99vw", maxHeight: "95vh" }}
//           />

//           {/* Status overlay & Motor Control in Fullscreen */}
//           <div className="absolute top-5 left-5 px-4 py-2 bg-white rounded-lg text-black font-bold">
//             Status: <span className={getStatusColor()}>{wsStatus}</span>
//           </div>

//           {/* Close Button */}
//           <button
//             onClick={closeModal}
//             className="absolute top-5 right-5 text-black bg-white p-2 rounded-xl hover:bg-gray-400"
//           >
//             <FaTimes size={24} />
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// }
