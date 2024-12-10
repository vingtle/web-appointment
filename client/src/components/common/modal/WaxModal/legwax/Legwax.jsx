import React from "react";
import PropTypes from "prop-types";
import WaxModal from "../WaxModal";

const LegWax = ({ onClose }) => {
  return (
    <WaxModal category="legwax" title="Leg Wax Options" onClose={onClose} />
  );
};
LegWax.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default LegWax;
