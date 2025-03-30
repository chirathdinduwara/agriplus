import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../../../css/DeliveryCss/Del_manager/dm_dashboard.css";

function DmTracking() {
  const [status, setStatus] = useState("Order Placed");

  return (
    <>
      <h2>Order Tracking</h2>
      <div id="search-div">
        <input type="search" name="" id="search-input" />
        <button id="Search-btn">
          <span>Search</span>
          <div id="icon-div">
            <FaSearch size={15} color="white" />
          </div>
        </button>
      </div>
      <table id="table">
        <thead>
          <tr>
            <th id="order-id">Order ID</th>
            <th id="order-date">Product Name</th>
            <th id="order-date">Owner Email</th>
            <th id="order-date">Owner Address</th>
            <th id="order-date">Delivery Person</th>
            <th id="order-status">Status</th>
            <th id="order-status">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr id="order-row">
            <td id="order-id-value">#10234</td>
            <td id="order-id-value">fungus</td>
            <td id="order-id-value">thaveesha@gmail.com</td>
            <td id="order-id-value">Homagama</td>
            <td id="order-id-value">Jhone@gmail.com</td>
            <td id="order-status-value">
              <span class="status-progress" id="status-shipped">
                Shipped
              </span>
            </td>
            <td>
              <button id="table-btn-delete">Delete</button>
            </td>
          </tr>
          {/* <tr id="order-row">
            <td id="order-id-value">#10235</td>
            <td id="order-status-value">
              <span class="status-progress" id="status-delivered">
                Delivered
              </span>
            </td>
            <td id="order-date-value">March 25, 2025</td>
            <td id="order-shipping-value">DHL</td>
          </tr>
          <tr id="order-row">
            <td id="order-id-value">#10236</td>
            <td id="order-status-value">
              <span class="status-progress" id="status-processing">
                Processing
              </span>
            </td>
            <td id="order-date-value">March 30, 2025</td>
            <td id="order-shipping-value">UPS</td>
          </tr> */}
        </tbody>
      </table>
      <button id="report-btn">Get Report</button>
    </>
  );
}

export default DmTracking;
