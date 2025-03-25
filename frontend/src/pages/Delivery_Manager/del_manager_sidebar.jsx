import React from "react";
import "../../css/Delivery_Manager/del_manager_dash.css";

const del_manager_sidebar = () => {
  return (
    <>
      <div id="sidebar">
        <h2 id="logo">Delivery Manager</h2>
        <ul id="menu-list">
          <li id="menu-dashboard">Dashboard</li>
          <li id="menu-orders">Orders</li>
          <li id="menu-staff">Delivery Staff</li>
        </ul>
      </div>
    </>
  );
};

export default del_manager_sidebar;
