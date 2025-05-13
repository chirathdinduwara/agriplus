import "../../css/AdminDashboard/admin-dashboard.css";
import "../../css/AdminDashboard/manage-content.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import jsPDF from "jspdf";
import React, { useEffect, useState, useParams } from "react";
import { toast, ToastContainer } from "react-toastify";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();
  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/api/users"); // Get users from the backend
        setUsers(response.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []); // runs once on mount

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${id}`
      );
      if (response.data.success) {
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete the user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("An error occurred while deleting the user.");
    }
  };
  function handleAddUser() {
    navigate("/a-dash/addUser");
  }

  const handleUpdateUser = (userId) => {
    navigate(`/a-dash/updateUser/${userId}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("User Report", 20, 20);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);

    let yPos = 40;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Full Name", 20, yPos);
    doc.text("Email", 70, yPos);
    doc.text("Address", 120, yPos);
    doc.text("Phone", 170, yPos);
    yPos += 10;

    users.forEach((user) => {
      doc.setFont("helvetica", "normal");
      doc.text(String(user.full_name), 20, yPos);
      doc.text(String(user.email), 70, yPos);
      doc.text(String(user.address), 120, yPos);
      doc.text(String(user.phone), 170, yPos);
      yPos += 10;

      // Avoid printing off the page
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.save("user_report.pdf");
  };

  return (
    <>
      <div className="admin-dash">
        <h1 className="admin-dash-heading">Manage User</h1>

        <div className="manage">
          <div className="btn-class">
            <button className="add" onClick={handleAddUser}>
              Add User
            </button>
            <button className="pdf-btn" onClick={generatePDF}>
              Get PDF
            </button>
            <div className="search-bar-user">
              <input
                type="text"
                placeholder="Search by Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <div className="table-container">
            <table className="manage-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        className="update-btn"
                        onClick={() => handleUpdateUser(user._id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ManageUser;
