import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "", // leave this empty intentionally
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        if (response.data.success) {
          const user = response.data.user;
          // Do not set password from backend
          setFormData({ ...user, password: "" });
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error));
      return;
    }

    // Prepare update data (exclude password if not changed)
    const updatedData = { ...formData };
    if (!updatedData.password) {
      delete updatedData.password;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        updatedData
      );
      if (response.data.success) {
        toast.success("User updated successfully!");
        setTimeout(() => {
          navigate("/a-dash/manUser");
        }, 1000);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating the user.");
    }
  };

  const validateForm = (formData) => {
    const errors = {};

    const fullName = String(formData.full_name || "").trim();
    const email = String(formData.email || "").trim();
    const phone = String(formData.phone || "").trim();
    const address = String(formData.address || "").trim();
    const password = String(formData.password || "").trim();

    if (!fullName) {
      errors.full_name = "Full Name is required.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    if (!address) {
      errors.address = "Address is required.";
    }

    if (password && password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-heading">Update User</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password (if changing)"
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="submit-btn">
            Update User
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateUser;
