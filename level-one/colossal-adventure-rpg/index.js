const ansiPrepend = "\u001b";

const cyan = ansiPrepend + "[36;1m"
const magenta = ansiPrepend + "[35;1m";
const blue = ansiPrepend + "[34;1m";
const green = ansiPrepend + "[32;1m";
const red = ansiPrepend + "[31;1m";
const yellow = ansiPrepend + "[33;1m";
const white = ansiPrepend + "[37;1m";
const black = ansiPrepend + "[30;1m"

const h = "\u2015\u2015";

const whiteBackground = ansiPrepend  + "[47m";

const clearScreen = ansiPrepend + "[2J";
const styleReset = ansiPrepend + "[0m";

const readline = require("readline-sync");
const {execSync} = require("child_process");
const { get } = require("http");

const enemySpeciesArr = ["Mutant Spider", "King Orc", "Frost Drake", "Eternal Ghast", "Rock Golem"];
const enemyMoods = ["Enraged", "Annoyed", "Neutral"];
const mutantSpiderDrops = ["Golden Spider Eye", "Poison Fang", "Luxurious Silk", "Egg Sac", "Ruby Ring"];
const kingOrcDrops = ["Club of Destiny", "Amulet of Health", "Pork Chop", "Jade Chain", "Golden Cup"];
const frostDrakeDrops = ["Icicle Claw", "Dragon Head", "Drake Wing", "Clouded Eye", "Tarp Leather"];
const eternalGhastDrops = ["Reaper Wrap", "Bottle of Fog", "Dark Core", "Ancient Bone", "Medal of Courage"];
const rockGolemDrops = ["Menacing Marble Statue", "Puppet Twine", "Heavy Heart", "Love of the Ward", "Silver Ingot"];


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





function enemySpecsGenerator () {
    const enemySpecs = [];
    let dropsDiceRoll = getRandomInts(0, kingOrcDrops.length)[0];
    let speciesDiceRoll = getRandomInts(0, 5)[0];
    let moodDiceRoll = getRandomInts(0,3)[0];
    enemySpecs.push(enemySpeciesArr[speciesDiceRoll]) // species
    enemySpecs.push(enemyMoods[moodDiceRoll]) // mood
        switch (enemySpecs[0]) {
            case "Mutant Spider":
                enemySpecs.push(mutantSpiderDrops[dropsDiceRoll]) // special drop
                enemySpecs.push(getRandomInts(20, 41)[0]) // health points
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(3, 8)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(7, 15)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(10, 18)[0])
                }
                break;
            case "Frost Drake":
                enemySpecs.push(frostDrakeDrops[dropsDiceRoll])
                enemySpecs.push(getRandomInts(50, 71)[0])
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(5, 12)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(8, 20)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(14, 23)[0])
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
                        enemySpecs.push(getRandomInts(26, 35)[0])
                }
                break;
            case "Eternal Ghast":
                enemySpecs.push(eternalGhastDrops[dropsDiceRoll])
                enemySpecs.push(getRandomInts(30, 61)[0])
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(4, 10)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(7, 15)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(12, 22)[0])
                }
                break;
            case "Rock Golem":
                enemySpecs.push(rockGolemDrops[dropsDiceRoll])
                enemySpecs.push(getRandomInts(90, 130)[0])
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(2, 6)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(6, 11)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(10, 13)[0])
                }
        }
    return enemySpecs;
}

function addDropToInventory (hero, enemyDrop) {
    if (hero.inventory.length > 0) {
        let dropIndex = -1;
        for (i = 0; i < hero.inventory.length; i++) {
            if (hero.inventory[i].drop === enemyDrop) {
                dropIndex = i;
            }
        }
        if (dropIndex === -1) {
            const newEnemyDrop = {
                drop: enemyDrop,
                multiplicity: 1
            }
            hero.inventory.push(newEnemyDrop)
        } else {
            hero.inventory[dropIndex].multiplicity += 1;
        }
    } else {
        const firstEnemyDrop = {
            drop: enemyDrop,
            multiplicity: 1
        }
        hero.inventory.push(firstEnemyDrop)
    }
}





function displayFinalStats(hero) {
    console.log(`\n\n${white}Final Stats`)
    execSync('sleep 0.3')
    console.log(`${yellow}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}|`)
    execSync('sleep 0.3')
    displayHeroStats(hero)
    execSync('sleep 0.3')
    displayInventory(hero)
    execSync('sleep 0.3')
    console.log(`\n${yellow}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}|`)
}

function displayInventory (hero, color = white) {
    console.log(`${color}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}`)
    execSync("sleep 0.2")

    if (hero.inventory.join()) {
        for (i = 0; i < hero.inventory.length; i++) {
            if (i === hero.inventory.length - 1) {
                console.log(`${color}• ${yellow}${hero.inventory[i].drop} ${color}× ${white}${hero.inventory[i].multiplicity}`)
            } else {
                console.log(`${color}• ${yellow}${hero.inventory[i].drop} ${color}× ${white}${hero.inventory[i].multiplicity}\n`)
            }
            execSync("sleep 0.2")
        }
    } else {
        console.log(`${color}|| ${yellow}Inventory is empty.`)
        execSync("sleep 0.2")
    }
    console.log(`${color}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}`)
}

function displayHeroStats (hero, background = "") {
    console.log(`\n${background}${green}Hero ${hero.name}`)
    execSync("sleep 0.3")
    console.log(`(|Stats|) ~ Kill Count: ${red}${hero.killCount}${green}, AP: ${magenta}${hero.attackPower}${green}, ${h}${h}\u2015 ${white}[HP: ${hero.healthPoints}]\n`)
}

function displayEnemyStats (currentEnemy) {
    let horizontalBar = `${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}`;
    if (currentEnemy.attackPower < 10) {
        horizontalBar = `${horizontalBar}\u2015`;
    }

    console.log(`${currentEnemy.mood} ${currentEnemy.species}`)
    execSync("sleep 0.3")
    console.log(`${yellow}(|Stats|) ~ AP: ${magenta}${currentEnemy.attackPower}${yellow}, ${horizontalBar} ${white}[HP: ${currentEnemy.healthPoints}]\n`)
}





function Enemy (species, mood, specialDrop, healthPoints, attackPower) {
    this.species = species;
    this.mood = mood;
    this.specialDrop = specialDrop;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
}

Enemy.prototype.attack = function(opponent) {
    let dealtDamage = getRandomInts(this.attackPower - 2, this.attackPower + 3)[0];
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
    console.log(`${blue}\n\n\n|-----${yellow}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${blue}-----|`)
    execSync('sleep 0.5')
    console.log(cyan + "  Greetings, valiant warrior! The age of glory is upon us.")
    execSync('sleep 0.5')
    console.log(`${blue}|-----${yellow}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${blue}-----|\n\n`)
    execSync('sleep 1')
    console.log(cyan, "\nWhat is your name, young hero?")
    const userName = readline.question(magenta)

    execSync('sleep 1');

    const courage = getRandomInts(5, 11)[0];
    let heroHPStart = getRandomInts(30, 61)[0]

    const hero = new Hero(userName, courage * 2, heroHPStart)

    console.log(`${cyan}\nCourageous ${green}${hero.name}${cyan}, you are to set out on an ${white}adventure ${cyan}starting now. You have practiced the art of ${red}vanquishing foes${cyan} all your life, and today will be no different.\n`)

    execSync('sleep 2');

    console.log(cyan, `\nType and enter the (${white}w${cyan}) key to walk or the (${white}i${cyan}) key to print your stats and item inventory.`)
    execSync('sleep 1')
    console.log(`Beware, however, ${red}monsters ${cyan}may appear...`)
    let walkAttempt = "";

    let heroAlive = true;
    let heroHPCurrent = heroHPStart;
    let recentlyKilledEnemy = false;

    while (heroAlive) {
        if (walkAttempt != "w") {
            walkAttempt = readline.question(magenta)
            while (invalidWalkResponse(walkAttempt)) {
                if ((walkAttempt === "i") && !recentlyKilledEnemy) {
                    execSync("sleep 0.3")
                    console.log(`\n`)
                    displayHeroStats(hero)
                    execSync("sleep 0.5")
                    displayInventory(hero)
                    execSync("sleep 0.5")
                    console.log(`${cyan}\n\n\nEnter (${white}w${cyan}) to walk or (${white}i${cyan}) for inventory and stats.`)
                    walkAttempt = readline.question(magenta)
                    continue;
                } else if (walkAttempt != "w" && recentlyKilledEnemy) {
                    console.log(`${yellow}Please enter (${white}w${yellow}) to walk.`)
                } else {
                    console.log(`${yellow}Please enter (${white}w${yellow}) to walk or (${white}i${yellow}) for inventory and stats.`)
                }
                walkAttempt = readline.question(magenta)
            }
        }

        recentlyKilledEnemy = false;

        walkAttempt = "";
        let diceRoll = getRandomInts(0, 3)[0];
        if (diceRoll === 0) {
            execSync('sleep 1');
            let [species, mood, drop, hp, ap] = enemySpecsGenerator();

            let currentEnemy = new Enemy(species, mood, drop, hp, ap);

            const lowerCaseMood = currentEnemy.mood.charAt(0).toLowerCase() + currentEnemy.mood.slice(1);

            let grammarInsert = "";
            if (firstLetterVowel(currentEnemy.mood)) {
                grammarInsert = "n";
            }
            console.log(red, `\n\n\n\nYou encountered a${grammarInsert} ${lowerCaseMood} ${currentEnemy.species}...`)
            execSync("sleep 1")
            console.log(`...and it is going to ${yellow}ATTACK ${red}you!\n\n\n`)
            execSync('sleep 1');
            displayEnemyStats(currentEnemy)
            execSync("sleep 0.3")
            displayHeroStats(hero)
            execSync('sleep 0.5');
            console.log(`\n\n${cyan}What will you do -- attempt to run (${white}r${cyan}) or resolve to fight (${white}f${cyan})?`)
            let decisionAttempt = readline.question(magenta)

            let decisionFailCount = 0;

            while(invalidDecisionResponse(decisionAttempt)) {
                console.log(`${yellow}Please choose to attempt to run (${white}r${yellow}) or resolve to fight (${white}f${yellow}).`)
                decisionAttempt = readline.question(magenta)
                decisionFailCount += 1;
            }

            execSync('sleep 0.5');

            let enemyAlive = true;

            while (heroAlive && enemyAlive) {
                let escapedSafely = false;
                if (decisionAttempt === "r") {
                    execSync("sleep 1")
                    if (getRandomInts(0, 2)[0] === 0) {

                        console.log(`${cyan}\n\n\nYou got away safely! Enter (${white}w${cyan}) to walk or (${white}i${cyan}) for inventory and stats.`)
                        escapedSafely = true;
                    } else {
                        let heroDamage = currentEnemy.attack(hero)

                        console.log(red + `\n\n\nYou failed to run away!`)
                        execSync("sleep 1")
                        console.log(`The ${lowerCaseMood} ${currentEnemy.species} attacked you anyways and did ${white}${heroDamage} ${red}health points of damage.\n\n\n`)
                        execSync("sleep 1")
                        displayEnemyStats(currentEnemy)
                        execSync("sleep 0.3")
                        displayHeroStats(hero)
                        execSync('sleep 0.5');
                        console.log(`${cyan}\n\nEnter (${white}f${cyan}) to fight.`)
                        decisionAttempt = readline.question(magenta)
                        while (invalidFightResponse(decisionAttempt)) {
                            console.log(`${yellow}Please enter (${white}f${yellow}) to fight.`)
                            decisionAttempt = readline.question(magenta)
                        }
                    }
                } else {
                    if (decisionFailCount >= 1) {
                        execSync('sleep 0.5');
                    }
                    let enemyDamage = hero.attack(currentEnemy)
                    execSync('sleep 0.5');
                    console.log(`${cyan}\n\n\nYou attacked and did ${white}${enemyDamage} ${cyan}health points of damage.`)

                    execSync('sleep 1');

                    if (currentEnemy.healthPoints <= 0) {
                        enemyAlive = false;
                        console.log(`\n\n\n\n${white}You ${green}successfully ${white}defeated the ${red}${lowerCaseMood} ${currentEnemy.species}${white}!`)
                        if (getRandomInts(0,2)[0] === 0) {
                            execSync('sleep 0.5');
                            console.log(`${blue}${yellow}${currentEnemy.specialDrop} ${blue}was added to your inventory.`)
                            addDropToInventory(hero, currentEnemy.specialDrop)
                        }
                        execSync('sleep 0.5');
                        console.log(`${white}You rested for a while and your HP returned to normal.\n`)
                        hero.healthPoints = heroHPCurrent;
                        execSync('sleep 1.5');
                        console.log(`${white}But also, your stats ${green}increased${white}:\n`)
                        execSync('sleep 0.5');
                        console.log(`${green}Hero ${hero.name}\n(|Stats|) ~ Kill Count: ${red}${hero.killCount} ${yellow}+ 1${green}, AP: ${magenta}${hero.attackPower} ${yellow}+ 5${green}, HP: ${white}${hero.healthPoints} ${green}+ ${yellow}10${green}\n`)
                        execSync('sleep 0.5')
                        console.log(`${white}Here is your up-to-date inventory:\n`)
                        execSync('sleep 0.5')
                        displayInventory(hero, blue)
                        hero.attackPower += 5;
                        hero.healthPoints += 10;
                        heroHPCurrent = hero.healthPoints;
                        hero.killCount += 1;
                        execSync('sleep 0.5');
                        console.log(`\n\n${cyan}Enter (${white}w${cyan}) to continue walking.`)
                        recentlyKilledEnemy = true;
                        continue;
                    }
                    heroDamage = currentEnemy.attack(hero)
                    console.log(`${red}The ${lowerCaseMood} ${currentEnemy.species} attacked you and did ${white}${heroDamage} ${red}health points of damage.\n\n\n`)
                    execSync('sleep 1');
                    if (hero.healthPoints <= 0) {
                        heroAlive = false;
                        execSync("sleep 1.5")
                        console.log(`\n\n${red}You were slaughtered by the ${lowerCaseMood} ${currentEnemy.species}! :(\n\n\n\n`)
                        hero.healthPoints = heroHPCurrent;
                        execSync('sleep 1');
                        displayFinalStats(hero)
                        execSync("sleep 1")
                        console.log(`\n\n\n\n\n${cyan}Would you like to play again? Enter (${white}y${cyan}) or (${white}n${cyan}).`)
                        let playAgainAttempt = readline.question(magenta)
                        while (invalidPlayAgainResponse(playAgainAttempt)) {
                            console.log(`${yellow}Please Enter (${white}y${yellow}) or (${white}n${yellow}) to play again or not.`)
                            playAgainAttempt = readline.question(magenta)
                        }
                        if (playAgainAttempt === "y") {
                            execSync('sleep 0.5');
                            mainGame()
                        } else {
                            console.log(`\n\n`)
                            execSync('sleep 0.5');
                            return;
                        }
                    }
                    displayEnemyStats(currentEnemy)
                    execSync("sleep 0.3")
                    displayHeroStats(hero)
                    execSync('sleep 0.5');
                    console.log(`\n\n${cyan}Enter (${white}f${cyan}) to fight.`)
                    decisionAttempt = readline.question(magenta)
                    while (invalidFightResponse(decisionAttempt)) {
                        console.log(`${yellow}Please Enter (${white}f${yellow}) to fight.`)
                        decisionAttempt = readline.question(magenta)
                    }
                }
                if (escapedSafely) {
                    break;
                }
            }
        } else {
            execSync('sleep 0.5');
            console.log(`${cyan}\nYou did not encounter anything... (${white}w${cyan} to walk and ${white}i${cyan} for inventory)`)
        }
    }


}

mainGame()