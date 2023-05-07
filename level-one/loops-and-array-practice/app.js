// Task #1

/*
var officeItems = ["stapler", "monitor", "computer", "desk", "lamp", "computer", "lamp", "stapler", "computer",  "computer"]
let computerCount = 0;

for (i = 0; i < officeItems.length; i++) {
    if (officeItems[i] === "computer") {
        computerCount++;
    }
}

console.log("There are " + computerCount + " computers.")
*/

// Task #2 (optional bonus challenge included: logging personalized messages for each person)

/*
var peopleWhoWantToSeeMadMaxFuryRoad = [
    {
      name: "Mike",
      age: 12,
      gender: "male"
    },{
      name: "Madeline",
      age: 80,
      gender: "female"
    },{
      name: "Cheryl",
      age: 22,
      gender: "female"
    },{
      name: "Sam",
      age: 30,
      gender: "male"
    },{
      name: "Suzy",
      age: 4,
      gender: "female"
    }
  ]

for (i = peopleWhoWantToSeeMadMaxFuryRoad.length - 1; i >= 0; i--) { // two levels in this binary decision tree: first is age, second is gender, for 4 total potential response structures
    if (peopleWhoWantToSeeMadMaxFuryRoad[i].age < 18) {
        if (peopleWhoWantToSeeMadMaxFuryRoad[i].gender === "female") {
            console.log(peopleWhoWantToSeeMadMaxFuryRoad[i].name + " is not old enough to see Mad Max: Fury Road. Don't let her in.")
        } else {
            console.log(peopleWhoWantToSeeMadMaxFuryRoad[i].name + " is not old enough to see Mad Max: Fury Road. Don't let him in.")
        }
    } else {
        if (peopleWhoWantToSeeMadMaxFuryRoad[i].gender === "female") {
            console.log(peopleWhoWantToSeeMadMaxFuryRoad[i].name + " is old enough to see Mad Max: Fury Road. Let her in.")
        } else {
            console.log(peopleWhoWantToSeeMadMaxFuryRoad[i].name + " is old enough to see Mad Max: Fury Road. Let him in.")
        }
    }
}
*/



// Optional Bonus Challenge: Toggling a switch (attached to a light) a certain number of times as dictated by an array of numbers
// the light is off to start

const toggleArray = [9, 3, 4, 2]

// [2, 5, 435, 4, 3]
// [1, 1, 1, 1, 3]
// [9, 3, 4, 2]

let lightState = false;

// two ways to do it


// way 1:

/*
for (i = 0; i < toggleArray.length; i++) {
    for (j = 1; j <= toggleArray[i]; j++) {
        if (lightState){
            lightState = false;
        } else {
            lightState = true;
        }
    }
}
*/


// way 2

let toggleTotal = 0;

for (i = 0; i < toggleArray.length; i++) {
    toggleTotal += toggleArray[i];
}

for (i = 1; i <= toggleTotal; i++) {
    if (lightState){
        lightState = false;
    } else {
        lightState = true;
    }
}


// then we print the result

if (lightState) {
    console.log("The light is on.")
} else {
    console.log("The light is off.")
}
