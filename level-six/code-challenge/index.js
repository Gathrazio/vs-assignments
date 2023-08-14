const numberOfVowels = someString => {
    return someString.split('').reduce((accumulator, letter) => {
        if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u") {
            return accumulator + 1;
        }
        return accumulator;
    }, 0)
}

console.log(numberOfVowels('ooofdsafdsafdsafdsa'))


// findVowels('hello') // --> 2
// findVowels('why') // --> 0