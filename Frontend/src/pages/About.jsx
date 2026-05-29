import { useNavigate } from 'react-router-dom';

import '../style/About.css';
// Using public assets for photographer images

export default function About() {

  const navigate = useNavigate();

  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text-container">
          <h2 className="about-title">About Me</h2>
          <p className="about-text">
            I’m Krishal Shrestha, a photographer with 3 years of experience capturing real stories through images and video.
          </p>
          <p className="about-bio">
            I have worked in commercial videography and at Neo Struct Engineering and Builders. My approach blends creativity with technical skill to deliver clean, modern visuals.
          </p>
          <ul className="about-achievements">
            <li>📷 Experience: 3 years</li>
            <li>🎬 Commercial videography</li>
            <li>🏗️ Neo Struct Engineering and Builders</li>
          </ul>
          <div className="about-links">
            <a href="https://www.instagram.com/only__krishal/" target="_blank" rel="noopener noreferrer">Instagram</a> | 
            <a href="https://www.facebook.com/unique.krishal.17" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
          <button className="about-btn" onClick={() => navigate('/portfolio')}>
             View Portfolio
          </button>

        </div>

        <div className="about-image-container">
          <img src="/krihsalimage1.jpg" alt="About" className="about-image" />
        </div>
      </div>
    </section>
  );
}
