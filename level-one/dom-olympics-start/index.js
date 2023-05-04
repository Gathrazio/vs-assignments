/* Bronze Medal Challenge: insert a header using JS */
/* ------------------------------------------------ */

titleHeader = document.createElement("h1");
titleHeader.textContent = "Javascript Made This!";
contributorInfoHeader = document.createElement("h6");
contributorInfoHeader.innerHTML = "<span id='name'> Noah </span> wrote the JavaScript.";
document.body.prepend(titleHeader)
titleHeader.insertAdjacentElement("afterend", contributorInfoHeader)