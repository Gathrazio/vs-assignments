const ansiPrepend = "\u001b";

const cyan = ansiPrepend + "[36m";
const magenta = ansiPrepend + "[35m";
const blue = ansiPrepend + "[34m";
const green = ansiPrepend + "[32m";
const yellow = ansiPrepend + "[33m";
const white = ansiPrepend + "[37m";

const tallier = {
    fizzbuzz: 0,
    fizz: 0,
    buzz: 0
}

function fizzBuzzer() {
    for (i = 1; i <= 100; i++) {
        if ((i % 3 === 0) && (i % 5 === 0)) {
            console.log(magenta, "FizzBuzz")
            tallier.fizzbuzz += 1;
            continue;
        } else if (i % 3 === 0) {
            console.log(blue, "Fizz")
            tallier.fizz += 1;
            continue;
        } else if (i % 5 === 0) {
            console.log(green, "Buzz")
            tallier.buzz += 1;
            continue;
        }
        console.log(cyan, i.toString())
    }
    return tallier;
}

console.log(yellow, "\nThe tallier thus says: ", white, fizzBuzzer(), "\n")