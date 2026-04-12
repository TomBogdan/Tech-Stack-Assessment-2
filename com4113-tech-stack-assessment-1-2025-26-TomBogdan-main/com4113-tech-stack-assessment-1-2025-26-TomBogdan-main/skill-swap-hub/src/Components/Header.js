
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <div className="navbar-nav">
        <img src="Favicon.ico" alt="Logo" ></img>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/share">Share Resource</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Link className="nav-link" to="/createprofile">Create Profile</Link>
        <Link className="nav-link" to="/About">About Us</Link>
        <Link className="nav-link" to="ContactUs">Contact Us</Link>
      </div>
    </nav>
  );
}

export default Header;
