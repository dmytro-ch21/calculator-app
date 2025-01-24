import React, { useState } from "react";
import CalculatorButton from "./components/CalculatorButton.jsx";
import OperationHistory from "./components/OperationHistory.jsx";

function App() {
  // State
  const [prevValue, setPrevValue] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [operator, setOperator] = useState("");
  const [operationInProgress, setOperationInProgress] = useState(false);
  const [lastOperation, setLastOperation] = useState("");
  const [history, setHistory] = useState([]);


  const handleChangeValue = (e) => {
    const value = e.target.value;
    const validNumberRegex = /^\d*\.?\d*$/;
    if (value === "" || validNumberRegex.test(value)) {
      setCurrentValue(value);
    }
  };

  const handleNumberClick = (num) => {
    if (operationInProgress && currentValue === prevValue) {
      setCurrentValue(num);
    } else if (currentValue === "0") {
      setCurrentValue(num);
    } else {
      setCurrentValue((prev) => prev + num);
    }
  };

  const handleDecimalClick = () => {
    if (!currentValue.includes(".")) {
      setCurrentValue((prev) => (prev === "" ? "0." : prev + "."));
    }
  };

  const handleClear = () => {
    setPrevValue("");
    setCurrentValue("");
    setOperator("");
    setOperationInProgress(false);
    setLastOperation("");
  };

  const handleSignChange = () => {
    if (currentValue) {
      setCurrentValue(String(parseFloat(currentValue) * -1));
    }
  };

  const handleBackspace = () => {
    if (currentValue) {
      setCurrentValue((prev) => prev.slice(0, -1));
    }
  };

  const chooseOperator = (op) => {
    if (!prevValue) {
      setPrevValue(currentValue);
      setOperator(op);
      setOperationInProgress(true);
      setLastOperation("");
      return;
    }

    if (operationInProgress && (currentValue === prevValue || currentValue === "")) {
      setOperator(op);
      return;
    }

    const firstNum = parseFloat(prevValue);
    const secondNum = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = firstNum + secondNum;
        break;
      case "-":
        result = firstNum - secondNum;
        break;
      case "x":
        result = firstNum * secondNum;
        break;
      case "/":
        if (secondNum === 0) {
          alert("Cannot divide by zero");
          return;
        }
        result = firstNum / secondNum;
        break;
      default:
        result = secondNum;
        break;
    }

    setPrevValue(String(result));
    setCurrentValue(String(result));
    setOperator(op);
    setOperationInProgress(true);
    setLastOperation("");
  };

  const calculateResult = () => {
    if (!prevValue || !currentValue || !operator) return;

    const firstNum = parseFloat(prevValue);
    const secondNum = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = firstNum + secondNum;
        break;
      case "-":
        result = firstNum - secondNum;
        break;
      case "x":
        result = firstNum * secondNum;
        break;
      case "/":
        if (secondNum === 0) {
          alert("Cannot divide by zero");
          return;
        }
        result = firstNum / secondNum;
        break;
      default:
        return;
    }

    const operationString = `${prevValue} ${operator} ${currentValue}`;
    setLastOperation(operationString);

    setHistory((old) => [...old, `${operationString} = ${result}`]);

    setCurrentValue(String(result));
    setPrevValue("");
    setOperator("");
    setOperationInProgress(false);
  };

  let topDisplay = operationInProgress && operator ? operator : lastOperation;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <div className="calculator">
            <div className="display">
              <div className="top-display">{topDisplay}</div>
              <input
                type="text"
                className="form-control"
                placeholder="0"
                value={currentValue}
                onChange={handleChangeValue}
              />
            </div>

            <div className="calculator-buttons row g-2">
              <div className="col-3">
                <CalculatorButton label="C" onClick={handleClear} customStyle="bg-secondary text-dark" />
              </div>
              <div className="col-3">
                <CalculatorButton label="+/-" onClick={handleSignChange} customStyle="bg-secondary text-dark" />
              </div>
              <div className="col-3">
                <CalculatorButton label="Back" onClick={handleBackspace} customStyle="bg-secondary text-dark" />
              </div>
              <div className="col-3">
                <CalculatorButton label="÷" onClick={() => chooseOperator("/")} customStyle="operator-btn" />
              </div>
              <div className="col-3">
                <CalculatorButton label="7" onClick={() => handleNumberClick("7")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="8" onClick={() => handleNumberClick("8")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="9" onClick={() => handleNumberClick("9")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="x" onClick={() => chooseOperator("x")} customStyle="operator-btn" />
              </div>
              <div className="col-3">
                <CalculatorButton label="4" onClick={() => handleNumberClick("4")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="5" onClick={() => handleNumberClick("5")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="6" onClick={() => handleNumberClick("6")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="-" onClick={() => chooseOperator("-")} customStyle="operator-btn" />
              </div>
              <div className="col-3">
                <CalculatorButton label="1" onClick={() => handleNumberClick("1")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="2" onClick={() => handleNumberClick("2")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="3" onClick={() => handleNumberClick("3")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="+" onClick={() => chooseOperator("+")} customStyle="operator-btn" />
              </div>
              <div className="col-6">
                <CalculatorButton label="0" onClick={() => handleNumberClick("0")} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="." onClick={handleDecimalClick} customStyle="bg-dark text-light" />
              </div>
              <div className="col-3">
                <CalculatorButton label="=" onClick={calculateResult} customStyle="operator-btn" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <OperationHistory history={history} />
        </div>
      </div>
    </div>
  );
}

export default App;
