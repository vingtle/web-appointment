import "./language.css";
import React, { useState, useEffect, useRef } from "react";

function Language() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the click event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSave = () => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
    setIsOpen(false);
  };

  return (
    <div id="language-dropdown" ref={dropdownRef}>
      <button type="button" onClick={toggleDropdown} className="dropdown-title">
        Language
      </button>
      {isOpen && (
        <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
          <form>
            <label>
              <input
                type="radio"
                name="language"
                value="English"
                checked={selectedLanguage === "English"}
                onChange={() => setSelectedLanguage("English")}
              />
              English
            </label>
            <label>
              <input
                type="radio"
                name="language"
                value="French"
                checked={selectedLanguage === "French"}
                onChange={() => setSelectedLanguage("French")}
              />
              French
            </label>
            <label>
              <input
                type="radio"
                name="language"
                value="Spanish"
                checked={selectedLanguage === "Spanish"}
                onChange={() => setSelectedLanguage("Spanish")}
              />
              Spanish
            </label>
          </form>
          <button type="button" onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default Language;
