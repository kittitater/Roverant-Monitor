"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Table } from "@geist-ui/core";
import { TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";

export default function MyRoversPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // State for rovers array
  const [rovers, setRovers] = useState([]);
  const [roverLoading, setRoverLoading] = useState(true);
  const [error, setError] = useState(null);

  // Registration form state
  const [roverData, setRoverData] = useState({
    name: "",
    model: "",
    ip_address: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [configMsg, setConfigMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal state for editing/deleting
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    rover_id: "",
    name: "",
    model: "",
    ip_address: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user, router]);

  // Fetch real data from your API once user is available
  useEffect(() => {
    if (user) {
      fetchRovers();
    }
  }, [user]);

  // ==========================
  // Fetch Rovers (Real Data)
  // ==========================
  async function fetchRovers() {
    setRoverLoading(true);
    setError(null);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch("https://api-roverant.mooo.com/rover/my-rovers", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      // data should be an array of rover objects
      setRovers(data);
    } catch (err) {
      console.error("Failed to fetch rovers:", err);
      setError(err.message || "Failed to fetch rovers.");
    } finally {
      setRoverLoading(false);
    }
  }

  // ==========================
  // Registration Form
  // ==========================
  function handleRegisterChange(e) {
    setRoverData({ ...roverData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validateRegister() {
    const newErrors = {};
    if (!roverData.name.trim()) newErrors.name = "Name is required.";
    if (!roverData.model.trim()) newErrors.model = "Model is required.";
    if (!roverData.ip_address.trim()) {
      newErrors.ip_address = "IP address is required.";
    } else if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(roverData.ip_address)) {
      newErrors.ip_address = "Invalid IP address format.";
    }
    return newErrors;
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setConfigMsg("");
    setIsSubmitting(true);

    const newErrors = validateRegister();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const res = await fetch("https://api-roverant.mooo.com/rover/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(roverData),
      });
      if (!res.ok) {
        const errData = await res.json();
        setErrorMsg(errData.detail || "Failed to register rover.");
        setIsSubmitting(false);
        return;
      }
      const data = await res.json();
      setSuccessMsg("Rover registered successfully!");

      // Optionally configure new rover
      await configureRover(data.rover_id, data.token, roverData.ip_address);

      // Reset form
      setRoverData({ name: "", model: "", ip_address: "" });
      // Refetch
      fetchRovers();
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Optionally configure rover
  async function configureRover(roverId, token, ipAddress) {
    const configUrl = `http://${ipAddress}:8000/api/configure-rover`;
    try {
      const res = await fetch(configUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rover_id: roverId, registration_token: token }),
      });
      if (!res.ok) {
        const e = await res.json();
        setConfigMsg(`Configuration error: ${e.detail || "Failed."}`);
        return;
      }
      const configData = await res.json();
      setConfigMsg(`Configuration successful: ${configData.message}`);
    } catch (error) {
      console.error("Error configuring rover:", error);
      setConfigMsg("An unexpected error occurred during rover configuration.");
    }
  }

  // ==========================
  // Modal Open/Close
  // ==========================
  function openModal(rover) {
    setEditFormData({
      rover_id: rover.rover_id,
      name: rover.name,
      model: rover.model,
      ip_address: rover.ip_address,
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // Handle input changes in the modal
  function handleModalChange(e) {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  }

  // ==========================
  // Save changes (PUT)
  // ==========================
  async function handleSave() {
    try {
      const { rover_id, name, model, ip_address } = editFormData;
      const idToken = await user.getIdToken();
      const res = await fetch(`https://api-roverant.mooo.com/rover/${rover_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name, model, ip_address }),
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.detail || "Failed to update rover.");
        return;
      }
      closeModal();
      fetchRovers();
    } catch (error) {
      console.error("Error updating rover:", error);
    }
  }

  // ==========================
  // Delete rover (DELETE)
  // ==========================
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this rover?")) return;
    try {
      const { rover_id } = editFormData;
      const idToken = await user.getIdToken();
      const res = await fetch(`https://api-roverant.mooo.com/rover/${rover_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.detail || "Failed to delete rover.");
        return;
      }
      closeModal();
      fetchRovers();
    } catch (error) {
      console.error("Error deleting rover:", error);
    }
  }

  // If user is still loading, or no user
  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* ============ Registration Form ============ */}
      <form onSubmit={handleRegister} className="p-6 bg-gray-50 rounded-2xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
          {/* Name field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Rover Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={roverData.name}
              onChange={handleRegisterChange}
              placeholder="Roverant Rover 99"
              className={`mt-2 block w-full rounded-xl px-3.5 py-2 ${
                errors.name ? "border border-red-500" : "border border-gray-300"
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Model field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="model"
              value={roverData.model}
              onChange={handleRegisterChange}
              placeholder="RR-99"
              className={`mt-2 block w-full rounded-xl px-3.5 py-2 ${
                errors.model ? "border border-red-500" : "border border-gray-300"
              }`}
            />
            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
          </div>

          {/* IP field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              IP Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ip_address"
              value={roverData.ip_address}
              onChange={handleRegisterChange}
              placeholder="192.168.1.1"
              className={`mt-2 block w-full rounded-xl px-3.5 py-2 ${
                errors.ip_address ? "border border-red-500" : "border border-gray-300"
              }`}
            />
            {errors.ip_address && (
              <p className="mt-1 text-sm text-red-600">{errors.ip_address}</p>
            )}
          </div>
        </div>

        {/* Messages */}
        {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
        {successMsg && <p className="mt-4 text-sm text-green-600">{successMsg}</p>}
        {configMsg && <p className="mt-4 text-sm text-blue-600">{configMsg}</p>}

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`block w-full rounded-xl bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register Rover"}
          </button>
        </div>
      </form>

{/* Geist UI Table FIXED – entire row clickable */}
<div className="bg-white rounded-xl shadow-md p-4">
  <h2 className="text-xl font-semibold mb-4">Your Rovers</h2>
  {roverLoading && <p>Loading rovers...</p>}
  {error && <p className="text-red-600">{error}</p>}

  <Table data={rovers} hover emptyText="No rovers found. Register one above!">
    <Table.Column
      prop="name"
      label="Name"
      render={(value, rowData) => (
        <div
          onClick={() => openModal(rowData)}
          className="cursor-pointer py-2 w-full h-full"
        >
          {value}
        </div>
      )}
    />
    <Table.Column
      prop="model"
      label="Model"
      render={(value, rowData) => (
        <div
          onClick={() => openModal(rowData)}
          className="cursor-pointer py-2 w-full h-full"
        >
          {value}
        </div>
      )}
    />
    <Table.Column
      prop="ip_address"
      label="IP Address"
      render={(value, rowData) => (
        <div
          onClick={() => openModal(rowData)}
          className="cursor-pointer py-2 w-full h-full"
        >
          {value}
        </div>
      )}
    />
  </Table>
</div>




      {/* ============ Modal ============ */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        {/* Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Edit Rover
            </Dialog.Title>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleModalChange}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>

            {/* Model */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Model</label>
              <input
                type="text"
                name="model"
                value={editFormData.model}
                onChange={handleModalChange}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>

            {/* IP */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">IP Address</label>
              <input
                type="text"
                name="ip_address"
                value={editFormData.ip_address}
                onChange={handleModalChange}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>

            <div className="flex items-center justify-end space-x-5 mt-3">
              {/* Delete icon */}
              <button onClick={handleDelete}>
                <TrashIcon className="h-6 w-6 text-red-600 hover:text-red-800" />
              </button>
              {/* Cancel icon */}
              <button onClick={closeModal}>
                <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-black" />
              </button>
              {/* Save icon */}
              <button onClick={handleSave}>
                <CheckIcon className="h-6 w-6 text-green-600 hover:text-green-800" />
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
