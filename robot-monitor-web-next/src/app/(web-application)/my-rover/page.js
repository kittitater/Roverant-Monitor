"use client";

import Layout from "@/components/main/layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SelectRover() {
    const [rovers, setRovers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRovers = async () => {
            try {
                const response = await axios.get("https://api-roverant.mooo.com/rover/my-rovers");
                // Assuming the API returns the data directly
                setRovers(response.data);
            } catch (err) {
                // Axios wraps errors, so you might want to check err.response
                if (err.response && err.response.data && err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError(err.message);
                }
            }
        };

        fetchRovers();
    }, []);

    function handleSelect(rover) {
        setSelected(rover);
    }

    return (
        <Layout>
            <div className="max-w-[600px] justify-items-center min-h-screen mx-auto p-5">
                <h1 className="text-2xl mb-3 font-semibold">My Rover</h1>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                <ul>
                    {rovers.map((rover) => (
                        <li key={rover.robot_id} style={{ marginBottom: 8 }}>
                            <button onClick={() => handleSelect(rover)}>
                                {rover.name} ({rover.model}) / {rover.rover_id}
                            </button>
                        </li>
                    ))}
                </ul>

                {selected && (
                    <div className="mt-16">
                        <h3>Selected Rover</h3>
                        <p>rover_id: {selected.rover_id}</p>
                        <p>registration_token: {selected.registration_token}</p>
                        <p>
                            <a
                                href={`/live-camera?rover_id=${selected.rover_id}&token=${selected.registration_token}`}
                            >
                                Go to live camera
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}





