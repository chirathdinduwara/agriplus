import React, { useState, useEffect } from "react";
import "../../../css/DeliveryCss/Del_manager/dm_dashboard.css";

function DmTracking() {
  const [status, setStatus] = useState("Order Placed");

  return (
    <>
      <h2>Order Tracking</h2>
      <table id="table">
        <thead>
          <tr>
            <th id="order-id">Order ID</th>
            <th id="order-status">Status</th>
            <th id="order-date">Date</th>
            <th id="order-shipping">Shipping</th>
          </tr>
        </thead>
        <tbody>
          <tr id="order-row">
            <td id="order-id-value">#10234</td>
            <td id="order-status-value">
              <span class="status-progress" id="status-shipped">
                Shipped
              </span>
            </td>
            <td id="order-date-value">March 29, 2025</td>
            <td id="order-shipping-value">FedEx</td>
          </tr>
          <tr id="order-row">
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
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default DmTracking;
