const calculationDisplay = document.querySelector('.calculation');
const resultDisplay = document.querySelector('.answer');

let currentNumber = "";
let previousNumber = "";
let operation = "";

const buttons = document.querySelectorAll('.key');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;

    if (isNaN(buttonValue)) {
      handleOperation(buttonValue);
    } else {
      appendNumber(buttonValue);
    }
    updateDisplay();
  });
});

function appendNumber(number) {
  currentNumber += number;
}

function handleOperation(operator) {
  switch (operator) {
    case "AC":
      currentNumber = "";
      previousNumber = "";
      operation = "";
      break;
    case "X":
      currentNumber = currentNumber.slice(0, -1); // Backspace
      break;
    case "=":
      calculate();
      break;
    default:
      if (currentNumber !== "") {
        previousNumber = currentNumber;
        currentNumber = "";
        operation = operator;
      }
  }
}

function calculate() {
  if (previousNumber === "" || currentNumber === "" || operation === "") {
    return;
  }
  let result;
  const prevNum = parseFloat(previousNumber);
  const currNum = parseFloat(currentNumber);

  switch (operation) {
    case "+":
      result = prevNum + currNum;
      break;
    case "-":
      result = prevNum - currNum;
      break;
    case "*":
      result = prevNum * currNum;
      break;
    case "/":
      if (currNum === 0) {
        result = "Error: Division by zero";
      } else {
        result = prevNum / currNum;
      }
      break;
  }
  currentNumber = result.toString();
  operation = "";
  previousNumber = "";
}

function updateDisplay() {
  calculationDisplay.textContent = previousNumber + operation + currentNumber;
  resultDisplay.textContent = currentNumber;
}
