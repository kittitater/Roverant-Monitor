// // frontend/components/RobotControls.jsx

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useRover } from "@/components/context/RoverContext";

// const MotorControl = () => {
//     const [wsStatus, setWsStatus] = useState("Connecting...");
//     const motorSocket = useRef(null);
//     const { selectedRover } = useRover();

//     const getWsUrl = () => {
//         return selectedRover
//             ? `wss://api-roverant.mooo.com/ws/client/control?token=${selectedRover.registration_token}&rover_id=${selectedRover.rover_id}`
//             : null;
//     };

//     useEffect(() => {
//         if (!selectedRover || !selectedRover.rover_id || !selectedRover.registration_token) {
//             setWsStatus("No rover selected");
//             return;
//         }

//         // Close the existing WebSocket connection before opening a new one
//         if (motorSocket.current) {
//             motorSocket.current.close();
//         }

//         const wsUrl = getWsUrl();
//         if (!wsUrl) return;

//         motorSocket.current = new WebSocket(wsUrl);

//         // WebSocket event handlers
//         motorSocket.current.onopen = () => {
//             setWsStatus("Connected");
//         };

//         motorSocket.current.onmessage = (event) => {
//             console.log("Message from server:", event.data);
//         };

//         motorSocket.current.onerror = (error) => {
//             console.log("WebSocket error:", error);
//             setWsStatus("Error");
//         };

//         motorSocket.current.onclose = () => {
//             console.log("WebSocket connection closed.");
//             setWsStatus("Unavailable");
//         };

//         // Clean up WebSocket connection when component unmounts or rover changes
//         return () => {
//             if (motorSocket.current) {
//                 motorSocket.current.close();
//             }
//         };
//     }, [selectedRover]); // ✅ Reconnects when `selectedRover` changes

//     // Function to send commands to the server
//     const sendCommand = (command) => {
//         if (motorSocket.current && motorSocket.current.readyState === WebSocket.OPEN) {
//             motorSocket.current.send(command);
//         } else {
//             console.log("WebSocket is not connected.");
//         }
//     };

//     // Keyboard event handlers
//     const handleKeyDown = (event) => {
//         switch (event.key.toLowerCase()) {
//             case "w":
//                 sendCommand("press_forward");
//                 break;
//             case "s":
//                 sendCommand("press_backward");
//                 break;
//             case "a":
//                 sendCommand("press_left");
//                 break;
//             case "d":
//                 sendCommand("press_right");
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleKeyUp = (event) => {
//         switch (event.key.toLowerCase()) {
//             case "w":
//                 sendCommand("release_forward");
//                 break;
//             case "s":
//                 sendCommand("release_backward");
//                 break;
//             case "a":
//                 sendCommand("release_left");
//                 break;
//             case "d":
//                 sendCommand("release_right");
//                 break;
//             default:
//                 break;
//         }
//     };

//     useEffect(() => {
//         window.addEventListener("keydown", handleKeyDown);
//         window.addEventListener("keyup", handleKeyUp);

//         return () => {
//             window.removeEventListener("keydown", handleKeyDown);
//             window.removeEventListener("keyup", handleKeyUp);
//         };
//     }, []);

//     return (
//         <div className="grid justify-items-center py-0 space-y-1">
//             {/* WebSocket connection status */}
//             <div className="mb-20 flex items-left flex-row space-x-5">
//                 <h1 className="text-lg font-semibold">Motion Control Gateway :</h1>
//                 <span
//                     className={`font-semibold text-lg ${
//                         wsStatus === "Connected"
//                             ? "text-green-500"
//                             : wsStatus === "Error"
//                             ? "text-red-500"
//                             : "text-yellow-500"
//                     }`}
//                 >
//                     {wsStatus}
//                 </span>
//             </div>

//             <p className="mt-5 text-sm text-center text-gray-500">
//                 Using <strong>W A S D Keys</strong> to control the security guard rover.
//             </p>
//         </div>
//     );
// };

// export default MotorControl;




// frontend/components/RobotControls.jsx

"use client";

import React, { useEffect ,useState , useRef } from "react";
import { useRover } from "@/components/context/RoverContext";

const MotorControl = () => {
    const [wsStatus, setWsStatus] = useState("Connecting...");
    const motorSocket = useRef(null);
    const { selectedRover } = useRover();
    const pressedKeysRef = useRef(new Set()); // Track pressed keys
    const lastCommandRef = useRef(null); // Track the last sent command to avoid duplicates
    const isKeyHeldRef = useRef(false); // Track if any key is being held

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
    }, [selectedRover]);

    // Function to send commands to the server
    const sendCommand = (command) => {
        // Avoid sending the same command repeatedly
        if (lastCommandRef.current === command) {
            return;
        }

        if (motorSocket.current && motorSocket.current.readyState === WebSocket.OPEN) {
            motorSocket.current.send(command);
            console.log(`Sent command: ${command}`);
            lastCommandRef.current = command;
        } else {
            console.log("WebSocket is not connected.");
        }
    };

    // Determine the command based on pressed keys
    const getCommandFromKeys = () => {
        const keys = pressedKeysRef.current;

        if (keys.size === 0) {
            return "stop";
        }

        // Emergency stop takes precedence
        if (keys.has(" ")) {
            return "emergency_stop";
        }

        // W, S, A, D, Q, E combinations
        if (keys.has("w")) {
            if (keys.has("a") || keys.has("q")) {
                return "w+a"; // Forward turn left
            } else if (keys.has("d") || keys.has("e")) {
                return "w+d"; // Forward turn right
            } else {
                return "w"; // Forward
            }
        } else if (keys.has("s")) {
            if (keys.has("a") || keys.has("q")) {
                return "s+a"; // Reverse turn left
            } else if (keys.has("d") || keys.has("e")) {
                return "s+d"; // Reverse turn right
            } else {
                return "s"; // Reverse
            }
        } else if (keys.has("a") || keys.has("q")) {
            return "a"; // Rotate left
        } else if (keys.has("d") || keys.has("e")) {
            return "d"; // Rotate right
        }

        return "stop"; // Default to stop if no valid combination
    };

    // Keyboard event handlers
    const handleKeyDown = (event) => {
        const key = event.key.toLowerCase();
        if (["w", "s", "a", "d", "q", "e", " "].includes(key)) {
            event.preventDefault(); // Prevent scrolling or other default behavior
            console.log(`Key down: ${key}`);

            // Add key to pressedKeysRef if not already present
            if (!pressedKeysRef.current.has(key)) {
                pressedKeysRef.current.add(key);
                isKeyHeldRef.current = true;

                // Send the command
                const command = getCommandFromKeys();
                sendCommand(command);
            }
        }
    };

    const handleKeyUp = (event) => {
        const key = event.key.toLowerCase();
        if (["w", "s", "a", "d", "q", "e", " "].includes(key)) {
            event.preventDefault();
            console.log(`Key up: ${key}`);

            // Remove key from pressedKeysRef
            pressedKeysRef.current.delete(key);

            // Update key held status
            isKeyHeldRef.current = pressedKeysRef.current.size > 0;

            // Send the updated command
            const command = getCommandFromKeys();
            sendCommand(command);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            sendCommand("stop"); // Ensure motors stop when component unmounts
        };
    }, []);

    return (
        <div className="grid justify-items-center py-0 space-y-1">
            {/* WebSocket connection status */}
            <div className="mb-20 flex items-left flex-row space-x-5">
                <h1 className="text-lg font-semibold">Motion Control Gateway :</h1>
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
                Using <strong>W A S D Q E and Spacebar</strong> to control the security guard rover.
            </p>
        </div>
    );
};

export default MotorControl;