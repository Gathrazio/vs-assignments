const ansiPrepend = "\u001b";

const cyan = ansiPrepend + "[36m";
const magenta = ansiPrepend + "[35m";
const blue = ansiPrepend + "[34m";
const green = ansiPrepend + "[32m";
const red = ansiPrepend + "[31m";
const yellow = ansiPrepend + "[33m";
const white = ansiPrepend + "[37m";

const readline = require("readline-sync");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

let raffle;

const enemySpecies = ["Mutant Spider", "King Orc", "Frost Drake"];
const enemyMoods = ["enraged", "annoyed", "neutral"];
const mutantSpiderDrops = ["Golden Spider Eye", "Poison Fang", "Luxurious Silk"];
const kingOrcDrops = ["Club of Destiny", "Amulet of Health", "Pork Chop"];
const frostDrakeDrops = ["Icicle Claw", "Dragon Head", "Drake Wing"];


function invalidResponse (walkAttempt) {
    if (walkAttempt != "w") {
        return true;
    }
}

function getRandomInts (cap, multiplicity) {
    randArray = [];
    for (i = 0; i < multiplicity; i++) {
        randArray.push(Math.floor(Math.random() * cap))
    }
    return randArray;
}

function firstLetterVowel (word) {
    const vowels = ["a", "e", "i", "o", "u"];
    for (i = 0; i < vowels.length; i++) {
        if (word[0].toLowerCase() === vowels[i]) {
            return true;
        }
    }
}

console.log(firstLetterVowel("yo"))

function Enemy (species, mood, specialDrop) {
    this.species = species;
    this.mood = mood;
    this.specialDrop = specialDrop;
}

function mainGame () {
    console.log(cyan, "\n\nGreetings, valiant warrior! The age of glory is upon us.\n\n")
    console.log(cyan, "\nWhat is your name?")
    const userName = readline.question(magenta)

    console.log(cyan, "\nType and enter the 'w' key to walk. Beware, however, monsters may appear...")
    let walkAttempt = "";

    while (true) {
        if (walkAttempt != "w") {
            walkAttempt = readline.question(magenta)
            while (invalidResponse(walkAttempt)) {
                console.log(yellow, "\nPlease enter the 'w' key to walk.")
                walkAttempt = readline.question(magenta)
            }
        }

        walkAttempt = "";
        diceRoll = getRandomInts(3, 1);

        if (diceRoll[0] === 0) {
            diceRoll = getRandomInts(3, 4);
            let species = enemySpecies[diceRoll[0]];
            let enemyDrop = "";
            switch (species) {
                case "Mutant Spider":
                    enemyDrop = mutantSpiderDrops[diceRoll[2]];
                    break;
                case "King Orc":
                    enemyDrop = kingOrcDrops[diceRoll[2]];
                    break;
                case "Frost Drake":
                    enemyDrop = frostDrakeDrops[diceRoll[2]];
            }

            let currentEnemy = new Enemy(species, enemyMoods[diceRoll[1]], enemyDrop);

            let grammarInsert = "";
            if (firstLetterVowel(currentEnemy.mood)) {
                grammarInsert = "n";
            }
            console.log(red, `\n\nA${grammarInsert} ${currentEnemy.mood} ${species} is attacking!\n\n`)
        } else {
            console.log(cyan, "\nYou didn't appear to have encountered anything...\n")
        }
    }


}

mainGame()