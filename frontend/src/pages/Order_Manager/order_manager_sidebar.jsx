import React from "react";

import "../../css/Delivery_Manager/del_manager_dash.css";

const order_manager_sidebar = () => {
  return (
    <>
      <div id="sidebar">
        <h2 id="logo">Order Manager</h2>
        <ul id="menu-list">
          <li id="menu-dashboard">Dashboard</li>
          <li id="menu-orders">Orders</li>
        </ul>
      </div>
    </>
  );
};

export default order_manager_sidebar;
