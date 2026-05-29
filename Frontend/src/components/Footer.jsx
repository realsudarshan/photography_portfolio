import '../style/Footer.css';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Profile Section */}
        <div className="footer-profile">
          <img src="/krishalimage2.jpg" alt="Profile" className="profile-img" />
          <h3 className="profile-name">Krishal Shrestha</h3>
          <p className="profile-role">Photographer & Videographer</p>
        </div>

        {/* Subscribe Section */}
        <div className="footer-subscribe">
          <h3>SUBSCRIBE:</h3>
          <p>I’ll send you cool stuff from time to time.</p>
          <div className="subscribe-input">
            <input type="email" placeholder="email address" />
            <button type="button">
              <i className="fas fa-envelope"></i>
            </button>
          </div>

          {/* ✅ Social Icons moved here */}
          <div className="social-icons">
            <a href="https://www.instagram.com/only__krishal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.facebook.com/unique.krishal.17" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Krishal Shrestha. All rights reserved.</p>
      </div>
    </footer>
  );
}
