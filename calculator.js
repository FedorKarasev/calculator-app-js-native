/* ------------------------------ */
/* -- Code Explained Tutorials -- */
/* -  YouTube.com/CodeExplained - */
/* ------------------------------ */
let calculatorButtons = [
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },{
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },,{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
];

// SELECT ELEMENTS

const inputElement = document.querySelector('.input');
const outputResultElement = document.querySelector('.result .value');
const outputOperationElement = document.querySelector('.operation .value');

// CREATE CALC BUTTONS

function createButtons() {
    const buttonsPerRow = 4;
    let addedButtons = 0;

    calculatorButtons.forEach((button) => {

        if (addedButtons % buttonsPerRow === 0) {
            inputElement.innerHTML += `<div class="row"></div>`;
        }

        let row = document.querySelector('.row:last-child');

        row.innerHTML += `
                <button id="${button.name}">${button.symbol}</button>`;

        addedButtons++;

    });
}

createButtons();

inputElement.addEventListener('click', event => {
    const targetButton = event.target;

    calculatorButtons.forEach((button) => {
        if (targetButton.id === button.name){
            calculator(button);
        }
    });

});

let data = {
    operation: [],
    result: [],
}

function calculator(button) {
    if (button.type === 'operator') {
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    } else if (button.type === 'number') {
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    } else if (button.type === 'key') {
        if (button.name === 'clear') {
            data.operation = [];
            data.result = [];
            updateOutputResult(0);
        } else if (button.name === 'delete') {
            data.operation.pop();
            data.result.pop();
        }
    } else if (button.type === 'calculate') {
        let joinResult = data.result.join('');

        try {
            let result = eval(joinResult);
        } catch(err) {
            console.log('Так нельзя считать.')
        }
        
        result = formatResult(result);

        updateOutputResult(result);

        data.operation = [];
        data.result = [];

        data.operation.push(result);
        data.result.push(result);

        return;
    }

    updateOutputOperation(data.operation.join(''));

}

function updateOutputResult(result) {
    outputResultElement.innerHTML = result;
}

function updateOutputOperation(operation) {
    outputOperationElement.innerHTML = operation;
}

function formatResult(result) {
    const maxOutputNumberLength = 10;
    const outputPrecision = 5;

    if (digitCounter(result) > maxOutputNumberLength) {
        if (isFloat(result)) {
            const resultInt = parseInt(result);
            const resultIntLength = digitCounter(resultInt);

            if (resultIntLength > maxOutputNumberLength) {
                return result.toPrecision(outputPrecision);
            } else {
                const digitsAfterPoint = maxOutputNumberLength - resultIntLength;
                return result.toFixed(digitsAfterPoint);
            }
        } else {
            return result.toPrecision(outputPrecision);
        }
    } else {
        return result;
    }
}

function digitCounter(number) {
    return number.toString().length;
}

function isFloat(number) {
    return number % 1 != 0;
}