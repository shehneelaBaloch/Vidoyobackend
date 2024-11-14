import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('/.netlify/functions/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
              throw new Error('Failed to send message');
          }
  
          const data = await response.json();
  
          // Check if `data` has the `message` field
          if (data && data.message) {
              alert(data.message);
          } else {
              alert('Message sent successfully'); // Fallback message
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Failed to send message');
      }
  };
  

    return (
        <div className='contact'>
            <h1>Contact Me</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;