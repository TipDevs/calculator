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
    return num1 / num2;
}


let firstNumber;
let operator;
let secondNumber;

function operate(num1, num2, operator) {
    return operator(num1,num2);
}