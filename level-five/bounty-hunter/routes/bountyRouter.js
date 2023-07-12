const express = require('express');
const bountyRouter = express.Router();
const Bounty = require('../models/bounty.js')

bountyRouter.route('/')
    .get((req, res, next) => { // get all
        Bounty.find((err, bounties) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(bounties)
        })
    })
    .post((req, res, next) => { // post one
        const newBounty = new Bounty(req.body)
        newBounty.save((err, savedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedBounty)
        })
    })

bountyRouter.route('/:bountyId')
    .delete((req, res, next) => {
        Bounty.findOneAndDelete({ _id: req.params.bountyId }, (err, deletedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted bounty for ${deletedBounty.firstName} ${deletedBounty.lastName}.`)
        })
    })
    .put((req, res, next) => { // update one
        Bounty.findOneAndUpdate(
            { _id: req.params.bountyId }, // find the document with this property
            req.body, // update with req.body; merge document with req.body, giving importance to the properties within req.body
            { new: true }, // return the newly updated document
            (err, updatedBounty) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedBounty)
            }
        )
    })


module.exports = bountyRouter;