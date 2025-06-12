import React, { useState } from 'react';
import './App.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', isError: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: 'Sending message...', isError: false });

    try {
      // Remove the _next parameter to prevent redirection
      const formDataToSend = new FormData();
      formDataToSend.append('_subject', 'New Contact Form Submission');
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'table');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://formsubmit.co/ajax/umam6953@gmail.com', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus({ message: 'Message sent successfully!', isError: false });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setStatus({ message: 'Failed to send. Please try again.', isError: true });
    }
  };

  return (
    <div className="contact-form">
      <h1>Contact Us</h1>
      
      {status.message && (
        <p className={`status ${status.isError ? 'error' : 'success'}`}>
          {status.message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
        </div>

        <button type="submit" disabled={status.message === 'Sending message...'}>
          {status.message === 'Sending message...' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;