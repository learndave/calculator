
 
function clearScreen() {
    mainScreen.innerHTML = "0";
    topScreen.innerHTML = "";
}

function typeNumber(e) {
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

function convertToCalcNumber(text) {
    console.log("xxxxxxxxxx: " + text);
    text = parseFloat(text.replace(/,/g, ""));
    numberWithCommas = text.toLocaleString();
    console.log(numberWithCommas);
    return numberWithCommas;
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
    console.log(mainScreen.textContent.slice(0,-1));
    updateMainScreen(mainScreen.textContent.slice(0,-1));
}

// ==================================================
// ==================================================
// ==================================================
// ==================================================

const mainScreen = document.querySelector(".screen-text.main");
const topScreen = document.querySelector(".screen-text.top");
const numbers = Array.from(document.querySelectorAll(".button.number"));


const clearButton = document.querySelector("#clear");
const delButton = document.querySelector("#del");

clearButton.onclick = () => clearScreen();
delButton.onclick = () => del();
for (let number of numbers) {
    number.onclick = function(event){typeNumber(event)};
}