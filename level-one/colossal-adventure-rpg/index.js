const aNSIPrefix = "\u001b";

const cyan = aNSIPrefix + "[36;1m"
const magenta = aNSIPrefix + "[35;1m";
const blue = aNSIPrefix + "[34;1m";
const green = aNSIPrefix + "[32;1m";
const red = aNSIPrefix + "[31;1m";
const yellow = aNSIPrefix + "[33;1m";
const white = aNSIPrefix + "[37;1m";
const black = aNSIPrefix + "[30;1m"

const h = "\u2015\u2015";

const whiteBackground = aNSIPrefix  + "[47m";

const clearScreen = aNSIPrefix + "[2J";
const styleReset = aNSIPrefix + "[0m";

const readline = require("readline-sync");
const {execSync} = require("child_process");

const dPS = 'sleep 0.2' // display print speed
const tPS = 'sleep 1' // dialogue print speed

const enemySpeciesArr = ["Mutant Spider", "Eternal Ghast", "Frost Drake",  "Rock Golem", "King Orc"];
// const enemyMoods = ["Enraged", "Annoyed", "Neutral"];

const mutantSpiderDrops = ["Luxurious Silk", "Egg Sac"];
const eternalGhastDrops = ["Reaper Wrap", "Ancient Bone"];
const frostDrakeDrops = ["Icicle Claw", "Tarp Leather"];
const rockGolemDrops = ["Heavy Heart", "Love of the Ward"];
const kingOrcDrops = ["Club of Destiny", "Jade Chain"];

// Note: all enemy HP or AP ranges have inclusive endpoints

const enemyHR = [ // enemy health range matrix
    [20, 60],   // matrix[0] => mutant spider
    [30, 70],   // matrix[1] => eternal ghast
    [50, 110],   // matrix[2] => frost drake
    [90, 250],  // matrix[3] => rock golem
    [80, 140]   // matrix[4] => king orc
]

const mSAPR = [ // Mutant Spider attack power range matrix, by mood
    [3, 7],   // matrix[0] => neutral
    [7, 14],   // matrix[1] => annoyed
    [10, 17]  // matrix[2] => enraged
]

const eGAPR = [ // Eternal Ghast
    [4, 9],
    [7, 14],
    [12, 21]
]

const fDAPR = [ // Frost Drake
    [5, 12],
    [18, 20],
    [14, 23]
]

const rGAPR = [ // Rock Golem
    [2, 5],
    [6, 10],
    [10, 12]
]

const kOAPR = [ // King Orc
    [10, 14],
    [16, 24],
    [26, 34]
]

const heroAPHPStart = [
    [600, 800], // hero's starting AP range
    [40, 60] // hero's starting HP range
]

const heroAPHP = [
    [[7, 2], [15, 3]], // heroAPHP[0]: early game (AP range: (10, 20), HP range: (30, 60))
    [[5, 1], [12, 2]], // heroAPHP[1]: mid game (AP range: (21, 35), HP range: (60, 120))
    [[3, 1], [8, 2]]  // heroAPHP[2]: late game (AP range: 40 +, HP range: 120 +)
]

/*
Note that the heroAPHP[i] are themselves matrices, where each row (each heroAPHP[i][j] where j = {0, 1}) is an average AP or HP gain along with an associated margin. For example, heroAPHP[0] is the matrix

[[4, 2],
 [10, 3]]

which is a collection of information that is only relevant when the hero's AP and HP are in specific ranges. heroAPHP[0][0] is [4, 2], which means an average AP gain of 4, plus or minus 2 points ( really, the new additional AP to be added onto the hero's will be generated via getRandomInts(4 - 2, (4 + 2) + 1)[0]. ). heroAPHP[0][1] is [10, 3], which means an average HP gain of 10, plus or minus 3 points.
*/


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

function firstLetterVowel (word) { // returns true if the first letter of the word set as the function's parameter is a vowel, regardless of capitalization
    const vowels = ["a", "e", "i", "o", "u"];
    for (i = 0; i < vowels.length; i++) {
        if (word[0].toLowerCase() === vowels[i]) {
            return true;
        }
    }
}



function generateMood(hero) { // the higher the hero's attack power, the more likely the enemies are to spawn more angry (and thus have more attack power)
    const raffle = getRandomInts(1, 13)[0];
    if (hero.attackPower <= 20) {
        if (raffle === 12) {
            return "Enraged";
        } else if ((raffle === 11) || (raffle === 10)) {
            return "Annoyed";
        }
        return "Neutral";
    } else if ((hero.attackPower >= 21) && (hero.attackPower <= 35)) {
        if ((raffle === 12) || (raffle === 11)) {
            return "Enraged";
        } else if ((raffle >= 8) && (raffle <= 10)) {
            return "Annoyed";
        }
        return "Neutral";
    } else if ((hero.attackPower >= 36) && (hero.attackPower <= 60)) {
        if((raffle >= 1) && (raffle <= 3)) {
            return "Neutral";
        } else if ((raffle >= 4) && (raffle <= 8)) {
            return "Annoyed";
        }
        return "Enraged";
    } else {
        return "Enraged";
    }
}

function generateEnemyHP([min, max], hero) {
    if (hero.healthPoints <= 60) {
        return getRandomInts(min, min + Math.floor((max - min)/3))[0];
    } else if ((hero.healthPoints >= 61) || (hero.healthPoints <= 120)) {
        return getRandomInts(min + Math.floor((max - min)/3), min + Math.floor(2 * (max - min) / 3))[0];
    } else {
        return getRandomInts(min + Math.floor(2 * (max - min) / 3), max + 1)[0];
    }
}

function enemySpecsGenerator (hero) {
    const enemySpecs = [];
    let dropsDiceRoll = getRandomInts(0, kingOrcDrops.length)[0];
    let speciesDiceRoll = getRandomInts(0, 5)[0];
    enemySpecs.push(enemySpeciesArr[speciesDiceRoll]) // species
    enemySpecs.push(generateMood(hero)) // mood
        switch (enemySpecs[0]) {
            case "Mutant Spider":
                enemySpecs.push(mutantSpiderDrops[dropsDiceRoll]) // special drop
                enemySpecs.push(generateEnemyHP(enemyHR[0], hero)) // health points
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(mSAPR[0][0], mSAPR[0][1] + 1)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(mSAPR[1][0], mSAPR[1][1] + 1)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(mSAPR[2][0], mSAPR[2][1] + 1)[0])
                }
                break;
            case "Eternal Ghast":
                enemySpecs.push(eternalGhastDrops[dropsDiceRoll])
                enemySpecs.push(generateEnemyHP(enemyHR[1], hero))
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(eGAPR[0][0], eGAPR[0][1] + 1)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(eGAPR[1][0], eGAPR[1][1] + 1)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(eGAPR[2][0], eGAPR[2][1] + 1)[0])
                }
                break;
            case "Frost Drake":
                enemySpecs.push(frostDrakeDrops[dropsDiceRoll])
                enemySpecs.push(generateEnemyHP(enemyHR[2], hero))
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(fDAPR[0][0], fDAPR[0][1] + 1)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(fDAPR[1][0], fDAPR[1][1] + 1)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(fDAPR[2][0], fDAPR[2][1] + 1)[0])
                }
                break;
            case "Rock Golem":
                enemySpecs.push(rockGolemDrops[dropsDiceRoll])
                enemySpecs.push(generateEnemyHP(enemyHR[3], hero))
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(rGAPR[0][0], rGAPR[0][1] + 1)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(rGAPR[1][0], rGAPR[1][1] + 1)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(rGAPR[2][0], rGAPR[2][1] + 1)[0])
                }
                break;
            case "King Orc":
                enemySpecs.push(kingOrcDrops[dropsDiceRoll])
                enemySpecs.push(generateEnemyHP(enemyHR[4], hero))
                switch (enemySpecs[1]) {
                    case "Neutral":
                        enemySpecs.push(getRandomInts(kOAPR[0][0], kOAPR[0][1] + 1)[0])
                        break;
                    case "Annoyed":
                        enemySpecs.push(getRandomInts(kOAPR[1][0], kOAPR[1][1] + 1)[0])
                        break;
                    case "Enraged":
                        enemySpecs.push(getRandomInts(kOAPR[2][0], kOAPR[2][1] + 1)[0])
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
    execSync(tPS)
    console.log(`${white}Final Stats`)

    execSync('sleep 1.3')
    console.log(`${yellow}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}|`)

    execSync('sleep 0.2')
    displayHeroStats(hero)
    execSync('sleep 0.4')
    displayInventory(hero)

    execSync('sleep 0.5')
    console.log(`${yellow}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}|`)
}

function displayInventory (hero, color = white) {
    execSync(dPS)
    console.log(`${color}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}`)
    if (hero.inventory.length > 0) {
        for (i = 0; i < hero.inventory.length; i++) {
            execSync(dPS)
            if (i === hero.inventory.length - 1) {
                console.log(`${color}• ${yellow}${hero.inventory[i].drop} ${color}× ${white}${hero.inventory[i].multiplicity}`)
            } else {
                console.log(`${color}• ${yellow}${hero.inventory[i].drop} ${color}× ${white}${hero.inventory[i].multiplicity}\n`)
            }
        }
    } else {
        execSync(dPS)
        console.log(`${color}|| ${yellow}Inventory is empty.`)
    }
    execSync(dPS)
    console.log(`${color}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}`)
}

function displayHeroStats (hero, background = "") {
    execSync(dPS)
    console.log(`${background}${green}Hero ${hero.name}`)

    execSync(dPS)
    console.log(`(|Stats|) ~ Kill Count: ${red}${hero.killCount}${green}, AP: ${magenta}${hero.attackPower}${green}, ${h}${h}\u2015 ${white}[HP: ${hero.healthPoints}]`)
}

function displayEnemyStats (currentEnemy) {
    let horizontalBar = `${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}`;
    if (currentEnemy.attackPower < 10) {
        horizontalBar = `${horizontalBar}\u2015`;
    }

    execSync(tPS)
    console.log(`${currentEnemy.mood} ${currentEnemy.species}`)

    execSync(dPS)
    console.log(`${yellow}(|Stats|) ~ AP: ${magenta}${currentEnemy.attackPower}${yellow}, ${horizontalBar} ${white}[HP: ${currentEnemy.healthPoints}]`)
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


function gameIntro () {
    execSync('sleep 1')
    console.log(`${blue}\n\n\n\n|-----${yellow}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${blue}-----|`)

    execSync(dPS)
    console.log(cyan + "  Greetings, valiant warrior! The age of glory is upon us.")

    execSync(dPS)
    console.log(`${blue}|-----${yellow}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${h}${blue}-----|\n\n`)

    execSync(tPS)
    console.log(`${cyan}What is your name, young hero?`)

    const userName = readline.question(magenta)
    const heroAPStart = getRandomInts(heroAPHPStart[0][0], heroAPHPStart[0][1])[0];
    let heroHPStart = getRandomInts(heroAPHPStart[1][0], heroAPHPStart[1][0])[0];
    const hero = new Hero(userName, heroAPStart, heroHPStart)

    execSync(tPS)
    console.log(`${cyan}Courageous ${green}${hero.name}${cyan}, you are to set out on an ${white}adventure ${cyan}starting now.`)

    execSync(tPS)
    console.log(`${cyan}Enter the (${white}w${cyan}) key to walk, the (${white}i${cyan}) key for your item inventory and personal statistics, or the (${white}q${cyan}) to quit the current game. Beware, however, ${red}monsters ${cyan}may appear...`)
    return hero;
}

function walkReconciler(playAgain, walkAttempt, recentlyKilledEnemy, hero) {
    if (walkAttempt != "w") {
        walkAttempt = readline.question(magenta)
        while (invalidWalkResponse(walkAttempt)) {
            if ((walkAttempt === "i") && !recentlyKilledEnemy) {
                displayHeroStats(hero)

                execSync('sleep 0.2')
                displayInventory(hero)

                execSync('sleep 0.5')
                console.log(`${cyan}Enter (${white}w${cyan}) to walk, (${white}i${cyan}) for inventory and stats, or (${white}q${cyan}) to quit the current game.`)
                walkAttempt = readline.question(magenta)
                continue;
            } else if ((walkAttempt != "w") && (walkAttempt != "q") && recentlyKilledEnemy) {
                execSync(tPS)
                console.log(`${yellow}Please enter (${white}w${yellow}) to walk or (${white}q${yellow}) to quit the current game.`)
            } else if (walkAttempt === "q") {
                displayFinalStats(hero)
                playAgain = playAgainPrompt();
                if (playAgain === "n") {
                    return ["", "", true, false];
                }
                return ["", "", true, true];
            } else {
                execSync(tPS)
                console.log(`${yellow}Please enter (${white}w${yellow}) to walk, (${white}i${yellow}) for inventory and stats, or (${white}q${yellow}) to quit the current game.`)
            }
            walkAttempt = readline.question(magenta)
        }
    }
    return ["", false, false, false];
}

function encounterEnemy (hero) {
    let [species, mood, drop, hP, aP] = enemySpecsGenerator(hero);
    let currentEnemy = new Enemy(species, mood, drop, hP, aP);
    const lowerCaseMood = currentEnemy.mood.charAt(0).toLowerCase() + currentEnemy.mood.slice(1);
    let grammarInsert = "";
    if (firstLetterVowel(currentEnemy.mood)) { grammarInsert = "n"; }

    execSync(tPS)
    console.log(`${red}You encountered a${grammarInsert} ${lowerCaseMood} ${currentEnemy.species} and it is going to ${yellow}ATTACK ${red}you!`)
    displayEnemyStats(currentEnemy)

    execSync(dPS)
    displayHeroStats(hero)
    return [currentEnemy, true, lowerCaseMood, grammarInsert];
}

function noEncounterNotif() {
    execSync(dPS)
    console.log(`${cyan}You did not encounter anything... (${white}w${cyan} to walk, ${white}i${cyan} for inventory and stats, ${white}q${cyan} to quit the current game)`)
}

function decideRunOrFight () {
    execSync(tPS)
    console.log(`${cyan}What will you do -- attempt to run (${white}r${cyan}) or resolve to fight (${white}f${cyan})?`)
    let decisionAttempt = readline.question(magenta)
    let decisionFailCount = 0;
    while(invalidDecisionResponse(decisionAttempt)) {
        console.log(`${yellow}Please choose to attempt to run (${white}r${yellow}) or resolve to fight (${white}f${yellow}).`)
        decisionAttempt = readline.question(magenta)
        decisionFailCount += 1;
    }
    return [decisionAttempt, decisionFailCount];
}

function tryToRun (hero, currentEnemy, lowerCaseMood) {
    if (getRandomInts(0, 2)[0] === 0) {
        execSync(tPS)
        console.log(`${cyan}You got away safely! Enter (${white}w${cyan}) to walk, (${white}i${cyan}) for inventory and stats, or (${white}q${cyan}) to quit the current game.`)
        return [true, ""];
    } else {
        let heroDamage = currentEnemy.attack(hero)

        execSync('sleep 1.5')
        console.log(red + `You failed to run away!`)

        execSync(tPS)
        console.log(`The ${lowerCaseMood} ${currentEnemy.species} attacked you anyways and did ${white}${heroDamage} ${red}health points of damage.`)
        displayEnemyStats(currentEnemy)
        execSync(dPS)
        displayHeroStats(hero)
        return [false, obtainFightResponse()];
    }
}

function potentiallyAddEnemyDrop (hero, currentEnemy) {
    execSync(tPS)
    if (currentEnemy.mood === "Enraged") {
        console.log(`${blue}${yellow}${currentEnemy.specialDrop} ${blue}was added to your inventory.`)
        addDropToInventory(hero, currentEnemy.specialDrop)
    } else {
        if (getRandomInts(0,2)[0] === 0) {
            console.log(`${blue}${yellow}${currentEnemy.specialDrop} ${blue}was added to your inventory.`)
            addDropToInventory(hero, currentEnemy.specialDrop)
        }
    }
}


// stat upgrades will change depending on how far into the game the hero is -- and for this we will use the hero's AP. Since the AP and HP gain decreases linearly as the hero grows, we could've potentially used HP. But there isn't really a need to use both as a result!
function generateUpgradedStats(hero) {
    let statChanges = [];
    if (hero.attackPower <= 20) {
        statChanges.push(getRandomInts(heroAPHP[0][0][0] - heroAPHP[0][0][1], heroAPHP[0][0][0] + heroAPHP[0][0][1] + 1)[0])
        statChanges.push(getRandomInts(heroAPHP[0][1][0] - heroAPHP[0][1][1], heroAPHP[0][1][0] + heroAPHP[0][1][1] + 1)[0])
    } else if ((hero.attackPower >= 21) && (hero.attackPower <= 40)) {
        statChanges.push(getRandomInts(heroAPHP[1][0][0] - heroAPHP[1][0][1], heroAPHP[1][0][0] + heroAPHP[1][0][1] + 1)[0])
        statChanges.push(getRandomInts(heroAPHP[1][1][0] - heroAPHP[1][1][1], heroAPHP[1][1][0] + heroAPHP[1][1][1] + 1)[0])
    } else {
        statChanges.push(getRandomInts(heroAPHP[2][0][0] - heroAPHP[2][0][1], heroAPHP[2][0][0] + heroAPHP[2][0][1] + 1)[0])
        statChanges.push(getRandomInts(heroAPHP[2][1][0] - heroAPHP[2][1][1], heroAPHP[2][1][0] + heroAPHP[2][1][1] + 1)[0])
    }
    return statChanges;
}

function upgradeStats (hero) {
    execSync('sleep 1.5')
    console.log(`${white}But also, your stats ${green}increased${white}:`)
    let [aPIncrease, hPIncrease] = generateUpgradedStats(hero);

    execSync('sleep 0.7')
    console.log(`${green}Hero ${hero.name}`)

    execSync(dPS)
    console.log(`(|Stats|) ~ Kill Count: ${red}${hero.killCount} ${green}+ ${yellow}1${green}, AP: ${magenta}${hero.attackPower} ${green}+ ${yellow}${aPIncrease}${green}, ${white}[HP: ${white}${hero.healthPoints} + ${yellow}${hPIncrease}${white}]`)
    hero.killCount += 1;
    hero.attackPower += aPIncrease;
    hero.healthPoints += hPIncrease;
    return hero.healthPoints;
}

function enemyDeath (hero, currentEnemy, heroHPCurrent, enemyAlive, recentlyKilledEnemy) {
    enemyAlive = false;
    recentlyKilledEnemy = true;

    execSync('sleep 2')
    console.log(`${white}You ${green}successfully ${white}defeated the ${red}${lowerCaseMood} ${currentEnemy.species}${white}!`)
    potentiallyAddEnemyDrop(hero, currentEnemy)

    execSync(tPS)
    console.log(`${white}You rested for a while and your HP returned to normal.`)
    hero.healthPoints = heroHPCurrent;
    const newHeroHp = upgradeStats(hero);

    execSync(tPS)
    console.log(`${white}Here is your up-to-date inventory:`)

    execSync('sleep 0.7')
    displayInventory(hero, blue)

    execSync(tPS)
    console.log(`${cyan}Enter (${white}w${cyan}) to continue walking or (${white}q${cyan}) to quit the current game.`)
    return [enemyAlive, recentlyKilledEnemy, newHeroHp];
}

function heroAttackEnemy(hero, currentEnemy) {
    let enemyDamage = hero.attack(currentEnemy)

    execSync(tPS)
    console.log(`${cyan}You attacked and did ${white}${enemyDamage} ${cyan}health points of damage.`)
}

function enemyAttackHero(hero, currentEnemy) {
    const heroDamage = currentEnemy.attack(hero)
    console.log(`${red}The ${lowerCaseMood} ${currentEnemy.species} attacked you and did ${white}${heroDamage} ${red}health points of damage.`)
}

function heroDeath(hero, currentEnemy, lowerCaseMood, heroHPCurrent) {
    execSync('sleep 2')
    console.log(`${red}You were slaughtered by the ${lowerCaseMood} ${currentEnemy.species}!`)
    hero.healthPoints = heroHPCurrent;
    displayFinalStats(hero)
    return [false, playAgainPrompt()]
}

function playAgainPrompt () {
    execSync(tPS)
    console.log(`${cyan}Would you like to play again? Enter (${white}y${cyan}) or (${white}n${cyan}).`)
    let playAgainAttempt = readline.question(magenta)
    while (invalidPlayAgainResponse(playAgainAttempt)) {
        console.log(`${yellow}Please Enter (${white}y${yellow}) or (${white}n${yellow}) to play again or not.`)
        playAgainAttempt = readline.question(magenta)
    }
    return playAgainAttempt;
}

function obtainFightResponse() {
    execSync(tPS)
    console.log(`${cyan}Enter (${white}f${cyan}) to fight.`)
    decisionAttempt = readline.question(magenta)
    while (invalidFightResponse(decisionAttempt)) {
        console.log(`${yellow}Please Enter (${white}f${yellow}) to fight.`)
        decisionAttempt = readline.question(magenta)
    }
}

function fightToTheDeath (hero, currentEnemy, lowerCaseMood, heroHPCurrent, enemyAlive, recentlyKilledEnemy, decisionFailCount) {
    // if (decisionFailCount >= 1) { execSync('sleep 0.5'); }
    heroAttackEnemy(hero, currentEnemy)
    if (currentEnemy.healthPoints <= 0) { // if the enemy dies
        [eAlive, rkEnemy, heroHPC] = enemyDeath(hero, currentEnemy, heroHPCurrent, enemyAlive, recentlyKilledEnemy)
        return [true, eAlive, rkEnemy, heroHPC, false, false];
    }
    enemyAttackHero(hero, currentEnemy, lowerCaseMood)
    if (hero.healthPoints <= 0) { // if the hero dies
        [hAlive, playAgainDecision] = heroDeath(hero, currentEnemy, lowerCaseMood, heroHPCurrent)
        if (playAgainDecision === "n") {
            return ["", "", "", "", true, false];
        }
        return ["", "", "", "", true, true]; // when the user wants to restart the game, the computer will hold in memory that this instantiation of the mainGame function has wantToQuit being true. This is necessary because when the user eventually chooses to quit, as the computer tries to loop between the various pairs of if-statements in the main function, the computer remembers each mainGame instantiation's wantToQuit bool value. And since we want to run through the loop between the two if-statements successfully until the original function call, we want wantToQuit to be true for all prior instantiations of mainGame. 
    }
    displayEnemyStats(currentEnemy)
    execSync(dPS)
    displayHeroStats(hero)
    obtainFightResponse()
    return [true, true, false, heroHPCurrent, false];
}


function mainGame () {
    const hero = gameIntro()
    let walkAttempt = "";
    let heroAlive = true;
    let heroHPCurrent = hero.healthPoints;
    let recentlyKilledEnemy = false;
    let wantToExit = false;
    let wantToRestart = false;
    let playAgain = "";
    while (heroAlive) {
        [walkAttempt, recentlyKilledEnemy, wantToExit, wantToRestart] = walkReconciler(playAgain, walkAttempt, recentlyKilledEnemy, hero);
        if (wantToRestart) { // the following two if statements (along with the other two statements in the innermost while loop) allow the user to effectively exit the game now matter how many times they elected to restart after quitting their current game/dying. The recursion tamers! All bow down.
            mainGame()
        }
        if (wantToExit) {
            return;
        }
        if (getRandomInts(0, 3)[0] != 0) {
            noEncounterNotif()
        } else {
            [currentEnemy, enemyAlive, lowerCaseMood, grammarInsert] = encounterEnemy(hero);
            [decision, decisionFailCount] = decideRunOrFight();
            let escapedSafely = false;
            if (decision === "r") { // if hero chooses to run initially
                [escapedSafely, decisionAttempt] = tryToRun(hero, currentEnemy, lowerCaseMood);
            }
            while (heroAlive && enemyAlive && !escapedSafely) {
                [heroAlive, enemyAlive, recentlyKilledEnemy, heroHPCurrent, wantToExit, wantToRestart] = fightToTheDeath(hero, currentEnemy, lowerCaseMood, heroHPCurrent, enemyAlive, recentlyKilledEnemy, decisionFailCount); // hAlive, true, false, 0, true, false
                if (wantToRestart) {
                    mainGame()
                }
                if (wantToExit) {
                    return;
                }
            }
        }
    }
}

mainGame()