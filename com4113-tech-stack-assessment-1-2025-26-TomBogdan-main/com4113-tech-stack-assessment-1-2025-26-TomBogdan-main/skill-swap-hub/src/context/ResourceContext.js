
import React, { useState, useContext } from 'react';
import { ResourceContext } from '../context/ResourceContext';

const ShareResource = () => {
  const { addResource } = useContext(ResourceContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResource = {
      id: Date.now(),
      title,
      link,
      category,
      user: 'Tomislav Arthur' // Hardcoded for now
    };
    addResource(newResource);
    setTitle('');
    setLink('');
    setCategory('');
  };

  return (
    <div className="container mt-4">
      <h1>Share a Resource</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control mb-2" />
        <input type="text" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} className="form-control mb-2" />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Add Resource</button>
      </form>
    </div>
  );
};

