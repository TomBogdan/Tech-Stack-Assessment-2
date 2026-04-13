import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    pronouns: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        // ✅ Persist user identity across refreshes
        localStorage.setItem("userEmail", formData.email);

        navigate("/profile");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to save profile");
      });
  };

  return (
    <div className="container mt-4">
      <h1>Create Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password*"
          value={formData.password}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control mb-2"
        />

        <input
          type="text"
          name="pronouns"
          placeholder="Pronouns"
          value={formData.pronouns}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-primary">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;