const express = require('express');
const todoRouter = express.Router();
const {v4: uuidv4} = require('uuid')

const todoList = [
    {
        name: "Eat lunch",
        description: "have to eat lunch",
        imageUrl: "https://insanelygoodrecipes.com/wp-content/uploads/2022/03/Chicken-Lunch-Bowl-with-Vegetables-and-Quinoa.jpg",
        completed: false,
        _id: uuidv4()
    },
    {
        name: "walk the dog",
        description: "have to walk the dog",
        imageUrl: "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_16x9.jpg?w=1200",
        completed: true,
        _id: uuidv4()
    },
    {
        name: "Fight the mailman",
        description: "have to fight the mailman",
        imageUrl: "https://i.imgflip.com/1ujfpw.jpg",
        completed: false,
        _id: uuidv4()
    }
]

// get all
todoRouter.get('/', (_, res) => {
    res.send(todoList)
})

// post one new todo
todoRouter.post('/', (req, res, next) => {
    if (!req.body.name || !req.body.description || !req.body.imageUrl || req.body.completed === undefined) {
        res.send("Failed to post new todo due to invalid format.")
        return;
    }
    todoList.push({...req.body, _id: uuidv4()})
    res.send({...req.body, _id: uuidv4()})
})

// update existing todo by id
todoRouter.put('/:todoId', (req, res) => {
    const tIOI = todoList.findIndex(todo => todo._id === req.params.todoId);
    if (tIOI === -1) {
        res.send('Failed to update todo due to incorrect ID.')
    }
    todoList.splice(tIOI, 1, {...todoList[tIOI], ...req.body})
    res.send(todoList[tIOI])
})

// delete existing todo by id
todoRouter.delete('/:todoId', (req, res) => {
    const tIOI = todoList.findIndex(todo => todo._id === req.params.todoId);
    if (tIOI === -1) {
        res.send('Failed to delete todo due to incorrect ID.')
    }
    todoList.splice(tIOI, 1)
    res.send(todoList)
})

// retrieve a single existing todo by id
todoRouter.get('/:todoId', (req, res) => {
    const tIOI = todoList.findIndex(todo => todo._id === req.params.todoId);
    if (tIOI === -1) {
        res.send('Failed to get todo due to incorrect ID.')
    }
    res.send(todoList[tIOI])
})


module.exports = todoRouter;