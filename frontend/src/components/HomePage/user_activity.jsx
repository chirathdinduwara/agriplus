import { useEffect, useState } from "react";
import axios from "axios";

function UserActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActivities(res.data.activities);
    } catch (err) {
      console.error("Failed to load activities:", err);
      alert("Could not fetch activity logs.");
    } finally {
      setLoading(false);
    }
  };

  const clearAllActivities = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all activity logs?"
    );
    if (!confirmed) return;

    try {
      await axios.delete("http://localhost:5000/api/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("All activities cleared.");
      fetchActivities(); // Reload after delete
    } catch (err) {
      console.error("Failed to delete activities:", err);
      alert("Failed to clear activities.");
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async () => {
    if (!email) {
      alert("Please enter an email.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete all activity logs for ${email}?`
    );
    if (!confirmed) return;

    try {
      const res = await axios.delete(
        "http://localhost:5000/api/activities/by-email",
        {
          data: { email }, // axios requires `data` key for DELETE body
        }
      );

      alert(res.data.message);
      setEmail(""); // Clear input
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Error deleting activities.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Activity Logs</h2>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={fetchActivities} disabled={loading}>
          🔄 Refresh
        </button>
        <button
          onClick={clearAllActivities}
          style={{
            marginLeft: "10px",
            backgroundColor: "#e74c3c",
            color: "#fff",
          }}
        >
          🗑️ Clear All
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Delete Activity Logs by Email</h3>
        <input
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "5px", width: "250px" }}
        />
        <button
          onClick={handleDelete}
          style={{
            marginLeft: "10px",
            backgroundColor: "#e74c3c",
            color: "#fff",
            padding: "6px 12px",
            border: "none",
            cursor: "pointer",
          }}
        >
          🗑️ Delete Activities
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {activities.length === 0 ? (
            <p>No activity logs found.</p>
          ) : (
            activities.map((a) => (
              <li
                key={a._id}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "5px",
                }}
              >
                <strong>{a.user?.email || "Unknown User"}</strong>
                <br />
                Login:{" "}
                {a.loginAt ? new Date(a.loginAt).toLocaleString() : "N/A"}
                <br />
                Logout:{" "}
                {a.logoutAt
                  ? new Date(a.logoutAt).toLocaleString()
                  : "Still Active"}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default UserActivity;
