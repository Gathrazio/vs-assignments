const ansiPrepend = "\u001b";

const cyan = ansiPrepend + "[36m";
const magenta = ansiPrepend + "[35m";
const blue = ansiPrepend + "[34m";
const green = ansiPrepend + "[32m";
const red = ansiPrepend + "[31m";
const yellow = ansiPrepend + "[33m";
const white = ansiPrepend + "[37m";

const readline = require("readline-sync");

const enemySpeciesArr = ["Mutant Spider", "King Orc", "Frost Drake"];
const enemyMoods = ["Enraged", "Annoyed", "Neutral"];
const mutantSpiderDrops = ["Golden Spider Eye", "Poison Fang", "Luxurious Silk"];
const kingOrcDrops = ["Club of Destiny", "Amulet of Health", "Pork Chop"];
const frostDrakeDrops = ["Icicle Claw", "Dragon Head", "Drake Wing"];


function invalidWalkResponse (walkAttempt) {
    if (walkAttempt != "w") {
        return true;
    }
}

function invalidDecisionResponse (decisionAttempt) {
    if ((decisionAttempt != "r") && (decisionAttempt != "f")) {
        return true;
    }
}

function enemySpecsGenerator () {
    const enemySpecs = [];
    let diceRoll = getRandomInts(0, 3, 3);
    enemySpecs.push(enemySpeciesArr[diceRoll[0]]) // species
    enemySpecs.push(enemyMoods[diceRoll[1]]) // mood
        switch (enemySpecs[0]) {
            case "Mutant Spider":
                enemySpecs.push(mutantSpiderDrops[diceRoll[2]]) // special drop
                enemySpecs.push(getRandomInts(20, 41)[0]) // health points
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(1, 5)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(3, 10)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(5, 13)[0])
                }
                break;
            case "Frost Drake":
                enemySpecs.push(frostDrakeDrops[diceRoll[2]])
                enemySpecs.push(getRandomInts(30, 71)[0])
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(5, 12)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(8, 15)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(10, 17)[0])
                }
                break;
            case "King Orc":
                enemySpecs.push(kingOrcDrops[diceRoll[2]])
                enemySpecs.push(getRandomInts(80, 101)[0])
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(10, 15)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(16, 22)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(26, 31)[0])
                }
        }
    return enemySpecs;
}

function getRandomInts(min, cap, multiplicity = 1) {
    randArray = [];
    for (i = 0; i < multiplicity; i++) {
        randArray.push(Math.floor(Math.random() * (cap - min) + min))
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

function Entity () {
    this.attack = (opponent) => {
        const dealtDamage = getRandomInts(this.attackPower - 2, this.attackPower + 2)[0];
        opponent.healthPoints -= dealtDamage;
    }
}

function Enemy (species, mood, specialDrop, healthPoints, attackPower) {
    Entity.call(this);
    this.species = species;
    this.mood = mood;
    this.specialDrop = specialDrop;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
}

function Hero (name, attackPower, healthPoints) {
    Entity.call(this);
    this.name = name;
    this.attackPower = attackPower;
    this.inventory = [];
    this.killCount = 0;
    this.healthPoints = healthPoints
}

function mainGame () {
    console.log(cyan, "\n\nGreetings, valiant warrior! The age of glory is upon us.\n\n")
    console.log(cyan, "\nWhat is your name?")
    const userName = readline.question(magenta)

    const courage = getRandomInts(5, 11)[0];
    const heroHP = getRandomInts(50, 81)[0]

    const hero = new Hero(userName, courage * 2.5, heroHP)

    console.log(cyan, "\nType and enter the 'w' key to walk. Beware, however, monsters may appear...\n")
    let walkAttempt = "";

    while (true) {
        if (walkAttempt != "w") {
            walkAttempt = readline.question(magenta)
            while (invalidWalkResponse(walkAttempt)) {
                console.log(yellow, "\nPlease enter the 'w' key to walk.")
                walkAttempt = readline.question(magenta)
            }
        }

        walkAttempt = "";
        let diceRoll = getRandomInts(0, 3)[0];
        if (diceRoll === 0) {
            let enemySpecs = enemySpecsGenerator();
            // Enemy(species, mood, drop, HP, AP)
            let currentEnemy = new Enemy(enemySpecs[0], enemySpecs[1], enemySpecs[2], enemySpecs[3], enemySpecs[4]);

            let grammarInsert = "";
            if (firstLetterVowel(currentEnemy.mood)) {
                grammarInsert = "n";
            }
            console.log(red, `\n\nA${grammarInsert} ${currentEnemy.mood.charAt(0).toLowerCase() + currentEnemy.mood.slice(1)} ${currentEnemy.species} is attacking!\n${yellow}(|Stats|) --- Mood: ${currentEnemy.mood}, HP: ${currentEnemy.healthPoints}, AP: ${currentEnemy.attackPower}\n`)

            console.log(cyan + "What will you do -- attempt to run (r) or fight (f)?")
            let decisionAttempt = readline.question(magenta)

            while(invalidDecisionResponse(decisionAttempt)) {
                console.log(yellow, "\nPlease choose to attempt to run (r) or fight (f).")
                decisionAttempt = readline.question(magenta)
            }

            if (decisionAttempt === "r") {
                if (getRandomInts(0, 2)[0] === 0) {
                    console.log(cyan, "You got away safely! Enter the 'w' key to continue walking.")
                    continue;
                } else {
                    console.log(hero)
                    currentEnemy.attack(hero)
                    console.log(currentEnemy)
                    console.log(hero)
                }
            }

        } else {
            console.log(cyan + "\nYou did not encounter anything...\n")
        }
    }


}

mainGame()