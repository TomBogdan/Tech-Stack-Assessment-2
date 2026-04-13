import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ✅ CORRECT GET: fetch persisted resources from Flask
  useEffect(() => {
    fetch('http://localhost:5000/api/resources')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch resources');
        }
        return res.json();
      })
      .then(data => {
        setResources(data);
      })
      .catch(err => {
        console.error('Error fetching resources:', err);
      });
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Home</h1>
      <h4>Resources</h4>

      <div className="d-flex mb-4 gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Coding">Coding</option>
          <option value="Baking">Baking</option>
        </select>
      </div>

      <div className="row">
        {filteredResources.map(resource => (
          <div className="col-md-4 mb-3" key={resource._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5>{resource.title}</h5>
                <p>{resource.description}</p>
                <span className="badge bg-primary mb-2">
                  {resource.category}
                </span>
                <br />
                <a
                  href={resource.link}
                  className="btn btn-outline-primary mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;