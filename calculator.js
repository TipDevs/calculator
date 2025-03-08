//Addition
function add(num1,  num2) {
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
    return num2 !== '0' ? num1 / num2 : 'Error';
}


let firstNumber = '';
let operator = null;
let secondNumber = '';
let digitButton = document.querySelectorAll('.number');
let inputDisplay = document.querySelector('input');
let operatorButton = document.querySelectorAll('.operator');
let dot = document.querySelector('.dot');
let clear = document.querySelector('.clear');
let equal = document.querySelector('.equal')

function operate(num1, num2, operator) {
    switch(operator) {
        case "÷": return division(num1, num2);
        case 'X': return multiply(num1, num2);
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        default: return num2;
    }
}

//function that display the button user clicked
function populateDigit() {
    digitButton.forEach(button =>  {
        button.addEventListener('click', () => {
            if (operator === null) {
                firstNumber += button.textContent;
                inputDisplay.value = firstNumber;
            }
            else {
                secondNumber += button.textContent;
                inputDisplay.value = secondNumber;
            }
        })
    })
    operatorButton.forEach(button => {
        button.addEventListener('click', () => {
            if (firstNumber !== '') {
                operator = button.textContent;
                console.log(operator);
            }
        })
    })
    dot.addEventListener('click', () => {
        if (!firstNumber.includes('.')) {
            firstNumber += dot.textContent;
            inputDisplay.value = firstNumber;
        }
    })
    equal.addEventListener('click', () => {
        if (firstNumber !== '' && secondNumber !== '' && operator !== null) {
            let result = operate(parseFloat(firstNumber),
             parseFloat(secondNumber), operator);
             inputDisplay.value = Math.round(result * 10)/10;
             firstNumber = result.toString();
             secondNumber = '';
             operator = null;
        }
    })
    clear.addEventListener('click', () => {
        firstNumber = "";
        secondNumber = '';
        result = '';
        operator = null;
        inputDisplay.value = 0;
    })
}
populateDigit();
