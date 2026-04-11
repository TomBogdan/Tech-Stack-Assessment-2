
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const location = useLocation();
  const newResource = location.state;

  const [resources, setResources] = useState([
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
    },
    {
      id: 3,
      title: 'Useful ChatGPT Prompts',
      description: 'Here are some prompts you can use in ChatGPT to get some useful results',
      category: 'Artificial Intelligence',
      link: 'https://growthtribe.io/blog/chatgpt-prompts/',
      likes: 0,
      dislikes: 0,
      comments: []
    }
  ]);

  useEffect(() => {
    if (newResource) {
      setResources((prev) => [
        ...prev,
        { id: Date.now(), likes: 0, dislikes: 0, comments: [], ...newResource }
      ]);
    }
  }, [newResource]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle Like
  const handleLike = (id) => {
    setResources(prev =>
      prev.map(resource =>
        resource.id === id ? { ...resource, likes: resource.likes + 1 } : resource
      )
    );
  };

  // Handle Dislike
  const handleDislike = (id) => {
    setResources(prev =>
      prev.map(resource =>
        resource.id === id ? { ...resource, dislikes: resource.dislikes + 1 } : resource
      )
    );
  };

  // Handle Add Comment
  const handleAddComment = (id, comment) => {
    if (!comment.trim()) return;
    setResources(prev =>
      prev.map(resource =>
        resource.id === id
          ? { ...resource, comments: [...resource.comments, comment] }
          : resource
      )
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Home</h1>
      <h4 className="md-4">Resources</h4>

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
          <option value="Artificial Intelligence">Artificial Intelligence</option>
        </select>
      </div>

      <div className="row">
        {filteredResources.map(resource => (
          <div className="col-md-4 mb-3" key={resource.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{resource.title}</h5>
                <p className="card-text">{resource.description}</p>
                <span className="badge bg-primary mb-2">{resource.category}</span>
                <br />
                <a href={resource.link} className="btn btn-outline-primary mb-3" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>

                {/* Like & Dislike Buttons */}
                <div className="d-flex gap-2 mb-3">
                  <button className="btn btn-success" onClick={() => handleLike(resource.id)}>
                    👍 {resource.likes}
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDislike(resource.id)}>
                    👎 {resource.dislikes}
                  </button>
                </div>

                {/* Comments Section */}
                <div>
                  <h6>Comments:</h6>
                  {resource.comments.length === 0 ? (
                    <p>No comments yet.</p>
                  ) : (
                    <ul className="list-group mb-2">
                      {resource.comments.map((comment, index) => (
                        <li key={index} className="list-group-item">{comment}</li>
                      ))}
                    </ul>
                  )}
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddComment(resource.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
                   </div>
        ))}
      </div>
    </div>
  );
};

export default Home;