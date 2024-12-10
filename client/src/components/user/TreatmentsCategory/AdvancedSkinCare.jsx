import React, { useState } from "react";
import "./advancedskincare.css";
import Skincare from "../../../assets/images/Skincare.jpg";

const AdvancedSkinCare = () => {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const treatments = [
    {
      id: 1,
      name: "Skin Cleansing Care",
      duration: "15 min",
      price: "15 €",
      description: "A deep cleansing treatment to rejuvenate your skin.",
    },
    {
      id: 2,
      name: "Eyes Contour Care",
      duration: "20 min",
      price: "25 €",
      description:
        "A targeted treatment for reducing puffiness and dark circles.",
    },
    {
      id: 3,
      name: "Express Facial",
      duration: "30 min",
      price: "35 €",
      description: "Quick and refreshing facial for a glowing complexion.",
    },
    {
      id: 4,
      name: "Regenerating Treatment",
      duration: "60 min",
      price: "60 €",
      description: "A luxurious treatment for cell regeneration and hydration.",
    },
    {
      id: 5,
      name: "Peeling Treatment",
      duration: "60 min",
      price: "65 €",
      description: "Exfoliation treatment for smoother, radiant skin.",
    },
    {
      id: 6,
      name: "Anti-aging Treatment",
      duration: "1h 15 min",
      price: "75 €",
      description: "Reduces wrinkles and improves skin elasticity.",
    },
    {
      id: 7,
      name: "Personalised Facial Treatment",
      duration: "1h 30 min",
      price: "110 €",
      description: "Customised treatment tailored to your skin needs.",
    },
    {
      id: 8,
      name: "Ultra Essence Serum",
      duration: "5 min",
      price: "10 €",
      description: "Intense hydration with concentrated active ingredients.",
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
      className="advanced-skin-care"
      style={{
        backgroundImage: `url(${Skincare})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      <h1 className="advanced-skin-care">Advanced Skin Care</h1>
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
};

export default AdvancedSkinCare;
