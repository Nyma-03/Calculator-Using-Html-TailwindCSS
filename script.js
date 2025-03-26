
const display = document.getElementById("display");
let expression = ""; 


function appendNumber(number) {
    expression += number;
    updateDisplay();
}


function appendOperator(operator) {
    if (expression.length > 0 && !isNaN(expression[expression.length - 1])) {
        expression += operator;
        updateDisplay();
    }
}

function clearDisplay() {
    expression = "";
    updateDisplay();
}


function calculateResult() {
    try {
        let result = customEvaluate(expression);
        expression = result.toString();
        updateDisplay();
    } catch {
        expression = "Error";
        updateDisplay();
    }
}


function updateDisplay() {
    display.value = expression;
}


function customEvaluate(exp) {
    let numbers = [];
    let operators = [];
    let currentNumber = "";

    
    for (let i = 0; i < exp.length; i++) {
        let char = exp[i];

        if (!isNaN(char) || char === ".") {
            currentNumber += char; 
        } else {
            numbers.push(parseFloat(currentNumber));
            operators.push(char);
            currentNumber = "";
        }
    }
    numbers.push(parseFloat(currentNumber)); 

   
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "*" || operators[i] === "/") {
            let num1 = numbers[i];
            let num2 = numbers[i + 1];
            let result = operators[i] === "*" ? num1 * num2 : num1 / num2;
            
            numbers.splice(i, 2, result); 
            operators.splice(i, 1); 
            i--; 
        }
    }

   
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            result += numbers[i + 1];
        } else if (operators[i] === "-") {
            result -= numbers[i + 1];
        }
    }

    return result;
}
