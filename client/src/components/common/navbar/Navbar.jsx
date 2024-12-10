import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import SearchInput from "./SearchInput";
import TreatmentsDropdown from "./TreatmentsDropdown";
import Contact from "../modal/contact/Contact";
import Language from "../modal/language/Language";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false); // Close the menu when the logo is clicked
    navigate("/"); // Navigate to home
  };

  const handleMyProfileClick = () => {
    if (isLoggedIn) {
      navigate("/MyProfile"); // Redirect to profile page
    } else {
      navigate("/LoginPage"); // Redirect to login page
    }
  };
  return (
    <div id="navbar">
      <div
        onClick={handleLogoClick}
        className="nav-logo"
        role="button"
        tabIndex="0"
        onKeyDown={(e) => e.key === "Enter" && navigate("/")}
      >
        MYMI Conseil
      </div>

      <div className="navbar-search">
        <SearchInput />
      </div>

      <div
        className="hamburger-menu"
        onClick={toggleMenu}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
        aria-label="Toggle navigation menu"
      >
        <FaBars />
      </div>

      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <div
          onClick={() => navigate("/")}
          className="nav-btn"
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === "Enter" && navigate("/")}
        >
          Home
        </div>
        <div className="nav-btn">
          <TreatmentsDropdown />
        </div>
        <div
          role="button"
          tabIndex="0"
          onClick={() => navigate("/Galleries")}
          className="nav-btn"
          onKeyDown={(e) => e.key === "Enter" && navigate("/Galleries")}
        >
          Galleries
        </div>
        <div
          role="button"
          tabIndex="0"
          onClick={handleMyProfileClick}
          className="nav-btn"
          onKeyDown={(e) => e.key === "Enter" && handleMyProfileClick()}
        >
          My Profile
        </div>
        <div className="nav-btn">
          <Contact />
        </div>
        <div className="nav-btn">
          <Language />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
