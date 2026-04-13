import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';

import Home from './Pages/Home';
import Profile from './Pages/Profile';
import ShareResource from './Pages/ShareResource';
import CreateProfile from './Pages/CreateProfile';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';

import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Header />

      <div className="container mt-4">
        <Routes>
          {/* ✅ Public route */}
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/share"
            element={
              <ProtectedRoute>
                <ShareResource />
              </ProtectedRoute>
            }
          />

          <Route
            path="/createprofile"
            element={
              <ProtectedRoute>
                <CreateProfile />
              </ProtectedRoute>
            }
          />

          {/* ✅ Public info pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;