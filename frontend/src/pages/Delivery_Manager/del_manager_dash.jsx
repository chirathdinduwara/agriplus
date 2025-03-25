import React, { useState } from "react";
import Sidebar from "./del_manager_sidebar";
import TableData from "./del_manager_table";
import "../../css/Delivery_Manager/del_manager_dash.css";

const ordersData = [
  {
    id: "ORD001",
    customer: "John Doe",
    status: "Pending",
    deliveryPerson: "-",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    status: "Out for Delivery",
    deliveryPerson: "Alex",
  },
  {
    id: "ORD003",
    customer: "David Lee",
    status: "Delivered",
    deliveryPerson: "Sam",
  },
];

const deliveryPersons = ["Alex", "Sam", "Chris", "Taylor"];

const del_manager_dash = () => {
  const [orders, setOrders] = useState(ordersData);

  const assignDeliveryPerson = (orderId, person) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, deliveryPerson: person } : order
      )
    );
  };

  return (
    <div id="dashboard-container">
      <Sidebar />
      <div id="main-content">
        <h1 id="title">Orders Overview</h1>
        <TableData
          orders={orders}
          assignDeliveryPerson={assignDeliveryPerson}
          deliveryPersons={deliveryPersons}
        />
      </div>
    </div>
  );
};

export default del_manager_dash;