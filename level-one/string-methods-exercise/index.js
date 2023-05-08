function capitalizeAndLowercaseRepeat (stringThing) {
    return stringThing.toUpperCase() + stringThing.toLowerCase();
}

function findMiddleIndex (stringThing) { // the choice implicitly is to take the larger middle index on strings that have an even number of characters
    return Math.floor(stringThing.length / 2);
}

function returnFirstHalf (stringThing) { // correctly returns exactly first half of even-character string, returns first half minus the middle character for odd-numbered strings
    return stringThing.slice(0, findMiddleIndex(stringThing))
}

function capitalizeAndLowercase (stringThing) {
    return returnFirstHalf(stringThing).toUpperCase() + stringThing.slice(findMiddleIndex(stringThing)).toLowerCase();
}

function capitalizeFollowingSpace (stringThing) { // how to deal with a string? turn it into an array, use array methods to modify, then turn the modified array back into a string
    const stringThingExploded = stringThing.split(" ") // this makes the most sense as strings are a primitive data type, meaning we can't modify it some number of times and return it as we can an array
    for (i = 0; i < stringThingExploded.length; i++) {
        stringThingExploded[i] = stringThingExploded[i][0].toUpperCase() + stringThingExploded[i].slice(1);
    }
    return stringThingExploded.join(" ");
}