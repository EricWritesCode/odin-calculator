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
let readoutLineTop = document.querySelector("#readoutLineTop");
let readoutLineBot = document.querySelector("#readoutLineBot");

function createEventListeners() {
  digits.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (readoutLineBot.innerText === "0")
        readoutLineBot.innerText = button.innerText;
      else
        readoutLineBot.innerText = appendNumber(
          button.innerText,
          readoutLineBot.innerText
        );
    });
  });

  operators.forEach((button) => {
    button.addEventListener("click", (event) => {
      num1 = readoutLineBot.innerText;
      currentOperation = true;
      operator = button.innerText;
      readoutLineBot.innerText = readoutLineBot.innerText.concat(operator);
    });
  });

  decimal.addEventListener("click", (event) => appendNumber("."));
  negative.addEventListener("click", (event) => {
    // If first button pressed, allow negative
    if (readoutLineBot.innerText === "0") readoutLineBot.innerText = "-";
    // If last item entered was the operator, allow negative
    else if (currentOperation && readoutLineBot.innerText.endsWith(operator))
      readoutLineBot.innerText = readoutLineBot.innerText.concat("-");
  });
  clear.addEventListener("click", clearLine);
  allClear.addEventListener("click", clearAll);
}

// REFACTOR Takes in a number and string, returns combined string. Might not need this anymore
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
  // TODO clear all lines
  clearLine();
  console.log("clicked clear all");
}

// All operations round to three decimal places
function add(num1, num2) {
  const result = num1 + num2;
  if (result % 2 != 0) return result.toFixed(3);
  else return result;
}

function subtract(num1, num2) {
  const result = num1 - num2;
  if (result % 2 != 0) return result.toFixed(3);
  else return result;
}

function multiply(num1, num2) {
  const result = num1 * num2;
  if (result % 2 != 0) return result.toFixed(3);
  else return result;
}

function divide(num1, num2) {
  if (num2 === 0) return "Divide by zero error";

  const result = num1 / num2;
  if (result % 2 != 0) return result.toFixed(3);
  else return result;
}

function power(a, b) {
  return Math.pow(a, b);
}

function operate(num1, operator, num2) {
  switch (operator) {
    case "+":
      add(num1, num2);
      break;
    case "-":
      subtract(num1, num2);
      break;
    case "*":
      multiply(num1, num2);
      break;
    case "/":
      divide(num1, num2);
      break;
    default:
      return "Operator Error";
  }
}

createEventListeners();
