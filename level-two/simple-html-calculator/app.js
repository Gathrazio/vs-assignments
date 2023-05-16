const addForm = document["add-form"];
const subtractForm = document["subtract-form"];
const multiplyForm = document["multiply-form"];

const addClearBtn = document.getElementById("add-clear");
const subClearBtn = document.getElementById("subtract-clear");
const multClearBtn = document.getElementById("multiply-clear");

const addResultContainer = document.getElementById("add-result-container");
const subResultContainer = document.getElementById("subtract-result-container");
const multResultContainer = document.getElementById("multiply-result-container");

function sum (a, b) {
    const numA = Number(a);
    const numB = Number(b);
    return numA + numB;
}

function subtract (a, b) {
    const numA = Number(a);
    const numB = Number(b);
    return numA - numB;
}

function product (a, b) {
    const numA = Number(a);
    const numB = Number(b);
    return numA * numB;
}
 
addForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addResultContainer.textContent = sum(addForm["add-first-field"].value, addForm["add-second-field"].value);
    addResultContainer.style.display = "block";
    addClearBtn.style.display = "block";
})

subtractForm.addEventListener("submit", (event) => {
    event.preventDefault()
    subResultContainer.textContent = subtract(subtractForm["subtract-first-field"].value, subtractForm["subtract-second-field"].value);
    subResultContainer.style.display = "block";
    subClearBtn.style.display = "inline-block";
})

multiplyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    multResultContainer.textContent = product(multiplyForm["multiply-first-field"].value, multiplyForm["multiply-second-field"].value);
    multResultContainer.style.display = "block";
    multClearBtn.style.display = "inline-block";
})

addClearBtn.addEventListener("click", () => {
    addClearBtn.style.display = "none";
    addResultContainer.style.display = "none";
    addForm["add-first-field"].value = "";
    addForm["add-second-field"].value = "";
})

subClearBtn.addEventListener("click", () => {
    subClearBtn.style.display = "none";
    subResultContainer.style.display = "none";
    subtractForm["subtract-first-field"].value = "";
    subtractForm["subtract-second-field"].value = "";
})

multClearBtn.addEventListener("click", () => {
    multClearBtn.style.display = "none";
    multResultContainer.style.display = "none";
    multiplyForm["multiply-first-field"].value = "";
    multiplyForm["multiply-second-field"].value = "";
})