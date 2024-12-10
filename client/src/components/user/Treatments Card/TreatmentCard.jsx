import React from "react";
import { useParams } from "react-router-dom";
import AdvancedSkinCare from "../TreatmentsCategory/AdvancedSkinCare";
import LuxuryHair from "../TreatmentsCategory/Luxuryhair";
import Massages from "../TreatmentsCategory/Massages";
import Waxing from "../TreatmentsCategory/Waxing";
import ManicuresPedicures from "../TreatmentsCategory/ManicuresPedicures";
import Eyelash from "../TreatmentsCategory/Eyelash";

const TreatmentCard = () => {
  const { treatmentCategory } = useParams();

  const renderCard = () => {
    switch (treatmentCategory) {
      case "advanced-skin-care":
        return <AdvancedSkinCare />;
      case "waxing":
        return <Waxing />;
      case "hair-scalp-care": // Corrected spelling
        return <LuxuryHair />;
      case "massages":
        return <Massages />;
      case "manicures-pedicures":
        return <ManicuresPedicures />;
      case "eyelash-extensions-lifts": // Ensure consistency with `Home.jsx`
        return <Eyelash />;
      default:
        return <div>Unknown Treatment</div>; // Enhanced default case
    }
  };
  return <div id="treatment-card">{renderCard()}</div>;
};

export default TreatmentCard;
