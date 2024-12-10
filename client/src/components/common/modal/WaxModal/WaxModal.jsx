import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WaxModal = ({ category, title, onClose }) => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        // Fetch treatments based on the category passed to the component
        const response = await fetch(`/api/treatments?category=${category}`);
        const data = await response.json();
        setTreatments(data);
      } catch (error) {
        console.error(`Failed to fetch treatments for ${category}:`, error);
      }
    };

    fetchTreatments();
  }, [category]);

  const handleBookNow = (treatmentName) => {
    // Redirect to booking page with treatment name
    window.location.href = `/booking/${treatmentName.toLowerCase().replace(/\s/g, "-")}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {treatments.map((treatment) => (
          <div key={treatment.id} className="treatment-card">
            <h3>{treatment.name}</h3>
            <p>Duration: {treatment.duration_minutes} minutes</p>
            <p>Price: {treatment.price} €</p>
            <p>{treatment.description}</p>
            <button
              type="button"
              className="book-btn"
              onClick={() => handleBookNow(treatment.name)}
            >
              Book Now
            </button>
          </div>
        ))}
        <button type="button" className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

WaxModal.propTypes = {
    category: PropTypes.string.isRequired, // Ensure `category` is a required string
    title: PropTypes.string.isRequired,    // Ensure `title` is a required string
    onClose: PropTypes.func.isRequired,    // Ensure `onClose` is a required function
  };
  
export default WaxModal;
