const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))

// connect to db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () => console.log('connected to crudstoredb'))

app.use('/api/inventory', require('./routes/inventory.js'))

app.use((err, req, res, next) => {
    return res.send({errMsg: err.message})
})

app.listen(9000)