/*
This code contains only syntax and code style problems. The logic of the code works,
so DO NOT change the functionality of anything in here.

In short, you shouldn't need to add your own statements anywhere,
just fix the existing ones.
*/


// Written by Kent, Clark

var enemies = ["Lex", "Batman", "Darkseid", "Brainiac", "General Zod", "Doomsday"];

function whoWins(isThereKryptonite, enemyName){
    if (!isThereKryptonite) {
        return "Superman beats " + enemyName + ", of course";
    }
    else {
        return "Depends on how quick Superman can get rid of the Kryptonite. " + enemyName + " could possibly win this one.";
    }
}

for (var i = 0; i < enemies.length; i++) {
    var isThereKryptonite = ((i % 2 === 0) ? true : false); // I thought this would be more succinct. Functionality remains identical.

    /*if (i % 2 === 0) {
        isThereKryptonite = true;
    } else {
        isThereKryptonite = false;
    }*/

    console.log(whoWins(isThereKryptonite, enemies[i]))
}

function loisAttraction () {
    // 1 means Lois is not at all attracted to Clark, 10 is "super" attracted...
    return Math.floor((Math.random() * 10) + 1);
}

console.log(loisAttraction())

var clarkKent = true;
var superman = false;

while (clarkKent) {
    console.log("I'm just a nerdy columnist")
    var clothesChange = Math.random();
    if (clothesChange >= 0.5) {
        clarkKent = false;
        superman = true;
        console.log("Now I'm Superman!")
    }
}
