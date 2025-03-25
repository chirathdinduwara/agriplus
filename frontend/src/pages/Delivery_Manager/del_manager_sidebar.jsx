import React from "react";
import { Link } from "react-router-dom";
import "../../css/Delivery_Manager/del_manager_dash.css";

const del_manager_sidebar = () => {
  return (
    <>
      <div id="sidebar">
        <h2 id="logo">Delivery Manager</h2>
        <ul id="menu-list">
          <Link id="link" to="/del_manager">
            <li id="menu-dashboard">Dashboard</li>
          </Link>
          <li id="menu-orders">Orders</li>
          <Link id="link" to="/track_delivery">
            <li id="menu-staff">Track Delivery</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default del_manager_sidebar;
