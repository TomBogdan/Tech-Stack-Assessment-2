import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav align-items-center">
        <img src="/Favicon.ico" alt="Logo" height="32" className="me-3" />

        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/share">Share Resource</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Link className="nav-link" to="/createprofile">Create Profile</Link>
        <Link className="nav-link" to="/about">About Us</Link>
        <Link className="nav-link" to="/contactus">Contact Us</Link>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger ms-3"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;