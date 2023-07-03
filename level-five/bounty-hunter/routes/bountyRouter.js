const express = require('express');
const bountyRouter = express.Router();
const {v4: uuidv4} = require('uuid');

let bounties = [
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
    .get((_, res) => { // get all
        res.send(bounties) // sending all bounties
    })
    .post((req, res) => { // post one
        const newBounty = req.body; // we will just hope req.body is in the correct format
        newBounty._id = uuidv4();
        bounties.push(newBounty)
        res.send(`Successfully added ${newBounty.fname} ${newBounty.lname} to the bounty list.`) // notification of successful post
    })

bountyRouter.route('/:bountyId')
    .get((req, res) => { // get one by Id
        res.send(bounties.find(bounty => bounty._id === req.params.bountyId))
    })
    .delete((req, res) => { // delete one by Id
        let deletedFName;
        let deletedLName;
        bounties = bounties.filter(bounty => { // re-assigning bounties array to eliminate the need for messy splicing
            if (bounty._id === req.params.bountyId) {
                deletedFName = bounty.fname;
                deletedLName = bounty.lname;
            }
            return bounty._id !== req.params.bountyId; // will return true for everything but the element that we are wanting to delete
        })
        res.send(`The bounty with id ${req.params.bountyId} (i.e., ${deletedFName} ${deletedLName}) was successfully removed.`) // notification of successful removal
    })
    .put((req, res) => { // update one by Id
        bounties.every((bounty, index) => { // .every() array method will stop the interior for loop when a falsey value is returned on any particular iteration
            if (bounty._id === req.params.bountyId) {
                bounties.splice(index, 1, ({
                    ...bounty,
                    ...req.body
                }))
                res.send(bounties[index]) // returns updated entry from database
                return false;
            }
            return true;
        })
    })


module.exports = bountyRouter;