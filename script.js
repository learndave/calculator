
 
function clearScreen() {
    mainScreen.innerHTML = "0";
    topScreen.innerHTML = "";
}

function inputMainScreen(e) {
    // prevent over
    if (mainScreen.textContent.length >= 13) {
        return;
    }
    // add "." if applicable
    if (e.target.value == ".") {
        // prevent duplicate "."
        if (mainScreen.textContent.indexOf(".") != -1) {
            return;
        }
        mainScreen.textContent = mainScreen.textContent + ".";
        return;
    }
    if (e.target.value == "0") {
        mainScreen.textContent = mainScreen.textContent + "0";
        return;
    }
    // add anything after the "."
    if (mainScreen.textContent.indexOf(".") != -1) {
        mainScreen.textContent += e.target.value;
        return;
    }
    updateMainScreen(mainScreen.textContent + e.target.value);
}

function inputNumber(e) {
    ops = ["×","÷","+","−"];
    if (ops.includes(mainScreen.textContent)) {
        topScreen.textContent += mainScreen.textContent;
        mainScreen.textContent = 0;
        inputMainScreen(e);
    } else {
        inputMainScreen(e);
    }
}

function convertToCalcNumber(text) {
    text = parseFloat(text.replace(/,/g, ""));
    numberWithCommas = text.toLocaleString();
    if (numberWithCommas.length > 13) {
        return "MATH ERROR";
    }  
    return numberWithCommas;
}

function convertToFloat(text) {
    text = parseFloat(text.replace(/,/g, ""));
    return text.toString();
}

function updateMainScreen(newText) {
    newText = convertToCalcNumber(newText);
    mainScreen.textContent = newText;
}

function del() {
    // prevent displaying NaN
    if (mainScreen.textContent.length == 1) {
        mainScreen.textContent = "0";
        return;
    }
    // prevent auto deletion of "."
    if (mainScreen.textContent.slice(-2,-1) == ".") {
        mainScreen.textContent = mainScreen.textContent.slice(0,-1)
        return;
    }
    // prevent rounding off when there is "."
    if (mainScreen.textContent.indexOf(".") != -1) {
        mainScreen.textContent = mainScreen.textContent.slice(0,-1)
        return;
    }
    updateMainScreen(mainScreen.textContent.slice(0,-1));
}

function calculateExisting() {
    if (topScreen.textContent == "") {
        return convertToFloat(mainScreen.textContent);
    } else {
        currentNum = convertToFloat(mainScreen.textContent);
        ans = convertToFloat(ans);
        let result;
        if (operation == "multiply") {
            result = ans * currentNum;
        } else if (operation == "divide") {
            result = ans / currentNum;
        } else if (operation == "add") {
            result = ans + currentNum;
        } else if (operation == "subtract") {
            result = ans - currentNum;
        }
        result = Math.round(result * 100) / 100; 
        return result.toString();
    }
}

function operate(e) {
    ops = ["×","÷","+","−"];
    if (ops.includes(mainScreen.textContent)) {
        mainScreen.textContent = e.target.value
        operation = e.target.id;
    } else {
        ans = calculateExisting();
        topScreen.textContent = ans;
        operation = e.target.id;
        if (operation == "calc") {
            topScreen.textContent = "";
            mainScreen.textContent = convertToCalcNumber(ans);
            return;
        }
        mainScreen.textContent = e.target.value;
    }
}

// ==================================================
// ==================================================
// ==================================================
// ==================================================

const mainScreen = document.querySelector(".screen-text.main");
const topScreen = document.querySelector(".screen-text.top");

const clearButton = document.querySelector("#clear");
const delButton = document.querySelector("#del");
const numbers = Array.from(document.querySelectorAll(".button.number"));
const operators = Array.from(document.querySelectorAll(".operator"));

let ans = 0;
let operation;

clearButton.onclick = () => clearScreen();
delButton.onclick = () => del();
for (let number of numbers) {
    number.onclick = function(event){inputNumber(event)};
}
for (let operator of operators) {
    operator.onclick = function(event) {operate(event)};
}