const button = document.getElementById("button");
const clickCounter = document.getElementById("click-counter");
const timer = document.getElementById("timer");

let clickTotal;

// localStorage.clear()

let currentSecond = Number(timer.textContent.replace('s', ''));

const intervalId = setInterval(() => {
    currentSecond -= 1;
    timer.textContent = currentSecond + 's';
}, 1000)

setTimeout(() => {clearInterval(intervalId)}, 20000)

if (localStorage) {
    clickTotal = Number(localStorage.getItem("currentClicks"));
} else {
    clickTotal = 0;
}

clickCounter.textContent = clickTotal;


button.addEventListener('click', () => {
    if (timer.textContent.replace('s', '') > 0) {
        clickTotal += 1;
        localStorage.setItem("currentClicks", clickTotal)
        clickCounter.textContent = clickTotal;
    }
})