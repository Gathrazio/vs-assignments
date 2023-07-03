const express = require('express');
const app = express();

// middleware for every request

app.use(express.json()) // looks for a request body and turns it into req.body

app.use('/bounties', require('./routes/bountyRouter.js'))

app.listen(9000, () => {
    console.log("listening")
})