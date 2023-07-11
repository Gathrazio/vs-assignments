const express = require('express');
const app = express();
const morgan = require('morgan');

// middleware for every request

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/bounties', require('./routes/bountyRouter.js'))

app.listen(8999)