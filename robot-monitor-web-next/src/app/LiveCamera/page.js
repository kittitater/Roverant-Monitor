// "use client";

// import Layout from "@/components/layout";
// import ChatComponent from "@/components/LiveCamera/chat";
// import React, { useEffect, useRef } from "react";

// export default function LiveCamera() {
//   const canvasRef = useRef(null);
//   const wsUrl = "ws://kittitat.trueddns.com:45133/ws/video"; // Replace with your server's WebSocket URL

//   // Local WebSocket connection for video stream : ws://192.168.1.84:8000/ws/video
//   // Public WebSocket connection for video stream : ws://kittitat.trueddns.com:45133/ws/video

//   useEffect(() => {
//     const videoSocket = new WebSocket(wsUrl);
//     videoSocket.binaryType = "arraybuffer"; // Ensure WebSocket receives binary data

//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     const img = new Image();

//     videoSocket.onopen = () => {
//       console.log("WebSocket connection opened for video stream.");
//     };

//     videoSocket.onmessage = (event) => {
//       if (event.data instanceof ArrayBuffer) {
//         // Convert the ArrayBuffer to a Blob and then to an Object URL
//         const blob = new Blob([event.data], { type: "image/jpeg" });
//         const url = URL.createObjectURL(blob);

//         img.onload = () => {
//           // Draw the image onto the canvas
//           context.drawImage(img, 0, 0, canvas.width, canvas.height);
//           // Revoke the object URL to free up memory
//           URL.revokeObjectURL(url);
//         };

//         img.src = url;
//       } else {
//         console.error("Unsupported data type received:", typeof event.data);
//       }
//     };

//     videoSocket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     videoSocket.onclose = () => {
//       console.log("WebSocket connection closed.");
//     };

//     return () => {
//       // Clean up WebSocket connection on unmount
//       videoSocket.close();
//     };
//   }, [wsUrl]); // Include wsUrl as a dependency

//   return (
//     <Layout>
//       <div className="grid justify-items-center py-5 space-y-5 ">
//         <h1 className=" text-2xl font-semibold">Live Camera</h1>
//         <div className="flex flex-row space-x-10">
//           <canvas
//             ref={canvasRef}
//             width="640"
//             height="480"
//             className="px-30 border-gray-500 rounded-3xl"
//           />

//           {/* <div className="  p-32 rounded-3xl bg-red-500"></div> */}

//           <ChatComponent />
//         </div>
//       </div>
//     </Layout>
//   );
// }





"use client";

import Layout from "@/components/layout";
import ChatComponent from "@/components/LiveCamera/chat";
import React, { useEffect, useRef, useState } from "react";

// WebSocket URL for video stream from the server
const wsUrl = "ws://kittitat.trueddns.com:45133/ws/video"; // Replace with your server's WebSocket URL

export default function LiveCamera() {
  const canvasRef = useRef(null);
  const [wsStatus, setWsStatus] = useState("Connecting...");

  useEffect(() => {
    const videoSocket = new WebSocket(wsUrl);
    videoSocket.binaryType = "arraybuffer"; // Ensure WebSocket receives binary data

    // Get the canvas and its context
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();

    // WebSocket event handlers
    videoSocket.onopen = () => {
      console.log("WebSocket connection opened for video stream.");
      setWsStatus("Connected");
    };

    videoSocket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        // Convert the ArrayBuffer to a Blob and then to an Object URL
        const blob = new Blob([event.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
          // Draw the image onto the canvas
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          // Revoke the object URL to free up memory
          URL.revokeObjectURL(url);
        };

        img.src = url; // Set the image source to the Blob URL
      } else {
        console.error("Unsupported data type received:", typeof event.data);
      }
    };

    videoSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsStatus("Error");
    };

    videoSocket.onclose = () => {
      console.log("WebSocket connection closed.");
      setWsStatus("Disconnected");
    };

    // Clean up WebSocket connection on unmount
    return () => {
      videoSocket.close();
    };
  }, []);

  return (
    <Layout>
      <div className="grid justify-items-center py-5 space-y-5">
        <h1 className="text-2xl font-semibold">Live Camera</h1>
        <div className="flex flex-row space-x-10">
          <div className="flex flex-col items-center">
            {/* WebSocket connection status */}
            <div className="mb-3">
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

            {/* Canvas for video stream */}
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              className="border-gray-500 rounded-3xl"
            />
          </div>

          <ChatComponent />
        </div>
      </div>
    </Layout>
  );
}
