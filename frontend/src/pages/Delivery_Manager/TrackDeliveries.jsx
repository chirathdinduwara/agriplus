import "../../css/AdminDashboard/admin-dashboard.css";
import "../../css/AdminDashboard/manage-content.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useParams } from "react";
import Sidebar from "./del_manager_sidebar";

function TrackDels() {
  const [deliveries, setdeliveries] = useState([]);

  const navigate = useNavigate();
  // Fetch all deliveries
  useEffect(() => {
    async function fetchdeliveries() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/assignDels"
        ); // Get deliveries from the backend
        setdeliveries(response.data.delivery);
      } catch (err) {
        console.error("Error fetching deliveries:", err);
      }
    }

    fetchdeliveries();
  }, []); // runs once on mount

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/assignDels/${id}`
      );
      if (response.data.success) {
        setdeliveries(deliveries.filter((delivery) => delivery._id !== id));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <>
      <div id="mainManger">
        <Sidebar />
        <div className="admin-dash">
          <h1 className="admin-dash-heading">Track Delivery</h1>
          <div className="manage">
            <table className="manage-table">
              <thead>
                <td>Delivery Person Email</td>
                <td>Delivery Person Name</td>
                <td>Receiver Address</td>
                <td>Receiver Name</td>
                <td>Product Name</td>
                <td>Total Price</td>
                <td>Status</td>
                <td>Actions</td>
              </thead>

              <tbody>
                {console.log(deliveries)}
                {deliveries.map((delivery) => (
                  <tr key={delivery._id}>
                    <td>{delivery.delPersonEmail}</td>
                    <td>{delivery.delPersonName}</td>
                    <td>{delivery.owner_addrs}</td>
                    <td>{delivery.owner_name}</td>
                    <td>{delivery.owner_product}</td>
                    <td>{delivery.total_price}</td>
                    <td>{delivery.delStatus}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(delivery._id)}
                        disabled={delivery.delStatus !== "Complete"}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackDels;
