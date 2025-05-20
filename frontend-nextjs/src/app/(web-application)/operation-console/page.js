"use client";

import Layout from "@/components/main/AppLayout";
import MotorControl from "@/components/operation-console/control";
import {
  FaVideoSlash,
  FaVideo,
  FaTimes,
  FaMapMarkedAlt,
  FaTemperatureHigh,
} from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useRover } from "@/components/context/RoverContext";

export default function OperationConsole() {
  /* ───────── STATE ───────── */
  const [currentLocation] = useState({ lat: 13.73, lng: 100.51 });
  const [isStreaming, setIsStreaming] = useState(true);
  const [fullscreenCam, setFullscreenCam] = useState(null); // null | "video" | "thermal"
  const isModalOpen = fullscreenCam !== null;
  const [controlWsStatus, setControlWsStatus] = useState("Connecting…"); // New control WebSocket status

  /* keep the *live* value for the draw loop */
  const fullscreenRef = useRef(fullscreenCam);
  useEffect(() => { fullscreenRef.current = fullscreenCam; }, [fullscreenCam]);

  /* connection indicators */
  const [videoWsStatus, setVideoWsStatus] = useState("Connecting…");
  const [thermalWsStatus, setThermalWsStatus] = useState("Connecting…");
  const [status, setStatus] = useState({
    status: "disconnected",
    control: false,
    video: false,
    thermal: false,
  });

  /* refs */
  const canvasRef = useRef(null);
  const thermalCanvasRef = useRef(null);
  const modalCanvasRef = useRef(null);
  const modalThermalRef = useRef(null);

  const videoSockRef = useRef(null);
  const thermalSockRef = useRef(null);
  const statusSockRef = useRef(null);
  const controlSockRef = useRef(null); // New control WebSocket ref

  const pendingVideo = useRef(null);
  const pendingThermal = useRef(null);
  const drawingVideo = useRef(false);
  const drawingThermal = useRef(false);

  const { selectedRover } = useRover();

  const videoWsUrl = selectedRover
    ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/client/video?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
    : null;
  const thermalWsUrl = selectedRover
    ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/client/thermal?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
    : null;
  const statusWsUrl = selectedRover
    ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/status?rover_id=${selectedRover.rover_id}`
    : null;
  const controlWsUrl = selectedRover
    ? `${process.env.NEXT_PUBLIC_WS_URL}/ws/client/control?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
    : null;

  /* ───────── VIDEO SOCKET ───────── */
  useEffect(() => {
    if (!videoWsUrl || !isStreaming) {
      videoSockRef.current?.close();
      setVideoWsStatus(isStreaming ? "No rover selected" : "Streaming off");
      return;
    }

    setVideoWsStatus("Connecting…");
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) { setVideoWsStatus("Error"); return; }

    const sock = new WebSocket(videoWsUrl);
    videoSockRef.current = sock;

    const draw = () => {
      if (pendingVideo.current && !drawingVideo.current) {
        drawingVideo.current = true;
        const bmp = pendingVideo.current;
        pendingVideo.current = null;

        try {
          ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);

          if (fullscreenRef.current === "video" && modalCanvasRef.current) {
            const mCtx = modalCanvasRef.current.getContext("2d");
            mCtx.drawImage(
              bmp, 0, 0, modalCanvasRef.current.width, modalCanvasRef.current.height
            );
          }
        } finally {
          bmp.close();
          drawingVideo.current = false;
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);

    sock.onopen = () => setVideoWsStatus("Connected");
    sock.onclose = () => setVideoWsStatus("Disconnected");
    sock.onerror = () => setVideoWsStatus("Error");
    sock.onmessage = async (e) => {
      if (e.data instanceof Blob) {
        const ab = await e.data.arrayBuffer();
        const bmp = await createImageBitmap(new Blob([ab], { type: "image/jpeg" }));
        pendingVideo.current = bmp;
      }
    };

    return () => sock.close();
  }, [videoWsUrl, isStreaming]);

  /* ───────── THERMAL SOCKET ───────── */
  useEffect(() => {
    if (!thermalWsUrl || !isStreaming) {
      thermalSockRef.current?.close();
      setThermalWsStatus(isStreaming ? "No rover selected" : "Streaming off");
      return;
    }

    setThermalWsStatus("Connecting…");
    const canvas = thermalCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) { setThermalWsStatus("Error"); return; }

    const sock = new WebSocket(thermalWsUrl);
    thermalSockRef.current = sock;

    const draw = () => {
      if (pendingThermal.current && !drawingThermal.current) {
        drawingThermal.current = true;
        const bmp = pendingThermal.current;
        pendingThermal.current = null;

        try {
          ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);

          if (fullscreenRef.current === "thermal" && modalThermalRef.current) {
            const mCtx = modalThermalRef.current.getContext("2d");
            mCtx.drawImage(
              bmp, 0, 0, modalThermalRef.current.width, modalThermalRef.current.height
            );
          }
        } finally {
          bmp.close();
          drawingThermal.current = false;
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);

    sock.onopen = () => setThermalWsStatus("Connected");
    sock.onclose = () => setThermalWsStatus("Disconnected");
    sock.onerror = () => setThermalWsStatus("Error");
    sock.onmessage = async (e) => {
      if (e.data instanceof Blob) {
        const ab = await e.data.arrayBuffer();
        const bmp = await createImageBitmap(new Blob([ab], { type: "image/jpeg" }));
        pendingThermal.current = bmp;
      }
    };

    return () => sock.close();
  }, [thermalWsUrl, isStreaming]);

  /* ───────── CONTROL SOCKET ───────── */
  useEffect(() => {
    if (!controlWsUrl) {
      setControlWsStatus("No rover selected");
      controlSockRef.current?.close();
      return;
    }

    setControlWsStatus("Connecting…");
    const sock = new WebSocket(controlWsUrl);
    controlSockRef.current = sock;

    sock.onopen = () => setControlWsStatus("Connected");
    sock.onclose = () => setControlWsStatus("Disconnected");
    sock.onerror = () => setControlWsStatus("Error");
    sock.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setControlWsStatus(`Command received: ${data.data}`);
      } catch (error) {
        setControlWsStatus(`Error parsing message: ${error}`);
      }
    };

    return () => sock.close();
  }, [controlWsUrl]);

  /* ───────── STATUS SOCKET ───────── */
  useEffect(() => {
    if (!statusWsUrl) return;
    const s = new WebSocket(statusWsUrl);
    statusSockRef.current = s;

    s.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type !== "ping") setStatus(data);
      } catch {/* no-op */}
    };
    return () => s.close();
  }, [statusWsUrl]);

  /* ───────── HELPERS ───────── */
  const openModal = (cam) => setFullscreenCam(cam);
  const closeModal = () => setFullscreenCam(null);

  const getStatusColor = (t) => {
    switch (t) {
      case "Connected": return "text-green-500";
      case "Error": return "text-red-500";
      case "Disconnected":
      case "Streaming off":
      case "No rover selected": return "text-yellow-500";
      default: return "text-yellow-500";
    }
  };

  useEffect(() => {
    const h = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const sendCommand = (command) => {
    if (controlSockRef.current && controlSockRef.current.readyState === WebSocket.OPEN) {
      controlSockRef.current.send(JSON.stringify({ type: "control_command", data: command }));
      setControlWsStatus(`Sent command: ${command}`);
    } else {
      setControlWsStatus("Control WebSocket not connected");
    }
  };

  /* ───────── RENDER ───────── */
  return (
    <Layout>
      <div className="pt-[110px] min-h-svg mx-auto max-w-screen px-8 py-6 space-y-6">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold">Operation Console</h1>
          <p className="mt-2 text-gray-500">
            Live Streaming from&nbsp;
            <strong>{selectedRover?.name || "No rover selected"}</strong>
          </p>
        </section>

        {/* STREAMING CONTROLS */}
        <div className="flex justify-center space-x-4 border border-gray-300 rounded-2xl p-5">
          <button
            onClick={() => setIsStreaming((v) => !v)}
            className={`px-4 py-2 rounded-xl font-semibold text-white flex items-center space-x-2 ${
              isStreaming
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isStreaming ? (
              <>
                <FaVideoSlash /> <span>Stop Streaming</span>
              </>
            ) : (
              <>
                <FaVideo /> <span>Start Streaming</span>
              </>
            )}
          </button>
        </div>

        {/* PREVIEW GRID */}
        <section className="grid grid-cols-6 gap-6">
          {/* Main camera preview */}
          <div className="col-span-3 relative">
            <canvas
              ref={canvasRef}
              width={600}
              height={450}
              onClick={() => openModal("video")}
              className="min-w-full rounded-2xl border border-gray-300 hover:opacity-80 cursor-pointer"
            />
            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-lg flex items-center">
              <FaVideo className="mr-1" /> Main Camera
            </div>
            <div
              className={`absolute top-2 right-2 ${getStatusColor(
                videoWsStatus
              )} bg-black/60 px-2 py-1 rounded-lg`}
            >
              {videoWsStatus}
            </div>
          </div>

          {/* Thermal camera preview */}
          <div className="col-span-3 relative">
            <canvas
              ref={thermalCanvasRef}
              width={600}
              height={450}
              onClick={() => openModal("thermal")}
              className="min-w-full rounded-2xl border border-gray-300 hover:opacity-80 cursor-pointer"
            />
            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-lg flex items-center">
              <FaTemperatureHigh className="mr-1" /> Thermal Camera
            </div>
            <div
              className={`absolute top-2 right-2 ${getStatusColor(
                thermalWsStatus
              )} bg-black/60 px-2 py-1 rounded-lg`}
            >
              {thermalWsStatus}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="col-span-6 min-h-80 bg-white dark:bg-gray-900 p-4 border border-gray-300 rounded-2xl flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center space-y-5">
              <FaMapMarkedAlt className="text-7xl" />
              <p>
                [ Map Placeholder ] Current Position: ({currentLocation.lat},{" "}
                {currentLocation.lng})
              </p>
            </div>
          </div>
        </section>

        {/* CONNECTION STATUS + MOTOR CONTROL */}
        <div className="flex flex-col items-center bg-white border border-gray-300 rounded-2xl p-5 space-y-8">
          <h2 className="text-xl font-semibold">Connection Status</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusCard
              title="Rover Status"
              statusText={status.control ? "Available" : "Unavailable"}
              color={status.control ? "text-green-500" : "text-yellow-500"}
            />
            <StatusCard
              title="Main Camera"
              statusText={videoWsStatus}
              color={getStatusColor(videoWsStatus)}
            />
            <StatusCard
              title="Thermal Camera"
              statusText={thermalWsStatus}
              color={getStatusColor(thermalWsStatus)}
            />
            <StatusCard
              title="Control"
              statusText={controlWsStatus}
              color={getStatusColor(controlWsStatus)}
            />
          </div>
          <MotorControl className="w-full" sendCommand={sendCommand} />
        </div>
      </div>

      {/* FULL-SCREEN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center">
          {/* top bar */}
          <div className="absolute top-0 left-0 right-0 bg-black/70 text-white p-2 flex justify-between items-center">
            <div className="flex space-x-4">
              {fullscreenCam === "video" ? (
                <span>
                  Main Camera:&nbsp;
                  <span className={getStatusColor(videoWsStatus)}>
                    {videoWsStatus}
                  </span>
                </span>
              ) : (
                <span>
                  Thermal Camera:&nbsp;
                  <span className={getStatusColor(thermalWsStatus)}>
                    {thermalWsStatus}
                  </span>
                </span>
              )}
              <span>
                Rover:&nbsp;
                <span
                  className={
                    status.control ? "text-green-500" : "text-yellow-500"
                  }
                >
                  {status.control ? "Available" : "Unavailable"}
                </span>
              </span>
            </div>
            <button
              onClick={closeModal}
              className="p-2 rounded-full bg-red-600 hover:bg-red-700"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* full-screen canvas */}
          {fullscreenCam === "video" ? (
            <canvas
              ref={modalCanvasRef}
              width={1280}
              height={720}
              className="rounded-xl border border-gray-700"
            />
          ) : (
            <canvas
              ref={modalThermalRef}
              width={1280}
              height={720}
              className="rounded-xl border border-gray-700"
            />
          )}

          <p className="text-white mt-4">Press ESC to exit full-screen</p>
        </div>
      )}
    </Layout>
  );
}

function StatusCard({ title, statusText, color }) {
  return (
    <div className="flex flex-col items-center p-4 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className={`font-semibold text-lg ${color}`}>{statusText}</span>
    </div>
  );
}