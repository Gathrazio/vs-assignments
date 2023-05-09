const readline = require("readline-sync");

// invalidResponse returns undefined (which is evaluated to false) when called initially if decision is "o", "k", or "h".
function invalidResponse(decision, noKey = true, attemptedDoor = false) {
    switch (decision) {
        case "o":
            if (attemptedDoor) { // if you typed "o" and had previously attempted (and failed) to open the door (invalid)
                return true;
            }
            break;
        case "k":
            if (!noKey) { // if you typed "k" and already have the key (invalid)
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


    const name = readline.question("What is your name? ");

    console.log("\nUnfortunately, it appears that you have been imprisoned in this room.\n")
    console.log("Your options are as follows:\n\nOpen the door (o),\nFind the key (k),\nPut your hand in the mysterious hole in the wall (h).\n")
    let decision = readline.question("Please enter the character corresponding to your decision (o, k, or h): ")

    while (invalidResponse(decision)) {
        decision = readline.question("Please enter a valid character (o, k, or h): ")
    }

    while (noKey || doorNotOpened) { // loops while either the player doesn't have the key or they haven't opened the door
        switch (decision) {
            case "k":
                noKey = false;
                console.log("\nYou now have the key!\n")
                decision = readline.question("What will you do next (o or h)? ")
                while (invalidResponse(decision, noKey)) {
                    decision = readline.question("Please enter a valid character (o or h): ")
                }
                break;
            case "o":
                if (noKey) {
                    console.log("\nYou need the key to open the door.\n")
                    attemptedDoor = true;
                    decision = readline.question("What will you do (k or h)? ")
                    while (invalidResponse(decision, noKey, attemptedDoor)) {
                        decision = readline.question("Please enter a valid character (k or h): ")
                    }
                    break;
                } else {
                    doorNotOpened = false;
                    break;
                }
            case "h": // main() is exited if the player sticks their hand in the hole.
                console.log("\n\nCongratulations! You have died.\n")
                return;
        }
    }
    console.log(`\n\nYou have managed to escape that terrifying room. Now go, be free, ${name}!\n`)
}

main()