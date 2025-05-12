import { GoPersonFill } from "react-icons/go";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserEditProfile() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUser(response.data.user);
        setFormData({ ...response.data.user, password: "" });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleEditClick = () => {
    if (isEditing) {
      const updatedData = { ...formData };
      const errors = {};

      if (!updatedData.full_name) {
        errors.full_name = "Full name is required.";
      }

      if (!updatedData.address) {
        errors.address = "Address is required.";
      }

      if (!updatedData.email) {
        errors.email = "Email is required.";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updatedData.email)) {
          errors.email = "Invalid email format.";
        }
      }

      if (updatedData.phone && !/^\d{10}$/.test(updatedData.phone)) {
        errors.phone = "Phone number must be 10 digits.";
      }

      setValidationErrors(errors);

      if (Object.keys(errors).length > 0) {
        return; // Stop submission if errors exist
      }

      if (!updatedData.password) {
        delete updatedData.password;
      }

      axios
        .put(`http://localhost:5000/api/user/${userId}`, updatedData)
        .then(() => {
          const updatedUser = { ...formData };
          delete updatedUser.password;
          setUser(updatedUser);
          setIsEditing(false);
          setValidationErrors({});
        })
        .catch((err) => {
          console.error("Error updating user:", err);
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:5000/api/user/${userId}`)
        .then(() => {
          localStorage.removeItem("token");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="user-dash">
      <div className="user-details">
        <GoPersonFill size={50} className="u-p" color="#3EA65A" />
        <div className="u-details">
          <p className="u-n">{user.full_name}</p>
          <p className="u-e">{user.email}</p>
        </div>
      </div>

      <div className="u-detail-main">
        {["full_name", "email", "address", "phone"].map((field) => (
          <div key={field}>
            <div className="u-d-item">
              <p className="u-n">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </p>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="u-e"
                  />
                  {validationErrors[field] && (
                    <p className="error-text-edit">{validationErrors[field]}</p>
                  )}
                </>
              ) : (
                <p className="u-e">{user[field]}</p>
              )}
            </div>
            <hr className="pad-10" />
          </div>
        ))}

        <div className="u-d-item">
          <p className="u-n">Password</p>
          {isEditing ? (
            <>
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className="u-e"
                placeholder="Enter new password (if changing)"
              />
              {validationErrors.password && (
                <p className="error-text-edit">{validationErrors.password}</p>
              )}
            </>
          ) : (
            <p className="u-e">*******</p>
          )}
        </div>
      </div>

      <div className="user-actions">
        {isEditing ? (
          <>
            <button className="btn save-btn" onClick={handleEditClick}>
              💾 Save Details
            </button>
            <button
              className="btn cancel-btn"
              onClick={() => {
                setFormData({ ...user, password: "" });
                setIsEditing(false);
                setValidationErrors({});
              }}
            >
              ❌ Cancel
            </button>
          </>
        ) : (
          <button className="btn edit-btn" onClick={handleEditClick}>
            ✏️ Edit Details
          </button>
        )}

        <button className="btn delete-btn" onClick={handleDeleteClick}>
          🗑️ Delete Account
        </button>
      </div>
    </div>
  );
}

export default UserEditProfile;
