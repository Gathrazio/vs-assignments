const mongoose = require('mongoose')
const Schema = mongoose.Schema

// inventory item schema
const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: String
})

module.exports = mongoose.model("InventoryItem", itemSchema)