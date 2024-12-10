/*import React, { useState } from "react";
import FaceWax from "../../common/modal/facewax/FaceWax";
import ArmWax from "../../common/modal/armwax/Armwax";
import LegWax from "../../common/modal/legwax/Legwax";
import UpperBodyWax from "../../common/modal/upperbodywax/Upperbodywax";
import BikiniWax from "../../common/modal/bikiniwax/Bikiniwax";
import LadiesPackages from "../../common/modal/ladiespackages/LadiesPackage";
import Photo from "../../../assets/images/waxpage.jpg";
import "./waxing.css";

function Waxing() {
  const [activeModal, setActiveModal] = useState(null); // To track which modal is open

  const handleModalOpen = (modalName) => {
    setActiveModal(modalName); // Open the modal based on the button clicked
  };

  const handleModalClose = () => {
    setActiveModal(null); // Close the modal
  };

  const handleBookNow = (packageItem) => {
    window.location.href = `/booking/${packageItem.toLowerCase().replace(/\s/g, "-")}`;
  };

  return (
    <div className="waxing-container"
        style={{
        backgroundImage: `url(${Photo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "20px",
        color: "#fff",
    }}>
      <h1 className="waxing-title">Waxing</h1>
      <div className="waxing-buttons">
        <button
          type="button"
          onClick={() => handleModalOpen("FaceWax")}
          className="option-btn"
        >
          Face Wax Options
        </button>
        <button
          type="button"
          onClick={() => handleModalOpen("ArmWax")}
          className="option-btn"
        >
          Arm Wax Options
        </button>
        <button
          type="button"
          onClick={() => handleModalOpen("LegWax")}
          className="option-btn"
        >
          Leg Wax Options
        </button>
        <button
          type="button"
          onClick={() => handleModalOpen("UpperBodyWax")}
          className="option-btn"
        >
          Upper Body Wax Options
        </button>
        <button
          type="button"
          onClick={() => handleModalOpen("BikiniWax")}
          className="option-btn"
        >
          Bikini Wax Options
        </button>
        <button 
        type="button"
        onClick={() => handleModalOpen("Ladies Wax Packages")}
        className="option-btn"
        >
        Ladies Wax Packages  
        </button>
      </div>

      {activeModal === "FaceWax" && <FaceWax onClose={handleModalClose} />}
      {activeModal === "ArmWax" && <ArmWax onClose={handleModalClose} />}
      {activeModal === "LegWax" && <LegWax onClose={handleModalClose} />}
      {activeModal === "UpperBodyWax" && (
        <UpperBodyWax onClose={handleModalClose} />
      )}
      {activeModal === "BikiniWax" && <BikiniWax onClose={handleModalClose} />}
      {activeModal === "Ladies Wax Pacakges" && <LadiesPackages onClose={handleModalClose} />}
    </div>
  );
}

export default Waxing; 


import React, { useState, useEffect } from "react";
import FaceWax from "../../common/modal/WaxModal/facewax/FaceWax";
import ArmWax from "../../common/modal/WaxModal/armwax/Armwax";
import LegWax from "../../common/modal/WaxModal/legwax/Legwax";
import UpperBodyWax from "../../common/modal/WaxModal/upperbodywax/Upperbodywax";
import BikiniWax from "../../common/modal/WaxModal/bikiniwax/Bikiniwax";
import LadiesPackages from "../../common/modal/WaxModal/ladiespackages/LadiesPackage";
import "./waxing.css";

function Waxing() {
  const [activeModal, setActiveModal] = useState(null); // Track which modal is open
  const [treatments, setTreatments] = useState([]); // Store treatments dynamically
  const modals = {
    "Face Wax": <FaceWax onClose={() => setActiveModal(null)} />,
    "Arm Wax": <ArmWax onClose={() => setActiveModal(null)} />,
    "Leg Wax": <LegWax onClose={() => setActiveModal(null)} />,
    "Upper Body Wax": <UpperBodyWax onClose={() => setActiveModal(null)} />,
    "Bikini Wax": <BikiniWax onClose={() => setActiveModal(null)} />,
    "Ladies Wax Packages": (
      <LadiesPackages onClose={() => setActiveModal(null)} />
    ),
  };

  // Fetch treatments from the API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch("/api/treatments?category=wax");
        const data = await response.json();
        setTreatments(data);
        console.log("fetched treatments", data);
      } catch (error) {
        console.error("Failed to fetch treatments:", error);
      }
    };

    fetchTreatments();
  }, []);

  const handleModalOpen = (name) => {
    setActiveModal(name); // Set the active modal name
  };

  return (
    <div className="waxing-container">
      <h1 className="waxing-title">Waxing</h1>
      <div className="waxing-buttons">
        {treatments.map((treatment) => (
          <button
            key={treatment.id} // Ensure each button has a unique key
            type="button"
            onClick={() => handleModalOpen(treatment.name)} // Open the corresponding modal
            className="option-btn"
          >
            {treatment.name} Options
          </button>
        ))}
      </div>

      {activeModal && modals[activeModal]}
    </div>
  );
}

export default Waxing; */

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
