/* ------------- */
/* Preliminaries */
/* ------------- */

// 1: Write a for loop that prints to the console the numbers 0 through 9.

/*
for (i = 0; i < 10; i++) {
    console.log(i)
}
*/

// 2: Write a for loop that prints out to the console 9 through 0.

/*
for (i = 9; i >= 0; i--) {
    console.log(i)
}
*/

// 3: Write a for loop that prints these fruits to the console.

//const fruit = ["banana", "orange", "apple", "kiwi"];

/*
for (i = 0; i < fruit.length; i++) {
    console.log(fruit[i])
}
*/



/* ------------ */
/* Bronze Medal */
/* ------------ */

// 1: Write a for loop that will push the numbers 0 through 9 to an array.

// const myArray = [];

/*
for (i = 0; i <= 9; i++) {
    myArray.push(i)
}

console.log(myArray)
*/


// 2: Write a for loop that prints to the console only even numbers 0 through 100.

/*
for (i = 0; i <= 100; i++) {
    if (i % 2 === 0) {
        console.log(i)
    }
}
*/

// 3: Write a for loop that will push every other fruit to an array.

//const fruit = ["banana", "orange", "apple", "kiwi", "pear", "peach"]

// const myArray = [];

/*
for (i = 0; i < fruit.length; i++) {
    if (i % 2 === 0) {
        myArray.push(fruit[i])
    }
}
*/

// or...

/*
for (i = 0; i < fruit.length; i++) {
    if ((i % 2) != 0) {
        myArray.push(fruit[i])
    }
}
*/

//console.log(myArray)



/* ------------ */
/* Silver Medal */
/* ------------ */


// 1: Write a loop that will print out all the names of the people of the people array.

const peopleArray = [
    {
      name: "Harrison Ford",
      occupation: "Actor"
    },
    {
      name: "Justin Bieber",
      occupation: "Singer"
    },
    {
      name: "Vladimir Putin",
      occupation: "Politician"
    },
    {
      name: "Oprah",
      occupation: "Entertainer"
    }
  ]

/*
for (i = 0; i < peopleArray.length; i++) {
    console.log(peopleArray[i].name)
}
*/

// 2: Write a loop that pushes the names into a 'names' array, and the occupations into an 'occupations' array.

/*
const names = [];
const occupations = [];

for (i = 0; i < peopleArray.length; i++) {
    names.push(peopleArray[i].name)
    occupations.push(peopleArray[i].occupation)
}

console.log(names)
console.log(occupations)
*/


// 3: Write a loop that pushes every other name to an array starting with the first person,
// in this case "Harrison Ford", and every other occupation to another array
// starting with, in this case, "Singer".

/*
const names = [];
const occupations = [];

for (i = 0; i < peopleArray.length; i++) {
    if ((i % 2) === 0) {
        names.push(peopleArray[i].name)
    } else {
        occupations.push(peopleArray[i].occupation)
    }
}

console.log(names)
console.log(occupations)
*/



/* ---------- */
/* Gold Medal */
/* ---------- */

// 1: Create an array that mimics a grid like the following using nested for loops.

// [[0, 0, 0],
//  [0, 0, 0],
//  [0, 0, 0]]

/*
const myArray = []

for (i = 0; i < 3; i++) {
    myArray.push([0, 0, 0])
}

console.log(myArray)
*/


// 2: Create an array that mimics a grid like the following using nested for loops:

// [[0, 0, 0],
//  [1, 1, 1],
//  [2, 2, 2]]

/*
const myArray = [];

for (i = 0; i < 3; i++) {
    myArray.push([i, i, i])
}

console.log(myArray)
*/


// 3: Create an array that mimics a grid like the following using nested for loops:

// [[0, 1, 2],
//  [0, 1, 2],
//  [0, 1, 2]]

/*
const myArray = [];

for (i = 0; i < 3; i++) {
    myArray.push([0, 1, 2])
}

console.log(myArray)
*/


// 4: Given a grid like the previous ones, write a nested for loop that would change every number to an x.

// ↓ generalized soln for any 2-dimensional array (including (mXn matrices))

/*
someArray = [[1, 2, 3],
             [4, 5, 6],
             [7, 8, 9, 40, 39, 37],
             [10, 11, 12]]

for (i = 0; i < someArray.length; i++) {
    for (j = 0; j < someArray[i].length; j++) {
        someArray[i][j] = "x"
    }
}

console.log(someArray)
*/

// generalized soln for any 4-dimensional array

/*
someArray = [
             [ [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
               [[10, 11, 12], [13, 14, 15], [16, 17, 18]],
               [[19, 20, 21], [22, 23, 24], [25, 26, 27]] ],
            
             [ [[-1, -2, -3], [-4, -5, -6], [-7, -8, -9]], 
               [[-10, -11, -12], [-13, -14, -15], [-16, -17, -18]],
               [[-19, -20, -21], [-22, -23, -24], [-25, -26, -27]] ]
            ]

for (i = 0; i < someArray.length; i++) {
    for (j = 0; j < someArray[i].length; j++) {
        for (k = 0; k < someArray[i][j].length; k++) {
            for (l = 0; l < someArray[i][j][k].length; l++) {
                someArray[i][j][k][l] = "x";
            }
        }
    }
}

for (i = 0; i < someArray.length; i++) { // printing out someArray[i][j] pieces, which are 3x3 matrices. the 54 values all got changed into x!
    for (j = 0; j < someArray[i].length; j++) {
        console.log("When i is " + i + " and j is " + j)
        console.log(someArray[i][j])
    }
}
*/