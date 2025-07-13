import React, { useEffect } from "react";
import "../styles/hardware.css";

function Hardware() {
  useEffect(() => {
    const slider = document.getElementById("slider");
    const cards = Array.from(slider.querySelectorAll(".card"));

    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      slider.appendChild(clone);
    });

    const cardWidth = cards[0].offsetWidth;
    const totalOriginalWidth = cardWidth * cards.length;

    slider.scrollLeft = 0;
    slider.style.scrollBehavior = "smooth";

    let speed = 1;

    function autoScroll() {
      slider.scrollLeft += speed;

      if (slider.scrollLeft >= totalOriginalWidth) {
        slider.style.scrollBehavior = "auto";
        slider.scrollLeft = 0;

        requestAnimationFrame(() => {
          slider.style.scrollBehavior = "smooth";
        });
      }

      requestAnimationFrame(autoScroll);
    }

    requestAnimationFrame(autoScroll);
  }, []);

  return (
    <div id="homepage" className="homepage-container">
      <div className="navbar">
        <nav>
          <ul>
            <h6 className="brand">CosmoCreations</h6>
            <li><a href="hardware.html">Home</a></li>
            <li><a href="18fb5e84-23e2-4a1e-aa3c-a95b8c8bb739.pdf" download="CosmoCreations-Catalog.pdf">Catalog</a></li>
            <li><a href="owner.html">Owner</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      {/* <div className="brand-name">CosmoCreations</div> */}
      <section 
        className="hero-section"
      >
        <div className="welcome-box">
          <h1>Welcome</h1>
          <h2>To the home of stylish security</h2>
        </div>
        <a href="#" className="explore-button">
          Explore Collection
        </a>
      </section>

      <section className="image-slider-section">
        <h1 className="slider-heading">Premium Hardware</h1>
        <div className="image-slider" id="slider">
        {["d8/53/b6/d853b67c1b8adca287764ca58c200f4f", "77/e8/c2/77e8c297d1a33fb03e4b41d2cf7b2e60", "32/48/44/324844e56ab5cf904dcb77f1a7376f95", "5e/26/bb/5e26bbe55a3ae9c43a77dcb4acb73e78", "3a/42/1c/3a421c2deac81afae53660c066d60ebf", "80/cc/cb/80cccb58be0553c5c6737a5837bb9c56", "a3/5d/7d/a35d7d10e218e0bf6cdc32e858839e23", "3e/2a/2a/3e2a2a19cb4d05088b7fb01bc2848f25", "19/fd/d5/19fdd504373151bbb467ff51f7e43566", "dd/bb/68/ddbb68e19054ae8fd54d31575436493a"].map((id, idx) => (
          <div key={idx} className="card">
            <img src={`https://i.pinimg.com/736x/${id}.jpg`} alt={`img${idx + 1}`} />
          </div>
        ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-title">
            <h2>What Our Customers Say</h2>
            <p>Real experiences from our valued clients</p>
          </div>

          <div className="testimonials-grid">
            {[
              {
                text: "CosmoCreations transformed my living space completely! The attention to detail and futuristic design elements exceeded all my expectations. Truly professional service!",
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
                text: "From concept to execution, CosmoCreations delivered beyond our wildest dreams. The stylish security solutions are both beautiful and functional. Amazing work! Lorem ipsum",
                name: "Emma Rodriguez",
                role: "Business Owner",
                avatar: "ER",
              },
            ].map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="quote-icon">"</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="customer-info">
                  <div className="customer-avatar">{testimonial.avatar}</div>
                  <div className="customer-details">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <div className="stars">{"★".repeat(5).split("").map((s, i) => (<span className="star" key={i}>{s}</span>))}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-us-section">
        <div className="about-us-container">
          <h2>About CosmoCreations</h2>
          <p>
            At CosmoCreations, we blend innovation with elegance to craft high-end
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
            CosmoCreations is your partner in creating spaces that speak style and
            security.
          </p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-container">
          <h2>Get in Touch</h2>
          <p>
            Have a project in mind or need more details? We'd love to hear from
            you.
          </p>

          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="contact-submit">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Hardware;