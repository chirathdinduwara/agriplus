import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/Delivery_Manager/update_table.css";

const UpdateTable = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState({
    prd_name: "",
    Shipping_addrs: "",
    prd_brand: "",
    item_price: "",
    quantity: "",
    tot_price: "",
    payment_type: "",
  });

  useEffect(() => {
    if (!orderId) {
      console.error("Order ID is missing!");
      return;
    }

    console.log("Fetching Order ID:", orderId);

    async function fetchProductData() {
      try {
        const response = await axios.get(`http://localhost:5000/api/get_order/${orderId}`);
        console.log("API Response:", response.data);

        if (response.data.success) {
          setOrder(response.data.orders);
        } else {
          console.error("Order not found.");
          toast.error("Order not found!");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Error fetching order details.");
      }
    }

    fetchProductData();
  }, [orderId]);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId) {
      toast.error("Order ID is missing!");
      return;
    }

    console.log("Submitting Order ID:", orderId);
    
    try {
      const response = await axios.put(`http://localhost:5000/api/update_order/${orderId}`, order);
      
      if (response.data.success) {
        toast.success("Order updated successfully!");
        setTimeout(() => navigate("/del_manager"), 1000);
      } else {
        toast.error("Failed to update order.");
      }
    } catch (error) {
      console.error("Error updating order data:", error);
      toast.error("An error occurred while updating the order.");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Order Details</h2>
      <form onSubmit={handleSubmit} className="edit-order-form">
        <div className="form-group">
          <label htmlFor="prd_name">Product Name:</label>
          <input
            type="text"
            id="prd_name"
            name="prd_name"
            value={order.prd_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Shipping_addrs">Shipping Address:</label>
          <input
            type="text"
            id="Shipping_addrs"
            name="Shipping_addrs"
            value={order.Shipping_addrs}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prd_brand">Product Brand:</label>
          <input
            type="text"
            id="prd_brand"
            name="prd_brand"
            value={order.prd_brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="item_price">Item Price:</label>
          <input
            type="number"
            id="item_price"
            name="item_price"
            value={order.item_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tot_price">Total Price:</label>
          <input
            type="number"
            id="tot_price"
            name="tot_price"
            value={order.tot_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="payment_type">Payment Type:</label>
          <input
            type="text"
            id="payment_type"
            name="payment_type"
            value={order.payment_type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Update Order
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/del_manager")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTable;
