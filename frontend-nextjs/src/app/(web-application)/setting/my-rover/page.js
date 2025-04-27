"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Table } from "@geist-ui/core";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";

export default function MyRoversPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [rovers, setRovers] = useState([]);
  const [roverStatuses, setRoverStatuses] = useState({});
  const [roverLoading, setRoverLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const [isReconfiguring, setIsReconfiguring] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    rover_id: "",
    name: "",
    model: "",
    ip_address: "",
    registration_token: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      fetchRovers();
    }
  }, [user]);

  useEffect(() => {
    if (!rovers.length) return;

    const wsConnections = {};
    const reconnectTimeouts = {};
    const maxReconnectAttempts = 5;
    const baseReconnectDelay = 3000;

    const connectWebSocket = (rover, attempt = 1) => {
      const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/rover/status?rover_id=${rover.rover_id}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log(`Status WebSocket opened for rover ${rover.rover_id}`);
        setRoverStatuses((prev) => ({
          ...prev,
          [rover.rover_id]: {
            status: "checking",
            control: false,
            video: false,
          },
        }));
        reconnectTimeouts[rover.rover_id] = null;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type !== "ping") {
            setRoverStatuses((prev) => ({
              ...prev,
              [rover.rover_id]: {
                status: data.status,
                control: data.control,
                video: data.video,
              },
            }));
          }
        } catch (error) {
          console.error(
            `Error parsing status for rover ${rover.rover_id}:`,
            error
          );
        }
      };

      ws.onerror = (error) => {
        console.log(
          `Status WebSocket error for rover ${rover.rover_id}:`,
          error
        );
        setRoverStatuses((prev) => ({
          ...prev,
          [rover.rover_id]: {
            status: "disconnected",
            control: false,
            video: false,
          },
        }));
      };

      ws.onclose = () => {
        console.log(`Status WebSocket closed for rover ${rover.rover_id}`);
        setRoverStatuses((prev) => ({
          ...prev,
          [rover.rover_id]: {
            status: "disconnected",
            control: false,
            video: false,
          },
        }));

        if (attempt <= maxReconnectAttempts) {
          const delay = baseReconnectDelay * Math.pow(2, attempt - 1);
          console.log(
            `Reconnecting to rover ${rover.rover_id} in ${delay}ms (attempt ${attempt})`
          );
          reconnectTimeouts[rover.rover_id] = setTimeout(() => {
            connectWebSocket(rover, attempt + 1);
          }, delay);
        } else {
          console.log(
            `Max reconnect attempts reached for rover ${rover.rover_id}`
          );
        }
      };

      wsConnections[rover.rover_id] = ws;
    };

    rovers.forEach((rover) => {
      setRoverStatuses((prev) => ({
        ...prev,
        [rover.rover_id]: { status: "checking", control: false, video: false },
      }));
      connectWebSocket(rover);
    });

    return () => {
      Object.keys(wsConnections).forEach((roverId) => {
        wsConnections[roverId].close();
        if (reconnectTimeouts[roverId]) {
          clearTimeout(reconnectTimeouts[roverId]);
        }
      });
    };
  }, [rovers.map((r) => r.rover_id).join(",")]);

  async function fetchRovers() {
    if (!user) {
      setError("User not authenticated.");
      setRoverLoading(false);
      return;
    }
    setRoverLoading(true);
    setError(null);
    try {
      const idToken = await user.getIdToken();
      if (!idToken) throw new Error("Authentication token not available.");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rover/my-rovers`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setRovers(data);
    } catch (err) {
      console.error("Failed to fetch rovers:", err);
      setError(err.message || "Failed to fetch rovers.");
    } finally {
      setRoverLoading(false);
    }
  }

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
    } else {
      const ipValid = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(
        roverData.ip_address
      );
      if (!ipValid) {
        newErrors.ip_address = "Invalid IP address format.";
      } else {
        const octets = roverData.ip_address.split(".").map(Number);
        if (!octets.every((octet) => octet >= 0 && octet <= 255)) {
          newErrors.ip_address = "Each IP octet must be between 0 and 255.";
        }
      }
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rover/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(roverData),
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        setErrorMsg(errData.detail || "Failed to register rover.");
        setIsSubmitting(false);
        return;
      }
      const data = await res.json();
      setSuccessMsg("Rover registered successfully!");
      await configureRover(data.rover_id, data.token, roverData.ip_address);
      setRoverData({ name: "", model: "", ip_address: "" });
      fetchRovers();
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function configureRover(roverId, token, ipAddress) {
    const configUrl = `http://${ipAddress}:${process.env.NEXT_PUBLIC_ROVER_CONFIG_PORT}/api/configure-rover`;
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
      setConfigMsg(`Activation of the rover failed on this IP address. [${ipAddress} ]`);
    }
  }

  function openModal(rover) {
    setEditFormData({
      rover_id: rover.rover_id,
      name: rover.name,
      model: rover.model,
      ip_address: rover.ip_address || "",
      registration_token: rover.registration_token || "",
    });
    setConfigMsg("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleModalChange(e) {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    // Clear errors based on the field name
    const fieldName = e.target.name;
    let errorKey;
    if (fieldName === "ip_address") {
      errorKey = "editIp"; // Special case for ip_address to match editIp
    } else {
      errorKey = `edit${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      }`;
    }
    setErrors({ ...errors, [errorKey]: "" });
  }

  function validateEdit() {
    const newErrors = {};
    if (!editFormData.name.trim()) newErrors.editName = "Name is required.";
    if (!editFormData.model.trim()) newErrors.editModel = "Model is required.";
    if (editFormData.ip_address) {
      const ipValid = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(
        editFormData.ip_address
      );
      if (!ipValid) {
        newErrors.editIp = "Invalid IP address format.";
      } else {
        const octets = editFormData.ip_address.split(".").map(Number);
        if (!octets.every((octet) => octet >= 0 && octet <= 255)) {
          newErrors.editIp = "Each IP octet must be between 0 and 255.";
        }
      }
    }
    return newErrors;
  }

  async function handleSave() {
    const newErrors = validateEdit();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { rover_id, name, model, ip_address } = editFormData;
      const idToken = await user.getIdToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rover/${rover_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ name, model, ip_address }),
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        setErrorMsg(errData.detail || "Failed to update rover.");
        return;
      }
      closeModal();
      fetchRovers();
    } catch (error) {
      console.error("Error updating rover:", error);
      setErrorMsg("An unexpected error occurred.");
    }
  }

  async function handleReactivate() {
    setIsReconfiguring(true);
    setConfigMsg("");

    // Validate IP address
    if (!editFormData.ip_address.trim()) {
      setErrors({ ...errors, editIp: "IP address is required." });
      setIsReconfiguring(false);
      return;
    }

    const ipValid = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.test(
      editFormData.ip_address
    );
    if (!ipValid) {
      setErrors({ ...errors, editIp: "Invalid IP address format." });
      setIsReconfiguring(false);
      return;
    }

    const octets = editFormData.ip_address.split(".").map(Number);
    if (!octets.every((octet) => octet >= 0 && octet <= 255)) {
      setErrors({
        ...errors,
        editIp: "Each IP octet must be between 0 and 255.",
      });
      setIsReconfiguring(false);
      return;
    }

    try {
      await configureRover(
        editFormData.rover_id,
        editFormData.registration_token,
        editFormData.ip_address
      );
    } catch (error) {
      console.error("Error reactivating rover:", error);
      setConfigMsg("An unexpected error occurred during reactivation.");
    } finally {
      setIsReconfiguring(false);
    }
  }

  async function handleDelete() {
    try {
      const { rover_id } = editFormData;
      const idToken = await user.getIdToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rover/${rover_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        setErrorMsg(errData.detail || "Failed to delete rover.");
        return;
      }
      closeModal();
      setIsAlertModalOpen(false);
      fetchRovers();
    } catch (error) {
      console.error("Error deleting rover:", error);
      setErrorMsg("An unexpected error occurred.");
    }
  }

  const renderStatus = (value, rowData) => {
    const status = roverStatuses[rowData.rover_id] || {
      status: "disconnected",
      control: false,
      video: false,
    };
    const isConnected = status.control || status.video;

    let displayText;
    let textColor;

    if (status.status === "checking") {
      displayText = "Checking...";
      textColor = "text-gray-500";
    } else {
      displayText = isConnected ? "Available" : "Unavailable";
      textColor = isConnected ? "text-green-500" : "text-yellow-500";
    }

    return (
      <div
        onClick={() => openModal(rowData)}
        className={`text-base cursor-pointer py-2 w-full h-full ${textColor}`}
      >
        {displayText}
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="mx-auto min-h-svh min-w-full space-y-8">
      <form
        onSubmit={handleRegister}
        className="p-6 border border-gray-300 rounded-2xl"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
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
              className={`mt-2 block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.name
                  ? "ring-2 ring-red-500 focus:ring-red-500"
                  : "ring-2 ring-gray-300 focus:ring-black"
              } placeholder:text-gray-400`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
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
              className={`mt-2 block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.model
                  ? "ring-2 ring-red-500 focus:ring-red-500"
                  : "ring-2 ring-gray-300 focus:ring-black"
              } placeholder:text-gray-400`}
            />
            {errors.model && (
              <p className="mt-1 text-sm text-red-600">{errors.model}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Rover Activation IP Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="ip_address"
              value={roverData.ip_address}
              onChange={handleRegisterChange}
              placeholder="192.168.1.1"
              className={`mt-2 block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black ${
                errors.ip_address
                  ? "ring-2 ring-red-500 focus:ring-red-500"
                  : "ring-2 ring-gray-300 focus:ring-black"
              } placeholder:text-gray-400`}
            />
            {errors.ip_address && (
              <p className="mt-1 text-sm text-red-600">{errors.ip_address}</p>
            )}
          </div>
        </div>
        {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
        {successMsg && (
          <p className="mt-4 text-sm text-green-600">{successMsg}</p>
        )}
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

      <div className="p-6 border border-gray-300 rounded-2xl">
        {roverLoading && (
          <p className="text-center mb-5 font-semibold">Loading rovers...</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
        <Table
          data={rovers}
          hover
          emptyText="You have no rovers yet. Please register a new rover."
          className="bg-white"
        >
          <Table.Column
            prop="name"
            label="Name"
            render={(value, rowData) => (
              <div
                onClick={() => openModal(rowData)}
                className="text-black text-base cursor-pointer py-2 pr-5 w-full h-full"
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
                className="text-black text-base cursor-pointer py-2 pr-10 w-full h-full"
              >
                {value}
              </div>
            )}
          />
          <Table.Column
            prop="rover_id"
            label="Rover ID"
            render={(value, rowData) => (
              <div
                onClick={() => openModal(rowData)}
                className="text-black text-base cursor-pointer py-2 w-full h-full"
              >
                {value}
              </div>
            )}
          />
          <Table.Column
            prop="status"
            label="Rover Status"
            render={renderStatus}
          />
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <button className="hidden" />
        </DialogTrigger>
        <DialogContent className="p-8 sm:rounded-2xl max-w-2xl">
          <DialogTitle className="text-3xl">Configure Rover</DialogTitle>
          <div className="grid grid-cols-3 space-x-5 mt-5">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-900">
                Rover Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleModalChange}
                placeholder="Roverant Rover 99"
                className={`mt-2 block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.editName
                    ? "ring-2 ring-red-500 focus:ring-red-500"
                    : "ring-2 ring-gray-300 focus:ring-black"
                } placeholder:text-gray-400`}
              />
              {errors.editName && (
                <p className="mt-1 text-sm text-red-600">{errors.editName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="model"
                value={editFormData.model}
                onChange={handleModalChange}
                placeholder="RR-99"
                className={`mt-2 block w-full rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.editModel
                    ? "ring-2 ring-red-500 focus:ring-red-500"
                    : "ring-2 ring-gray-300 focus:ring-black"
                } placeholder:text-gray-400`}
              />
              {errors.editModel && (
                <p className="mt-1 text-sm text-red-600">{errors.editModel}</p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900">
            Rover Reactivation IP Address
            </label>
            <div className="flex space-x-5 mt-2">
              <input
                type="text"
                name="ip_address"
                value={editFormData.ip_address}
                onChange={handleModalChange}
                placeholder="192.168.1.1"
                className={`block rounded-xl bg-white px-3.5 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.editIp
                    ? "ring-2 ring-red-500 focus:ring-red-500"
                    : "ring-2 ring-gray-300 focus:ring-black"
                } placeholder:text-gray-400`}
              />
              <button
                type="button"
                onClick={handleReactivate}
                disabled={isReconfiguring}
                className={`block w-44 rounded-xl bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black ${
                  isReconfiguring ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isReconfiguring ? "Reactivating..." : "Reactivate Rover"}
              </button>
            </div>
            {errors.editIp && (
              <p className="mt-1 text-sm text-red-600">{errors.editIp}</p>
            )}
          </div>
          {configMsg && (
            <p className="mb-4 text-sm text-blue-600">{configMsg}</p>
          )}
          <div className="flex items-center justify-between space-x-4 mt-3">
            <Button
              onClick={() => setIsAlertModalOpen(true)}
              className="rounded-xl font-semibold text-white hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500"
              variant="destructive"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-fit"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 1 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
              Delete
            </Button>
            <div className="flex space-x-4">
              <DialogClose asChild>
                <Button className="rounded-xl font-semibold bg-white text-black hover:bg-white hover:text-black hover:ring-2 hover:ring-black">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleSave}
                className="rounded-xl font-semibold bg-black text-white hover:bg-white hover:text-black hover:ring-2 hover:ring-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                  />
                </svg>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
        <AlertDialogTrigger asChild>
          <button className="hidden" />
        </AlertDialogTrigger>
        <AlertDialogContent className="p-6 sm:rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Are you sure to delete this rover?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              rover from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="space-x-4">
              <AlertDialogCancel className="rounded-xl font-semibold border-0 bg-white text-black hover:bg-white hover:text-black hover:ring-2 hover:ring-black">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="rounded-xl font-semibold text-white bg-red-500 hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500"
                variant="destructive"
              >
                Yes, delete this rover
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
