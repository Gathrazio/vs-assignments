const ansiPrepend = "\u001b";

const cyan = ansiPrepend + "[36;1m"
const magenta = ansiPrepend + "[35;1m";
const blue = ansiPrepend + "[34;1m";
const green = ansiPrepend + "[32;1m";
const red = ansiPrepend + "[31;1m";
const yellow = ansiPrepend + "[33;1m";
const white = ansiPrepend + "[37;1m";
const black = ansiPrepend + "[30;1m"

const readline = require("readline-sync");
const {execSync} = require("child_process");

const enemySpeciesArr = ["Mutant Spider", "King Orc", "Frost Drake"];
const enemyMoods = ["Enraged", "Annoyed", "Neutral"];
const mutantSpiderDrops = ["Golden Spider Eye", "Poison Fang", "Luxurious Silk", "Egg Sac", "Ruby Ring"];
const kingOrcDrops = ["Club of Destiny", "Amulet of Health", "Pork Chop", "Jade Chain", "Golden Cup"];
const frostDrakeDrops = ["Icicle Claw", "Dragon Head", "Drake Wing", "Clouded Eye", "Tarp Leather"];


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

function invalidFightResponse (fightAttempt) {
    if (fightAttempt != "f") {
        return true;
    }
}

function invalidPlayAgainResponse (playAgainAttempt) {
    if ((playAgainAttempt != "y") && (playAgainAttempt != "n")) {
        return true;
    }
}

function enemySpecsGenerator () {
    const enemySpecs = [];
    let dropsDiceRoll = getRandomInts(0, kingOrcDrops.length)[0];
    let moodAndSpeciesDiceRoll = getRandomInts(0, 3, 2)
    enemySpecs.push(enemySpeciesArr[moodAndSpeciesDiceRoll[0]]) // species
    enemySpecs.push(enemyMoods[moodAndSpeciesDiceRoll[1]]) // mood
        switch (enemySpecs[0]) {
            case "Mutant Spider":
                enemySpecs.push(mutantSpiderDrops[dropsDiceRoll]) // special drop
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
                enemySpecs.push(frostDrakeDrops[dropsDiceRoll])
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
                enemySpecs.push(kingOrcDrops[dropsDiceRoll])
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

function Enemy (species, mood, specialDrop, healthPoints, attackPower) {
    this.species = species;
    this.mood = mood;
    this.specialDrop = specialDrop;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
}

Enemy.prototype.attack = function(opponent) {
    const dealtDamage = getRandomInts(this.attackPower - 2, this.attackPower + 3)[0];
    if (dealtDamage < 0) {
        dealtDamage = 0;
    }
    opponent.healthPoints -= dealtDamage;
    return dealtDamage;
}

function Hero (name, attackPower, healthPoints) {
    this.name = name;
    this.inventory = [];
    this.killCount = 0;
    this.healthPoints = healthPoints
    this.attackPower = attackPower;
}

Hero.prototype.attack = Enemy.prototype.attack;

function mainGame () {
    console.log(`${blue}\n\n\n|-----${yellow}------------------------------------------------${blue}-----|`)
    execSync('sleep 0.5')
    console.log(cyan + "  Greetings, valiant warrior! The age of glory is upon us.")
    execSync('sleep 0.5')
    console.log(`${blue}|-----${yellow}------------------------------------------------${blue}-----|\n\n`)
    execSync('sleep 1')
    console.log(cyan, "\nWhat is your name, young hero?")
    const userName = readline.question(magenta)

    execSync('sleep 0.5');

    const courage = getRandomInts(5, 11)[0];
    let heroHPStart = getRandomInts(30, 61)[0]

    const hero = new Hero(userName, courage * 2, heroHPStart)

    console.log(cyan + `\nCourageous ${green}${hero.name}${cyan}, you are to set out on an adventure starting now. You have practiced the art of vanquishing your foes all your life, and today will be no different.\n`)

    execSync('sleep 2');

    console.log(cyan, `\nType and enter the (w) key to walk. Beware, however, ${red}monsters ${cyan}may appear...`)
    let walkAttempt = "";

    let heroAlive = true;
    let heroHPCurrent = heroHPStart;

    while (heroAlive) {
        if (walkAttempt != "w") {
            walkAttempt = readline.question(magenta)
            while (invalidWalkResponse(walkAttempt)) {
                console.log(yellow, "\nPlease enter the (w) key to walk.")
                walkAttempt = readline.question(magenta)
            }
        }

        walkAttempt = "";
        let diceRoll = getRandomInts(0, 3)[0];
        if (diceRoll === 0) {
            execSync('sleep 1');
            let [species, mood, drop, hp, ap] = enemySpecsGenerator();
            // Enemy(species, mood, drop, HP, AP)
            let currentEnemy = new Enemy(species, mood, drop, hp, ap);

            const lowerCaseMood = currentEnemy.mood.charAt(0).toLowerCase() + currentEnemy.mood.slice(1);

            let grammarInsert = "";
            if (firstLetterVowel(currentEnemy.mood)) {
                grammarInsert = "n";
            }
            console.log(red, `\n\nYou encountered a${grammarInsert} ${lowerCaseMood} ${currentEnemy.species}`)
            execSync("sleep 1")
            console.log(`and it is going to ATTACK you!\n`)
            execSync('sleep 1');
            console.log(`${currentEnemy.mood} ${currentEnemy.species}\n${yellow}(|Stats|) ~ AP: ${currentEnemy.attackPower}, HP: ${currentEnemy.healthPoints}\n`)

            console.log(`${green}Hero ${hero.name}\n(|Stats|) ~ Kill Count: ${hero.killCount}, AP: ${hero.attackPower}, HP: ${hero.healthPoints}\n`)
            execSync('sleep 0.5');
            console.log(cyan + "What will you do -- attempt to run (r) or fight (f)?")
            let decisionAttempt = readline.question(magenta)

            execSync('sleep 0.5');
            let decisionFailCount = 0;

            while(invalidDecisionResponse(decisionAttempt)) {
                console.log(yellow, "\nPlease choose to attempt to run (r) or fight (f).")
                decisionAttempt = readline.question(magenta)
                decisionFailCount += 1;
            }

            let enemyAlive = true;

            while (heroAlive && enemyAlive) {
                let escapedSafely = false;
                if (decisionAttempt === "r") {
                    execSync("sleep 1")
                    if (getRandomInts(0, 2)[0] === 0) {

                        console.log(cyan + "\nYou got away safely! Enter the (w) key to walk.")
                        escapedSafely = true;
                    } else {
                        let heroDamage = currentEnemy.attack(hero)

                        console.log(red + `\nYou failed to run away!`)
                        execSync("sleep 1")
                        console.log(`The ${lowerCaseMood} ${currentEnemy.species} attacked you anyways and did ${heroDamage} health points of damage.\n`)
                        execSync("sleep 1")
                        console.log(`${red}${currentEnemy.mood} ${currentEnemy.species}\n${yellow}(|Stats|) ~ AP: ${currentEnemy.attackPower}, HP: ${currentEnemy.healthPoints}\n`)
                        console.log(`${green}Hero ${hero.name}\n(|Stats|) ~ Kill Count: ${hero.killCount}, AP: ${hero.attackPower}, HP: ${hero.healthPoints}\n`)
                        execSync('sleep 0.5');
                        console.log(cyan + "Press (f) to fight.")
                        decisionAttempt = readline.question(magenta)
                        while (invalidFightResponse(decisionAttempt)) {
                            console.log(yellow, "\nPlease press (f) to fight.")
                            decisionAttempt = readline.question(magenta)
                        }
                    }
                } else {
                    if (decisionFailCount >= 1) {
                        execSync('sleep 0.5');
                    }
                    let enemyDamage = hero.attack(currentEnemy)
                    
                    console.log(`${cyan}\nYou attacked and did ${enemyDamage} health points of damage.\n`)

                    execSync('sleep 1');

                    if (currentEnemy.healthPoints <= 0) {
                        enemyAlive = false;
                        console.log(`${white}You successfully defeated the ${lowerCaseMood} ${currentEnemy.species}!`)
                        if (getRandomInts(0,2)[0] === 0) {
                            execSync('sleep 1');
                            console.log(`${blue}~${currentEnemy.specialDrop} was added to your inventory~`)
                            hero.inventory.push(currentEnemy.specialDrop)
                        }
                        execSync('sleep 1');
                        console.log(`${white}You rested for a while and your HP returned to normal.\n`)
                        hero.healthPoints = heroHPCurrent;
                        execSync('sleep 2');
                        console.log(`${white}But also, your stats increased:\n`)
                        execSync('sleep 1');
                        console.log(`${green}Hero ${hero.name}\n(|Stats|) ~ Kill Count: ${hero.killCount} ${yellow}+ 1${green}, AP: ${hero.attackPower} ${yellow}+ 5${green}, HP: ${hero.healthPoints} + ${yellow}10${green}.\n`)
                        hero.attackPower += 5;
                        hero.healthPoints += 10;
                        heroHPCurrent = hero.healthPoints;
                        hero.killCount += 1;
                        execSync('sleep 0.5');
                        console.log(`${cyan}Press (w) to continue walking.`)
                        continue;
                    }
                    heroDamage = currentEnemy.attack(hero)
                    console.log(`${red}The ${lowerCaseMood} ${currentEnemy.species} attacked you and did ${heroDamage} health points of damage.\n`)
                    execSync('sleep 1');
                    if (hero.healthPoints <= 0) {
                        heroAlive = false;
                        console.log(`${red}You were slaughtered by the ${lowerCaseMood} ${currentEnemy.species}!\n`)
                        execSync('sleep 1');
                        console.log(`${cyan}What you collected: ${hero.inventory}\n\n`)
                        console.log(`${cyan}Would you like to play again? Press (y) or (n).`)
                        let playAgainAttempt = readline.question(magenta)
                        while (invalidPlayAgainResponse(playAgainAttempt)) {
                            console.log(yellow + "\nPlease press (y) or (n) to play again or not.")
                            playAgainAttempt = readline.question(magenta)
                        }
                        if (playAgainAttempt = "y") {
                            execSync('sleep 0.5');
                            mainGame()
                        } else {
                            execSync('sleep 0.5');
                        }
                        continue;
                    }
                    console.log(`${red}${currentEnemy.mood} ${currentEnemy.species}\n${yellow}(|Stats|) ~ AP: ${currentEnemy.attackPower}, HP: ${currentEnemy.healthPoints}\n`)
                    console.log(`${green}Hero ${hero.name}\n(|Stats|) ~ Kill Count: ${hero.killCount}, AP: ${hero.attackPower}, HP: ${hero.healthPoints}\n`)
                    execSync('sleep 0.5');
                    console.log(cyan + "Press (f) to fight.")
                    decisionAttempt = readline.question(magenta)
                    while (invalidFightResponse(decisionAttempt)) {
                        console.log(yellow, "\nPlease press (f) to fight.")
                        decisionAttempt = readline.question(magenta)
                    }
                }
                if (escapedSafely) {
                    break;
                }
            }
        } else {
            execSync('sleep 0.5');
            console.log(cyan + "\nYou did not encounter anything...")
        }
    }


}

mainGame()