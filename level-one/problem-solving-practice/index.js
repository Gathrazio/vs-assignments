function largest (someArr) {
    let currentLargest = someArr[0];
    for (i = 1; i <= someArr.length - 1; i++) {
        if (currentLargest < someArr[i]) {
            currentLargest = someArr[i];
        }
    }
    return currentLargest;
}

// console.log(largest([1, -43, 399, 5, 44, 40, 1843, 3, 55]))

function lettersWithStrings (stringArr, char) {
    whatWeWant = [];
    for (i = 0; i < stringArr.length; i++) {
        for (j = 0; j < stringArr[i].length; j++) {
            if (stringArr[i][j] === char) {
                whatWeWant.push(stringArr[i])
            }
        }
    }
    return whatWeWant;
}

// console.log(lettersWithStrings(["#3", "$$$", "C%4!", "Hey!"], "!"))

function isDivisible (a, b) {
    if (a % b === 0) {
        return true;
    } else {
        return false;
    }
}

// console.log(isDivisible(15, 4))