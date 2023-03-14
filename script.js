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
    contextValue.innerHTML = "";
})

//delete
clear.addEventListener('click', () => { 
    curValue = 0;
    displayValue.innerHTML = curValue;
})

//number listeners
let i = 1;
for (let num of nums) {
    num.addEventListener('click', () => {
        numbers(num);
    })
}

    function numbers (num) {
        if (displayValue.innerHTML.includes(".")) {
            curValue = Number(curValue) + Number( (num.value/(10**i)) );
            curValue = curValue.toFixed(i);
            displayValue.innerHTML = curValue;
            i++;;
        } else {
            curValue = Number(curValue * 10) + Number(num.value);
            displayValue.innerHTML = curValue;
        }
    }

//dot listener
dot.addEventListener('click', () => { 
    if (displayValue.innerHTML.includes(".")) {
        return;
    }
    // curValue = displayValue.innerHTML;
    displayValue.innerHTML = curValue + ".";
})

//operator listeners
for (let operator of operators) {
    operator.addEventListener('click', () => {
        operation(operator);
    })
}

    function operation (operator) {
        i = 1;
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
    }

//equal listener
equal.addEventListener('click', () => {
    i = 1;
    if (curOperator == ""){
        displayValue.innerHTML = curValue;
    } else {
        operate(prevValue,curValue,curOperator);
        contextValue.innerHTML = prevValue.toString() + curOperatorText + curValue.toString() + " = ";
        curValue = operate(prevValue,curValue,curOperator);
        prevValue = Number(0);
    }
    
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
    if (!Number.isInteger(ans)) {
        ans = ans.toFixed(2);
    }
    displayValue.innerHTML = ans;
    return ans;
}

function subtract(prevValue, curValue) {
    let ans = Number(prevValue) - Number(curValue);
    if (!Number.isInteger(ans)) {
        ans = ans.toFixed(2);
    }
    displayValue.innerHTML = ans;
    return ans;
}

function multiply(prevValue, curValue) {
    let ans = Number(prevValue) * Number(curValue);
    if (!Number.isInteger(ans)) {
        ans = ans.toFixed(2);
    }
    displayValue.innerHTML = ans;
    return ans;
}

function divide(prevValue, curValue) {
    let ans = Number(prevValue) / Number(curValue);
    if (!Number.isInteger(ans)) {
        ans = ans.toFixed(2);
    }
    displayValue.innerHTML = ans;
    return ans;
}

function percent (prevValue, curValue) {
    let ans = (Number(prevValue) / 100) * Number(curValue);
    if (!Number.isInteger(ans)) {
        ans = ans.toFixed(2);
    }
    displayValue.innerHTML = ans;
    return ans;
}

function exponent (prevValue, curValue) {
    let ans = Math.pow(Number(prevValue), Number(curValue));
    if (!Number.isInteger(ans)) {
        ans = ans.toFixed(2);
    }
    displayValue.innerHTML = ans;
    return ans;
}

//keyboard listeners
document.addEventListener('keydown', (e) => {

    for (let num of nums) {
        if (num.value == e.key) {
            num.dispatchEvent(new Event('click'));
        }
    }

    if (e.key == ".") {
        dot.dispatchEvent(new Event('click'));
    } else if (e.key == "Backspace") {
        clear.dispatchEvent(new Event('click'));
    } else if (e.key == "%") {
        operators[0].dispatchEvent(new Event('click'));
    } else if (e.key == "^") {
        operators[1].dispatchEvent(new Event('click'));
    } else if (e.key == "/") {
        operators[2].dispatchEvent(new Event('click'));
    } else if (e.key == "*") {
        operators[3].dispatchEvent(new Event('click'));
    } else if (e.key == "+") {
        operators[4].dispatchEvent(new Event('click'));
    } else if (e.key == "-") {
        operators[5].dispatchEvent(new Event('click'));
    } else if (e.key == "Enter" || e.key == "=") {
        equal.dispatchEvent(new Event('click'));
    } else if (e.key == "Escape") {
        ac.dispatchEvent(new Event('click'));
    } else {
        document.activeElement.blur();
    }

})