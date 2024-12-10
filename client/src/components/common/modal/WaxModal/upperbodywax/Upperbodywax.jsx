import React from "react";
import PropTypes from "prop-types";
import WaxModal from "../WaxModal";

const UpperBodyWax = ({ onClose }) => {
  return (
    <WaxModal
      category="upperbodywax"
      title="UpperBody Wax Options"
      onClose={onClose}
    />
  );
};

UpperBodyWax.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default UpperBodyWax;
