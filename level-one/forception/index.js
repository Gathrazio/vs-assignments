function forception (people, alphabet) {
    const upperAlphaArray = alphabet.toUpperCase().split("")
    let regurgitation = [];
    for (i = 0; i < people.length; i++) {
        regurgitation.push(people[i])
        for (j = 0; j < upperAlphaArray.length; j++) {
            regurgitation.push(upperAlphaArray[j])
        }
    }
    console.log(regurgitation)
}

var people = ["Jon", "Jacob", "Jingle", "Heimer", "Schmidt"]
var alphabet = "abcdefghijklmnopqrstuvwxyz"

forception(people, alphabet)