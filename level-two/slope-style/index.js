// green circle difficulty exercises


// 1: use the rest operator to help the below function return an array of animals, no matter how many are passed into it.

// const collectAnimals = (...animals) => animals;

// console.log(collectAnimals("dog", "cat", "mouse", "jackolope", "platypus"));
// // ["dog", "cat", "mouse", "jackolope", "platypus"]


// 2: Write a function that returns a food object with the array names as properties. You'll use an ES6 shorthand syntax that becomes useful when a variable name is mentioned twice in both the name and value of properties in your object:

// const combineFruit = (fruits, sweets, vegetables) => {
//     return {fruits, sweets, vegetables};
// }

// console.log(combineFruit(["apple", "pear"],
//              ["cake", "pie"],
//              ["carrot"]))
/*  {
        fruit: ["apple", "pear"],
        sweets: ["cake", "pie"],
        vegetables: ["carrot"]
    }
*/


// 3: Use destructuring to use the property names as variables. Destructure the object in the parameter:

// const parseSentence = ({location, duration}) => `We're going to have a good time in ${location} for ${duration}.`;
  
// console.log(parseSentence({
//     location: "Burly Idaho",
//     duration: "2 weeks"
//   }))


// 4: Write destructuring code to assign variables that will help us return the expected string. Also, change the string to be using Template literals:

// const favoriteActivities = ["magnets", "snowboarding", "philanthropy", "janitor work", "eating"];

// function returnFavorites([firstFav, secondFav, thirdFav]){
//     /*your code here*/
//     return `My top three favorite activities are ${firstFav}, ${secondFav}, and ${thirdFav}.`;
// }

// console.log(returnFavorites(favoriteActivities))




// blue square difficulty exercise

// 1: Use the Rest and Spread Operator to help take any number of arrays, and return one array. You will need to change how the arrays are passed in. You may write it assuming you will always recieve three arrays if you would like to.

// function combineAnimals(...animalArr) {
//     return [...animalArr[0], ...animalArr[1], ...animalArr[2]];
// }

// const realAnimals = ["dog", "cat", "mouse"];
// const magicalAnimals = ["jackolope"];
// const mysteriousAnimals = ["platypus"];

// console.log(combineAnimals(realAnimals, magicalAnimals, mysteriousAnimals));

// // ["dog", "cat", "mouse", "jackolope", "platypus"]




// black diamond difficulty exercises

// 1: Try to make the following function more ES6y:

// const product = (...numbers) => numbers.reduce((acc, number) => acc * number);

// console.log(product(0, 4, 3, 2))


// 2: Make the following function more ES6y. Use at least both the rest and spread operators:

// const unshift = (array, ...letters) => [...letters, ...array];

// console.log(unshift([1, 2, 3], "A", "B", "C", "D"));




// double black diamond difficulty exercise

// 1: Write some destructuring code to help this function out. Use the ES6 shorthand that helps make the syntax look less redundant to simplify it:

const populatePeople = names => names.map(name => {return {firstName: name.split(" ")[0], lastName: name.split(" ")[1]};});


console.log(populatePeople(["Frank Peterson", "Suzy Degual", "Liza Jones"]))
//[
//  {firstName: "Frank", lastName: "Peterson"},
//  {firstName: "Suzy", lastName: "Degual"},
//  {firstName: "Liza", lastName: "Jones"},
//]