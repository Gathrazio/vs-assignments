// (1) turn an array of numbers into a total of all the numbers

// const numbers = [1,2,3];

// const total = numbers.reduce((final, number) => final + number);

// console.log(total)



// (2) turn an array of numbers into a long string of all those numbers

// const numbers = [1,2,3];

// const numberString = numbers.reduce((final, number) => `${final}${number}`, "");

// console.log(numberString)



// (3) turn an array of voter objects into a count of how many people voted

const voters = [
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
];

const totalVotes = voters.reduce((final, voter) => voter.voted ? final += 1 : final, 0)

// using ternary operator ?
// (condition) ? (do this if condition true) : (do this if condition false)
// we are dropping the 'return' phrase from both because we can (i.e., final += 1 is the same as return final += 1)

console.log(totalVotes)


// (4) Given an array of all your wishlist items, figure out how much it would cost to just buy everything at once.

// const wishlist = [
//     { title: "Tesla Model S", price: 90000 },
//     { title: "4 carat diamond ring", price: 45000 },
//     { title: "Fancy hacky Sack", price: 5 },
//     { title: "Gold fidgit spinner", price: 2000 },
//     { title: "A second Tesla Model S", price: 90000 }
// ];

// const totalCost = wishlist.reduce((final, item) => final + item.price, 0);

// console.log(totalCost)


// (5) given an array of arrays, flatten them into a single array

// const arrays = [
//     ["1", "2", "3"],
//     [true],
//     [4, 5, 6]
// ];

// const flattened = arrays.reduce((final, array) => final.concat(array));

// console.log(flattened)



// (6) given an array of potential voters, reutrn an object representing the results of the vote

// const voters = [
//     {name:'Bob' , age: 30, voted: true},
//     {name:'Jake' , age: 32, voted: true},
//     {name:'Kate' , age: 25, voted: false},
//     {name:'Sam' , age: 20, voted: false},
//     {name:'Phil' , age: 21, voted: true},
//     {name:'Ed' , age:55, voted:true},
//     {name:'Tami' , age: 54, voted:true},
//     {name: 'Mary', age: 31, voted: false},
//     {name: 'Becky', age: 43, voted: false},
//     {name: 'Joey', age: 41, voted: true},
//     {name: 'Jeff', age: 30, voted: true},
//     {name: 'Zack', age: 19, voted: false}
// ];

// const results = voters.reduce((final, voter) => {
//     if (voter.age >= 18 && voter.age <= 25) {
//         final.numYoungPeople += 1;
//         if (voter.voted) {
//             final.numYoungVotes += 1;
//         }
//     } else if (voter.age > 25 && voter.age <= 35) {
//         final.numMidsPeople += 1;
//         if (voter.voted) {
//             final.numMidVotesPeople += 1;
//         }
//     } else if (voter.age >= 36 && voter.age <= 55) {
//         final.numOldsPeople += 1;
//         if (voter.voted) {
//             final.numOldVotesPeople += 1;
//         }
//     }
//     return final;
// }, { numYoungVotes: 0, numYoungPeople: 0, numMidVotesPeople: 0, numMidsPeople: 0, numOldVotesPeople: 0, numOldsPeople: 0 })

// console.log(results)



// Extra Credit

// impossible to complete, no source for the data