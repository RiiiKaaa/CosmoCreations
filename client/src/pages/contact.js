import React, { useEffect, useRef, useState } from "react";

function Contact() {
  const sliderRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Add state for notifications
  const [notification, setNotification] = useState({
    show: false,
    type: '', // 'success' or 'error'
    message: ''
  });

  // Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 4000); // Hide after 4 seconds
  };

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Special handling for staggered animations
    const handleStaggeredAnimation = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate');
            }, index * 200);
          });
        }
      });
    };

    const staggerObserver = new IntersectionObserver(handleStaggeredAnimation, observerOptions);
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => staggerObserver.observe(container));

    // Cleanup function
    return () => {
      observer.disconnect();
      staggerObserver.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Basic form validation
  const validateForm = () => {
    const { fullName, email, phone, message } = formData;
    
    if (!fullName.trim()) {
      showNotification('error', 'Please enter your full name.');
      return false;
    }
    
    if (!email.trim()) {
      showNotification('error', 'Please enter your email address.');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('error', 'Please enter a valid email address.');
      return false;
    }
    
    if (!phone.trim()) {
      showNotification('error', 'Please enter your phone number.');
      return false;
    }
    
    if (!message.trim()) {
      showNotification('error', 'Please enter your message.');
      return false;
    }
    
    return true;
  };

  // Updated handleSubmit with proper form handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append('access_key', '75863a2c-e9c7-49f8-9835-2602259cb57a');
    submitData.append('name', formData.fullName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('message', formData.message);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitData
      });
      
      const result = await response.json();
      
      if (result.success) {
        showNotification('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        showNotification('error', 'Oops! Something went wrong. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('error', 'Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="homepage" className="homepage-container">
      {/* Professional Toast Notification */}
      {notification.show && (
        <div className={`toast-notification ${notification.type}`} style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          maxWidth: '400px',
          zIndex: 9999,
          background: notification.type === 'success' 
            ? 'linear-gradient(135deg, #10b981, #059669)' 
            : 'linear-gradient(135deg, #ef4444, #dc2626)',
          borderLeft: `4px solid ${notification.type === 'success' ? '#047857' : '#b91c1c'}`,
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          color: 'white'
        }}>
          <div className="toast-content" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px'
          }}>
            <div className="toast-icon" style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginRight: '12px',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              flexShrink: 0
            }}>
              {notification.type === 'success' ? '✓' : '⚠'}
            </div>
            <div className="toast-message" style={{
              flex: 1,
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '500'
            }}>
              {notification.message}
            </div>
            <button 
              className="toast-close"
              onClick={() => setNotification({ show: false, type: '', message: '' })}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '0',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                marginLeft: '12px',
                flexShrink: 0
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="navbar">
        <nav>
          <ul>
            <li className="brand">
              <h6>CosmoInternational</h6>
            </li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/CosmoInternational-Catalog.pdf" download>
                Catalog
              </a>
            </li>
            <li>
              <a href="/owner">Owner</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>

      <section className="contact-section" id="contact">
        <div className="contact-container animate-on-scroll">
          <h2>Get in Touch</h2>
          <p>
            Have a project in mind or need more details? We'd love to hear from
            you.
          </p>

          <div className="contact-form">
            <div className="form-group">
              <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                value={formData.fullName}
                onChange={handleInputChange}
                required 
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone number" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="5" 
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>
            <button 
              type="submit" 
              className="contact-submit" 
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>

        <div className="contact-details">
          <h3 className="contact-heading">CONTACT INFORMATION</h3>
          <div className="contact-item">
            <span className="icon">📍</span>
            <div>
              <strong>ADDRESS</strong>
              <p>123 Business Street, Suite 456<br />
                 City, State 12345<br />
                 Country
              </p>
            </div>
          </div>
          <div className="contact-item">
            <span className="icon">📞</span>
            <div>
              <strong>PHONE</strong>
              <p>+91-1234567890<br />+91-1234567890</p>
            </div>
          </div>
          <div className="contact-item">
            <span className="icon">✉️</span>
            <div>
              <strong>EMAIL</strong>
              <p>info@cosmointernational.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;