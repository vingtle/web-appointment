import React from "react";
import { useParams } from "react-router-dom";
import AdvancedSkinCare from "../TreatmentsCategory/AdvancedSkinCare";
import LuxuryHair from "../TreatmentsCategory/Luxuryhair";
import Massages from "../TreatmentsCategory/Massages";
import Waxing from "../TreatmentsCategory/Waxing";
import ManicuresPedicures from "../TreatmentsCategory/ManicuresPedicures";
import Eyelash from "../TreatmentsCategory/Eyelash";
import "./treatmentscard.css";

const TreatmentsCard = () => {
  const { treatmentCategory } = useParams();
  console.log("Treatment Category from URL:", treatmentCategory);


  const renderCard = () => {
  if (!treatmentCategory) {
    return <div>Please select a valid treatment category.</div>;
  }
  switch (treatmentCategory) {
    case "advanced-skin-care":
      return <AdvancedSkinCare />;
    case "waxing":
      return <Waxing />;
    case "hair-scalp-care":
      return <LuxuryHair />;
    case "massages":
      return <Massages />;
    case "manicures-pedicures":
      return <ManicuresPedicures />;
    case "eyelash-extensions-lifts":
      return <Eyelash />;
    default:
      return <div>Unknown Treatment</div>;
  }
};

  return <div id="treatment-card-container">{renderCard()}</div>;
};

export default TreatmentsCard;
