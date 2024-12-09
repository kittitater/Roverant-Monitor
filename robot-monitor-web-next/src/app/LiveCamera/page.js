
"use client";

import Layout from "@/components/layout";
import ChatComponent from "@/components/LiveCamera/chat";
import MotorControl from "@/components/LiveCamera/control";
import React, { useEffect, useRef, useState } from "react";

export default function LiveCamera() {
  const canvasRef = useRef(null);
  const [wsStatus, setWsStatus] = useState("Connecting...");
  const pendingImageBitmap = useRef(null); // Holds the next frame to be drawn
  const isDrawing = useRef(false); // Prevents overlapping draw calls

  const wsUrl = "ws://kittitat.trueddns.com:45137/ws/video"; // WebSocket URL

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
    const drawFrame = async () => {
      if (pendingImageBitmap.current && !isDrawing.current) {
        isDrawing.current = true;
        try {
          const imageBitmap = pendingImageBitmap.current;
          pendingImageBitmap.current = null;

          // Draw the frame on the canvas
          context.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
          imageBitmap.close(); // Free resources
          console.log("Frame drawn on canvas.");
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
      console.log("WebSocket connection opened.");
      setWsStatus("Connected");
    };

    videoSocket.onmessage = async (event) => {
      if (event.data instanceof ArrayBuffer) {
        try {
          const blob = new Blob([event.data], { type: "image/jpeg" });
          const imageBitmap = await createImageBitmap(blob);
          pendingImageBitmap.current = imageBitmap; // Store the frame for rendering
          console.log("Received and decoded a frame.");
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

    // Clean up WebSocket connection on unmount
    return () => {
      videoSocket.close();
    };
  }, [wsUrl]);

  return (
    <Layout>
      <div className="grid justify-items-center py-5 space-y-5">
        <h1 className="text-2xl font-semibold">Live Camera</h1>
        <div className="flex flex-row space-x-10">
          <div className="flex flex-col items-center">
            {/* WebSocket connection status */}
            <div className="mb-3 flex flex-row space-x-5">
              <h1 className="text-lg font-semibold">Camera connection status :</h1>
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

            {/* Canvas for video stream */}
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              style={{ border: "2px solid black" }}
              className="rounded-3xl"
            />
          </div>

          {/* <ChatComponent /> */}
        </div>
        <div>
          <MotorControl />
        </div>
      </div>
    </Layout>
  );
}
