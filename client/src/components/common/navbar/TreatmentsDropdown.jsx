import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./treatmentsdropdown.css";

function TreatmentsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const treatments = [
    {
      id: 1,
      name: "Advanced Skin Care",
      path: "treatments/advanced-skin-care",
    },
    { id: 2, name: "Hair & Scalp Care", path: "treatments/hair-scalp-care" },
    { id: 3, name: "Waxing", path: "treatments/waxing" },
    { id: 4, name: "Massages", path: "/treatments/massages" },
    {
      id: 5,
      name: "Manicures & Pedicures",
      path: "/treatments/manicures-pedicures",
    },
    {
      id: 6,
      name: "Eyelash Extensions & Lifts",
      path: "/treatments/eyelash-extensions",
    },
  ];

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
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div id="treatments-dropdown" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="dropdown-title"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="dropdown-content"
      >
        Treatments
      </button>
      {isOpen && (
        <div
          className={`dropdown-content ${isOpen ? "open" : ""}`}
          id="dropdown-content"
        >
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              role="button"
              tabIndex="0"
              onClick={() => navigate(treatment.path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  navigate(treatment.path);
              }}
              aria-label={`Navigate to ${treatment.name}`}
              className="dropdown-item"
            >
              {treatment.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TreatmentsDropdown;
