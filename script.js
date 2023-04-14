let num1;
let num2;
let operator;
let result;

// All functions round to three decimal places
function add(num1, num2) {
  const result = (num1 + num2);
  if (result % 2 != 0)
    return result.toFixed(3);
  else
    return result;
};

function subtract(num1, num2) {
  const result = (num1 - num2);
  if (result % 2 != 0)
    return result.toFixed(3);
  else
    return result;
};

function multiply(num1, num2) {
  const result = (num1 * num2);
  if (result % 2 != 0)
    return result.toFixed(3);
  else
    return result;
};

function divide(num1, num2) {
  if (num2 === 0)
    return "Divide by zero error";
    
  const result = (num1 / num2);
  if (result % 2 != 0)
    return result.toFixed(3);
  else
    return result;
}

function power(a, b) {
  return Math.pow(a, b);
};

function factorial(num) {
  if (num === 0)
    return 1;

  let result = 1;
  for (let i=num; i > 0; i--) {
    result *= i;
  }
  return result;
};

function operate(num1, operator, num2) {
  switch (operator) {
    case '+': 
      add(num1, num2);
      break;
    case '-':
      subtract(num1, num2);
      break;
    case '*':
      multiply(num1, num2);
      break;
    case '/':
      divide(num1, num2);
      break;
    default:
      return 'Operator Error';
  }
}
