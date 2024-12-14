import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./waxmodal.css";

const WaxModal = ({ category, title, onClose }) => {
  const [treatments, setTreatments] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No authentication token found!");
    navigate("/loginpage");
    return;
  }
    const fetchTreatments = async () => {
      try {
        const response = await fetch(`/api/treatments?category=${category}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error("Unauthorized! Redirecting to login.");
            navigate("/loginpage");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        setTreatments(data);
      } catch (error) {
        console.error(
          `Failed to fetch treatments for category ${category}:`,
          error
        );
      }
    };

    fetchTreatments();
  }, [category, navigate]);

  const handleBookNow = (treatmentName) => {
    navigate(`/booking/${treatmentName.toLowerCase().replace(/\s/g, "-")}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {treatments.length > 0 ? (
          treatments.map((treatment) => (
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
          ))
        ) : (
          <p>No treatments available for the selected category.</p>
        )}
        <button type="button" className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

WaxModal.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WaxModal;
