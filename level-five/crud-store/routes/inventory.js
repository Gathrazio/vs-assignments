const express = require('express');
const inventoryRouter = express.Router();
const InventoryItem = require('../models/inventory.js')

inventoryRouter.route('/')
    .get((req, res, next) => { // get all
        InventoryItem.find((err, inventoryItems) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(inventoryItems);
        })
    })
    .post((req, res, next) => { // post one
        const newItem = new InventoryItem(req.body)
        newItem.save((err, savedItem) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedItem)
        })
    })

inventoryRouter.route('/:itemId')
    .get((req, res, next) => { // get one by id
        InventoryItem.findOne(
            { _id: req.params.itemId },
            (err, item) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(item)
            }
        )
    })
    .put((req, res, next) => { // update one by id
        InventoryItem.findOneAndUpdate(
            { _id: req.params.itemId },
            req.body,
            { new: true },
            (err, updatedItem) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedItem)
            }
        )
    })
    .delete((req, res, next) => {
        InventoryItem.findOneAndDelete(
            { _id: req.params.itemId },
            (err, deletedItem) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(`Successfully deleted ${deletedItem.title} from the inventory.`)
            }
        )
    })

module.exports = inventoryRouter;