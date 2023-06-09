// Globals
let num1 = "";
let num2 = "";
let operator = "";
let result;
let currentOperation = null;
let lastOperation;
let decimalDisabled = false;

// DOM elements
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let decimal = document.querySelector(".decimal");
let negative = document.querySelector(".negative");
let clear = document.querySelector(".clear");
let allClear = document.querySelector(".all-clear");
let equals = document.querySelector(".equals");

let readoutLineTop = document.querySelector("#readoutLineTop");
let readoutLineBot = document.querySelector("#readoutLineBot");
let errorReadout = document.querySelector("#errorReadout");

// EVENT HANDLERS //

function createEventListeners() {
  digits.forEach((button) => {
    button.addEventListener("click", (event) => {
      addDigit(button.innerText);
    });
  });

  decimal.addEventListener("click", (event) => {
    if (!decimalDisabled) {
      readoutLineBot.innerText = readoutLineBot.innerText.concat(".");
      disableDecimal();
    }
  });

  operators.forEach((button) => {
    button.addEventListener("click", (event) => {
      clearError();
      addOperator(button.innerText);
    });
  });

  negative.addEventListener("click", (event) => {
    // If first button pressed, allow negative
    if (readoutLineBot.innerText === "0") readoutLineBot.innerText = "-";
    // If last item entered was the operator, allow negative
    else if (
      currentOperation &&
      readoutLineBot.innerText.endsWith(operator) &&
      !readoutLineBot.innerText.endsWith("--")
    )
      readoutLineBot.innerText = readoutLineBot.innerText.concat("-");
  });

  clear.addEventListener("click", clearLine);
  allClear.addEventListener("click", clearAll);

  equals.addEventListener("click", (event) => {
    if (!readoutLineBot.innerText.endsWith("-")) evaluate();
    else errorReadout.innerText = "Syntax error: Empty negative";
  });

  // Keyboard support
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key >= 0 && key <= 9) addDigit(key);

    if (key === ".") {
      if (!decimalDisabled) {
        readoutLineBot.innerText = readoutLineBot.innerText.concat(".");
        disableDecimal();
      }
    }

    if (key === "+" || key === "-") addOperator(key);
    if (key === "*") addOperator("×");
    if (key === "/") addOperator("÷");

    if (key === "=" || key === "Enter") {
      if (!readoutLineBot.innerText.endsWith("-")) evaluate();
      else errorReadout.innerText = "Syntax error: Empty negative";
    }

    if (key === "Backspace") deleteLast();
    if (key === "Delete") clearAll();
  });
}

// CALCULATOR FUNCTIONS //

function clearLine() {
  clearError();
  num1 = "";
  num2 = "";
  operator = "";
  currentOperation = null;
  readoutLineBot.innerText = 0;
  enableDecimal();
}

function clearAll() {
  clearLine();
  readoutLineTop.innerText = "";
}

function clearError() {
  errorReadout.innerText = "";
}

function deleteLast() {
  let finalCharacter = readoutLineBot.innerText.charAt(
    readoutLineBot.innerText.length - 1
  );
  let trimmedString = readoutLineBot.innerText.substring(
    0,
    readoutLineBot.innerText.length - 1
  );

  // checks whether it's deleting an operator
  if (
    finalCharacter === "-" ||
    finalCharacter === "+" ||
    finalCharacter === "÷" ||
    finalCharacter === "×"
  ) {
    num1 = "";
    operator = "";
    currentOperation = null;
  }

  readoutLineBot.innerText = trimmedString;
}

function enableDecimal() {
  decimalDisabled = false;
  decimal.style.setProperty("color", "#020617");
}

function disableDecimal() {
  decimalDisabled = true;
  decimal.style.setProperty("color", "#9ca3af");
}

function addDigit(digitInput) {
  clearError();
  if (
    readoutLineBot.innerText === "0" ||
    readoutLineBot.innerText.endsWith("ERROR") ||
    readoutLineBot.innerText === "NaN"
  )
    readoutLineBot.innerText = digitInput;
  else readoutLineBot.innerText = readoutLineBot.innerText.concat(digitInput);
}

function addOperator(operatorInput) {
  let currentReadout = readoutLineBot.innerText;

  if (
    currentReadout.endsWith("-") ||
    currentReadout.endsWith("+") ||
    currentReadout.endsWith("÷") ||
    currentReadout.endsWith("×")
  ) {
    errorReadout.innerText = "Syntax error";
  } else if (!currentOperation && operator === "") {
    num1 = currentReadout;
    currentOperation = true;
    operator = operatorInput;
    readoutLineBot.innerText = readoutLineBot.innerText.concat(operator);
    enableDecimal();
  } else if (currentReadout === "NaN") {
    // Clear the line if the previous operation returned null somehow
    clearLine();
  } else {
    evaluate();
    num1 = readoutLineBot.innerText;
    currentOperation = true;
    operator = operatorInput;
    readoutLineBot.innerText = readoutLineBot.innerText.concat(operator);
    enableDecimal();
  }
}

// All float operations round to three decimal places
function add(num1, num2) {
  const result = parseFloat(num1) + parseFloat(num2);
  if (!Number.isInteger(result)) return result.toFixed(3);
  else return result;
}

function subtract(num1, num2) {
  const result = parseFloat(num1) - parseFloat(num2);
  if (!Number.isInteger(result)) return result.toFixed(3);
  else return result;
}

function multiply(num1, num2) {
  const result = parseFloat(num1) * parseFloat(num2);
  if (!Number.isInteger(result)) return result.toFixed(3);
  else return result;
}

function divide(num1, num2) {
  if (num2 === "0") return "Divide by 0 ERROR";
  const result = parseFloat(num1) / parseFloat(num2);
  if (!Number.isInteger(result)) return result.toFixed(3);
  else return result;
}

function operate(num1, operator, num2) {
  switch (operator) {
    case "+":
      readoutLineTop.innerText = readoutLineBot.innerText;
      readoutLineBot.innerText = add(num1, num2);
      break;
    case "-":
      readoutLineTop.innerText = readoutLineBot.innerText;
      readoutLineBot.innerText = subtract(num1, num2);
      break;
    case "×":
      readoutLineTop.innerText = readoutLineBot.innerText;
      readoutLineBot.innerText = multiply(num1, num2);
      break;
    case "÷":
      readoutLineTop.innerText = readoutLineBot.innerText;
      readoutLineBot.innerText = divide(num1, num2);
      break;
    default:
      readoutLineTop.innerText = readoutLineBot.innerText;
      readoutLineBot.innerText = "Operator ERROR";
  }
}

function evaluate() {
  let currentReadout = readoutLineBot.innerText;
  let startIndex = currentReadout.indexOf(operator) + 1;
  num2 = currentReadout.slice(startIndex);

  if (operator === "" && currentOperation === null) {
    readoutLineTop.innerText = readoutLineBot.innerText;
    readoutLineBot.innerText = readoutLineTop.innerText;
  } else if (num2 === "") {
    errorReadout.innerText = "Error: Incomplete operation";
    return;
  } else {
    operate(num1, operator, num2);
    enableDecimal();
  }

  operator = "";
  currentOperation = null;
}

createEventListeners();
