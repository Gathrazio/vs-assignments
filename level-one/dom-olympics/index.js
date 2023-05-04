/* Bronze Medal Challenge: insert a header using JS */
/* ------------------------------------------------ */

titleHeader = document.createElement("h1");
titleHeader.textContent = "Javascript Made This!";
contributorInfoHeader = document.createElement("h6");
contributorInfoHeader.innerHTML = "<span id='name'> Noah </span> wrote the JavaScript.";
document.body.prepend(titleHeader)
titleHeader.insertAdjacentElement("afterend", contributorInfoHeader) // new HTML element method I found




/* Silver Medal Challenge */
/* ---------------------- */


/* Task 1: write JS to automatically change the words of the convo to something fun and good */

leftMessages = document.getElementsByClassName("message left"); // should produce two HTML Collections
rightMessages = document.getElementsByClassName("message right");

containerDiv = document.getElementById("main");

fAGMachineExplanation = document.createElement("h6");
fAGMachineExplanation.textContent = "Press and hold the ' f ' key to see the results of the Fun and Good Machine!";
containerDiv.insertAdjacentElement("beforebegin", fAGMachineExplanation)

function funAndGoodMachine (event) {
    if (event.key === "f") {
        leftMessages[0].textContent = "Been to the skate park recently, friend?"; // composing the dialogue
        rightMessages[0].textContent = "Absolutely. Went there just now and did some sick tricks.";
        leftMessages[1].textContent = "That's cool. I've been itching to go lately.";
        rightMessages[1].textContent = "There's no better time than the present!";
    }
}

function boringAndBadMachine () {
    leftMessages[0].textContent = "I have something serious to talk about"; // composing the dialogue
    rightMessages[0].textContent = "I don't want to talk";
    leftMessages[1].textContent = "You have to, you're the police";
    rightMessages[1].textContent = "I'm just a simple farmer";
}

window.addEventListener("keydown", funAndGoodMachine)
window.addEventListener("keyup", boringAndBadMachine)


/* Task 2: write JS that will wait until the user clicks the "clear" button, and then clears out all conversation */

/*function clearConvo () {
    for (i = 0; i < 2; i++ ) {
        leftMessages[i].textContent = "";
        rightMessages[i].textContent = "";
    }
}*/

/* Alternatively (because the above function leaves highlighted bits)... */

messageCollection = document.getElementsByClassName("message");

function clearConvo () {
    for (i = 0; i < 4; i++ ) {
        messageCollection[i].style.display = "none";
    }
}

clearBtn = document.getElementById("clear-button");
clearBtn.addEventListener("click", clearConvo)




/* Gold Medal Challenge: write JS that will notice when the drop down has changed and then change the background colors of the messages accordingly */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

themeDropDown = document.getElementById("theme-drop-down");

function messageThemeChanger() {
    if (themeDropDown.value === "theme-one") {
        for (i = 0; i < 2; i++) {
            leftMessages[i].style.backgroundColor = "lightblue";
            rightMessages[i].style.backgroundColor = "burlywood";
        }
    } else {
        for (i = 0; i < 2; i++) {
            leftMessages[i].style.backgroundColor = "rgb(234, 76, 76)";
            rightMessages[i].style.backgroundColor = "grey";
        }
    }
}

themeDropDown.addEventListener("change", messageThemeChanger)


