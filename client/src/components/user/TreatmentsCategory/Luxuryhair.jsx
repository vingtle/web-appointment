import React, { useState } from "react";
import "./luxuryhair.css";
import Haircare from "../../../assets/images/Colorful.jpg";

function LuxuryHair() {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const treatments = [
    {
      id: 1,
      name: "Wellness Shampoo (short hair)",
      duration: "20 min",
      price: "25 €",
      description: "Smooth and strengthen your hair.",
    },
    {
      id: 2,
      name: "Wellness Shampoo (mid-lenght hair)",
      duration: "30 min",
      price: "35 €",
      description: "Restore moisture and shine to dry hair.",
    },
    {
      id: 3,
      name: "Wellness Shampoo (long hair)",
      duration: "45 min",
      price: "50 €",
      description: "Deep cleanse and detox for your scalp.",
    },
    {
      id: 4,
      name: "Wellness Shampoo & Facial Express",
      duration: "45 min",
      price: "60 €",
      description: "Deep cleanse and Restore moisture and shine to dry hair.",
    },
    {
      id: 5,
      name: "Wellness Shampoo & Relax Head Massage",
      duration: "60 min",
      price: "75 €",
      description:
        "a relaxing treatment that focuses on the scalp, and can include a massage, deep conditioning, and aromatherapy.",
    },
  ];

  const handleModalOpen = (treatment) => {
    setModalData(treatment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleBookNow = (treatmentName) => {
    window.location.href = `/booking/${treatmentName.toLowerCase().replace(/\s/g, "-")}`;
  };

  return (
    <div
      className="luxury-hair-treatments"
      style={{
        backgroundImage: `url(${Haircare})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        minHeight: "100vh",
        padding: "50px",
        color: "#fff",
      }}
    >
      <h1 className="luxury-hair-treatments-title">Luxury Hair Treatments</h1>
      <div className="treatment-grid">
        {treatments.map((treatment) => (
          <div key={treatment.id} className="treatment-card">
            <h3>{treatment.name}</h3>
            <p>Duration: {treatment.duration}</p>
            <button
              className="info-btn"
              type="button"
              onClick={() => handleModalOpen(treatment)}
            >
              See Info
            </button>
            <p className="price">{treatment.price}</p>
            <button
              className="book-btn"
              type="button"
              onClick={() => handleBookNow(treatment.name)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalData.name}</h3>
            <p>{modalData.description}</p>
            <p>Duration: {modalData.duration}</p>
            <p>Price: {modalData.price}</p>
            <button type="button" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LuxuryHair;
