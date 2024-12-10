import React from "react";
import { FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-content">
        <h2>MYMI Conseil</h2>
        <p>Providing top-quality beauty and wellness services since 2022.</p>
      </div>

      <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <span>Our Location</span>
            <div className="footer-icon-text">
              <FaMapMarkedAlt className="footer-icon" />
              <a
                href="https://www.google.com/maps/dir//MyMi+Conseil,+13+Rue+des+Gentilhommi%C3%A8res,+91700+Villiers-sur-Orge,+France/@48.6607678,2.2191904,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x47e5d9da0ee73415:0x566d3dd66c91d2ce!2m2!1d2.3015908!2d48.6607972?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="Open the location in Google Maps"
              >
                13 Rue des Gentilhommieres, 91700 Villiers sur Orge, France
              </a>
            </div>
          </li>
          <li>
            <span>Contact Information</span>
            <div className="footer-icon-text">
              <FaPhoneAlt className="footer-icon" />
              <a href="tel:+33610322965" className="footer-link">
                +33(0) 610322965
              </a>
            </div>
          </li>
        </ul>
      </div>

      <div className="footer-copyright">
        <p>© 2025 MYMI Conseil. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
