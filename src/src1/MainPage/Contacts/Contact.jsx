import React, { useState } from "react";
import './ContactStyle.css'

function Contact() {
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Please wait...");

    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const jsonResponse = await response.json();

      if (response.status === 200) {
        setResult("Form submitted successfully!");
        e.target.reset();
      } else {
        setResult(jsonResponse.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
    }

    setTimeout(() => setResult(""), 5000);
  };

  return (
    <section id="contact" className="con contact">
      <div className="container">
        <header className="section-header">
          <div className="section-tag">Get In Touch</div>
          <h2 className="section-title">Connect With SIB</h2>
          <p className="section-subtitle">
            Join our thriving community of business leaders
          </p>
        </header>

        <div className="contact-content">
          <div className="contact-info">
            <article className="contact-item glass-card">
              <div className="contact-icon" aria-hidden="true">📍</div>
              <a
                href="https://maps.app.goo.gl/oQvWDiGHgVvDCnvWA?g_st=ipc"
                className="location"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>Location</h4>
                <address>
                  H96 Shop No5,<br />
                  Periyar Nagar Main Road,<br />
                  Erode - 638001<br />
                  Tamil Nadu, India
                </address>
              </a>
              <div className="item-glow" />
            </article>

            <article className="contact-item glass-card">
              <div className="contact-icon" aria-hidden="true">📞</div>
              <div className="contact-details">
                <h4>Phone</h4>
                <a href="tel:+919842775676">+91 98427 75676</a>
              </div>
              <div className="item-glow" />
            </article>

            <article className="contact-item glass-card">
              <div className="contact-icon" aria-hidden="true">✉️</div>
              <div className="contact-details">
                <h4>Email</h4>
                <a href="mailto:members@senguntharinbusiness.in">
                  members@senguntharinbusiness.in
                </a>
              </div>
              <div className="item-glow" />
            </article>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="access_key" value="6e2f9332-1b79-4754-849a-1cd5b267d650" />
            <h3>Send us a message</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" id="name" name="name" className="form-input" required />
                <div className="input-border" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" id="email" name="email" className="form-input" required />
                <div className="input-border" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="business" className="form-label">Business/Company</label>
                <input type="text" id="business" name="business" className="form-input" />
                <div className="input-border" />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="form-input" />
                <div className="input-border" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" name="message" className="form-input" rows="4" required />
              <div className="input-border" />
            </div>

            <button type="submit" className="btn btn-primary submit-btn ripple-btn">
              <span>Send Message</span>
              <div className="btn-glow" />
            </button>

            <input type="checkbox" name="botcheck" style={{ display: "none" }} />

            {result && <p className="form-result">{result}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
