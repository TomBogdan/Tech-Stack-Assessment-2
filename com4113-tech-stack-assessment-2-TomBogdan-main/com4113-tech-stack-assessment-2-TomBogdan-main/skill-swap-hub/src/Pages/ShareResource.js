import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShareResource() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    link: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * ✅ UPDATED: Send data to Flask instead of using navigate state
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/api/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to submit resource');
        }
        return res.json();
      })
      .then(() => {
        // ✅ For now, just go back home
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert('Error submitting resource');
      });
  };

  return (
    <div className="container mt-4">
      <h3>Share a Resource</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="link"
          placeholder="Link"
          value={formData.link}
          onChange={handleChange}
        />

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ShareResource;
