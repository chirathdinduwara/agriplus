import "../../css/AdminDashboard/admin-dashboard.css";
import "../../css/AdminDashboard/manage-content.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import jsPDF from "jspdf";
import React, { useEffect, useState, useParams } from "react";
import { toast, ToastContainer } from "react-toastify";

function ManageStaff() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/api/staffs"); // Get users from the backend
        setUsers(response.data.staff);
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
        `http://localhost:5000/api/staff/${id}`
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
    navigate("/a-dash/addStaff");
  }

  const handleUpdateUser = (userId) => {
    navigate(`/a-dash/updateStaff/${userId}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 30;

    doc.setFontSize(16);
    doc.text("Staff User Report", margin, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, 26);

    // Table headers
    doc.setFont("helvetica", "bold");
    doc.text("Full Name", margin, yPos);
    doc.text("Email", margin + 50, yPos);
    doc.text("Phone", margin + 110, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");

    users.forEach((user) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.text(user.full_name || "N/A", margin, yPos);
      doc.text(user.email || "N/A", margin + 50, yPos);
      doc.text(String(user.phone )|| "N/A", margin + 110, yPos);
      yPos += 10;
    });

    doc.save("staff_report.pdf");
  };

  return (
    <>
      <div className="admin-dash">
        <h1 className="admin-dash-heading">Manage Staff</h1>

        <div className="manage">
          <div className="btn-class">
            <button className="add" onClick={handleAddUser}>
              Add Staff
            </button>
            <button className="pdf-btn" onClick={generatePDF}>
              Get PDF
            </button>
          </div>

          <div className="table-container">
            <table className="manage-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
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

export default ManageStaff;
