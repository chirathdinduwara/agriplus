import React from "react";
import { FaSearch } from "react-icons/fa";

function dm_person_details() {
  return (
    <>
      <div id="delivery-container">
        <h2 id="delivery-title">Delivery Person Details</h2>
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
              <th>Email</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Vehicle Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#D102</td>
              <td>John Doe</td>
              <td>+1234567890</td>
              <td>New York</td>
            </tr>
          </tbody>
        </table>
        <button id="report-btn">Get Report</button>
      </div>
    </>
  );
}

export default dm_person_details;
