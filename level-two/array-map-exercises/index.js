// (1) Make an array of numbers that are doubles of the first array.

// const numbers = [2, 5, 4];

// const doubledArray = numbers.map(number => number * 2);

// console.log(doubledArray)



// (2) Take an array of numbers and make them strings.

// const numbers = [6, 9, 3];

// const stringNumbers = numbers.map(number => number.toString());

// console.log(stringNumbers)



// (3) Capitalize the first letter of each name and make the rest of the characters lowercase.

// const names = ["john", "JACOB", "jInGLEheiMer", "SchMIDt"];

// const formattedNames = names.map(name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`);

// console.log(formattedNames)



// (4) Make an array of strings of the names.

// const people = [
//     {
//         name: "Angelina Jolie",
//         age: 80
//     },
//     {
//         name: "Eric Jones",
//         age: 2
//     },
//     {
//         name: "Paris Hilton",
//         age: 5
//     },
//     {
//         name: "Kayne West",
//         age: 16
//     },
//     {
//         name: "Bob Ziroll",
//         age: 100
//     }
// ];

// const names = people.map(person => person.name);

// console.log(names)


// (5) Make an array of strings of the names saying whether or not they can go to The Matrix (rated R)

// const people = [
//     {
//         name: "Angelina Jolie",
//         age: 80
//     },
//     {
//         name: "Eric Jones",
//         age: 2
//     },
//     {
//         name: "Paris Hilton",
//         age: 5
//     },
//     {
//         name: "Kayne West",
//         age: 16
//     },
//     {
//         name: "Bob Ziroll",
//         age: 100
//     }
// ];

// const decisionArray = people.map(person => {
//     if (person.age > 17) {
//         return `${person.name} is old enough to see The Matrix.`;
//     }
//     return `${person.name} is not old enough to see The Matrix!`;
// });

// console.log(decisionArray)



// (6) Make an array of the names in h1s and the ages in h2s

const people = [
    {
        name: "Angelina Jolie",
        age: 80
    },
    {
        name: "Eric Jones",
        age: 2
    },
    {
        name: "Paris Hilton",
        age: 5
    },
    {
        name: "Kayne West",
        age: 16
    },
    {
        name: "Bob Ziroll",
        age: 100
    }
];

const formattedPeople = people.map(person => `<h1>${person.name}</h1><h2>${person.age}</h2>`);

console.log(formattedPeople)