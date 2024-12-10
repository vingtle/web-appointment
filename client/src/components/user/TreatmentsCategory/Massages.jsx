import React, { useState } from "react";
import "./massages.css";
import Haircare from "../../../assets/images/Colorful.jpg";

function Massages() {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const treatments = [
    {
      id: 1,
      name: "Hand & Arm Massage",
      duration: "30 min",
      price: "35 €",
      description:
        "increase range of movement by decreasing muscle tightness and reducing restriction.",
    },
    {
      id: 2,
      name: "Leg Massage",
      duration: "30 min",
      price: "35 €",
      description: "This treatment help relieve stress and reduce tension.",
    },
    {
      id: 3,
      name: "Oriental Head Massage",
      duration: "35 min",
      price: "40 €",
      description:
        "A head massage helps soothe muscle tension across the hairline, behind the ears, and in the neck.",
    },
    {
      id: 4,
      name: "Body Massage (with Essential oils)",
      duration: "60 min",
      price: "60 €",
      description:
        "This treatment to ensure that muscles are lengthened and tension is removed.",
    },
    {
      id: 5,
      name: "Aromatouch Technique",
      duration: "60 min",
      price: "75 €",
      description:
        "A relaxing treatment that focuses on the scalp, and can include a massage, deep conditioning, and aromatherapy.",
    },
    {
      id: 6,
      name: "Body Scrub",
      duration: "45 min",
      price: "45 €",
      description:
        "Improve circulation, help prevent ingrown hairs, reduce the appearance of cellulite, unclog pores.",
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
      className="massage-treatments"
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
      <h1 className="massage-treatments-title">Massage</h1>
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

export default Massages;
