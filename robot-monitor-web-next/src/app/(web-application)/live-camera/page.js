"use client";

import Layout from "@/components/main/AppLayout";
// import ChatComponent from "@/components/LiveCamera/chat";
import MotorControl from "@/components/live-camera/control";
import React, { useEffect, useRef, useState } from "react";

export default function LiveCamera() {
  const canvasRef = useRef(null);
  const [wsStatus, setWsStatus] = useState("Connecting...");
  const pendingImageBitmap = useRef(null); // Holds the next frame to be drawn
  const isDrawing = useRef(false); // Prevents overlapping draw calls

  //const wsUrl = 'wss://10.35.27.180:443/ws/client/video?token=32e1ec9d3b16a6867acad889878b8c32d9ff2ae0692a170c9c137fb3cf9c1d11'; // WebSocket URL from environment
  const wsUrl = 'wss://api-roverant.mooo.com/ws/client/video?token=32e1ec9d3b16a6867acad889878b8c32d9ff2ae0692a170c9c137fb3cf9c1d11'; // WebSocket URL from environment
  //const wsUrl = 'ws://192.168.1.84:8000/ws/video'; // WebSocket URL from environment

  useEffect(() => {
    const videoSocket = new WebSocket(wsUrl);
    videoSocket.binaryType = "arraybuffer"; // Ensure WebSocket receives binary data

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found.");
      setWsStatus("Error");
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Failed to get canvas context.");
      setWsStatus("Error");
      return;
    }

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

    // WebSocket Handlers
    videoSocket.onopen = () => {
      //console.log("WebSocket connection opened for video.");
      setWsStatus("Connected");
    };

    videoSocket.onmessage = async (event) => {
      if (event.data instanceof ArrayBuffer) {
        try {
          const blob = new Blob([event.data], { type: "image/jpeg" });
          const imageBitmap = await createImageBitmap(blob);
          pendingImageBitmap.current = imageBitmap; // Store the frame for rendering
        } catch (error) {
          console.error("Error processing frame:", error);
        }
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
      setWsStatus("Unavailable");
    };

    // Clean up WebSocket connection and animation frame on unmount
    return () => {
      videoSocket.close();
    };
  }, [wsUrl]);

  return (
      <Layout>
        <div className="grid justify-items-center py-2 space-y-5">
          <h1 className="text-2xl mb-3 font-semibold">Live Camera</h1>
          <div className="flex flex-col space-x-10">
            <div className="flex flex-row space-x-20 items-center">
              {/* Canvas for video stream */}
              <canvas
                ref={canvasRef}
                style={{ border: "2px solid black" }}
                width="640"
                height="480"
                className="rounded-3xl"
              />
              <div className="flex flex-col">
                {/* WebSocket connection status */}
                <div className="mb-3 justify-center flex flex-row space-x-5">
                  <h1 className="text-lg font-semibold">Camera connection status:</h1>
                  <span
                    className={`font-semibold text-lg ${wsStatus === "Connected"
                      ? "text-green-500"
                      : wsStatus === "Error"
                        ? "text-red-500"
                        : "text-yellow-500"
                      }`}
                  >
                    {wsStatus}
                  </span>
                </div>
                <div>
                  <MotorControl />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}





