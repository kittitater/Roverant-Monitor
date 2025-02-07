// app/live-camera/page.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/main/AppLayout";
import MotorControl from "@/components/live-camera/control";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import { useRoverContext } from "@/components/main/RoverContext";

export default function LiveCameraPage() {
  // Retrieve the currently selected rover from context
  const { selectedRover } = useRoverContext();
  // e.g. selectedRover = { id: "rover1", name: "Rover #1", wsUrl: "wss://..." }

  const [isStreaming, setIsStreaming] = useState(true);
  const [wsStatus, setWsStatus] = useState("Connecting...");

  const videoSocketRef = useRef(null);
  const canvasRef = useRef(null);
  const pendingImageBitmap = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const wsUrl = selectedRover?.wsUrl;
    if (!wsUrl) {
      setWsStatus("Unavailable");
      return;
    }

    if (!isStreaming) {
      videoSocketRef.current?.close();
      setWsStatus("Unavailable");
      return;
    }

    setWsStatus("Connecting...");
    const videoSocket = new WebSocket(wsUrl);
    videoSocketRef.current = videoSocket;
    videoSocket.binaryType = "arraybuffer";

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found.");
      setWsStatus("Error");
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get 2D context.");
      setWsStatus("Error");
      return;
    }

    // Drawing loop
    const drawFrame = () => {
      if (pendingImageBitmap.current && !isDrawing.current) {
        isDrawing.current = true;
        try {
          const img = pendingImageBitmap.current;
          pendingImageBitmap.current = null;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          img.close();
        } catch (err) {
          console.error("Error drawing frame:", err);
        } finally {
          isDrawing.current = false;
        }
      }
      requestAnimationFrame(drawFrame);
    };
    requestAnimationFrame(drawFrame);

    // WebSocket events
    videoSocket.onopen = () => setWsStatus("Connected");
    videoSocket.onmessage = async (evt) => {
      if (evt.data instanceof ArrayBuffer) {
        try {
          const blob = new Blob([evt.data], { type: "image/jpeg" });
          const imageBitmap = await createImageBitmap(blob);
          pendingImageBitmap.current = imageBitmap;
        } catch (error) {
          console.error("Error creating imageBitmap:", error);
        }
      }
    };
    videoSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsStatus("Error");
    };
    videoSocket.onclose = () => {
      setWsStatus(isStreaming ? "Error" : "Unavailable");
    };

    return () => {
      videoSocket.close();
    };
  }, [selectedRover, isStreaming]);

  function getStatusColor() {
    switch (wsStatus) {
      case "Connected":
        return "text-green-500";
      case "Error":
        return "text-red-500";
      case "Unavailable":
        return "text-yellow-500";
      default: // "Connecting..."
        return "text-yellow-500";
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold">Live Camera</h1>
          <p className="mt-2 text-gray-500">
            Streaming from: <strong>{selectedRover?.name}</strong>
          </p>
        </section>

        {/* Toggle streaming */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 ${
              isStreaming ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
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
        </div>

        {/* Camera + Motor Control */}
        <section className="flex flex-col lg:flex-row lg:space-x-8 justify-center items-center space-y-6 lg:space-y-0">
          {/* Canvas */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              style={{ border: "2px solid black" }}
              className="rounded-3xl"
            />
            {/* Status overlay */}
            <div className="absolute top-2 left-2 bg-white rounded px-2 py-1 shadow">
              <span className={`font-semibold text-sm ${getStatusColor()}`}>{wsStatus}</span>
            </div>
          </div>

          {/* Motor Control */}
          <div className="flex flex-col items-center bg-white rounded shadow p-4 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Rover Control</h2>
            <MotorControl />
          </div>
        </section>
      </div>
    </Layout>
  );
}
