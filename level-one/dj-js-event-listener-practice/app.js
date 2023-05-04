daBoxObj = document.getElementById("da-box");

function backgroundChanger (event) {
    switch (event.type) {
        case "mouseover":
            daBoxObj.style.backgroundColor = "blue";
            break;
        case "mousedown":
            daBoxObj.style.backgroundColor = "red";
            break;
        case "mouseup":
            daBoxObj.style.backgroundColor = "yellow";
            break;
        case "dblclick":
            daBoxObj.style.backgroundColor = "green";
            break;
        case "wheel":
            daBoxObj.style.backgroundColor = "orange";
            break;
        case "keydown":
            switch (event.key) {
                case "b":
                    daBoxObj.style.backgroundColor = "blue";
                    break;
                case "r":
                    daBoxObj.style.backgroundColor = "red";
                    break;
                case "y":
                    daBoxObj.style.backgroundColor = "yellow";
                    break;
                case "g":
                    daBoxObj.style.backgroundColor = "green";
                    break;
                case "o":
                    daBoxObj.style.backgroundColor = "orange";
            }
    }
}

daBoxObj.addEventListener("mouseover", backgroundChanger, false) // I read that an event object is passed into the function backgroundChanger as a parameter automatically
daBoxObj.addEventListener("mousedown", backgroundChanger)
daBoxObj.addEventListener("mouseup", backgroundChanger)
daBoxObj.addEventListener("dblclick", backgroundChanger)
window.addEventListener("wheel", backgroundChanger)
window.addEventListener("keydown", backgroundChanger)