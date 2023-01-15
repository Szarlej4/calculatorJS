const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".ac-button");
const del = document.querySelector(".del-button");
const equals = document.querySelector(".equals-button");
const previousResult = document.querySelector(
    ".previous-operation"
);
const currentResult = document.querySelector(
    ".current-operation"
);

let currentOperation = "";
let previousOperation = "";
let operation = null;

const update = () => {
    currentResult.innerText = currentOperation;
    if (operation !== null) {
        previousResult.innerText = `${previousOperation} ${operation}`;
    } else {
        previousResult.innerText = "";
    }
};

const addNumber = (number) => {
    if (
        !(
            number === "." &&
            currentOperation.indexOf(".") !== -1
        )
    ) {
        currentOperation += number;
    }
};

const cutNumber = () => {
    currentOperation = currentOperation.slice(0, -1);
};

const resetNumber = () => {
    currentOperation = "";
    previousOperation = "";
    operation = null;
};

const chooseOperator = (operator) => {
    if (currentOperation === "") {
        return;
    }
    if (previousOperation !== "") {
        calcEquation();
    }
    operation = operator;
    previousOperation = currentOperation;
    currentOperation = "";
};

const checkCurrentOperation = () => {
    if (currentOperation) {
        return true;
    }
    return false;
};

const calcEquation = () => {
    let equation;
    if (!previousOperation || !currentOperation) {
        return;
    }
    const previous = parseFloat(previousOperation);
    const current = parseFloat(currentOperation);
    if (isNaN(previous) || isNaN(current)) {
        return;
    }

    switch (operation) {
        case "+":
            equation = previous + current;
            break;
        case "-":
            equation = previous - current;
            break;
        case "x":
            equation = previous * current;
            break;
        case "÷":
            equation = previous / current;
            break;
        case "√":
            equation = Math.pow(current, 1 / previous);
            break;
        case "%":
            equation = (previous / 100) * current;
            break;
        case "^":
            equation = Math.pow(previous, current);
            break;
        case "log":
            equation =
                Math.log(previous) / Math.log(current);
            break;
        default:
            return;
    }

    currentOperation = equation;
    operation = null;
    previousOperation = "";
};

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        chooseOperator(operator.innerText);
        update();
    });
});

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (currentResult.innerText.length < 15) {
            addNumber(number.innerText);
            update();
        }
    });
});

del.addEventListener("click", () => {
    cutNumber();
    update();
});

clear.addEventListener("click", () => {
    resetNumber();
    update();
});

equals.addEventListener("click", () => {
    calcEquation();
    update();
});
