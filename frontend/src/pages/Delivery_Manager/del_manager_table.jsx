import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Delivery_Manager/del_manager_dash.css";

const DelManagerTable = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState({});

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get("http://localhost:5000/api/get_all_orders");
        setOrders(response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    async function fetchDeliveryPersons() {
      try {
        const response = await axios.get("http://localhost:5000/api/get_delivery_persons");
        setDeliveryPersons(response.data.reduce((acc, person) => {
          acc[person._id] = person.name;
          return acc;
        }, {}));
      } catch (err) {
        console.error("Error fetching delivery persons:", err);
      }
    }
    fetchDeliveryPersons();
  }, []);

  const handleAssignDelivery = async (orderId, deliveryPersonId) => {
    if (!deliveryPersonId) {
      alert("Please select a delivery person.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/assign_delivery", {
        orderId,
        deliveryPersonId,
      });
      alert("Order assigned successfully!");
    } catch (err) {
      console.error("Error assigning delivery:", err);
      alert("Failed to assign order.");
    }
  };

  return (
    <table id="orders-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Shipping Address</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Total</th>
          <th>Delivery Person</th>
          <th>Assign Delivery</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order._id}>
            <td>{order.name}</td>
            <td>{order.Shipping_addrs}</td>
            <td>{order.prd_name}</td>
            <td>{order.cetegory}</td>
            <td>{order.tot_price}</td>
            <td>
              <select
                onChange={(e) => setDeliveryPersons({ ...deliveryPersons, [order._id]: e.target.value })}
                value={deliveryPersons[order._id] || ""}
              >
                <option value="">Select</option>
                {Object.entries(deliveryPersons).map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </td>
            <td>
              <button onClick={() => handleAssignDelivery(order._id, deliveryPersons[order._id])}>
                Assign
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DelManagerTable;
