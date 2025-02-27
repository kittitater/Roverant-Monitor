import { createContext, useContext, useState, useEffect } from "react";

const RoverContext = createContext();

export const RoverProvider = ({ children }) => {
    const [selectedRover, setSelectedRover] = useState(null);

    useEffect(() => {
        const storedRover = localStorage.getItem("selectedRover");
        if (storedRover) {
            setSelectedRover(JSON.parse(storedRover)); // ✅ Parse full rover object from localStorage
        }
    }, []);

    const updateRover = (rover) => {
        setSelectedRover(rover);
        localStorage.setItem("selectedRover", JSON.stringify(rover)); // ✅ Store full object instead of just `rover_id`
    };

    return (
        <RoverContext.Provider value={{ selectedRover, updateRover }}>
            {children}
        </RoverContext.Provider>
    );
};

export const useRover = () => useContext(RoverContext);
