import React, { useState } from "react";
import "./eyelash.css";
import Haircare from "../../../assets/images/Colorful.jpg";

function Eyelash() {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const treatments = [
    {
      id: 1,
      name: "Eye Lash Extension Nature Look",
      duration: "1h 30 min",
      price: "99 €",
      description:
        "Natural-looking eyelash extensions are soft, subtle, and comfortable, and they enhance your natural lashes.",
    },
    {
      id: 2,
      name: "Eye Lash Extension Russian Volume",
      duration: "1h 30 min",
      price: "120 €",
      description: "Appear fluffier and more voluminous.",
    },
    {
      id: 3,
      name: "Refill (2weeks made)",
      duration: "45 min",
      price: "45 €",
      description:
        "Refills are a way to keep your lashes looking fresh and prevent the shedding effect that occurs naturally.",
    },
    {
      id: 4,
      name: "Refill (3weeks made)",
      duration: "60 min",
      price: "60 €",
      description:
        "Refills are a way to keep your lashes looking fresh and prevent the shedding effect that occurs naturally.",
    },
    {
      id: 5,
      name: "DyBrow",
      duration: "30 min",
      price: "30 €",
      description: "Fill in the gaps for a fuller looking brow.",
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
      className="eyelash"
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
      <h1 className="eyelash-title">Eye Lash Extensions & Lift</h1>
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

export default Eyelash;
