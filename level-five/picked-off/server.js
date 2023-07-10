const express = require('express');
const alteration = require('./middleware/general.js')
const app = express();

app.use(express.json())
app.use('/something', (req, res, next) => {
    alteration(req, res, next)
})

app.get('/something', (req, res) => {
    res.send(req.body)
})



app.listen(9000);