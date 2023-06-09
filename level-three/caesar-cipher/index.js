var readline = require('readline-sync');

const cyan = '\u001b[36;1m';
const white = '\u001b[0;37m';

let wantToUse = true;

function caesarCipherUtility () {
    while(wantToUse) {
        let decision = readline.question(`\n\nWould you like to encrypt (e) or decrypt (d)? `)
        while (decision != 'e' && decision != 'd') {
            decision = readline.question(`Would you like to encrypt (e) or decrypt (d)? `)
        }
        let input;
        let shift;
        let shiftWord;
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        if (decision === 'e') {
                input = readline.question('\n\nWhat phrase would you like to encrypt? ');
                shift = parseInt(readline.question('How many letters would you like to shift to the right? '));
                shiftWord = (word, distance) => word
                    .split('')
                    .map(char => (alphabet.indexOf(char) != -1) ? alphabet[(alphabet.indexOf(char) + distance) % 26] : char)
                    .join('');
        } else {
                input = readline.question('\n\nWhat phrase would you like to decrypt? ');
                shift = parseInt(readline.question('How many letters to the right was it shifted? '));
                shiftWord = (word, distance) => word
                    .split('')
                    .map(char => (alphabet.indexOf(char) != -1) ? alphabet[(alphabet.indexOf(char) + 26 - (distance % 26)) % 26] : char)
                    .join('');
        }
        const upperArray = [];
        for (i = 0; i < input.length; i++) {
            if (input[i] === input[i].toUpperCase() && alphabet.indexOf(input[i].toLowerCase()) != -1) {
                upperArray.push(i)
            }
        }
        const shiftPhrase = (phrase, distance) => phrase
            .split(' ')
            .map(word => shiftWord(word, distance))
            .join(' ');

        const shiftedPhraseArr = shiftPhrase(input.toLowerCase(), shift).split('');
        upperArray.forEach(index => shiftedPhraseArr.splice(index, 1, shiftedPhraseArr[index].toUpperCase()))
        
        console.log(`${cyan}\n${shiftedPhraseArr.join('')}\n`)

        decision = readline.question(`${white}Do you want to use the utility again (y/n)? `)
        while (decision != 'y' && decision != 'n') {
            decision = readline.question(`Do you want to use the utility again (y/n)? `)
        }
        if (decision === 'n') {
            wantToUse = false;
        }
    }
    console.log(`\n\n\nThank you for using this Caesar Cipher utility!\n`)
}

caesarCipherUtility()