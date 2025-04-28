// frontend/components/VideoStreamComponent.jsx

import React, { useEffect, useRef } from 'react';

const VideoStreamComponent = () => {
    const canvasRef = useRef(null);
    // Use your backend's video WebSocket URL
    const wsUrl = `ws://kittitat.trueddns.com:45133/ws/video`;

    useEffect(() => {
        const videoSocket = new WebSocket(wsUrl);

        videoSocket.onopen = () => {
            console.log("WebSocket connection opened for video stream.");
            videoSocket.binaryType = 'arraybuffer'; // Ensure WebSocket receives binary data
        };

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = new Image();

        videoSocket.onmessage = (event) => {
            if (event.data instanceof ArrayBuffer) {
                // Convert the ArrayBuffer to a Blob and then to an Object URL
                const blob = new Blob([event.data], { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);

                img.onload = () => {
                    // Draw the image onto the canvas
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                    // Revoke the object URL to free up memory
                    URL.revokeObjectURL(url);
                };

                img.src = url;
            } else {
                console.error("Unsupported data type received:", typeof event.data);
            }
        };

        videoSocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        videoSocket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        return () => {
            // Clean up WebSocket connection on unmount
            videoSocket.close();
        };
    }, [wsUrl]); // Re-run effect if wsUrl changes

    return (
        <div className="flex flex-col items-center">
            <canvas
                ref={canvasRef}
                width="640"
                height="480"
                className="border-2 border-gray-300 dark:border-gray-700"
            />
        </div>
    );
};

export default VideoStreamComponent;
