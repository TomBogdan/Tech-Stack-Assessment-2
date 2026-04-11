
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <section className="about-us py-5 bg-light">
      <div className="container text-center">
        <h1 className="mb-4 text-primary">About Us</h1>
        <p className="lead mb-4">
          Welcome to <strong>Skill Swap Hub</strong>, a community-driven platform designed to connect learners and experts from all walks of life. Our mission is simple: to make knowledge sharing accessible, collaborative, and rewarding.
        </p>

        <div className="row text-start">
          <div className="col-md-6 mb-4">
            <h2 className="text-secondary">Our Mission</h2>
            <p>
              At Skill Swap Hub, we believe that everyone has something valuable to teach and something new to learn. Whether you’re a student looking to master coding, a professional eager to improve your design skills, or a hobbyist exploring photography, our platform provides the space to exchange skills and grow together.
            </p>
          </div>

          <div className="col-md-6 mb-4">
            <h2 className="text-secondary">Why Choose Skill Swap Hub?</h2>
            <ul className="list-unstyled">
              <li><strong>Collaborative Learning:</strong> Share your expertise and learn from others in a supportive environment.</li>
              <li><strong>Diverse Community:</strong> Connect with people across different fields and interests.</li>
                           <li><strong>Flexible & Free:</strong> Swap skills at your own pace without barriers.</li>
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <a href="/CreateProfile" className="btn btn-primary btn-lg">Create a profile now!</a>
        </div>
      </div>
    </section>
  );
};

export default About;