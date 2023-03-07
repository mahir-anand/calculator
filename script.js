const displayValue = document.querySelector('#displayValue');
const nums = document.querySelectorAll('#num');
const operators = document.querySelectorAll('#operation');
const equal = document.querySelector('#equal');

let curValue = 0;
let prevValue = 0;
let curOperator = "";

for (let num of nums) {
    num.addEventListener('click', () => {
        curValue = Number(curValue * 10) + Number(num.value);
        displayValue.innerHTML = curValue;
    })
}


for (let operator of operators) {
    operator.addEventListener('click', () => {
        if (prevValue == 0) {
            prevValue = Number(curValue);
            curValue = Number(0);
            curOperator = operator.value;
            // displayValue.innerHTML = operator.innerHTML;
        } else {
            prevValue = operate(prevValue, curValue, curOperator);
            curValue = Number(0);
            curOperator = operator.value;
            // displayValue.innerHTML = operator.innerHTML;
        }
        
    })
}

equal.addEventListener('click', () => {
    console.log(prevValue, curValue, curOperator);
    operate(prevValue,curValue,curOperator);
})


function operate (prevValue, curValue, curOperator) {
    if (curOperator == "add") {
        return add (prevValue, curValue)
    } else if (curOperator == "subtract") {
        return subtract (prevValue, curValue)
    } else if (curOperator == "multiply") {
        return multiply (prevValue, curValue)
    } else if (curOperator == "divide") {
        return divide (prevValue, curValue)
    }
}

function add(prevValue, curValue) {
    let ans = Number(curValue) + Number(prevValue);
    displayValue.innerHTML = ans;
    return ans;
}

function subtract(prevValue, curValue) {
    let ans = Number(prevValue) - Number(curValue);
    displayValue.innerHTML = ans;
    return ans
}

function multiply(prevValue, curValue) {
    let ans = Number(prevValue) * Number(curValue);
    displayValue.innerHTML = ans;
    return ans;
}

function divide(prevValue, curValue) {
    let ans = Number(prevValue) / Number(curValue);
    displayValue.innerHTML = ans;
    return ans;
}