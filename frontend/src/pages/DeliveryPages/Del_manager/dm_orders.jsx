import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useParams } from "react";
import { FaSearch } from "react-icons/fa";
import "../../../css/DeliveryCss/Del_manager/dm_dashboard.css";

function dm_orders() {
  const [orders, setorders] = useState([]);
  const [delPersons, setdelPersons] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get_all_orders"
        ); // Get users from the backend
        setorders(response.data.orders);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []); // runs once on mount

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/deliver-person/all"
        ); // Get users from the backend
        setdelPersons(response.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []); // runs once on mount

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
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.prd_name}</td>
              <td>{order.name}</td>
              <td>{order.Shipping_addrs}</td>
              <td>{order.tot_price}</td>
              <td>
                <select name={`select-person-${order._id}`} id="select-input">
                  <option value="">Select Person</option>
                  {delPersons
                    .filter((person) => person.status == "available")
                    .map((person) => (
                      <option key={person._id} value={person._id}>
                        {person.firstname}
                      </option>
                    ))}
                </select>
              </td>

              <td>
                <button id="table-btn">Asign</button>
                <button id="table-btn">Edit</button>
                <button id="table-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button id="report-btn">Get Report</button>
    </>
  );
}

export default dm_orders;
