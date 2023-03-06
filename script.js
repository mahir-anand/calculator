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
            displayValue.innerHTML = operator.innerHTML;
        } else {
            prevValue = operate(prevValue, curValue, curOperator);
            curValue = Number(0);
            curOperator = operator.value;
            displayValue.innerHTML = operator.innerHTML;
        }
        
    })
}

equal.addEventListener('click', () => {
   operate(prevValue,curValue,curOperator);
})


const operate = function operate (prevValue, curValue, curOperator) {
    if (curOperator == "add") {
        let ans = Number(curValue) + Number(prevValue);
        console.log(ans);
    } else if (curOperator == "subtract") {
        let ans = Number(prevValue) - Number(curValue);
        console.log(ans);
    } else if (curOperator == "multiply") {
        let ans = Number(curValue) * Number(prevValue);
        console.log(ans);
    } else if (curOperator == "divide") {
        let ans = Number(prevValue) / Number(curValue);
        console.log(ans);
    }
}
