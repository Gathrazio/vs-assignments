const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// middleware for every request

app.use(express.json())
app.use(morgan('dev'))

//connect to db
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/bountiesdb", () => console.log('connected to database'))

app.use('/api/bounties', require('./routes/bountyRouter.js'))

app.use((err, req, res, next) => {
    return res.send({errMsg: err.message})
})

app.listen(8999)