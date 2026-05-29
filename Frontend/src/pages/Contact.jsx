import { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaInstagram, FaFacebookF } from 'react-icons/fa';
import '../style/Contact.css';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || 'Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch (err) {
      setError('Error submitting form');
    }
  };

  return (
    <section className="contact-container">
      <header className="contact-hero">
        <p className="contact-eyebrow">Get in touch</p>
        <h1>Let’s plan your next shoot</h1>
        <p className="contact-subtitle">
          Based in Kathmandu, Nepal. Available for portraits, events, and commercial videography.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-left">
          <div className="contact-map">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14124.072335002817!2d85.3001403!3d27.7172453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1908c5b8f6f1%3A0x6e3a6bb7702c0b70!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1730000000000!5m2!1sen!2snp"
              width="100%"
              height="240"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="contact-card">
            <h2>Contact</h2>
            <ul className="contact-list">
              <li>
                <FaMapMarkerAlt />
                <span>Kathmandu, Nepal</span>
              </li>
              <li>
                <FaPhoneAlt />
                <a href="tel:+9779864029898">+977 9864029898</a>
              </li>
              <li>
                <FaWhatsapp className="accent" />
                <a href="https://wa.me/9779864029898" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <FaEnvelope />
                <a href="mailto:krishalstha87@gmail.com">krishalstha87@gmail.com</a>
              </li>
            </ul>

            <div className="social-links">
              <p>Connect with me</p>
              <div className="social-icons">
                <a href="https://www.instagram.com/only__krishal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram size={22} />
                </a>
                <a href="https://www.facebook.com/unique.krishal.17" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Send a message</h2>
          <p className="form-hint">Tell me about your project and preferred dates.</p>
          <input
            type="text"
            name="name"
            placeholder="Your Name (required)"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email (required)"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="7"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>

          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </section>
  );
}
