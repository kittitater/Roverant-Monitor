// frontend/components/RobotControls.jsx

"use client";

import React, { useEffect, useRef, useState } from "react";

const MotorControl = () => {
    const [wsStatus, setWsStatus] = useState("Connecting...");
    const motorSocket = useRef(null);

    const wsUrl = "ws://kittitat.trueddns.com:45133/ws/motor"; // Replace with your server's WebSocket URL

    useEffect(() => {
        motorSocket.current = new WebSocket(wsUrl);

        // WebSocket event handlers
        motorSocket.current.onopen = () => {
            console.log("WebSocket connection opened for motor control.");
            setWsStatus("Connected");
        };

        motorSocket.current.onmessage = (event) => {
            console.log("Message from server:", event.data);
        };

        motorSocket.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            setWsStatus("Error");
        };

        motorSocket.current.onclose = () => {
            console.log("WebSocket connection closed.");
            setWsStatus("Disconnected");
        };

        // Clean up WebSocket connection on component unmount
        return () => {
            motorSocket.current.close();
        };
    }, []);

    // Function to send commands to the server
    const sendCommand = (command) => {
        if (motorSocket.current && motorSocket.current.readyState === WebSocket.OPEN) {
            motorSocket.current.send(command);
            console.log(`Command sent: ${command}`);
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    // Keyboard event handler
    const handleKeyDown = (event) => {
        switch (event.key.toLowerCase()) { // Convert key to lowercase for case-insensitive matching
            case "w":
                sendCommand("forward");
                break;
            case "s":
                sendCommand("backward");
                break;
            case "a":
                sendCommand("left");
                break;
            case "d":
                sendCommand("right");
                break;
            case " ":
                sendCommand("stop");
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        // Add event listener for keyboard events
        window.addEventListener("keydown", handleKeyDown);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="grid justify-items-center py-5 space-y-5">
            {/* <h1 className="text-2xl font-semibold">Motor Control</h1> */}

            {/* WebSocket connection status */}
            <div className="mb-3">
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

            {/* Motor Control Buttons */}
            <div className="flex flex-col space-y-3">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => sendCommand("forward")}
                >
                    Forward (↑)
                </button>
                <div className="flex space-x-3">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => sendCommand("left")}
                    >
                        Left (←)
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => sendCommand("stop")}
                    >
                        Stop (Space)
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => sendCommand("right")}
                    >
                        Right (→)
                    </button>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => sendCommand("backward")}
                >
                    Backward (↓)
                </button>
            </div>

            <p className="mt-5 text-sm text-gray-500">
                Use <strong>Arrow Keys</strong> to control the robot. Press <strong>Space</strong> to stop.
            </p>
        </div>
    );
};

export default MotorControl;

