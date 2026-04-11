
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ShareResource from './pages/ShareResource';
import CreateProfile from './pages/CreateProfile';
import About from './pages/About';
import ContactUs from './pages/ContactUs';



function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/share" element={<ShareResource />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
