import React, { useState } from "react";
import axios from "axios";

function delivery_person_status() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !status) return;

    try {
      // Ensure the correct backend URL is being used
      await axios.put("http://localhost:5000/api/update_status", { email, status }); 
      alert("Status updated successfully");
    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Update Delivery Status</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="package ready">Package Ready</option>
            <option value="inprogress">In Progress</option>
            <option value="complete order">Complete Order</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update Status
          </button>
        </form>
      </div>
    </>
  );
}

export default delivery_person_status;
