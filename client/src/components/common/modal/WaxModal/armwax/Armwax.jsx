import React from "react";
import PropTypes from "prop-types";
import WaxModal from "../WaxModal"; // Import the reusable WaxModal component

const Armwax = ({ onClose }) => {
  return (
    <WaxModal
      category="armwax" // Pass the category for API filtering
      title="Arm Wax Options" // The title of the modal
      onClose={onClose} // Close handler for the modal
    />
  );
};
Armwax.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Armwax;
