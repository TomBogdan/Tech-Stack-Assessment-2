
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const location = useLocation();
  const passedUserData = location.state; // Data from CreateProfile page

  // Initial user data (fallback if no state passed)
  const defaultUser = {
    name: 'Example',
    email: 'Example@Email.Net',
    avatar: 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=',
    pronouns: 'Exa/Mple',
    phone: '12345678910'
  };

  // Use passed data if available, else fallback
  const [user, setUser] = useState(passedUserData || defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const sharedResources = [
    { id: 1, title: 'React Basics', link: 'http://localhost:3001/' },
    { id: 2, title: 'Node.js Guide', link: 'http://localhost:3001/' },
    { id: 3, title: 'PostgreSQL Tutorial', link: 'http://localhost:3001/' }
  ];

  // Sync formData when user changes (important if state comes later)
  useEffect(() => {
    setFormData(user);
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
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
      <h1 className="mb-4">Profile</h1>

      {/* Profile Display */}
      <div className="card mb-4">
        <div className="card-body text-center">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="rounded-circle mb-3"
            style={{ width: '150px', height: '150px' }}
          />
          {!isEditing ? (
            <>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.pronouns}</p>
              <p>{user.phone}</p>
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Email"
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
                  value={formData.pronouns}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Pronouns"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Phone"
                />
              </div>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Shared Resources */}
      <h4>Your Shared Resources</h4>
      <ul className="list-group">
        {sharedResources.map((resource) => (
          <li
            key={resource.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {resource.title}
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-sm"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
