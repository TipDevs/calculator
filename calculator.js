//Addition
function add(num1, num2) {
  return num1 + num2;
}
//Subtraction
function subtract(num1, num2) {
  return num1 - num2;
}
//Multiplication
function multiply(num1, num2) {
  return num1 * num2;
}
//Division
function division(num1, num2) {
  return num2 !== "0" ? num1 / num2 : "Error";
}
// Remainder
function getRemainder(num1, num2) {
  return num2 !== 0 ? num1 % num2 : "Error";
}

//Global variables declaration and initialization
let firstNumber = "";
let operator = null;
let initialOperator = null;
let nextOperator = null;
let secondNumber = "";
let digitButton = document.querySelectorAll(".number");
let inputDisplay = document.querySelector("input");
let operatorButton = document.querySelectorAll(".operator");
let dot = document.querySelector(".dot");
let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let result = null;

// Function that does calculations base on the operator passed in.
function operate(num1, num2, operator) {
  switch (operator) {
    case "÷":
      return division(num1, num2);
    case "X":
      return multiply(num1, num2);
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "%":
      return getRemainder(num1, num2);
    default:
      return num2;
  }
}

/*function that display the button user clicked
 without displaying the operator button and also
  display the result of every calculations*/
function populateDigit() {
  // Button clicked to get the digit displayed on the screen.
  digitButton.forEach((button) => {
    button.addEventListener("click", () => {
      operatorButton.forEach((button) => {
        button.classList.remove("active_operator");
      });
      if (operator === null) {
        // add flash effect to the digit buttons
        button.classList.add("flash-effect");

        setTimeout(() => {
          button.classList.remove("flash-effect");
        }, 300);
        firstNumber += button.textContent;
        console.log(`firstNumber: ${firstNumber}`);
        inputDisplay.value = firstNumber;
      } else {
        // add flash effect to the digit buttons
        button.classList.add("flash-effect");

        setTimeout(() => {
          button.classList.remove("flash-effect");
        }, 300);
        secondNumber += button.textContent;
        console.log(`secondNumber: ${secondNumber}`);
        inputDisplay.value = secondNumber;
      }
    });
  });

  // Button clicked to determine the operator button to pass in for calculation.
  operatorButton.forEach((button) => {
    button.addEventListener("click", () => {
      operator = button.textContent;
      if (firstNumber !== "" && secondNumber === "") {
        operatorButton.forEach((btn) => {
          btn.classList.remove("active_operator");
          initialOperator = operator;
        });

        console.log("initialOperator: " + initialOperator);
        button.classList.add("active_operator");
      } else if (
        /* Other option to evaluate the result for complex calculation
             if their is an expression already but 
             the user click another operator instead of equal*/
        secondNumber !== "" &&
        firstNumber !== "" &&
        initialOperator !== null
      ) {
        button.classList.add("active_operator");
        nextOperator = operator;
        console.log("nextOperator: " + nextOperator);
        result = operate(
          parseFloat(firstNumber),
          parseFloat(secondNumber),
          initialOperator
        );
        inputDisplay.value = Math.round(result * 1000) / 1000;
        firstNumber = result.toString();
        initialOperator = nextOperator;
        secondNumber = "";
      }
    });
  });

  // Button clicked to show decimal point after the number for decimal calculation
  dot.addEventListener("click", () => {
    if (initialOperator === null && operator === null) {
      if (!firstNumber.includes(".") && firstNumber === "") {
        firstNumber = "0";
        firstNumber += dot.textContent;
        inputDisplay.value = firstNumber;
      } else if (!firstNumber.includes(".") && firstNumber !== "") {
        firstNumber += dot.textContent;
        inputDisplay.value = firstNumber;
      }
    } else if (initialOperator !== null || nextOperator !== null) {
      if (!secondNumber.includes(".") && secondNumber === "") {
        secondNumber = "0";
        secondNumber += dot.textContent;
        console.log(secondNumber);
      } else if (!secondNumber.includes(".") && secondNumber !== "") {
        secondNumber += dot.textContent;
      }
      inputDisplay.value = secondNumber;
    }
  });

  // Button clicked to evaluate the result of the expression e.g 2 + 3 = 5
  equal.addEventListener("click", () => {
    if (firstNumber !== "" && secondNumber !== "" && operator !== null) {
      result = operate(
        parseFloat(firstNumber),
        parseFloat(secondNumber),
        operator
      );
      console.log(result);
      inputDisplay.value = Math.round(result * 1000) / 1000;
      firstNumber = result.toString();
      secondNumber = "";
      operator = null;

      //  add flash effect to equal button

      equal.classList.add("flash-effect");

      setTimeout(() => {
        equal.classList.remove("flash-effect");
      }, 300);
    }
  });

  // Button clicked for clearing all expression to allow the user to start a new calculation.
  clear.addEventListener("click", () => {
    operatorButton.forEach((button) => {
      button.classList.remove("active_operator");
    });
    firstNumber = "";
    secondNumber = "";
    result = "";
    operator = null;
    inputDisplay.value = 0;
  });
}
populateDigit();
