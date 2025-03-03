import { createContext, useContext, useState, useEffect } from "react";

const RoverContext = createContext();

export const RoverProvider = ({ children }) => {
    const [selectedRover, setSelectedRover] = useState(null);

    useEffect(() => {
        const storedRover = localStorage.getItem("selectedRover");

        if (storedRover && storedRover !== "undefined") { // ✅ Prevent JSON.parse("undefined")
            try {
                setSelectedRover(JSON.parse(storedRover)); // ✅ Safe parsing
            } catch (error) {
                console.error("Error parsing selectedRover from localStorage:", error);
                localStorage.removeItem("selectedRover"); // ❌ Remove corrupt data
            }
        }
    }, []);

    const updateRover = (rover) => {
        setSelectedRover(rover);
        localStorage.setItem("selectedRover", JSON.stringify(rover)); // ✅ Store full object
    };

    return (
        <RoverContext.Provider value={{ selectedRover, updateRover }}>
            {children}
        </RoverContext.Provider>
    );
};

export const useRover = () => useContext(RoverContext);
