const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to rtvdb'))

app.use('/auth', require('./routes/authRouter.js'))

app.use((err, req, res, next) => {
    return res.send({errMsg: err.message})
})

app.listen(9000)