const express = require('express');
const userRouter = express.Router();
const {v4: uuidv4 } = require('uuid')

const users = [
    { name: "James", age: 3, birthday: "June", _id: uuidv4() },
    { name: "Jill", age: 33, birthday: "July", _id: uuidv4() },
    { name: "Brandon", age: 67, birthday: "June", _id: uuidv4() },
    { name: "Ethan", age: 15, birthday: "December", _id: uuidv4() },
    { name: "Rachel", age: 22, birthday: "August", _id: uuidv4() }
]

userRouter.route("/")
    .get((req, res) => {
        res.send(users)
    })
    .post((req, res) => {
        const newUser = req.body;
        newUser._id = uuidv4();
        users.push(newUser)
        res.send(`Successfully added the new user ${newUser.name} to the database!`)
    })

module.exports = userRouter;