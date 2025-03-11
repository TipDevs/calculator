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
// Remainder
function getRemainder(num1, num2) {
    return num2 !== 0 ? num1 % num2 : 'Error';
}


let firstNumber = '';
let operator = null;
let initialOperator = null;
let nextOperator = null;
let secondNumber = '';
let digitButton = document.querySelectorAll('.number');
let inputDisplay = document.querySelector('input');
let operatorButton = document.querySelectorAll('.operator');
let dot = document.querySelector('.dot');
let clear = document.querySelector('.clear');
let equal = document.querySelector('.equal');
let result = null;

function operate(num1, num2, operator) {
    switch(operator) {
        case "÷": return division(num1, num2);
        case 'X': return multiply(num1, num2);
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '%': return getRemainder(num1, num2);
        default: return num2;
    }
}

//function that display the button user clicked
function populateDigit() {
    digitButton.forEach(button =>  {
        button.addEventListener('click', () => {
            operatorButton.forEach(button => {
                button.classList.remove('active_operator');
            })
            if (operator === null) {
                // add flash effect to the digit buttons
                button.classList.add("flash-effect");

                setTimeout(() => {
                    button.classList.remove("flash-effect");
                }, 300);
                firstNumber += button.textContent;
                console.log(`firstNumber: ${firstNumber}`);
                inputDisplay.value = firstNumber;
            }
            else {
                // add flash effect to the digit buttons
                button.classList.add("flash-effect");

                setTimeout(() => {
                    button.classList.remove("flash-effect");
                }, 300);
                secondNumber += button.textContent;
                console.log(`secondNumber: ${secondNumber}`);
                inputDisplay.value = secondNumber;
            }
        })
    })
    operatorButton.forEach(button => {
        button.addEventListener('click', () => {
            operator = button.textContent;
            if (firstNumber !== '' && secondNumber === '') {
                operatorButton.forEach(btn => {
                    btn.classList.remove('active_operator');
                    initialOperator = operator;
                })

                console.log('initialOperator: ' + initialOperator)
                button.classList.add('active_operator');
            }
            else if (secondNumber !== '' && firstNumber !== '' && initialOperator !== null) {
                nextOperator = operator;
                console.log('nextOperator: ' + nextOperator);
                result = operate(parseFloat(firstNumber),
                parseFloat(secondNumber), initialOperator);
                inputDisplay.value = Math.round(result * 10)/10;
                firstNumber = result.toString();
                initialOperator = nextOperator;
                secondNumber = '';
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
            result = operate(parseFloat(firstNumber),
             parseFloat(secondNumber), operator);
             inputDisplay.value = Math.round(result * 10)/10;
             firstNumber = result.toString();
             secondNumber = '';
             operator = null;

            //  add flash effect to equal button

            equal.classList.add("flash-effect");

            setTimeout(() => {
                equal.classList.remove("flash-effect");
            }, 300);
        }
    })
    clear.addEventListener('click', () => {
        operatorButton.forEach(button => {
            button.classList.remove('active_operator');
        })
        firstNumber = "";
        secondNumber = '';
        result = '';
        operator = null;
        inputDisplay.value = 0;
    })
}
populateDigit();
