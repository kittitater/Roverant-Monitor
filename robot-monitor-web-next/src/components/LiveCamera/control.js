// frontend/components/RobotControls.jsx

import React from 'react';

const RobotControls = () => {
    const handleControl = (command) => {
        // Send control command to the backend (implement as needed)
        console.log(`Sending command: ${command}`);
        // You can use WebSocket or REST API to send commands to your robot
    };

    return (
        <div className="flex flex-col items-center">
            <button onClick={() => handleControl('forward')} className="p-2 m-1 bg-gray-200 dark:bg-gray-600 rounded">
                Forward
            </button>
            <div className="flex">
                <button onClick={() => handleControl('left')} className="p-2 m-1 bg-gray-200 dark:bg-gray-600 rounded">
                    Left
                </button>
                <button onClick={() => handleControl('stop')} className="p-2 m-1 bg-gray-200 dark:bg-gray-600 rounded">
                    Stop
                </button>
                <button onClick={() => handleControl('right')} className="p-2 m-1 bg-gray-200 dark:bg-gray-600 rounded">
                    Right
                </button>
            </div>
            <button onClick={() => handleControl('backward')} className="p-2 m-1 bg-gray-200 dark:bg-gray-600 rounded">
                Backward
            </button>
        </div>
    );
};

export default RobotControls;
