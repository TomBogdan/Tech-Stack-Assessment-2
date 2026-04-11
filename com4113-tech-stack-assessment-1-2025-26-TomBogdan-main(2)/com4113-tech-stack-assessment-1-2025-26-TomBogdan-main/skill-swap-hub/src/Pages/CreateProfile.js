
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProfile = () => {
  const navigate = useNavigate();

  // Form state for profile fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    pronouns: '',
    phone: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    // Navigate to Profile page and pass form data as state
    navigate('/profile', { state: formData });
  };


const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, avatar: imageUrl });
  }

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
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="file"
          name="avatar"
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
        <button type="submit" className="btn btn-primary">Save Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;