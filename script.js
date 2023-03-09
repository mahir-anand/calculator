const displayValue = document.querySelector('#displayValue');
const contextValue = document.querySelector('#contextValue');
const nums = document.querySelectorAll('#num');
const operators = document.querySelectorAll('#operation');
const equal = document.querySelector('#equal');
const ac = document.querySelector('#ac');
const clear = document.querySelector('#clear');
const dot = document.querySelector('#dot');

let curValue = 0;
let prevValue = 0;
let curOperator = "";
let curOperatorText = "";

//all clear
ac.addEventListener('click', () => {
    curValue = 0;
    prevValue = 0;
    curOperator = "";
    curOperatorText = "";
    displayValue.innerHTML = curValue;
    contextValue.innerHTML = prevValue;
})

//delete
clear.addEventListener('click', () => { 
    curValue = 0;
    displayValue.innerHTML = curValue;
})

//number listeners
for (let num of nums) {
    num.addEventListener('click', () => {
        if (displayValue.innerHTML.includes(".")) {
            curValue = curValue + (num.value/10);
            displayValue.innerHTML = curValue;
        } else {
            curValue = Number(curValue * 10) + Number(num.value);
            displayValue.innerHTML = curValue;
        }
    })
}

//dot listener
dot.addEventListener('click', () => { 
    displayValue.innerHTML = curValue + ".";
})

//operator listeners
for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (prevValue == 0) {
            displayValue.innerHTML = "";
            prevValue = Number(curValue);
            curValue = Number(0);
            curOperator = operator.value;
            curOperatorText = operator.innerHTML;
            contextValue.innerHTML = prevValue + operator.innerHTML;
        } else {
            prevValue = operate(prevValue, curValue, curOperator);
            curValue = Number(0);
            curOperator = operator.value;
            curOperatorText = operator.innerHTML;
            contextValue.innerHTML = prevValue + operator.innerHTML;
            displayValue.innerHTML = "";
        }
        
    })
}

//equal listener
equal.addEventListener('click', () => {
    operate(prevValue,curValue,curOperator);
    contextValue.innerHTML = prevValue.toString() + curOperatorText + curValue.toString() + " = ";
})

//main operate function
function operate (prevValue, curValue, curOperator) {
    if (curOperator == "add") {
        return add (prevValue, curValue)
    } else if (curOperator == "subtract") {
        return subtract (prevValue, curValue)
    } else if (curOperator == "multiply") {
        return multiply (prevValue, curValue)
    } else if (curOperator == "divide") {
        return divide (prevValue, curValue)
    } else if (curOperator == "percent") {
        return percent (prevValue, curValue)
    } else if (curOperator == "exponent") {
        return exponent (prevValue, curValue);
    }
}

//operation functions

function add(prevValue, curValue) {
    let ans = Number(curValue) + Number(prevValue);
    ans = ans.toFixed(2);
    displayValue.innerHTML = ans;
    return ans;
}

function subtract(prevValue, curValue) {
    let ans = Number(prevValue) - Number(curValue);
    ans = ans.toFixed(2);
    displayValue.innerHTML = ans;
    return ans;
}

function multiply(prevValue, curValue) {
    let ans = Number(prevValue) * Number(curValue);
    ans = ans.toFixed(2);
    displayValue.innerHTML = ans;
    return ans;
}

function divide(prevValue, curValue) {
    let ans = Number(prevValue) / Number(curValue);
    ans = ans.toFixed(2);
    displayValue.innerHTML = ans;
    return ans;
}

function percent (prevValue, curValue) {
    let ans = (Number(prevValue) / 100) * Number(curValue);
    ans = ans.toFixed(2);
    displayValue.innerHTML = ans;
    return ans;
}

function exponent (prevValue, curValue) {
    let ans = Math.pow(Number(prevValue), Number(curValue));
    ans = ans.toFixed(2);
    displayValue.innerHTML = ans;
    return ans;
}