import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/Profile.css";

const Profile = ({ setActiveComponent }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found");
          return;
        }

        const res = await axios.get(
          "http://localhost:8080/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PROFILE RESPONSE:", res.data);
        setProfile(res.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Profile Information</h2>

        <div className="profile-field">
          <span className="profile-label">Name</span>
          <span className="profile-value">{profile.name}</span>
        </div>

        <div className="profile-field">
          <span className="profile-label">Email</span>
          <span className="profile-value">{profile.email}</span>
        </div>

        <button
          className="profile-back-button"
          onClick={() => setActiveComponent("Settings")}
        >
          ← Back to Settings
        </button>
      </div>
    </div>
  );
};

export default Profile;
