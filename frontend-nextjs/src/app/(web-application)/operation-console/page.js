"use client";

import Layout from "@/components/main/AppLayout";
import MotorControl from "@/components/operation-console/control";
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
  const [currentLocation] = useState({ lat: 13.73, lng: 100.51 }); // e.g., Bangkok

  const canvasRef = useRef(null);
  const thermalCanvasRef = useRef(null); // New ref for thermal canvas
  const modalCanvasRef = useRef(null);
  const videoSocketRef = useRef(null);
  const thermalSocketRef = useRef(null); // New ref for thermal WebSocket
  const statusSocketRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [videoWsStatus, setVideoWsStatus] = useState("Connecting...");
  const [thermalWsStatus, setThermalWsStatus] = useState("Connecting..."); // New state for thermal WebSocket
  const [status, setStatus] = useState({
    status: "disconnected",
    control: false,
    video: false,
    thermal: false, // Added thermal status
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pendingImageBitmap = useRef(null); // For video
  const pendingThermalBitmap = useRef(null); // For thermal
  const isDrawingVideo = useRef(false);
  const isDrawingThermal = useRef(false); // New flag for thermal
  const { selectedRover } = useRover();

  // WebSocket URLs
  const videoWsUrl = selectedRover
    ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/client/video?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
    : null;

  const thermalWsUrl = selectedRover
    ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/client/thermal?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
    : null;

  const statusWsUrl = selectedRover
    ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/status?rover_id=${selectedRover.rover_id}`
    : null;

  // Video WebSocket Effect
  useEffect(() => {
    if (
      !selectedRover ||
      !selectedRover.rover_id ||
      !selectedRover.registration_token
    ) {
      setVideoWsStatus("No rover selected");
      setThermalWsStatus("No rover selected");
      setStatus({ status: "disconnected", control: false, video: false, thermal: false });
      return;
    }

    if (!isStreaming) {
      videoSocketRef.current?.close();
      thermalSocketRef.current?.close();
      setVideoWsStatus("Unavailable");
      setThermalWsStatus("Unavailable");
      return;
    }

    setVideoWsStatus("Connecting...");
    const mainCanvas = canvasRef.current;
    if (!mainCanvas) {
      console.log("Main video canvas element not found.");
      setVideoWsStatus("Error");
      return;
    }
    const mainContext = mainCanvas.getContext("2d");
    let modalContext = null;
    if (modalCanvasRef.current) {
      modalContext = modalCanvasRef.current.getContext("2d");
    }
    if (!mainContext) {
      console.log("Failed to get main video canvas context.");
      setVideoWsStatus("Error");
      return;
    }

    videoSocketRef.current = new WebSocket(videoWsUrl);

    const drawVideoFrame = () => {
      if (pendingImageBitmap.current && !isDrawingVideo.current) {
        isDrawingVideo.current = true;
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
          console.log("Error drawing video frame:", error);
        } finally {
          isDrawingVideo.current = false;
        }
      }
      requestAnimationFrame(drawVideoFrame);
    };
    requestAnimationFrame(drawVideoFrame);

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
          console.log("Error processing video Blob frame:", error);
        }
      } else {
        console.log("Unsupported video data type received:", event.data);
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

  // Thermal WebSocket Effect
  useEffect(() => {
    if (
      !selectedRover ||
      !selectedRover.rover_id ||
      !selectedRover.registration_token ||
      !isStreaming
    ) {
      return;
    }

    setThermalWsStatus("Connecting...");
    const thermalCanvas = thermalCanvasRef.current;
    if (!thermalCanvas) {
      console.log("Thermal canvas element not found.");
      setThermalWsStatus("Error");
      return;
    }
    const thermalContext = thermalCanvas.getContext("2d");
    if (!thermalContext) {
      console.log("Failed to get thermal canvas context.");
      setThermalWsStatus("Error");
      return;
    }

    thermalSocketRef.current = new WebSocket(thermalWsUrl);

    const drawThermalFrame = () => {
      if (pendingThermalBitmap.current && !isDrawingThermal.current) {
        isDrawingThermal.current = true;
        try {
          const imageBitmap = pendingThermalBitmap.current;
          pendingThermalBitmap.current = null;
          thermalContext.drawImage(
            imageBitmap,
            0,
            0,
            thermalCanvas.width,
            thermalCanvas.height
          );
          imageBitmap.close();
        } catch (error) {
          console.log("Error drawing thermal frame:", error);
        } finally {
          isDrawingThermal.current = false;
        }
      }
      requestAnimationFrame(drawThermalFrame);
    };
    requestAnimationFrame(drawThermalFrame);

    thermalSocketRef.current.onopen = () => {
      setThermalWsStatus("Connected");
    };

    thermalSocketRef.current.onmessage = async (event) => {
      if (event.data instanceof Blob) {
        try {
          const arrayBuffer = await event.data.arrayBuffer();
          const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
          const imageBitmap = await createImageBitmap(blob);
          pendingThermalBitmap.current = imageBitmap;
        } catch (error) {
          console.log("Error processing thermal Blob frame:", error);
        }
      } else {
        console.log("Unsupported thermal data type received:", event.data);
      }
    };

    thermalSocketRef.current.onerror = (error) => {
      console.log("Thermal WebSocket error:", error);
      setThermalWsStatus("Error");
    };

    thermalSocketRef.current.onclose = () => {
      setThermalWsStatus("Unavailable");
    };

    return () => {
      thermalSocketRef.current?.close();
    };
  }, [thermalWsUrl, selectedRover, isStreaming]);

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
      setStatus({ status: "disconnected", control: false, video: false, thermal: false });
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

        <div className="flex justify-center space-x-4 border border-gray-300 rounded-2xl p-5">
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
                <span>Off Streaming</span>
              </>
            ) : (
              <>
                <FaVideo />
                <span>On Streaming</span>
              </>
            )}
          </button>
          <button
            onClick={openModal}
            className="px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 bg-gray-700 hover:bg-gray-800"
          >
            <FaExpand />
            <span>Fullscreen Video</span>
          </button>
        </div>

        <section className="grid grid-cols-6 gap-6 justify-center items-center space-y-6 lg:space-y-0">
          <section className="col-span-3">
            <canvas
              onClick={openModal}
              ref={canvasRef}
              width={600}
              height={450}
              className="min-w-full rounded-2xl border border-gray-300 hover:opacity-80"
            />
          </section>

          <section className="col-span-3">
            <canvas
              ref={thermalCanvasRef}
              width={600}
              height={450}
              className="min-w-full rounded-2xl border border-gray-300 hover:opacity-80"
            />
          </section>

          <section className="min-h-80 col-span-6 bg-white dark:bg-gray-900 p-4 border border-gray-300 rounded-2xl flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col justify-center items-center space-y-5">
              <FaMapMarkedAlt className="text-7xl mb-2" />
              <p>
                [ Map Placeholder ] Current Position: ({currentLocation.lat}, {currentLocation.lng})
              </p>
            </div>
          </section>
        </section>

        <div className="flex flex-col items-center bg-white border border-gray-300 rounded-2xl p-5">
          <h2 className="text-xl text-center font-semibold mb-10">
            Connection Status
          </h2>
          <div className="w-full">
            <div className="flex justify-center flex-row space-x-5 py-4">
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
                className={`font-semibold text-lg ${getStatusColor(videoWsStatus)}`}
              >
                {videoWsStatus}
              </span>
            </div>
            <div className="flex justify-center flex-row space-x-5">
              <h1 className="text-lg font-semibold">
                Thermal Streaming Gateway :
              </h1>
              <span
                className={`font-semibold text-lg ${getStatusColor(thermalWsStatus)}`}
              >
                {thermalWsStatus}
              </span>
            </div>
          </div>
          <MotorControl />
        </div>
      </div>

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
          />
          <div className="absolute top-5 left-5 px-4 py-2 bg-white rounded-lg text-black font-bold">
            Camera: <span className={getStatusColor(videoWsStatus)}>{videoWsStatus}</span> | 
            Thermal: <span className={getStatusColor(thermalWsStatus)}>{thermalWsStatus}</span> | 
            Rover Status: <span className={status.control ? "text-green-500" : "text-yellow-500"}>
              {status.control ? "Available" : "Unavailable"}
            </span>
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









// "use client";

// import Layout from "@/components/main/AppLayout";
// import MotorControl from "@/components/operation-console/control";
// import {
//   FaVideoSlash,
//   FaVideo,
//   FaExpand,
//   FaTimes,
//   FaMapMarkedAlt,
// } from "react-icons/fa";
// import React, { useEffect, useRef, useState } from "react";
// import { useRover } from "@/components/context/RoverContext";

// export default function OperationConsole() {
//   // Mock location data
//   const [currentLocation] = useState({ lat: 13.73, lng: 100.51 }); // e.g., Bangkok

//   const canvasRef = useRef(null);
//   const modalCanvasRef = useRef(null);
//   const videoSocketRef = useRef(null); // For video WebSocket
//   const statusSocketRef = useRef(null); // New ref for status WebSocket
//   const [isStreaming, setIsStreaming] = useState(true);
//   const [videoWsStatus, setVideoWsStatus] = useState("Connecting..."); // Renamed for clarity
//   const [status, setStatus] = useState({
//     status: "disconnected",
//     control: false,
//     video: false,
//   }); // New state for status endpoint data
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const pendingImageBitmap = useRef(null);
//   const isDrawing = useRef(false);
//   const { selectedRover } = useRover();

//   // WebSocket URLs
//   const videoWsUrl = selectedRover
//     ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/client/video?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
//     : null;

//   const statusWsUrl = selectedRover
//     ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/status?rover_id=${selectedRover.rover_id}`
//     : null;

//   // Video WebSocket Effect
//   useEffect(() => {
//     if (
//       !selectedRover ||
//       !selectedRover.rover_id ||
//       !selectedRover.registration_token
//     ) {
//       setVideoWsStatus("No rover selected");
//       setStatus({ status: "disconnected", control: false, video: false });
//       return;
//     }

//     if (!isStreaming) {
//       videoSocketRef.current?.close();
//       setVideoWsStatus("Unavailable");
//       return;
//     }

//     setVideoWsStatus("Connecting...");
//     const mainCanvas = canvasRef.current;
//     if (!mainCanvas) {
//       console.log("Main canvas element not found.");
//       setVideoWsStatus("Error");
//       return;
//     }
//     const mainContext = mainCanvas.getContext("2d");
//     let modalContext = null;
//     if (modalCanvasRef.current) {
//       modalContext = modalCanvasRef.current.getContext("2d");
//     }
//     if (!mainContext) {
//       console.log("Failed to get main canvas context.");
//       setVideoWsStatus("Error");
//       return;
//     }

//     // Video WebSocket connection
//     videoSocketRef.current = new WebSocket(videoWsUrl);

//     const drawFrame = () => {
//       if (pendingImageBitmap.current && !isDrawing.current) {
//         isDrawing.current = true;
//         try {
//           const imageBitmap = pendingImageBitmap.current;
//           pendingImageBitmap.current = null;
//           mainContext.drawImage(
//             imageBitmap,
//             0,
//             0,
//             mainCanvas.width,
//             mainCanvas.height
//           );
//           if (modalContext) {
//             modalContext.drawImage(
//               imageBitmap,
//               0,
//               0,
//               modalCanvasRef.current.width,
//               modalCanvasRef.current.height
//             );
//           }
//           imageBitmap.close();
//         } catch (error) {
//           console.log("Error drawing frame:", error);
//         } finally {
//           isDrawing.current = false;
//         }
//       }
//       requestAnimationFrame(drawFrame);
//     };
//     requestAnimationFrame(drawFrame);

//     videoSocketRef.current.onopen = () => {
//       setVideoWsStatus("Connected");
//     };

//     videoSocketRef.current.onmessage = async (event) => {
//       if (event.data instanceof Blob) {
//         try {
//           const arrayBuffer = await event.data.arrayBuffer();
//           const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
//           const imageBitmap = await createImageBitmap(blob);
//           pendingImageBitmap.current = imageBitmap;
//         } catch (error) {
//           console.log("Error processing Blob frame:", error);
//         }
//       } else {
//         console.log("Unsupported data type received:", event.data);
//       }
//     };

//     videoSocketRef.current.onerror = (error) => {
//       console.log("Video WebSocket error:", error);
//       setVideoWsStatus("Error");
//     };

//     videoSocketRef.current.onclose = () => {
//       setVideoWsStatus("Unavailable");
//     };

//     return () => {
//       videoSocketRef.current?.close();
//     };
//   }, [videoWsUrl, selectedRover, isStreaming]);

//   // Status WebSocket Effect
//   useEffect(() => {
//     if (!selectedRover || !selectedRover.rover_id) return;

//     statusSocketRef.current = new WebSocket(statusWsUrl);

//     statusSocketRef.current.onopen = () => {
//       console.log(
//         `Status WebSocket connected for rover ${selectedRover.rover_id}`
//       );
//     };

//     statusSocketRef.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         if (data.type !== "ping") {
//           setStatus(data);
//         }
//       } catch (error) {
//         console.log("Error parsing status message:", error);
//       }
//     };

//     statusSocketRef.current.onerror = (error) => {
//       console.log("Status WebSocket error:", error);
//     };

//     statusSocketRef.current.onclose = () => {
//       console.log(
//         `Status WebSocket closed for rover ${selectedRover.rover_id}`
//       );
//       setStatus({ status: "disconnected", control: false, video: false });
//     };

//     return () => {
//       statusSocketRef.current?.close();
//     };
//   }, [statusWsUrl, selectedRover]);

//   function getStatusColor(statusText) {
//     switch (statusText) {
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

//   // Modal Toggle Functions
//   function openModal() {
//     setIsModalOpen(true);
//   }

//   function closeModal() {
//     setIsModalOpen(false);
//   }

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
//       <div className="pt-[110px] min-h-svg mx-auto max-w-screen px-8 py-6 space-y-6">
//         <section className="text-center">
//           <h1 className="text-3xl font-extrabold">Operation Console</h1>
//           <p className="mt-2 text-gray-500">
//             Live Streaming from : <strong>{selectedRover?.name}</strong>
//           </p>
//         </section>

//         {/* Toggle streaming */}
//         <div className="flex justify-center space-x-4 border border-gray-300 rounded-2xl p-5">
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
//                 <span>Off Video Streaming</span>
//               </>
//             ) : (
//               <>
//                 <FaVideo />
//                 <span>On Video Streaming</span>
//               </>
//             )}
//           </button>
//           <button
//             onClick={openModal}
//             className="px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 bg-gray-700 hover:bg-gray-800"
//           >
//             <FaExpand />
//             <span>Fullscreen Video</span>
//           </button>
//         </div>

//         <section className="grid grid-cols-6 gap-6 justify-center items-center space-y-6 lg:space-y-0">
//           {/* Camera */}
//           <section className="col-span-3">
//             <canvas
//               onClick={openModal}
//               ref={canvasRef}
//               width={600}
//               height={450}
//               className="min-w-full  rounded-2xl border border-gray-300 hover:opacity-80 "
//             />
//           </section>

//           {/* Map Placeholder */}
//           <section className="col-span-3 bg-white dark:bg-gray-900 p-4 border border-gray-300 rounded-2xl  flex items-center justify-center min-h-full">
//             <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col before:justify-center  items-center space-y-5">
//               <p>[ Thermal Camera Placeholder ]</p>
//             </div>
//           </section>

//           {/* Map Placeholder */}
//           <section className="min-h-80 col-span-6 bg-white dark:bg-gray-900 p-4 border border-gray-300 rounded-2xl  flex items-center justify-center ">
//             <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col before:justify-center  items-center space-y-5">
//               <FaMapMarkedAlt className="text-7xl mb-2" />
//               <p>
//                 [ Map Placeholder ] Current Position: ({currentLocation.lat},{" "}
//                 {currentLocation.lng})
//               </p>
//             </div>
//           </section>
//         </section>

//         {/* Connection Status */}
//         <div className="flex flex-col items-center bg-white border border-gray-300 rounded-2xl p-5 ">
//           <h2 className="text-xl text-center font-semibold mb-10">
//             Connection Status
//           </h2>
//           <div className=" w-full space-y-4">
//             <div className="flex justify-center flex-row space-x-5">
//               <h1 className="text-lg font-semibold">Rover Status :</h1>
//               <span
//                 className={`font-semibold text-lg ${
//                   status.control ? "text-green-500" : "text-yellow-500"
//                 }`}
//               >
//                 {status.control ? "Available" : "Unavailable"}
//               </span>
//             </div>
//             <div className="flex justify-center flex-row space-x-5">
//               <h1 className="text-lg font-semibold">
//                 Camera Streaming Gateway :
//               </h1>
//               <span
//                 className={`font-semibold text-lg ${getStatusColor(
//                   videoWsStatus
//                 )}`}
//               >
//                 {videoWsStatus}
//               </span>
//             </div>
//           </div>
//           <MotorControl />
//         </div>
//       </div>

//       {/* Full-Screen Modal */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center transition-opacity duration-200 ${
//           isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       >
//         <div className="relative flex flex-col justify-center items-center w-fit h-fit">
//           <canvas
//             ref={modalCanvasRef}
//             width={1152}
//             height={864}
//             className="object-contain min-h-svh max-h-svh"
//             // style={{ maxWidth: "99vw", maxHeight: "100vh" }}
//           />
//           <div className="absolute top-5 left-5 px-4 py-2 bg-white rounded-lg text-black font-bold">
//             Camera:{" "}
//             <span className={getStatusColor(videoWsStatus)}>
//               {videoWsStatus}
//             </span>{" "}
//             | Rover Status :{" "}
//             <span
//               className={status.control ? "text-green-500" : "text-yellow-500"}
//             >
//               {status.control ? "Available" : "Unavailable"}
//             </span>{" "}
//           </div>
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

