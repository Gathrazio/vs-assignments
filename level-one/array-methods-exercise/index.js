var fruit = ["banana", "apple", "orange", "watermelon"];
var vegetables = ["carrot", "tomato", "pepper", "lettuce"];

console.log("fruit: ", fruit);
console.log("vegetables: ", vegetables, "\n");

function doThings (fruit, vegetables) {
    console.log("1: remove last item from vegetables array")
    vegetables.pop()

    console.log("fruit: ", fruit);
    console.log("vegetables: ", vegetables, "\n");

    console.log("2: remove first item from fruit array")

    fruit.shift()

    console.log("fruit: ", fruit);
    console.log("vegetables: ", vegetables, "\n");

    console.log("3: find the index of 'orange'\n")

    const orangeIndex = fruit.indexOf("orange");

    console.log("4: Add that number to the end of the fruit array")

    fruit.push(orangeIndex)

    console.log("fruit: ", fruit);
    console.log("vegetables: ", vegetables, "\n");

    console.log("5: Use the length property to find the length of the vegetable array\n")

    const vegLength = vegetables.length

    console.log("6: Add that number to the end of the vegetable array")

    vegetables.push(vegLength)

    console.log("fruit: ", fruit);
    console.log("vegetables: ", vegetables, "\n");

    console.log("7: Put the two arrays together into one array. Fruit first. Call the new array 'food'")

    const food = fruit.concat(vegetables)

    console.log("food: ", food, "\n")

    console.log("8: Remove 2 elements from your new array starting at index 4 with one method")

    food.splice(4, 2)

    console.log(food, "\n")

    console.log("9: Reverse your array")

    food.reverse()

    console.log(food, "\n")

    console.log("10: turn the array into a string and return it\n")

    const joinedFood = food.join();

    console.log(joinedFood, "\n")

}

doThings(fruit, vegetables)