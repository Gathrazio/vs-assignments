// let and const

// const name = "John";
// const age = 101;

// function runForLoop(pets) {
//     let petObjects = []
//     for (let i = 0; i < pets.length; i++) {
//         const pet = { type: pets[i] }
//         let name;
//         if (pets[i] === "cat") {
//             name = "fluffy"
//         } else {
//             name = "spot"
//         }
//         console.log("pet name: ", name)
//         pet.name = name;
//         petObjects.push(pet)
//     }
//     console.log("man name: ", name)
//     return petObjects;
// }

// runForLoop(["cat", "dog"])

// es6 arrow functions

// task 1: rewrite the .map() using an arrow function

// function mapVegetables(arr) {
//     return arr.map(function(carrot) {
//         return { type: "carrot", name: carrot }
//     })
// }

// re-written: 

// function mapVegetables(arr) {
//     return arr.map(carrot => {return {type: "carrot", name: carrot }})
// }

// console.log(mapVegetables(["abc", "def"]))

// task 2: rewrite this .filter()'s callback function using an arrow function

// const people = [
//     {
//         name: "Princess Peach",
//         friendly: false
//     },
//     {
//         name: "Luigi",
//         friendly: true
//     },
//     {
//         name: "Mario",
//         friendly: true
//     },
//     {
//         name: "Bowser",
//         friendly: false
//     }
// ]

// function filterForFriendly(arr) {
//     return arr.filter(person => person.friendly)
// }

// console.log(filterForFriendly(people))

// task 3: rewrite the following functions to be arrow functions

// const doMathSum = (a, b) => a + b;

// const produceProduct = (a, b) => a * b;

// console.log(doMathSum(1, 2))
// console.log(produceProduct(3, 6));

// task 4: write a printString function that takes firstName, lastNam, and age as parameters and returns a string like the following: 
// Hi Kat Stark, how does it feel to be 40?
// firstName should default to "Jane", last name should default to "Doe", age should default to 100.

// const printString = (firstName = "Jane", lastName = "Doe", age = 100) => console.log(`Hi ${firstName} ${lastName}, how does it feel to be ${age}?`);

// printString("Darren", "Jones", 39)


// task 5: use the shorthand syntax to make the following filter take up one line.

const animals = [
    {
        type: "dog",
        name: "theodore"
    },
    {
        type: "cat",
        name: "whiskers"
    },
    {
        type: "pig",
        name: "piglette"
    },
    {
        type: "dog",
        name: "sparky"
    }
 ];

// function filterForDogs(...arr) {
//     return arr.filter(animal => animal.type === "dog" ? true : false)
// }

// console.log(filterForDogs({name: "kobe", type: "dog"}, {name: "katrina", type: "cat"}))


// template literals

// write a function that takes location and name and prints out a message forrmatted like this:

// Hi Janice!
// Welcome to Hawaii.
// I hope you enjoy your stay. Please ask the president of Hawaii if you need anything.

const sayThings = (location, name) => {console.log(`Hi ${name}!\nWelcome to ${location}.\nI hope you enjoy your stay. Please ask the president of ${location} if you need anything.`)};

sayThings("Thailand", "Tiffany")