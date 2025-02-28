// frontend/components/RobotControls.jsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRover } from "@/components/context/RoverContext";

const MotorControl = () => {
    const [wsStatus, setWsStatus] = useState("Connecting...");
    const motorSocket = useRef(null);
    const { selectedRover } = useRover();

    const getWsUrl = () => {
        return selectedRover
            ? `wss://api-roverant.mooo.com/ws/client/control?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
            : null;
    };

    useEffect(() => {
        if (!selectedRover || !selectedRover.rover_id || !selectedRover.registration_token) {
            setWsStatus("No rover selected");
            return;
        }

        // Close the existing WebSocket connection before opening a new one
        if (motorSocket.current) {
            motorSocket.current.close();
        }

        const wsUrl = getWsUrl();
        if (!wsUrl) return;

        motorSocket.current = new WebSocket(wsUrl);

        // WebSocket event handlers
        motorSocket.current.onopen = () => {
            setWsStatus("Connected");
        };

        motorSocket.current.onmessage = (event) => {
            console.log("Message from server:", event.data);
        };

        motorSocket.current.onerror = (error) => {
            console.log("WebSocket error:", error);
            setWsStatus("Error");
        };

        motorSocket.current.onclose = () => {
            console.log("WebSocket connection closed.");
            setWsStatus("Unavailable");
        };

        // Clean up WebSocket connection when component unmounts or rover changes
        return () => {
            if (motorSocket.current) {
                motorSocket.current.close();
            }
        };
    }, [selectedRover]); // ✅ Reconnects when `selectedRover` changes

    // Function to send commands to the server
    const sendCommand = (command) => {
        if (motorSocket.current && motorSocket.current.readyState === WebSocket.OPEN) {
            motorSocket.current.send(command);
        } else {
            console.log("WebSocket is not connected.");
        }
    };

    // Keyboard event handlers
    const handleKeyDown = (event) => {
        switch (event.key.toLowerCase()) {
            case "w":
                sendCommand("press_forward");
                break;
            case "s":
                sendCommand("press_backward");
                break;
            case "a":
                sendCommand("press_left");
                break;
            case "d":
                sendCommand("press_right");
                break;
            default:
                break;
        }
    };

    const handleKeyUp = (event) => {
        switch (event.key.toLowerCase()) {
            case "w":
                sendCommand("release_forward");
                break;
            case "s":
                sendCommand("release_backward");
                break;
            case "a":
                sendCommand("release_left");
                break;
            case "d":
                sendCommand("release_right");
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div className="grid justify-items-center py-0 space-y-1">
            {/* WebSocket connection status */}
            <div className="mb-20 flex items-left flex-row space-x-5">
                <h1 className="text-lg font-semibold">Motion Control :</h1>
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

            <p className="mt-5 text-sm text-center text-gray-500">
                Using <strong>W A S D Keys</strong> to control the security guard rover.
            </p>
        </div>
    );
};

export default MotorControl;
