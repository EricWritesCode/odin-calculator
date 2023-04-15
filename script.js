// Globals
let num1 = '';
let num2 = '';
let operator;
let result;
let currentOperation = null;

// DOM elements
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let decimal = document.querySelector(".decimal");
let negative = document.querySelector(".negative");
let readoutLineTop = document.querySelector("#readoutLineTop");
let readoutLineBot = document.querySelector("#readoutLineBot");


function createEventListeners() {
  digits.forEach( button => {
    button.addEventListener("click", (event) => {
      appendNumber(button.innerText);
    });
  });

  operators.forEach( button => {
    button.addEventListener("click", (event) => {
      console.log(`clicked ${button.innerText}`);
    });
  });

  decimal.addEventListener("click", decimate);
  negative.addEventListener("click", negate);
}

function appendNumber(number) {
  if (readoutLineBot.innerText === '0')
    readoutLineBot.innerText = number;
  else
    readoutLineBot.innerText = readoutLineBot.innerText.concat(number);
}

// OPERATOR FUNCTIONS //

function negate() {
  // TODO negate subsequent number
  console.log("clicked negative");
}

function decimate() {
  // TODO add subsequent numbers as decimal
  console.log("clicked decimal");
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

function factorial(num) {
  if (num === 0) return 1;

  let result = 1;
  for (let i = num; i > 0; i--) {
    result *= i;
  }
  return result;
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