import React from "react";
import { FaSearch } from "react-icons/fa";
import "../../../css/DeliveryCss/Del_manager/dm_dashboard.css";

function dm_orders() {
  return (
    <>
      <h2>Orders Overview</h2>
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
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Owner Email</th>
            <th>Address</th>
            <th>Phone No</th>
            <th>Asign Person</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>28</td>
            <td>New York</td>
            <td>John Doe</td>
            <td>28</td>
            <td>New York</td>
            <td>
              <button id="table-btn">Asign</button>
              <button id="table-btn">Edit</button>
              <button id="table-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button id="report-btn">Get Report</button>
    </>
  );
}

export default dm_orders;
