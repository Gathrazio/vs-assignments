// setting the background color to the appropriate color that was logged in localStorage, only if the background color property has been defined

if (localStorage.getItem("bgcolor")){
    document.body.style.backgroundColor = localStorage.getItem("bgcolor");
}



// --------------------------------------------------------------------------------------------------------------------------------------------
// ↓ COLOR CONTROLS SECTION -- building various objects, setting color button borders initially if necessary
// --------------------------------------------------------------------------------------------------------------------------------------------


const totalColors = 6;

const color1Button = document.getElementById("color1");
const color2Button = document.getElementById("color2");
const color3Button = document.getElementById("color3");
const color4Button = document.getElementById("color4");
const color5Button = document.getElementById("color5");
const color6Button = document.getElementById("color6");


// ↓ dealing with the color button borders if a background color and color button background match

let colorButtonId = ""; // initializing these variables outside the for-loop so that Javascript doesn't waste memory
let colorButtonStyle = {};

function setBorderInitial () { // setting the border of the color button with the same background color as the document itself to white (i.e., to show it as "selected")
    for (i = 1; i < 7; i++) { // iterating through color numbers 1 through 6
        colorButtonId = "div#color" + i.toString(); // re-assigning this let, generating this loop iteration's color button Id to be used with .querySelector
        colorButtonStyle = window.getComputedStyle(document.querySelector(colorButtonId)); // accessing the styles of the color button that has been generated in the specific interation of the loop
        if (colorButtonStyle.backgroundColor == document.body.style.backgroundColor){ // if the button's background color is that of the page's background
            document.getElementById("color" + i.toString()).style.borderColor = "white"; // set the button's border to white
            // ↑ had to use document to change the background as colorButtonStyle is read-only, thanks to getComputedStyle
            return;
        }
    }
}


if (document.body.style.backgroundColor && document.body.style.backgroundColor != "white") { // if background color has been initialized and it's not white, set the related border
    setBorderInitial() // setting the associated color button border to white
}


const colorContainer = document.getElementById("color-container");

const sol1Button = document.getElementsByClassName("solution-btn")[0]; // accessing the array of objects representing the ten solution buttons
const sol2Button = document.getElementsByClassName("solution-btn")[1]; // array is created in order of where the elements of class "solution-btn" appear in the html, from top to bottom
const sol3Button = document.getElementsByClassName("solution-btn")[2];
const sol4Button = document.getElementsByClassName("solution-btn")[3]; 
const sol5Button = document.getElementsByClassName("solution-btn")[4]; 
const sol6Button = document.getElementsByClassName("solution-btn")[5];
const sol7Button = document.getElementsByClassName("solution-btn")[6]; 
const sol8Button = document.getElementsByClassName("solution-btn")[7]; 
const sol9Button = document.getElementsByClassName("solution-btn")[8];
const sol10Button = document.getElementsByClassName("solution-btn")[9];

const derivativeToIntegralButton = document.getElementById("integrals"); // accessing the integral practice and derivative practice buttons
const integralToDerivativeButton = document.getElementById("derivatives");

const integralCalculatorButton = document.getElementById("i-calc"); // accessing the calculator site reference buttons
const derivativeCalculatorButton = document.getElementById("d-calc");

// const color1ButtonStyle = window.getComputedStyle(document.querySelector("div#color1"));
// above is the statement that would allow me to get the styles of the first color button, as using the color1Button object yields and empty string for its background if I don't assign it something here in the javascript



// --------------------------------------------------------------------------------------------------------------------------------------------
// ↓ FUNCTION STATEMENT SECTION -- colorButtonBorderController, backgroundColorChanger, toggleSolution, and toggleSolutionButtonHTML
// ---------------------------------------------------------------------------------------------------------------------------------------------


// ↓ controls how the button borders behave when clicked

function colorButtonBorderController(colorIndex) {
    const colorButton = colorContainer.querySelectorAll(".child"); // to reduce clutter -- made sure to equate objects so we can pass by reference
    // could have accessed the color buttons through their class "child" using getElementsByClassName, but instead accessed them as the decendants of the color container with class "child" via querySelectorAll. Just adding variety to get used to how everything works!
    for(i = 0; i < totalColors; i++) { // loop through colorNum indices, if non-clicked button has white border, make it black
        if((colorButton[i].style.borderColor === "white") && (i != (colorIndex - 1))) {
            colorButton[i].style.borderColor = "black"; // if we make it inside, one of the non-clicked button's borders was white, so the clicked button's border MUST be black
            colorButton[colorIndex - 1].style.borderColor = "white"; // so we just make the clicked button's border white and exit the function
            return;
        }
    }
    // we get here only if all the non-clicked button's borders were black
    // we would not know if clicked button has a white or black border, so we swap its border between black and white using the conditional operator
    colorButton[colorIndex - 1].style.borderColor = (colorButton[colorIndex - 1].style.borderColor === "white") ? "black" : "white";
}

// ↓ changes the background to either that of the clicked button or back to white, depending on the initial background color

function backgroundColorChanger(btnColor) {
    const docStyle = document.body.style; // to reduce clutter -- made sure to equate objects so we can pass by reference
    if(docStyle.backgroundColor != btnColor) { // if background and clicked button different colors
        docStyle.backgroundColor = btnColor; // change site background to button color
    } else {
        // else change site background to white
        docStyle.backgroundColor = "white";
    }
    localStorage.setItem("bgcolor", docStyle.backgroundColor); // logging the changed background in localStorage
}

// ↓ toggles a particular solution to appear or disappear when its associated solution button is clicked -- its parameter is a string which is either "1", "2", or "3" depending on which solution button was clicked

function toggleSolution (solnNum) {
    solutionObj = document.getElementById("solution-" + solnNum); // building the relevant solution object
    if (solutionObj.style.display === "none" || solutionObj.style.display === "") { // the second parameter of this || function will be true first, as the solution object is full of empty strings to begin with regardless of its actual styling. But the CSS has hidden the solutions when the page was loaded, so an empty string signifies a hidden solution anyways. On subsequent run-throughs of this if-statement, however, the solution object will be loaded with the correct information about the display style of the solution elements. So the first parameter of the || will then be true if the solution is actually not being displayed, and both parameters will be false if the solution element IS being displayed. This allows for an effective hide/show element toggle.
        solutionObj.style.display = "block";
    } else {
        solutionObj.style.display = "none";
    }
}


// ↓ toggles what the solution button says (either "Click to hide solution." if the solution is being displayed, or "Click to reveal solution!" if the solution is being hidden). Since the toggleSolutionButtonHTML function is called AFTER the toggleSolution function in the solution button's "click" event listener functions, we want the related button to say "hide solution" when the solution is being displayed (i.e. has just been toggled to display) and to say "reveal solution" when the solution is being hidden (i.e. has just been toggled to be hidden)

const hideSoln = "Click to hide solution.";
const showSoln = "Click to reveal solution!";

function toggleSolutionButtonHTML (solnNum) {
    solutionObj = document.getElementById("solution-" + solnNum); // creating the solution element
    if (solutionObj.style.display === "block") { // if the solution is being displayed
        document.getElementsByClassName("solution-btn")[solnNum - 1].innerHTML = hideSoln; // change the button's html to say "Click to hide..."
    } else { // else the solution is being hidden
        document.getElementsByClassName("solution-btn")[solnNum - 1].innerHTML = showSoln; // change the button's html to say "Click to reveal..."
    }
}



//---------------------------------------------------------------------------------------------------------------------------------------------
// ↓ EVENT LISTENER STATEMENT SECTION -- for the color buttons, menu buttons, and solution buttons
// ---------------------------------------------------------------------------------------------------------------------------------------------

color1Button.addEventListener("click", function() { // when color1 button is clicked
    backgroundColorChanger("rgb(235, 128, 96)"); // change background depending on previous background and color1 button color
    colorButtonBorderController(1); // change color1 button border depending on current border and change the borders of the other buttons to black
})

color2Button.addEventListener("click", function() { // equivalent process for other buttons
    backgroundColorChanger("rgb(238, 120, 157)");
    colorButtonBorderController(2);
})

color3Button.addEventListener("click", function() {
    backgroundColorChanger("rgb(207, 104, 238)");
    colorButtonBorderController(3);
})

color4Button.addEventListener("click", function() {
    backgroundColorChanger("rgb(128, 104, 250)");
    colorButtonBorderController(4);
})

color5Button.addEventListener("click", function() {
    backgroundColorChanger("rgb(52, 130, 235)");
    colorButtonBorderController(5);
})

color6Button.addEventListener("click", function() {
    backgroundColorChanger("rgb(129, 229, 204)");
    colorButtonBorderController(6);
})


// ↓ adding event listeners only for menu buttons that actually exist on the current page

if (derivativeToIntegralButton) { // if deriv-to-int button, add the appropriate event listeners
    derivativeToIntegralButton.addEventListener("click", function () {
        window.location.href = 'index.html'; // change to the integral practice page if clicked
    })
    derivativeCalculatorButton.addEventListener("click", function () {
        window.open("https://www.derivative-calculator.net", "_blank") // open derivative calculator site in new page
    })
} else { // else the int-to-deriv button and integral calculator buttons must exist on the page, so add the appropriate event listeners
    integralToDerivativeButton.addEventListener("click", function () { 
        window.location.href = 'derivative-practice.html'; // change to the derivative practice page if clicked
    })
    integralCalculatorButton.addEventListener("click", function () {
        window.open("https://www.integral-calculator.com", "_blank") // open integral calculator site in new page
    }
    )
}



// ↓ solution button event listener statements

sol1Button.addEventListener("click", function() {
    toggleSolution("1") // toggles the solution to show/hide
    toggleSolutionButtonHTML("1") // toggles the solution button to say "Click to hide..." or "Click to reveal..."
})

sol2Button.addEventListener("click", function() {
    toggleSolution("2")
    toggleSolutionButtonHTML("2")
})

sol3Button.addEventListener("click", function() {
    toggleSolution("3")
    toggleSolutionButtonHTML("3")
})

sol4Button.addEventListener("click", function() {
    toggleSolution("4")
    toggleSolutionButtonHTML("4")
})

sol5Button.addEventListener("click", function() {
    toggleSolution("5")
    toggleSolutionButtonHTML("5")
})

sol6Button.addEventListener("click", function() {
    toggleSolution("6")
    toggleSolutionButtonHTML("6")
})

sol7Button.addEventListener("click", function() {
    toggleSolution("7")
    toggleSolutionButtonHTML("7")
})

sol8Button.addEventListener("click", function() {
    toggleSolution("8")
    toggleSolutionButtonHTML("8")
})

sol9Button.addEventListener("click", function() {
    toggleSolution("9")
    toggleSolutionButtonHTML("9")
})

sol10Button.addEventListener("click", function() {
    toggleSolution("10")
    toggleSolutionButtonHTML("10")
})