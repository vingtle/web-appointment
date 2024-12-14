import React, { useState } from "react";
import WaxModal from "../../common/modal/WaxModal/WaxModal";
import Photo from "../../../assets/images/waxpage.jpg";
import "./waxing.css";

const Waxing = () => {
  const [activeModal, setActiveModal] = useState(null);

  const handleModalOpen = (category, title) => {
    setActiveModal({ category, title });
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <div
      className="waxing-container"
      style={{
        backgroundImage: `url(${Photo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
      }}
    >
      <h1 className="waxing-title">Waxing</h1>
      <div className="waxing-buttons">
        <button
          type="button"
          onClick={() => handleModalOpen("facewax", "Face Wax Options")}
          className="option-btn"
        >
          Face Wax Options
        </button>
        <button
          type="button"
          onClick={() => handleModalOpen("armwax", "Arm Wax Options")}
          className="option-btn"
        >
          Arm Wax Options
        </button>
        <button
          type="button"
          onClick={() => handleModalOpen("legwax", "Leg Wax Options")}
          className="option-btn"
        >
          Leg Wax Options
        </button>
        <button
          type="button"
          onClick={() =>
            handleModalOpen("upperbodywax", "Upper Body Wax Options")
          }
          className="option-btn"
        >
          Upper Body Wax Options
        </button>
        <button
          type="button"
          onClick={() => handleModalOpen("bikiniwax", "Bikini Wax Options")}
          className="option-btn"
        >
          Bikini Wax Options
        </button>
        <button
          type="button"
          onClick={() => handleModalOpen("packages", "Ladies Wax Packages")}
          className="option-btn"
        >
          Ladies Wax Packages
        </button>
      </div>

      {/* Render Modal Dynamically */}
      {activeModal && (
        <WaxModal
          category={activeModal.category}
          title={activeModal.title}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Waxing;
