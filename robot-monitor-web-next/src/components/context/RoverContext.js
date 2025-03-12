import { createContext, useContext, useState, useEffect } from "react";

const RoverContext = createContext();

export const RoverProvider = ({ children }) => {
    const [selectedRover, setSelectedRover] = useState(undefined);

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