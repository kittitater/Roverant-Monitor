"use client"

import Layout from "@/components/layout";
import React, { useEffect, useRef } from 'react';

export default function LiveCamera() {

    const canvasRef = useRef(null);
    const wsUrl = 'ws://kittitat.trueddns.com:45133/ws/video'; // Replace with your server's WebSocket URL

    useEffect(() => {
        const videoSocket = new WebSocket(wsUrl);
        videoSocket.binaryType = 'arraybuffer'; // Ensure WebSocket receives binary data

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = new Image();

        videoSocket.onopen = () => {
            console.log("WebSocket connection opened for video stream.");
        };

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
    }, [wsUrl]); // Include wsUrl as a dependency

    return (
        <Layout>
            <div className=' justify-items-center py-5 space-y-5 '>
                <h1 className=' text-2xl font-semibold'>Live Camera</h1>
                <div className='flex flex-row space-x-10'>
                    <canvas
                        ref={canvasRef}
                        width="800"
                        height="600"

                        className='px-30 border-gray-500 rounded-3xl'
                    />
                    <div className='bg-slate-600 rounded-3xl w-72'>

                    </div>
                </div>
            </div>

        </Layout>
    );
}