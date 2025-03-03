import { createContext, useContext, useState, useEffect } from "react";

const RoverContext = createContext();

export const RoverProvider = ({ children }) => {
    const [selectedRover, setSelectedRover] = useState(null);

    useEffect(() => {
        try {
            const storedRover = localStorage.getItem("selectedRover");

            if (storedRover && storedRover !== "undefined" && storedRover !== "null") {
                setSelectedRover(JSON.parse(storedRover)); // ✅ Ensure valid JSON
            } else {
                localStorage.removeItem("selectedRover"); // ❌ Remove invalid data
            }
        } catch (error) {
            console.error("Error parsing selectedRover from localStorage:", error);
            localStorage.removeItem("selectedRover"); // ❌ Remove invalid data
        }
    }, []);

    const updateRover = (rover) => {
        setSelectedRover(rover);
        localStorage.setItem("selectedRover", JSON.stringify(rover)); // ✅ Store object safely
    };

    return (
        <RoverContext.Provider value={{ selectedRover, updateRover }}>
            {children}
        </RoverContext.Provider>
    );
};

export const useRover = () => useContext(RoverContext);
