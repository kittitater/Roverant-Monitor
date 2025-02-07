"use client";
import React, { createContext, useContext, useState } from "react";

/**
 * A mock list of your rovers. 
 * Replace with real data or fetch from an API if desired.
 */
const ROVERS = [
  { id: "rover1", name: "Rover #1", wsUrl: "wss://api-roverant.mooo.com/ws/client/video?token=AAAA1111" },
  { id: "rover2", name: "Rover #2", wsUrl: "wss://api-roverant.mooo.com/ws/client/video?token=BBBB2222" },
  { id: "rover3", name: "Rover #3", wsUrl: "wss://api-roverant.mooo.com/ws/client/video?token=CCCC3333" },
];

/**
 * Create a context for holding selected rover info.
 */
const RoverContext = createContext({
  rovers: ROVERS,
  selectedRover: ROVERS[0],
  setSelectedRover: () => {},
});

/**
 * Provide the rovers to the rest of the app.
 */
export function RoverProvider({ children }) {
  // "selectedRover" state
  const [selectedRover, setSelectedRover] = useState(ROVERS[0]);

  return (
    <RoverContext.Provider value={{ rovers: ROVERS, selectedRover, setSelectedRover }}>
      {children}
    </RoverContext.Provider>
  );
}

/**
 * Hook to read the rover context in any component.
 */
export function useRoverContext() {
  return useContext(RoverContext);
}
