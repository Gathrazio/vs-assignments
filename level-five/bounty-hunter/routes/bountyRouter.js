const express = require('express');
const bountyRouter = express.Router();
const {v4: uuidv4} = require('uuid');

const bounties = [
    {
        fname: "Smokin'",
        lname: "Joe",
        living: true,
        price: 8000,
        type: "Sith",
        _id: uuidv4()
    },
    {
        fname: "Slingin'",
        lname: "Sandy",
        living: true,
        price: 490990,
        type: "Jedi", 
        _id: uuidv4()
    },
    {
        fname: "The",
        lname: "Wendingo",
        living: true,
        price: 1,
        type: "Sith", 
        _id: uuidv4()
    }
];

bountyRouter.route('/')
    .get((_, res) => {
        res.send(bounties)
    })
    .post((req, res) => {
        const newBounty = req.body;
        newBounty._id = uuidv4();
        bounties.push(newBounty)
        res.send(`Successfully added ${newBounty.name} to the bounty list.`)
    })


module.exports = bountyRouter;