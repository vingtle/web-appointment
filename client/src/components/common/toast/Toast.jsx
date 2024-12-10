import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaCircleCheck,
  FaUserAltSlash,
  FaLock,
  FaHeart,
  FaHeartBroken,
} from "react-icons/fa";
import { MdError, MdEmail, MdOutlineCalendarToday } from "react-icons/md";
import { IoIosWarning, IoIosAlarm, IoLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi";
import "./toast.css";

const ToastTypes = {
  success: { icon: <FaCircleCheck /> },
  error: { icon: <MdError /> },
  warning: { icon: <IoIosWarning /> },
  updated: { icon: <MdOutlineCalendarToday /> },
  alert: { icon: <IoIosAlarm /> },
  remind: { icon: <HiOutlineBell /> },
  maintenance: { icon: <FaUserAltSlash /> },
  timeout: { icon: <IoLogOut /> },
  like: { icon: <FaHeart /> },
  dislike: { icon: <FaHeartBroken /> },
  verify: { icon: <MdEmail /> },
  locked: { icon: <FaLock /> },
};

function Toast({ id, type, message, timer, bg, col, logoColor, removeToast }) {
  const [isClosed, setIsClosed] = useState(true);

  useEffect(() => {
    setIsClosed(false);
    const timeout = setTimeout(() => {
      setIsClosed(true);
      removeToast(id);
    }, timer);

    return () => clearTimeout(timeout);
  }, [id, timer, removeToast]);

  const toastType = ToastTypes[type];
  const icon = toastType?.icon || <IoIosWarning />;
  const defaultMessage = toastType?.defaultMessage || "Notification";
  const displayMessage = message || defaultMessage;
  const background = bg || "black";
  const color = col || "white";
  const logoCol = logoColor || col;

  if (isClosed) return null;

  return (
    <div id="Toast" className={type} style={{ background, color }}>
      <div className="toast-container">
        <span className="toast-icon" style={{ color: logoCol }}>
          {icon}
        </span>
        <p>{displayMessage}</p>
      </div>
      <IoClose
        onClick={() => {
          setIsClosed(true);
          removeToast(id);
        }}
        className="close-btn"
      />
    </div>
  );
}

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
  timer: PropTypes.number,
  bg: PropTypes.string,
  col: PropTypes.string,
  logoColor: PropTypes.string,
  removeToast: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  timer: 6000,
  bg: "black",
  col: "white",
  logoColor: "white",
  message: "Notification",
};

export default Toast;
