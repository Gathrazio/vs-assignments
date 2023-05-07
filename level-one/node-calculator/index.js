const readlineSync = require('readline-sync');

function sum(num1, num2) {
    return num1 + num2;
}

function product(num1, num2) {
    return num1 * num2;
}

function quotient(num1, num2) {
    return num1 / num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function invalidResponse(opResponse) {
    switch (opResponse) { // incorporating switch fallthrough!
        case "add":
        case "sub":
        case "mul":
        case "div":
            return false;
            break;
        default:
            return true;
    }
}

const numArray = [];

function invalidNumber(number) {
    if (!Number(number)) {
        return true;
    } else {
        numArray.push(Number(number))
        return false;
    }
}


let firstNumber = readlineSync.question("\nPlease enter your first number: ");

while (invalidNumber(firstNumber)) {
    console.log("\nUnfortunately, that was not a valid number.")
    firstNumber = readlineSync.question("Please enter your first number: ")
}

let secondNumber = readlineSync.question("Please enter your second number: ");

while (invalidNumber(secondNumber)) {
    console.log("\nUnfortunately, that was not a valid number.")
    secondNumber = readlineSync.question("Please enter your second number: ")
}

let operationResponse = readlineSync.question("Please now enter the operation to perform (add, sub, mul, div): ")

while (invalidResponse(operationResponse)) {
    console.log("\nUnfortunately, that was not a valid response.")
    operationResponse = readlineSync.question("Please now enter the operation to be performed (add, sub, mul, div): ")
}

const a = numArray[0];
const b = numArray[1];

switch (operationResponse) {
    case "add":
        result = sum(a, b);
        break;
    case "sub":
        result = subtract(a, b);
        break;
    case "mul":
        result = product(a, b);
        break;
    case "div":
        result = quotient(a, b);
}

console.log("\nThe result is " + result + ".\n")