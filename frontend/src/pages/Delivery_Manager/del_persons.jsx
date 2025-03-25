import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function AssignDelivery() {
  const location = useLocation();
  const navigate = useNavigate();
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const order = location.state?.order;

  useEffect(() => {
    async function fetchorderPersons() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/delPersons"
        );
        setDeliveryPersons(response.data.delPerson);
        console.log(order)
      } catch (err) {
        console.error("Error fetching order persons:", err);
      }
    }
    fetchorderPersons();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/order/${id}`
      );
      if (response.data.success) {
        console.log("success");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleAssign = async (delPerson) => {
    try {
      const response = await axios.post("http://localhost:5000/api/assignDel", {
        owner_name: order.name,
        owner_addrs: order.Shipping_addrs,
        owner_product: order.prd_name,
        total_price: order.tot_price,
        delPersonEmail: delPerson.email,
        delPersonName: delPerson.full_name,
      });

      if (response.data.success) {
        // Success Toast
        toast.success("order assigned successfully!");
        await handleDelete(order._id);
        setTimeout(() => {
          navigate("/delMan-dash");
        }, 1000);
      } else {
        // Failure Toast
        toast.error("Failed to assign order. Please try again.");
      }
    } catch (error) {
      // Error Toast
      console.error("Error assigning order:", error);
      toast.error("Failed to assign order due to server error.");
    }
  };

  return (
    <div className="admin-dash">
      <h1 className="admin-dash-heading">Assign order Person</h1>
      <table className="manage-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveryPersons.map((person) => (
            <tr key={person._id}>
              <td>{person.full_name}</td>
              <td>{person.email}</td>
              <td>{person.address}</td>
              <td>{person.phone}</td>
              <td>
                <button
                  className="update-btn"
                  onClick={() => handleAssign(person)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default AssignDelivery;
