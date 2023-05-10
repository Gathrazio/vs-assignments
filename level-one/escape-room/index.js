const readline = require("readline-sync");

let failedKeygrabAttempt = false;
let failedDoorAttempt = false;

const cyan = "\x1b[36m%s\x1b[0m";
const yellow = "\x1b[33m%s\x1b[0m";
const red = "\u001b[31m";
const green = "\x1b[32m";
const magenta = "\u001b[35m"
const white = "\u001b[37m";

// invalidResponse returns undefined (which is evaluated to false) when called initially if decision is "o", "k", or "h".
function invalidResponse(decision, noKey = true, attemptedDoor = false) {
    switch (decision) {
        case "o":
            if (attemptedDoor) { // if you typed "o" and had previously attempted (and failed) to open the door (invalid)
                failedDoorAttempt = true;
                return true;
            }
            break;
        case "k":
            if (!noKey) { // if you typed "k" and already have the key (invalid)
                failedKeygrabAttempt = true;
                return true;
            }
            break;
        case "h": // if you tried to stick your hand in the hole (perfectly valid), a swift death for the user
            return false;
            break;
        default: // any other garbage the user tries to enter (invalid)
            return true;
    }
}

function main () {
    let noKey = true;
    let doorNotOpened = true;
    let attemptedDoor = false;

    console.log(cyan, "What is your name?")
    const name = readline.question(magenta, "");

    console.log(cyan, "\n\nUnfortunately, it appears that you have been imprisoned in this room.")
    console.log(cyan, "Your options are as follows:\n\nOpen the door (o),\nFind the key (k),\nPut your hand in the mysterious hole in the wall (h).\n")
    console.log(cyan, "Please enter the character corresponding to your decision (o, k, or h).")
    let decision = readline.question(magenta, cyan + "fdsa")

    while (invalidResponse(decision)) {
        console.log(cyan, "Please enter a valid character (o, k, or h).")
        decision = readline.question(magenta, "")
    }

    while (noKey || doorNotOpened) { // loops while either the player doesn't have the key or they haven't opened the door
        switch (decision) {
            case "k":
                noKey = false;
                console.log(green, "\n\nYou now have the key!\n\n")
                console.log(cyan, "What will you do next (o or h)?")
                decision = readline.question(magenta, "")
                while (invalidResponse(decision, noKey)) {
                    if (failedKeygrabAttempt) {
                        console.log(yellow, "\n\nReminder: You already have the key.\n\n")
                        failedKeygrabAttempt = false;
                    }
                    console.log(cyan, "Please enter a valid character (o or h).")
                    decision = readline.question(magenta, "")
                }
                break;
            case "o":
                if (noKey) {
                    console.log(cyan, "\n\nYou need the key to open the door.\n\n")
                    attemptedDoor = true;
                    console.log(cyan, "What will you do (k or h)?")
                    decision = readline.question(magenta, "")
                    while (invalidResponse(decision, noKey, attemptedDoor)) {
                        if (failedDoorAttempt) {
                            console.log(yellow, "\n\nReminder: You have already tried (and failed) to open the door.\n\n")
                            failedDoorAttempt = false;
                        }
                        console.log(cyan, "Please enter a valid character (k or h).")
                        decision = readline.question(magenta, "");
                    }
                    break;
                } else {
                    doorNotOpened = false;
                    break;
                }
            case "h": // main() is exited if the player sticks their hand in the hole.
                console.log(white, "\n\n\n|-----------------------------------------|\n")
                console.log(red, "Congratulations! You have died instantly.")
                console.log(white, "\n|-----------------------------------------|\n\n\n")
                return;
        }
    }
    console.log(white, "\n\n\n|---------------------------------------------------------------------------------|\n")
    console.log(green, `You have managed to escape that terrifying room. Now go, be free, ${name}!`)
    console.log(white, "\n|---------------------------------------------------------------------------------|\n\n\n")
}

main()