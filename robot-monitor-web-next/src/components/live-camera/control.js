// frontend/components/RobotControls.jsx

"use client";

import React, { useEffect, useRef, useState } from "react";

const MotorControl = () => {
    const [wsStatus, setWsStatus] = useState("Connecting...");
    const motorSocket = useRef(null);

    //const wsUrl = "ws://192.168.1.84:8000/ws/control"; // Replace with your server's WebSocket URL
    const wsUrl = "wss://api-roverant.mooo.com/ws/client/control?token=e2f4f679d67d61c9b1e9b7a98eb84e4951aa5f76228048d5c9276f27e01579cc"; // Replace with your server's WebSocket URL
    //const wsUrl = 'wss://10.35.27.180:443/ws/client/control?token=e2f4f679d67d61c9b1e9b7a98eb84e4951aa5f76228048d5c9276f27e01579cc'; // WebSocket URL from environment
    //const wsUrl = "ws://192.168.31.26:8000/ws/control"; // Replace with your server's WebSocket URL
    //const wsUrl = "ws://47.236.37.29:8000/ws/client?token=32e1ec9d3b16a6867acad889878b8c32d9ff2ae0692a170c9c137fb3cf9c1d11"; // Replace with your server's WebSocket URL

    // Local WebSocket connection for rover control : ws://192.168.1.84:8000/ws/control
    // Public WebSocket connection for rover control : ws://kittitat.trueddns.com:45133/ws/control
    // Gateway WebSocket connection for rover control : ws://47.236.37.29:8000/ws/client?token=32e1ec9d3b16a6867acad889878b8c32d9ff2ae0692a170c9c137fb3cf9c1d11

    useEffect(() => {
        motorSocket.current = new WebSocket(wsUrl);

        // WebSocket event handlers
        motorSocket.current.onopen = () => {
            //console.log("WebSocket connection opened for motor control.");
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
            setWsStatus("Unavailable");
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
            //console.log(`Command sent: ${command}`);
        } else {
            console.error("WebSocket is not connected.");
        }
    };

    // Keyboard event handler
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
            {/* <h1 className="text-2xl font-semibold">Motor Control</h1> */}

            {/* WebSocket connection status */}
            <div className="mb-24 flex flex-row space-x-5">
                <h1 className="text-lg font-semibold">Control connection status :</h1>
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

            <p className="mt-10 text-sm text-gray-500">
                Using <strong>W A S D Keys</strong> to control the security guard rover.
            </p>
        </div>
    );
};

export default MotorControl;

