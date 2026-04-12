import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const location = useLocation();
  const newResource = location.state;

  // ✅ DEMO DATA (kept as fallback)
  const demoResources = [
    {
      id: 1,
      title: 'Python Basics',
      description: 'Learn the fundamentals of Python.',
      category: 'Coding',
      link: 'https://www.w3schools.com/python/default.asp',
      likes: 0,
      dislikes: 0,
      comments: []
    },
    {
      id: 2,
      title: 'How to make Banana Bread',
      description: 'This guide shows how to make some delicious banana bread :)',
      category: 'Baking',
      link: 'https://www.bbcgoodfood.com/recipes/brilliant-banana-loaf',
      likes: 0,
      dislikes: 0,
      comments: []
    }
  ];

  // ✅ CHANGED: resources start empty
  const [resources, setResources] = useState([]);

  /**
   * ✅ ADDED FOR BACKEND INTEGRATION
   * Fetch resources from Flask API
   */
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/resources')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setResources(data);
        } else {
          setResources(demoResources); // fallback if DB empty
        }
      })
      .catch(() => {
        setResources(demoResources); // fallback if backend offline
      });
  }, []);

  /**
   * ✅ TEMPORARY: handles resource added via navigation
   * (will be removed once ShareResource posts to backend)
   */
  useEffect(() => {
    if (newResource) {
      setResources(prev => [
        ...prev,
        { id: Date.now(), likes: 0, dislikes: 0, comments: [], ...newResource }
      ]);
    }
  }, [newResource]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
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
          <div className="col-md-4 mb-3" key={resource.id || resource._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5>{resource.title}</h5>
                <p>{resource.description}</p>
                <span className="badge bg-primary mb-2">{resource.category}</span>
                <br />
                <a
                  href={resource.link}
                  className="btn btn-outline-primary mb-3"
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