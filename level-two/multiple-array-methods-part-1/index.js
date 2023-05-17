const peopleArray = [
    {
        firstName: "Sarah",
        lastName: "Palin",
        age: 47
    },
    {
        firstName: "Frank",
        lastName: "Zappa",
        age: 12
    },
    {
        firstName: "Rick",
        lastName: "Sanchez",
        age: 78
    },
    {
        firstName: "Morty",
        lastName: "Smith",
        age: 29
    },
    {
        firstName: "Kyle",
        lastName: "Mooney",
        age: 27
    },
    {
        firstName: "Pasha",
        lastName: "Datsyuk",
        age: 13
    },
    {
        firstName: "Lev",
        lastName: "Tolstoy",
        age: 82
    }
];

function sortedOfAge (people) {
    const over18 = people.filter(person => person.age > 18);
    over18.sort((a, b) => a.lastName.localeCompare(b.lastName))
    return over18.map(person => `<li>${person.firstName} ${person.lastName} is ${person.age}</li>`)
}

const extraPeople = [
    {
        firstName: "Noah",
        lastName: "Jensen",
        age: 22
    },
    {
        firstName: "Daniel",
        lastName: "Pollack",
        age: 20
    },
    {
        firstName: "Malcolm",
        lastName: "Crosby",
        age: 12
    },
    {
        firstName: "Peter",
        lastName: "Parker",
        age: 26
    }
]

const fullPeopleArray = peopleArray.concat(extraPeople);

function formatter (arr) {
    const filtered = arr.filter(person => (person.lastName[person.lastName.length - 1] != "y") && (person.lastName[person.lastName.length - 1] != "a"));
    filtered.splice(1, 1)
    return filtered.reverse()
}

console.log(formatter(fullPeopleArray))