const express = require('express')
const app = express();

//middleware

app.use(express.json())

app.use('/dinosaur', require('./routes/dinosaurRouter.js'))

app.listen(9000)