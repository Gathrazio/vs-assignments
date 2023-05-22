class Player {
    constructor () {
        this.name = "",
        this.totalCoins = 0,
        this.status = "Powered Up",
        this.hasStar = false,
        this.recentlyObtainedStar = false,
        this.starChain = false;
    }
    setName (namePicked) {this.name = namePicked;}
    gotHit () {
        switch (this.status) {
            case "Powered Up":
                this.status = "Big";
                break;
            case "Big":
                this.status = "Small";
                break;
            case "Small":
                this.status = "Dead";
        }
    }
    gotPowerup () {
        if (this.hasStar) {
            this.recentlyObtainedStar = true;
            this.starChain = true;
            return;
        }
        switch (this.status) {
            case "Powered Up":
                this.hasStar = true;
                this.recentlyObtainedStar = true;
                break;
            case "Big":
                this.status = "Powered Up";
                break;
            case "Small":
                this.status = "Big";
        }
    }
    addCoin () { 
        this.totalCoins += 1;
    }
    print () {
        if (this.hasStar && this.recentlyObtainedStar && this.starChain) {
            console.log(`\nYou got a star again!`)
            console.log(`Name: ${this.name}`)
        } else if (this.hasStar && this.recentlyObtainedStar) {
            console.log(`\nCongratulations! You got a star!`)
            console.log(`Name: ${this.name}`)
        } else if (this.hasStar) {
            console.log(`\nYour star protected you and wore off!`)
            this.hasStar = false;
            console.log(`Name: ${this.name}`)
        } else {
            console.log(`\nName: ${this.name}`)
        }
        console.log(`Total Coins: ${this.totalCoins}`)
        if (this.status != "Dead") {
            console.log(`Status: ${this.status}`)
        } else {
            console.log("\nYou died!")
            clearInterval(intervalId)
        }
    }
}

function getRandomInts(min, cap, multiplicity = 1) {
    randArray = [];
    for (i = 0; i < multiplicity; i++) {
        randArray.push(Math.floor(Math.random() * (cap - min) + min))
    }
    return randArray;
}

function proceedWithGame () {
    player.print()
    if (player.hasStar && player.recentlyObtainedStar) {
        player.recentlyObtainedStar = false;
        player.starChain = false;
    } else if (player.hasStar) {
        player.hasStar = false;
    }
    switch (getRandomInts(0, 3)[0]) {
        case 0:
            if (player.hasStar) {
                break;
            }
            player.gotHit()
            break;
        case 1:
            player.gotPowerup()
            break;
        case 2:
            player.addCoin()
    }
}

const player = new Player();
player.setName("Mario")
const intervalId = setInterval(proceedWithGame, 1000);