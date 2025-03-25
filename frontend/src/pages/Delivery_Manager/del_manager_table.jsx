import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/Delivery_Manager/del_manager_dash.css";
import { ToastContainer, toast } from "react-toastify";

const DelManagerTable = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get_all_orders"
        );
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
        const response = await axios.get(
          "http://localhost:5000/api/get_delivery_persons"
        );
        setDeliveryPersons(
          response.data.reduce((acc, person) => {
            acc[person._id] = person.name;
            return acc;
          }, {})
        );
      } catch (err) {
        console.error("Error fetching delivery persons:", err);
      }
    }
    fetchDeliveryPersons();
  }, []);

  // const handleAssignDelivery = async (orderId, deliveryPersonId) => {
  //   if (!deliveryPersonId) {
  //     alert("Please select a delivery person.");
  //     return;
  //   }

  //   try {
  //     await axios.post("http://localhost:5000/api/assign_delivery", {
  //       orderId,
  //       deliveryPersonId,
  //     });
  //     alert("Order assigned successfully!");
  //   } catch (err) {
  //     console.error("Error assigning delivery:", err);
  //     alert("Failed to assign order.");
  //   }
  // };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/remove_orders/${orderId}`
      );
      if (response.status === 200) {
        // Remove the deleted order from the UI
        setOrders(orders.filter((order) => order._id !== orderId));
        toast.success("Order Deleted !");
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleUpdateProduct = (orderId) => {
    console.log(orderId);
    navigate(`/maneger_edit_order/${orderId}`);
  };

  const handleAssignClick = (order) => {
    navigate("/assignDelivery", { state: { order } });
    console.log(order);
  };

  return (
    <>
      <table id="orders-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Shipping Address</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Total</th>
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
                <button onClick={() => handleAssignClick(order)}>Assign</button>
                <button onClick={() => handleUpdateProduct(order._id)}>
                  Edit
                </button>
                <button onClick={() => deleteOrder(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </>
  );
};

export default DelManagerTable;
