import React, { useEffect, useRef, useState } from "react";
import "../styles/hardware.css";

function Hardware() {
  const sliderRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Auto-scroll functionality for slider
    const cards = Array.from(slider.querySelectorAll(".card"));
    if (cards.length === 0) return;

    // Clone cards for seamless loop
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      slider.appendChild(clone);
    });

    const cardWidth = cards[0].offsetWidth;
    const totalOriginalWidth = cardWidth * cards.length;

    slider.scrollLeft = 0;
    let speed = 1;

    function autoScroll() {
      if (slider.scrollLeft >= totalOriginalWidth) {
        slider.scrollLeft = 0;
      }
      slider.scrollLeft += speed;
      requestAnimationFrame(autoScroll);
    }

    const animationId = requestAnimationFrame(autoScroll);

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
      cancelAnimationFrame(animationId);
      observer.disconnect();
      staggerObserver.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent successfully!');
    setFormData({ fullName: '', email: '', phone: '', message: '' });
  };

  return (
    <div id="homepage" className="homepage-container">
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
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>

      <section className="hero-section">
        <div className="welcome-box animate-on-scroll">
          <h1>Welcome</h1>
          <h2>To the home of stylish security</h2>
        </div>
        <a href="#" className="explore-button animate-on-scroll">
          Explore Collection
        </a>
      </section>

      <section className="image-slider-section">
        <h1 className="slider-heading animate-on-scroll">Premium Hardware</h1>
        <div className="image-slider stagger-container" ref={sliderRef}>
          {["d8/53/b6/d853b67c1b8adca287764ca58c200f4f", "77/e8/c2/77e8c297d1a33fb03e4b41d2cf7b2e60", "32/48/44/324844e56ab5cf904dcb77f1a7376f95", "5e/26/bb/5e26bbe55a3ae9c43a77dcb4acb73e78", "3a/42/1c/3a421c2deac81afae53660c066d60ebf", "80/cc/cb/80cccb58be0553c5c6737a5837bb9c56", "a3/5d/7d/a35d7d10e218e0bf6cdc32e858839e23", "3e/2a/2a/3e2a2a19cb4d05088b7fb01bc2848f25", "19/fd/d5/19fdd504373151bbb467ff51f7e43566", "dd/bb/68/ddbb68e19054ae8fd54d31575436493a"].map((id, idx) => (
            <div key={idx} className="card stagger-item">
              <img src={`https://i.pinimg.com/736x/${id}.jpg`} alt={`Hardware ${idx + 1}`} />
              <div className="card-name">Hardware {idx + 1}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-title animate-on-scroll">
            <h2>What Our Customers Say</h2>
            <p>Real experiences from our valued clients</p>
          </div>

          <div className="testimonials-grid stagger-container">
            {[
              {
                text: "CosmoInternational transformed my living space completely! The attention to detail and futuristic design elements exceeded all my expectations. Truly professional service!",
                name: "Sarah Mitchell",
                role: "Interior Designer",
                avatar: "SM",
              },
              {
                text: "The digital experience they created for our brand was absolutely mesmerizing. Our customers are constantly impressed with the innovative approach. Highly recommend!",
                name: "David Johnson",
                role: "Tech Entrepreneur",
                avatar: "DJ",
              },
              {
                text: "From concept to execution, CosmoInternational delivered beyond our wildest dreams. The stylish security solutions are both beautiful and functional. Amazing work!",
                name: "Emma Rodriguez",
                role: "Business Owner",
                avatar: "ER",
              },
            ].map((testimonial, index) => (
              <div className="testimonial-card stagger-item" key={index}>
                <div className="quote-icon">"</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="customer-info">
                  <div className="customer-avatar">{testimonial.avatar}</div>
                  <div className="customer-details">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <div className="stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span className="star" key={i}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-us-section">
        <div className="about-us-container animate-on-scroll">
          <h2>About CosmoInternational</h2>
          <p>
            At CosmoInternational, we blend innovation with elegance to craft high-end
            locks, fittings, and lifestyle products that redefine modern living.
            With a passion for futuristic aesthetics and secure functionality, we
            bring you designs that don't just fit your space — they elevate it.
          </p>
          <p>
            From residential homes to commercial spaces, our collections are
            trusted by interior designers, architects, and homeowners alike. Every
            piece is meticulously designed with premium materials and a commitment
            to durability, beauty, and safety.
          </p>
          <p>
            Whether you're revamping your interiors or curating a new project,
            CosmoInternational is your partner in creating spaces that speak style and
            security.
          </p>
        </div>
      </section>

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
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="phone"
                placeholder="Phone number" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
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
              />
            </div>
            <button type="submit" className="contact-submit" onClick={handleSubmit}>
              Send Message
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hardware;