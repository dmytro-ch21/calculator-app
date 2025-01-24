import React from "react";
import { FaBackspace } from "react-icons/fa";

function CalculatorButton({ label, onClick, customStyle = "", bgColor }) {
    return (
        <button className={`btn ${customStyle}`} onClick={onClick}>
          {label === "Back" ? <FaBackspace /> : label}
        </button>
      );
}

export default CalculatorButton;
