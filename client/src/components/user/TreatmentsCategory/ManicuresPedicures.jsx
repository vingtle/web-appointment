import React, { useState, useEffect } from "react";
import "./manicurespedicures.css";

function ManicuresPedicures() {
  const [treatments, setTreatments] = useState([]);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch(
          "/api/treatments?category=manicures-pedicures"
        );
        const data = await response.json();
        setTreatments(data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchTreatments();
  }, []);

  const handleBookNow = (treatmentName) => {
    window.location.href = `/booking/${treatmentName}`;
  };

  return (
    <div>
      <h1>Manicures & Pedicures</h1>
      <div className="treatment-list">
        {treatments.map((treatment) => (
          <div key={treatment.id} className="treatment-card">
            <h3>{treatment.name}</h3>
            <p>Duration: {treatment.duration_minutes} minutes</p>
            <p>Price: {treatment.price} €</p>
            <button onClick={() => handleBookNow(treatment.name)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManicuresPedicures;
