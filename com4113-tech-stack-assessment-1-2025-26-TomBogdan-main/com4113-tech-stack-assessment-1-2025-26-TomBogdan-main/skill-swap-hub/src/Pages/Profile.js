import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const location = useLocation();

  // ✅ Persistent identity
  const storedEmail = localStorage.getItem("userEmail");
  const email = location.state?.email || storedEmail;

  const defaultUser = {
    name: "Example",
    email: "example@email.net",
    avatar:
      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture.jpg",
    pronouns: "N/A",
    phone: "N/A"
  };

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultUser);

  useEffect(() => {
    if (!email) {
      setUser(defaultUser);
      return;
    }

    fetch(`http://localhost:5000/api/profile?email=${email}`)
      .then(res => res.json())
      .then(data => {
        console.log("Profile GET response:", data);

        if (data && Object.keys(data).length > 0) {
          setUser(data);
          setFormData(data);
        } else {
          setUser(defaultUser);
        }
      })
      .catch(() => setUser(defaultUser));
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const handleSave = () => {
    fetch("http://localhost:5000/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(() => {
        setUser(formData);
        setIsEditing(false);
      })
      .catch(() => alert("Failed to save profile"));
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Profile</h1>

      <div className="card mb-4 text-center">
        <div className="card-body">
          <img
            src={user.avatar}
            alt="Avatar"
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px" }}
          />

          {!isEditing ? (
            <>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.pronouns}</p>
              <p>{user.phone}</p>

              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <input
                className="form-control mb-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="file"
                className="form-control mb-2"
                onChange={handleFileChange}
              />

              <input
                className="form-control mb-2"
                name="pronouns"
                value={formData.pronouns}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;