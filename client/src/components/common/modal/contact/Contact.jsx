import "./contact.css";
import React, { useState, useEffect, useRef } from "react";

function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div id="contact-dropdown" ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className="dropdown-title">
        Contact
      </button>
      {isOpen && (
        <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
          <h2>We'd love to hear from you!</h2>
          <p>Send us a message directly through Google Business.</p>
          <a
            href="https://business.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="google-business-btn"
            aria-label="Message us on Google Business in a new tab"
          >
            Message us on Google Business
          </a>
          <p className="small-text">
            You’ll be redirected to Google Business Messages to continue the
            conversation.
          </p>
        </div>
      )}
    </div>
  );
}

export default Contact;
