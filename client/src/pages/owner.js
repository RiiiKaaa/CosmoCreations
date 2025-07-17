import React, { useEffect } from 'react';
import "../styles/owner.css";

const Owner = () => {
  useEffect(() => {
    // Smooth scroll progress indicator
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        scrollIndicator.style.transform = `scaleX(${scrolled / 100})`;
      }
    };

    // Add subtle parallax effect
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.owner-card');
      const speed = scrolled * 0.1;
      if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
      }
    };

    // Combined scroll handler
    const scrollHandler = () => {
      handleScroll();
      handleParallax();
    };

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    // Set up observers
    const animatedElements = document.querySelectorAll('.owner-card, .owner-bio, .owner-image');
    animatedElements.forEach(el => observer.observe(el));

    // Add scroll event listener
    window.addEventListener('scroll', scrollHandler);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="owner-page">

      {/* Scroll indicator */}
      <div className="scroll-indicator"></div>

      {/* Navbar */}
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

      {/* Owner Section */}
      <section className="owner-section">
        <div className="owner-card">
          <div className="owner-bio">
            <h2>Meet the Owner</h2>
            <p>
              Hermoine Granger, the visionary behind CosmoCreations, is a passionate designer and developer who blends security with aesthetics.
            </p>
            <p>
              A believer in smart work and innovation, Hermoine constantly integrates cutting-edge tools and design philosophies to elevate user experiences.
            </p>
            <p>
              "At CosmoCreations, we don't just create products—we create lifestyle experiences."
            </p>
          </div>
          <div className="owner-image">
            <img src="https://cdn.pixabay.com/photo/2023/10/14/16/46/ai-generated-8315326_1280.jpg" alt="Hermoine Granger - Owner of CosmoCreations" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Owner;