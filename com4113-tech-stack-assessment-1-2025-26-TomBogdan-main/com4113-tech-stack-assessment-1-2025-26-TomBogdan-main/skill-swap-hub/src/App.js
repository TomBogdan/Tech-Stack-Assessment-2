
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import ShareResource from './Pages/ShareResource';
import CreateProfile from './Pages/CreateProfile';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';



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
