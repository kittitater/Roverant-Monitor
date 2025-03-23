// RoverContext.js (unchanged)
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext"; // Import AuthContext

const RoverContext = createContext();

export const RoverProvider = ({ children }) => {
    const { user } = useAuth(); // Access user from AuthContext
    const [selectedRover, setSelectedRover] = useState(null);

    // Reset selectedRover when user logs out (user becomes null)
    useEffect(() => {
        if (!user) {
            console.log("User logged out, resetting selectedRover");
            setSelectedRover(undefined);
            localStorage.removeItem("roverant_selectedRover");
        }
    }, [user]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const storedRover = localStorage.getItem("roverant_selectedRover");
            console.log("Raw storedRover:", storedRover);
            if (storedRover && storedRover !== "undefined" && storedRover !== "null") {
                setSelectedRover(JSON.parse(storedRover));
            } else {
                setSelectedRover(undefined);
                localStorage.removeItem("roverant_selectedRover");
            }
        } catch (error) {
            console.error("Error parsing selectedRover from localStorage:", error);
            setSelectedRover(undefined);
            localStorage.removeItem("roverant_selectedRover");
        }
    }, []);

    const updateRover = (rover) => {
        const newRover = rover === undefined ? undefined : rover;
        console.log("Updating selectedRover to:", newRover);
        setSelectedRover(newRover);
        localStorage.setItem("roverant_selectedRover", JSON.stringify(newRover !== undefined ? newRover : null));
    };

    return (
        <RoverContext.Provider value={{ selectedRover, updateRover }}>
            {children}
        </RoverContext.Provider>
    );
};

export const useRover = () => useContext(RoverContext);