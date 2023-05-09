// const: cannot re-declare, block scoped
// let: can re-declare, block scoped also

// rest operator ...

/*function addNumbers (...numbers) {
    // numbers is now an array we can use .reduce() on
    return numbers.reduce((sum, number) => sum + number, 0);
}

console.log(addNumbers(1, 2, 3, 6, -3, 9))*/


//spread operator: ...

/*const defaultColors = ['red', 'green'];
const userFavoriteColors = ['orange', 'yellow'];

console.log([...defaultColors, ...userFavoriteColors])*/

/*
function product (...values) {
    return values.reduce((acc, number) => acc * number, 1);
}

function unshift(array, ...values) {
    return [...values, ...array];
}

console.log(unshift([0,1,2], 1, 5, 3, 4))
console.log(product(2, 4, 6))*/

// template literals
/* 
let name = "Jacob";
let age = 20;
console.log(`hello, my name is ${name} and I am ${age} years old`)*/

// arrow functions

/* const add = function (a, b) {
    return a + b;
} */

// turns into

// const add = (a, b) => a + b;

//object shorthand

//const red = "fdsafdsa";
//const blue = "ihfldsajkih";

//const colors = {red, blue}

// instead of

// const colors = {red: red, blue: blue}

// or we could do something like this:

//const fields = ['firstName', 'lastName', 'phoneNumber'];
//const props = {fields};

//methods no longer require the function keywords:

/* const color = 'red';

const car = {
    color: color,
    drive() {
        return 'Vroom';
    },
    getColor() {
        return this.color;
    } 
} */

// destructuring

const expense = {
    type: "Business",
    amount: "$45 USD"
}

// instead of 
//const type = expense.type;
//const amount = expense.amount;

// just say

//const {type} = expense;
//const {amount} = expense;

//console.log(type) // business

// essentially here we are saying type and amount are properties that belong to expense
//const {type, amount} = expense;

//similar for arrays

//const vegetables = ['carrit', 'tomat', 'tomato soup'];

//const [firstVeg, secondVeg] = vegetables;

//console.log(firstVeg)

const people = [
    {name: 'Bob', age: 31},
    {name: 'Joe', age: 29},
    {name: 'Ben', age: 42}
]

const [{age: person1Age}, {name: person2Name}, {age: person3Age}] = people;

console.log(person1Age, person2Name, person3Age)

//const points = [ [4,5], [10,1], [0,40] ]

//newPoints = points.map(([eks, why]) => {return {eks, why}});

//console.log(newPoints)

const insects = {
    butterfly: [0, 1, 0, 2],
    fly: [2, 5, 8, 3]
}