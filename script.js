// Globals
let num1 = "";
let num2 = "";
let operator = "";
let result;
let currentOperation = null;
let lastOperation;

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

function createEventListeners() {
  // Numbers and decimal point
  digits.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (readoutLineBot.innerText === "0" || readoutLineBot.innerText.endsWith('ERROR'))
        readoutLineBot.innerText = button.innerText;
      else
        readoutLineBot.innerText = appendNumber(
          button.innerText,
          readoutLineBot.innerText
        );
    });
  });
  decimal.addEventListener(
    "click",
    (event) => (readoutLineBot.innerText = readoutLineBot.innerText.concat("."))
  );

  // Operators
  operators.forEach((button) => {
    button.addEventListener("click", (event) => {
      num1 = readoutLineBot.innerText;
      currentOperation = true;
      operator = button.innerText;
      readoutLineBot.innerText = readoutLineBot.innerText.concat(operator);
    });
  });

  // Negative sign
  negative.addEventListener("click", (event) => {
    // If first button pressed, allow negative
    if (readoutLineBot.innerText === "0") readoutLineBot.innerText = "-";
    // If last item entered was the operator, allow negative
    else if (currentOperation && readoutLineBot.innerText.endsWith(operator))
      readoutLineBot.innerText = readoutLineBot.innerText.concat("-");
  });

  // Clear buttons
  clear.addEventListener("click", clearLine);
  allClear.addEventListener("click", clearAll);

  // Equals button
  equals.addEventListener("click", (event) => {
    let currentReadout = readoutLineBot.innerText;
    let startIndex = currentReadout.indexOf(operator) + 1;
    num2 = currentReadout.slice(startIndex);
    operate(num1, operator, num2);
  });
}

// REFACTOR Takes in a number and string, returns combined string. Need to refactor digits event assignment before removing
function appendNumber(number, numberString) {
  numberString = numberString.concat(number);
  return numberString;
}

// OPERATOR FUNCTIONS //

function clearLine() {
  num1 = "";
  num2 = "";
  operator = "";
  currentOperation = null;
  readoutLineBot.innerText = 0;
}

function clearAll() {
  clearLine();
  readoutLineTop.innerText = '';
}

// All operations round to three decimal places
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
  if (num2 === 0) return "Divide by 0 ERROR";

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

createEventListeners();
