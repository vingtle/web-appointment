import React from "react";
import PropTypes from "prop-types";
import WaxModal from "../WaxModal";

const LadiesPackages = ({ onClose }) => {
  return (
    <WaxModal
      category="ladieswaxpackages"
      title="Ladies Wax Packages"
      onClose={onClose}
    />
  );
};

LadiesPackages.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default LadiesPackages;
