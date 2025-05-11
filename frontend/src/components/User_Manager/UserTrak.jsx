import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../../css/HomePage/UserTracking.css";

function UserTracking() {
  const [asigns, setAsigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  // Get user ID from token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.name);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Invalid token:", err);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Debug: Log userId when it changes
  useEffect(() => {
    if (userId) console.log("User ID:", userId);
  }, [userId]);

  // Fetch assigned deliveries
  useEffect(() => {
    if (!userId) return;

    const fetchAssignedDeliveries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/assigned-dels-name/${userId}`
        );
        setAsigns(response.data?.asigns || []);
      } catch (err) {
        console.error("Error fetching assigned deliveries:", err);
        setError("Failed to load assigned deliveries.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedDeliveries();
  }, [userId]);

  if (loading) return <div className="tracking-loading">Loading...</div>;
  if (error) return <div className="tracking-error">{error}</div>;

  return (
    <div className="tracking-container">
      <h2 className="tracking-title">Your Order Tracking</h2>
      {asigns.length === 0 ? (
        <p className="tracking-empty">No orders assigned.</p>
      ) : (
        <div className="tracking-table">
          <div className="tracking-header">
            <span>Order Name</span>
            <span>Status</span>
            <span>Assigned To</span>
            <span>Date</span>
          </div>
          {asigns.map((item) => (
            <div key={item._id} className="tracking-row">
              <span>{item.product_name}</span>
              <span>{item.delStatus}</span>
              <span>{item.delPerson_email}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserTracking;
