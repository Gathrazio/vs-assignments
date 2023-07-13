const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

// middleware for every request
app.use(express.json())
app.use(morgan('dev'))

//connect to db
mongoose.set('strictQuery', true)
// mongoose.connect(process.env.MONGO_URL)
mongoose.connect('mongodb://localhost:27017/localbountiesdb')
    .then(() => console.log('Connected to localbountiesdb!'));


// routes
app.use('/api/bounties', require('./routes/bountyRouter.js'))


// error handling
app.use((err, req, res, next) => {
    return res.send({errMsg: err.message})
})

app.listen(8999)