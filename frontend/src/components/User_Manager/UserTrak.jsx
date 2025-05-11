import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/HomePage/UserTracking.css"; // CSS file

function UserTracking() {
  const [asigns, setAsigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;

    const fetchAssignedDeliveries = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/assigned-dels/${userId}`
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

  if (loading) {
    return <div className="tracking-loading">Loading...</div>;
  }

  if (error) {
    return <div className="tracking-error">{error}</div>;
  }

  return (
    <div className="tracking-container">
      <h2 className="tracking-title">Your Order Tracking</h2>
      {asigns.length === 0 ? (
        <p className="tracking-empty">No orders assigned.</p>
      ) : (
        <div className="tracking-table">
          <div className="tracking-header">
            <span>Order ID</span>
            <span>Status</span>
            <span>Assigned To</span>
            <span>Date</span>
          </div>
          {asigns.map((item) => (
            <div key={item._id} className="tracking-row">
              <span>{item.orderId}</span>
              <span>{item.status}</span>
              <span>{item.assignedTo}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserTracking;
